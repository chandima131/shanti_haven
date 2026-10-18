import type { RowDataPacket } from 'mysql2';
import { ensureBookingsTable, getDb } from '@/db';

export const runtime = 'nodejs';

const clinicEmail = process.env.BOOKING_NOTIFICATION_EMAIL || 'info@shantihaven.co.uk';
const allowedServices = new Set([
  'Free 10-minute consultation via Zoom',
  'Sleep consultation',
  'Stress consultation',
  'Pressotherapy enquiry',
]);

type BookingBody = {
  name?: string;
  gender?: string;
  email?: string;
  mobile?: string;
  service?: string;
  appointmentTime?: string;
  timezone?: string;
  notes?: string;
  consent?: string;
};

const clean = (value: unknown, max = 500) => String(value ?? '').trim().slice(0, max);
const escapeHtml = (value: string) => value.replace(/[&<>"']/g, (character) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;',
}[character] || character));

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
  if (!process.env.RESEND_API_KEY || !process.env.FROM_EMAIL) return false;

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ from: process.env.FROM_EMAIL, to: [to], subject, html }),
  });

  if (!response.ok) {
    const details = await response.text();
    console.error('Resend delivery failed', response.status, details);
    throw new Error('Email delivery failed');
  }
  return true;
}

export async function POST(request: Request) {
  try {
    const body = await request.json() as BookingBody;
    const name = clean(body.name, 120);
    const gender = clean(body.gender, 40);
    const email = clean(body.email, 180).toLowerCase();
    const mobile = clean(body.mobile, 25);
    const service = clean(body.service, 80);
    const notes = clean(body.notes, 1500);
    const timezone = clean(body.timezone, 80);
    const appointment = new Date(clean(body.appointmentTime, 80));

    if (!name || !gender || !email || !mobile || !allowedServices.has(service) || body.consent !== 'yes' || Number.isNaN(appointment.getTime())) {
      return Response.json({ message: 'Please complete all required fields.' }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return Response.json({ message: 'Please enter a valid email address.' }, { status: 400 });
    }
    if (!/^[+\d][\d\s()-]{6,24}$/.test(mobile)) {
      return Response.json({ message: 'Please enter a valid mobile number.' }, { status: 400 });
    }
    if (appointment.getTime() < Date.now() + 30 * 60 * 1000) {
      return Response.json({ message: 'Please choose a time at least 30 minutes from now.' }, { status: 400 });
    }

    const parts = londonParts(appointment);
    const hour = Number(parts.hour);
    const minute = Number(parts.minute);
    if ((minute !== 0 && minute !== 30) || hour < 10 || hour > 18 || (hour === 18 && minute > 0)) {
      return Response.json({ message: 'Please choose a 30-minute time slot between 10:00 AM and 6:00 PM UK time.' }, { status: 400 });
    }

    await ensureBookingsTable();
    const db = getDb();
    const appointmentSql = appointment.toISOString().slice(0, 23).replace('T', ' ');
    const createdAtSql = new Date().toISOString().slice(0, 23).replace('T', ' ');
    const [duplicateRows] = await db.execute<RowDataPacket[]>(
      'SELECT id FROM bookings WHERE appointment_time = ? AND status != ? LIMIT 1',
      [appointmentSql, 'cancelled'],
    );
    if (duplicateRows.length > 0) {
      return Response.json({ message: 'That time has just been taken. Please choose another appointment.' }, { status: 409 });
    }

    const id = crypto.randomUUID();
    await db.execute(
      'INSERT INTO bookings (id,name,gender,email,mobile,service,appointment_time,timezone,notes,status,created_at) VALUES (?,?,?,?,?,?,?,?,?,?,?)',
      [id, name, gender, email, mobile, service, appointmentSql, timezone || null, notes || null, 'received', createdAtSql],
    );

    const when = `${parts.weekday}, ${parts.day} ${parts.month} ${parts.year} at ${parts.hour}:${parts.minute}`;
    const telephoneHref = mobile.replace(/[^+\d]/g, '');
    const rows = `
      <tr><td style="padding:8px 12px 8px 0;font-weight:bold">Customer</td><td>${escapeHtml(name)}</td></tr>
      <tr><td style="padding:8px 12px 8px 0;font-weight:bold">Gender</td><td>${escapeHtml(gender)}</td></tr>
      <tr><td style="padding:8px 12px 8px 0;font-weight:bold">Email</td><td><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td></tr>
      <tr><td style="padding:8px 12px 8px 0;font-weight:bold">Mobile</td><td><a href="tel:${escapeHtml(telephoneHref)}">${escapeHtml(mobile)}</a></td></tr>
      <tr><td style="padding:8px 12px 8px 0;font-weight:bold">Service</td><td>${escapeHtml(service)}</td></tr>
      <tr><td style="padding:8px 12px 8px 0;font-weight:bold">Appointment</td><td>${escapeHtml(when)} (UK time)</td></tr>
      <tr><td style="padding:8px 12px 8px 0;font-weight:bold">Customer timezone</td><td>${escapeHtml(timezone) || 'Not supplied'}</td></tr>
      <tr><td style="padding:8px 12px 8px 0;font-weight:bold;vertical-align:top">Notes</td><td>${escapeHtml(notes) || 'No additional notes.'}</td></tr>
      <tr><td style="padding:8px 12px 8px 0;font-weight:bold">Booking ID</td><td>${escapeHtml(id)}</td></tr>`;
    const clinicEmailHtml = `<div style="font-family:Arial,sans-serif;color:#173c33;line-height:1.6;max-width:640px"><h1 style="font-size:26px">New booking received</h1><p>A new appointment has been booked through the Shanti Haven website.</p><table style="width:100%;border-collapse:collapse">${rows}</table></div>`;
    const customerEmailHtml = `<div style="font-family:Arial,sans-serif;color:#173c33;line-height:1.6;max-width:640px"><h1 style="font-size:26px">Booking confirmation</h1><p>Hello ${escapeHtml(name)},</p><p>Thank you for booking with Shanti Haven Wellness Clinic. Your appointment details are below.</p><table style="width:100%;border-collapse:collapse"><tr><td style="padding:8px 12px 8px 0;font-weight:bold">Service</td><td>${escapeHtml(service)}</td></tr><tr><td style="padding:8px 12px 8px 0;font-weight:bold">Appointment</td><td>${escapeHtml(when)} (UK time)</td></tr><tr><td style="padding:8px 12px 8px 0;font-weight:bold">Location</td><td>Unit 110, 109 Portland St, Manchester M1 6DN</td></tr><tr><td style="padding:8px 12px 8px 0;font-weight:bold">Booking ID</td><td>${escapeHtml(id)}</td></tr></table><p>If you need to change your appointment, please call <a href="tel:+447940503546">07940 503546</a> or email <a href="mailto:info@shantihaven.co.uk">info@shantihaven.co.uk</a>.</p><p>We look forward to welcoming you.</p><p>Shanti Haven Wellness Clinic</p></div>`;

    const [clinicResult, customerResult] = await Promise.allSettled([
      sendEmail(clinicEmail, `New booking: ${service} - ${name}`, clinicEmailHtml),
      sendEmail(email, 'Booking confirmation - Shanti Haven Wellness Clinic', customerEmailHtml),
    ]);
    const notificationSent = clinicResult.status === 'fulfilled' && clinicResult.value;
    const customerConfirmationSent = customerResult.status === 'fulfilled' && customerResult.value;

    return Response.json({
      notificationSent,
      customerConfirmationSent,
      message: customerConfirmationSent
        ? `Your appointment is booked for ${when}. We've sent a confirmation email to ${email}.`
        : `We've received your appointment request for ${when}. The clinic will contact you with confirmation.`,
    }, { status: 201 });
  } catch (error) {
    console.error('Booking creation failed', error);
    return Response.json({ message: 'We could not complete your booking. Please call 07940 503546 and we will help.' }, { status: 500 });
  }
}
