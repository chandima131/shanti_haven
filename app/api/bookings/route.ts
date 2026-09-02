import { env } from 'cloudflare:workers';

const clinicEmail = 'commonventurellc@gmail.com';
const allowedServices = new Map([
  ['Free 10-minute consultation', 10],
  ['Sleep consultation', 50],
  ['Stress consultation', 50],
  ['Pressotherapy enquiry', 30],
]);

type BookingBody = { name?: string; gender?: string; email?: string; service?: string; appointmentTime?: string; timezone?: string; notes?: string; consent?: string };

const clean = (value: unknown, max = 500) => String(value ?? '').trim().slice(0, max);
const escapeHtml = (value: string) => value.replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[char] || char));

function londonParts(date: Date) {
  return Object.fromEntries(new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/London', weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false }).formatToParts(date).map((part) => [part.type, part.value]));
}

async function createZoomMeeting(topic: string, startTime: string, duration: number) {
  if (!env.ZOOM_ACCOUNT_ID || !env.ZOOM_CLIENT_ID || !env.ZOOM_CLIENT_SECRET) return null;
  const tokenResponse = await fetch(`https://zoom.us/oauth/token?grant_type=account_credentials&account_id=${encodeURIComponent(env.ZOOM_ACCOUNT_ID)}`, { method: 'POST', headers: { Authorization: `Basic ${btoa(`${env.ZOOM_CLIENT_ID}:${env.ZOOM_CLIENT_SECRET}`)}` } });
  if (!tokenResponse.ok) throw new Error('Zoom authentication failed');
  const token = await tokenResponse.json() as { access_token: string };
  const meetingResponse = await fetch('https://api.zoom.us/v2/users/me/meetings', { method: 'POST', headers: { Authorization: `Bearer ${token.access_token}`, 'Content-Type': 'application/json' }, body: JSON.stringify({ topic, type: 2, start_time: startTime, duration, timezone: 'Europe/London', settings: { waiting_room: true, join_before_host: false } }) });
  if (!meetingResponse.ok) throw new Error('Zoom meeting creation failed');
  return meetingResponse.json() as Promise<{ join_url: string; id: number }>;
}

async function sendEmail(to: string, subject: string, html: string) {
  if (!env.RESEND_API_KEY || !env.FROM_EMAIL) return false;
  const response = await fetch('https://api.resend.com/emails', { method: 'POST', headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, 'Content-Type': 'application/json' }, body: JSON.stringify({ from: env.FROM_EMAIL, to: [to], subject, html }) });
  if (!response.ok) throw new Error('Email delivery failed');
  return true;
}

export async function POST(request: Request) {
  try {
    const body = await request.json() as BookingBody;
    const name = clean(body.name, 120), gender = clean(body.gender, 40), email = clean(body.email, 180).toLowerCase(), service = clean(body.service, 80), notes = clean(body.notes, 1500), timezone = clean(body.timezone, 80);
    const appointment = new Date(clean(body.appointmentTime, 80));
    if (!name || !gender || !email || !allowedServices.has(service) || body.consent !== 'yes' || Number.isNaN(appointment.getTime())) return Response.json({ message: 'Please complete all required fields.' }, { status: 400 });
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return Response.json({ message: 'Please enter a valid email address.' }, { status: 400 });
    if (appointment.getTime() < Date.now() + 30 * 60 * 1000) return Response.json({ message: 'Please choose a time at least 30 minutes from now.' }, { status: 400 });
    const parts = londonParts(appointment); const hour = Number(parts.hour); const minute = Number(parts.minute);
    const validHalfHour = minute === 0 || minute === 30;
    const withinClinicHours = hour >= 10 && (hour < 19 || (hour === 19 && minute === 0));
    if (!validHalfHour || !withinClinicHours) return Response.json({ message: 'Please choose a 30-minute time slot between 10:00 AM and 7:00 PM UK time.' }, { status: 400 });

    await env.DB.batch([
      env.DB.prepare(`CREATE TABLE IF NOT EXISTS bookings (id TEXT PRIMARY KEY, name TEXT NOT NULL, gender TEXT NOT NULL, email TEXT NOT NULL, service TEXT NOT NULL, appointment_time TEXT NOT NULL, timezone TEXT, notes TEXT, zoom_join_url TEXT, zoom_meeting_id TEXT, status TEXT NOT NULL DEFAULT 'received', created_at TEXT NOT NULL)`),
      env.DB.prepare(`CREATE INDEX IF NOT EXISTS idx_bookings_appointment_time ON bookings(appointment_time)`),
    ]);
    const duplicate = await env.DB.prepare('SELECT id FROM bookings WHERE appointment_time = ?1 AND status != ?2 LIMIT 1').bind(appointment.toISOString(), 'cancelled').first();
    if (duplicate) return Response.json({ message: 'That time has just been taken. Please choose another appointment.' }, { status: 409 });

    const id = crypto.randomUUID();
    let zoom: { join_url: string; id: number } | null = null; let automated = false;
    try { zoom = await createZoomMeeting(`Shanti Haven — ${service} with ${name}`, appointment.toISOString(), allowedServices.get(service)!); automated = Boolean(zoom && env.RESEND_API_KEY && env.FROM_EMAIL); } catch { zoom = null; }
    await env.DB.prepare(`INSERT INTO bookings (id,name,gender,email,service,appointment_time,timezone,notes,zoom_join_url,zoom_meeting_id,status,created_at) VALUES (?1,?2,?3,?4,?5,?6,?7,?8,?9,?10,?11,?12)`).bind(id, name, gender, email, service, appointment.toISOString(), timezone, notes, zoom?.join_url ?? null, zoom?.id ? String(zoom.id) : null, automated ? 'confirmed' : 'received', new Date().toISOString()).run();

    const when = `${parts.weekday}, ${parts.day} ${parts.month} ${parts.year} at ${parts.hour}:${parts.minute}`;
    if (automated && zoom) {
      await Promise.all([
        sendEmail(email, 'Your Shanti Haven appointment is confirmed', `<div style="font-family:Arial;color:#173c33;line-height:1.6"><h1>Your consultation is confirmed</h1><p>Hello ${escapeHtml(name)},</p><p>Your <strong>${escapeHtml(service)}</strong> is booked for <strong>${when}</strong> (UK time).</p><p><a href="${zoom.join_url}" style="display:inline-block;background:#173c33;color:white;padding:12px 20px;border-radius:24px;text-decoration:none">Join your Zoom appointment</a></p><p>Shanti Haven Wellness Clinic<br>07940 503546</p></div>`),
        sendEmail(clinicEmail, `New booking: ${service}`, `<div style="font-family:Arial;line-height:1.6"><h2>New Shanti Haven booking</h2><p><strong>${escapeHtml(name)}</strong> (${escapeHtml(gender)})<br>${escapeHtml(email)}<br>${when}<br>${escapeHtml(service)}</p><p>${escapeHtml(notes) || 'No additional notes.'}</p><p><a href="${zoom.join_url}">Open Zoom meeting</a></p></div>`),
      ]);
    }

    return Response.json({ automationConfigured: automated, message: automated ? `Your confirmation and Zoom link have been sent to ${email}.` : `We’ve received your request for ${when}. The clinic will email your confirmation and Zoom link shortly.` }, { status: automated ? 201 : 202 });
  } catch {
    return Response.json({ message: 'We could not complete your booking. Please call 07940 503546 and we will help.' }, { status: 500 });
  }
}
