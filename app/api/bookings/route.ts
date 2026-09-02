import { env } from 'cloudflare:workers';

const clinicEmail = 'commonventurellc@gmail.com';
const allowedServices = new Set([
  'Free 10-minute consultation',
  'Sleep consultation',
  'Stress consultation',
  'Pressotherapy enquiry',
]);

type BookingBody = {
  name?: string;
  gender?: string;
  email?: string;
  service?: string;
  appointmentTime?: string;
  timezone?: string;
  notes?: string;
  consent?: string;
};

const clean = (value: unknown, max = 500) => String(value ?? '').trim().slice(0, max);
const escapeHtml = (value: string) => value.replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[char] || char));

function londonParts(date: Date) {
  return Object.fromEntries(new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/London',
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).formatToParts(date).map((part) => [part.type, part.value]));
}

async function sendEmail(to: string, subject: string, html: string) {
  if (!env.RESEND_API_KEY || !env.FROM_EMAIL) return false;

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ from: env.FROM_EMAIL, to: [to], subject, html }),
  });

  if (!response.ok) throw new Error('Email delivery failed');
  return true;
}

export async function POST(request: Request) {
  try {
    const body = await request.json() as BookingBody;
    const name = clean(body.name, 120);
    const gender = clean(body.gender, 40);
    const email = clean(body.email, 180).toLowerCase();
    const service = clean(body.service, 80);
    const notes = clean(body.notes, 1500);
    const timezone = clean(body.timezone, 80);
    const appointment = new Date(clean(body.appointmentTime, 80));

    if (!name || !gender || !email || !allowedServices.has(service) || body.consent !== 'yes' || Number.isNaN(appointment.getTime())) {
      return Response.json({ message: 'Please complete all required fields.' }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return Response.json({ message: 'Please enter a valid email address.' }, { status: 400 });
    }
    if (appointment.getTime() < Date.now() + 30 * 60 * 1000) {
      return Response.json({ message: 'Please choose a time at least 30 minutes from now.' }, { status: 400 });
    }

    const parts = londonParts(appointment);
    const hour = Number(parts.hour);
    const minute = Number(parts.minute);
    const validHalfHour = minute === 0 || minute === 30;
    const withinClinicHours = hour >= 10 && (hour < 18 || (hour === 18 && minute === 0));
    if (!validHalfHour || !withinClinicHours) {
      return Response.json({ message: 'Please choose a 30-minute time slot between 10:00 AM and 6:00 PM UK time.' }, { status: 400 });
    }

    await env.DB.batch([
      env.DB.prepare(`CREATE TABLE IF NOT EXISTS bookings (id TEXT PRIMARY KEY, name TEXT NOT NULL, gender TEXT NOT NULL, email TEXT NOT NULL, service TEXT NOT NULL, appointment_time TEXT NOT NULL, timezone TEXT, notes TEXT, zoom_join_url TEXT, zoom_meeting_id TEXT, status TEXT NOT NULL DEFAULT 'received', created_at TEXT NOT NULL)`),
      env.DB.prepare(`CREATE INDEX IF NOT EXISTS idx_bookings_appointment_time ON bookings(appointment_time)`),
    ]);

    const duplicate = await env.DB.prepare('SELECT id FROM bookings WHERE appointment_time = ?1 AND status != ?2 LIMIT 1')
      .bind(appointment.toISOString(), 'cancelled')
      .first();
    if (duplicate) {
      return Response.json({ message: 'That time has just been taken. Please choose another appointment.' }, { status: 409 });
    }

    const id = crypto.randomUUID();
    const createdAt = new Date().toISOString();
    await env.DB.prepare(`INSERT INTO bookings (id,name,gender,email,service,appointment_time,timezone,notes,zoom_join_url,zoom_meeting_id,status,created_at) VALUES (?1,?2,?3,?4,?5,?6,?7,?8,?9,?10,?11,?12)`)
      .bind(id, name, gender, email, service, appointment.toISOString(), timezone, notes, null, null, 'received', createdAt)
      .run();

    const when = `${parts.weekday}, ${parts.day} ${parts.month} ${parts.year} at ${parts.hour}:${parts.minute}`;
    let notificationSent = false;
    try {
      notificationSent = await sendEmail(
        clinicEmail,
        `Booking confirmation: ${service} — ${name}`,
        `<div style="font-family:Arial,sans-serif;color:#173c33;line-height:1.6;max-width:640px"><h1 style="font-size:26px">Booking confirmation</h1><p>A new appointment has been booked through the Shanti Haven website.</p><table style="width:100%;border-collapse:collapse"><tr><td style="padding:8px 0;font-weight:bold">Customer</td><td>${escapeHtml(name)}</td></tr><tr><td style="padding:8px 0;font-weight:bold">Gender</td><td>${escapeHtml(gender)}</td></tr><tr><td style="padding:8px 0;font-weight:bold">Email</td><td><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td></tr><tr><td style="padding:8px 0;font-weight:bold">Service</td><td>${escapeHtml(service)}</td></tr><tr><td style="padding:8px 0;font-weight:bold">Appointment</td><td>${escapeHtml(when)} (UK time)</td></tr><tr><td style="padding:8px 0;font-weight:bold">Customer timezone</td><td>${escapeHtml(timezone) || 'Not supplied'}</td></tr><tr><td style="padding:8px 0;font-weight:bold;vertical-align:top">Notes</td><td>${escapeHtml(notes) || 'No additional notes.'}</td></tr><tr><td style="padding:8px 0;font-weight:bold">Booking ID</td><td>${escapeHtml(id)}</td></tr></table></div>`,
      );
    } catch {
      notificationSent = false;
    }

    return Response.json({
      notificationSent,
      message: `We’ve received your appointment request for ${when}. The clinic will contact you with confirmation.`,
    }, { status: 201 });
  } catch {
    return Response.json({ message: 'We could not complete your booking. Please call 07940 503546 and we will help.' }, { status: 500 });
  }
}
