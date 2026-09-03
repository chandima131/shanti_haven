'use client';

import { FormEvent, useEffect, useMemo, useState } from 'react';

type Status = { kind: 'idle' | 'loading' | 'success' | 'error'; message?: string };

const THIRTY_MINUTES = 30 * 60 * 1000;
const pad = (value: number) => String(value).padStart(2, '0');

function localDate(date: Date) {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

const appointmentTimes = Array.from({ length: 17 }, (_, index) => {
  const totalMinutes = 10 * 60 + index * 30;
  return `${pad(Math.floor(totalMinutes / 60))}:${pad(totalMinutes % 60)}`;
});

function firstBookableTime(now: number) {
  const next = new Date(Math.ceil((now + THIRTY_MINUTES) / THIRTY_MINUTES) * THIRTY_MINUTES);

  if (next.getHours() < 10) next.setHours(10, 0, 0, 0);
  if (next.getHours() > 18 || (next.getHours() === 18 && next.getMinutes() > 0)) {
    next.setDate(next.getDate() + 1);
    next.setHours(10, 0, 0, 0);
  }

  return next;
}

function displayTime(value: string) {
  const [hour, minute] = value.split(':').map(Number);
  return new Intl.DateTimeFormat('en-GB', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }).format(new Date(2000, 0, 1, hour, minute));
}

export default function BookingForm() {
  const [now, setNow] = useState(0);
  const [minimumDate, setMinimumDate] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [status, setStatus] = useState<Status>({ kind: 'idle' });

  useEffect(() => {
    const updateClock = () => {
      const current = Date.now();
      const nextDate = localDate(firstBookableTime(current));
      setNow(current);
      setMinimumDate(nextDate);
      setSelectedDate((previous) => !previous || previous < nextDate ? nextDate : previous);
    };

    updateClock();
    const timer = window.setInterval(updateClock, 30_000);
    return () => window.clearInterval(timer);
  }, []);

  const availableTimes = useMemo(() => {
    if (!selectedDate || !now) return [];
    const cutoff = now + THIRTY_MINUTES;
    return appointmentTimes.filter((time) => new Date(`${selectedDate}T${time}:00`).getTime() >= cutoff);
  }, [now, selectedDate]);

  const activeTime = availableTimes.includes(selectedTime) ? selectedTime : (availableTimes[0] ?? '');

  const statusClass = useMemo(() => `form-status ${status.kind}`, [status.kind]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus({ kind: 'loading', message: 'Reserving your consultation...' });
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    const localValue = `${String(data.appointmentDate || '')}T${String(data.appointmentSlot || '')}`;
    delete data.appointmentDate;
    delete data.appointmentSlot;
    data.appointmentTime = new Date(localValue).toISOString();
    data.timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    try {
      const response = await fetch('/api/bookings', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
      const result = await response.json() as { message?: string };
      if (!response.ok) throw new Error(result.message || 'We could not complete your booking.');
      setStatus({ kind: 'success', message: result.message });
      form.reset();
    } catch (error) {
      setStatus({ kind: 'error', message: error instanceof Error ? error.message : 'Something went wrong. Please call us instead.' });
    }
  }

  if (status.kind === 'success') {
    return <div className="confirmation-card" role="status"><div className="confirmation-icon">&#10003;</div><p className="section-kicker">Booking received</p><h3>Thank you. Your time is reserved.</h3><p>{status.message}</p><div className="confirmation-note">Please check your inbox and spam folder. If you need help, call <a href="tel:+447940503546">07940 503546</a>.</div><button className="text-button" type="button" onClick={() => setStatus({ kind: 'idle' })}>Make another booking</button></div>;
  }

  return <form className="booking-form" onSubmit={submit}>
    <div className="form-title"><strong>Book your appointment</strong></div>
    <div className="field-row"><label>Full name<input name="name" type="text" autoComplete="name" required placeholder="Your full name" /></label><label>Gender<select name="gender" defaultValue="" required><option value="" disabled>Select</option><option>Female</option><option>Male</option><option>Non-binary</option><option>Prefer not to say</option><option>Self-describe</option></select></label></div>
    <div className="field-row booking-contact-row"><label>Email address<input name="email" type="email" autoComplete="email" required placeholder="you@example.com" /></label><label>Mobile number<input name="mobile" type="tel" autoComplete="tel" inputMode="tel" required placeholder="e.g. 07940 123456" minLength={7} maxLength={25} /></label></div>
    <label>What would you like support with?<select name="service" defaultValue="Free 10-minute consultation via Zoom" required><option>Free 10-minute consultation via Zoom</option><option>Sleep consultation</option><option>Stress consultation</option><option>Pressotherapy enquiry</option></select></label>
    <div className="field-row"><label>Preferred date<input name="appointmentDate" type="date" min={minimumDate} value={selectedDate} onChange={(event) => setSelectedDate(event.target.value)} required /></label><label>Preferred time<select name="appointmentSlot" value={activeTime} onChange={(event) => setSelectedTime(event.target.value)} required disabled={!availableTimes.length}>{availableTimes.length ? availableTimes.map((time) => <option key={time} value={time}>{displayTime(time)}</option>) : <option value="">No times available</option>}</select></label></div>
    <p className="booking-time-note">Available daily from 10:00 AM to 6:00 PM in 30-minute intervals.</p>
    <label>Anything else you would like us to know? <span className="optional">Optional</span><textarea name="notes" rows={4} placeholder="Share any questions, accessibility needs or context that may help us support you." maxLength={1500}/></label>
    <label className="consent"><input name="consent" value="yes" type="checkbox" required/><span>I agree that Shanti Haven may use these details to arrange and contact me about this appointment.</span></label>
    <button className="submit-button" type="submit" disabled={status.kind === 'loading'}>{status.kind === 'loading' ? 'Reserving...' : 'Confirm consultation'}<span>&rarr;</span></button>
    {status.kind !== 'idle' && <p className={statusClass} role="status">{status.message}</p>}
    <p className="privacy-note">Your information is used only to manage your enquiry and appointment.</p>
  </form>;
}
