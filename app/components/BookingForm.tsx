'use client';

import { FormEvent, useEffect, useMemo, useState } from 'react';

type Status = { kind: 'idle' | 'loading' | 'success' | 'error'; message?: string; configured?: boolean };

const pad = (value: number) => String(value).padStart(2, '0');

function localDateTime(date: Date) {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

export default function BookingForm() {
  const [minimum, setMinimum] = useState('');
  const [status, setStatus] = useState<Status>({ kind: 'idle' });

  useEffect(() => {
    const next = new Date(Date.now() + 30 * 60 * 1000);
    next.setMinutes(Math.ceil(next.getMinutes() / 5) * 5, 0, 0);
    setMinimum(localDateTime(next));
  }, []);

  const statusClass = useMemo(() => `form-status ${status.kind}`, [status.kind]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus({ kind: 'loading', message: 'Reserving your consultation…' });
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    const localValue = String(data.appointmentTime || '');
    data.appointmentTime = new Date(localValue).toISOString();
    data.timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    try {
      const response = await fetch('/api/bookings', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
      const result = await response.json() as { message?: string; automationConfigured?: boolean };
      if (!response.ok) throw new Error(result.message || 'We could not complete your booking.');
      setStatus({ kind: 'success', message: result.message, configured: result.automationConfigured });
      form.reset();
    } catch (error) {
      setStatus({ kind: 'error', message: error instanceof Error ? error.message : 'Something went wrong. Please call us instead.' });
    }
  }

  if (status.kind === 'success') {
    return <div className="confirmation-card" role="status"><div className="confirmation-icon">✓</div><p className="section-kicker">Booking received</p><h3>Thank you. Your time is reserved.</h3><p>{status.message}</p><div className="confirmation-note">Please check your inbox and spam folder. If you need help, call <a href="tel:+447940503546">07940 503546</a>.</div><button className="text-button" type="button" onClick={() => setStatus({ kind: 'idle' })}>Make another booking</button></div>;
  }

  return <form className="booking-form" onSubmit={submit}>
    <div className="form-title"><span>Free 10-minute consultation</span><strong>Book your call</strong></div>
    <div className="field-row"><label>Full name<input name="name" type="text" autoComplete="name" required placeholder="Your full name" /></label><label>Gender<select name="gender" defaultValue="" required><option value="" disabled>Select</option><option>Female</option><option>Male</option><option>Non-binary</option><option>Prefer not to say</option><option>Self-describe</option></select></label></div>
    <label>Email address<input name="email" type="email" autoComplete="email" required placeholder="you@example.com" /></label>
    <label>What would you like support with?<select name="service" defaultValue="Free 10-minute consultation" required><option>Free 10-minute consultation</option><option>Sleep consultation</option><option>Stress consultation</option><option>Pressotherapy enquiry</option></select></label>
    <label>Preferred date and time<input name="appointmentTime" type="datetime-local" min={minimum} required /><small>Available Monday—Sunday, 10:00 to 19:00. Please choose at least 30 minutes from now.</small></label>
    <label>Anything else you would like us to know? <span className="optional">Optional</span><textarea name="notes" rows={4} placeholder="Share any questions, accessibility needs or context that may help us support you." maxLength={1500}/></label>
    <label className="consent"><input name="consent" value="yes" type="checkbox" required/><span>I agree that Shanti Haven may use these details to arrange and contact me about this appointment.</span></label>
    <button className="submit-button" type="submit" disabled={status.kind === 'loading'}>{status.kind === 'loading' ? 'Reserving…' : 'Confirm free consultation'}<span>→</span></button>
    {status.kind !== 'idle' && <p className={statusClass} role="status">{status.message}</p>}
    <p className="privacy-note">Your information is used only to manage your enquiry and appointment.</p>
  </form>;
}
