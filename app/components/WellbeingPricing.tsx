import Link from 'next/link';
import styles from './WellbeingPricing.module.css';

export default function WellbeingPricing({ service }: { service: 'Sleep' | 'Stress' }) {
  const sleep = service === 'Sleep';
  const appointment = sleep ? 'Sleep and Unwind Appointment' : 'Stress and Release Appointment';
  const reset = `${service} Reset Programme`;
  const extended = sleep ? 'Sleep Restoration Programme' : 'Stress Resilience Programme';
  const packages = [
    [appointment, sleep ? '60-minute sleep wellbeing consultation and one 45-minute pressotherapy session' : '60-minute stress wellbeing consultation, personalised guidance and one 45-minute pressotherapy session', '£95'],
    [reset, `Initial consultation, personalised ${sleep ? 'sleep' : 'stress management'} plan, four pressotherapy sessions and one 30-minute progress review`, '£265'],
    [extended, sleep ? 'Initial 60-minute consultation, detailed sleep plan, ten pressotherapy sessions and two 30-minute progress reviews' : 'Initial consultation, detailed wellbeing plan, ten pressotherapy sessions and two progress reviews', '£595'],
    [`${service} Maintenance`, 'One 45-minute review and one pressotherapy session each month', '£80 monthly'],
  ];

  return <div className={styles.pricing}>
    <h3>Individual consultations</h3>
    <p>Book {service.toLowerCase()} wellbeing support without adding pressotherapy.</p>
    <div className={styles.scroll} role="region" aria-label={`${service} consultation prices`} tabIndex={0}>
      <table><caption>{service} wellbeing consultations</caption><thead><tr><th scope="col">Service</th><th scope="col">Duration</th><th scope="col">Price</th></tr></thead><tbody>
        <tr><th scope="row">Initial {service} Wellbeing Consultation</th><td>60 minutes</td><td>£50</td></tr>
        <tr><th scope="row">{service} Follow Up</th><td>30 minutes</td><td>£35</td></tr>
        <tr><th scope="row">{service} Follow Up</th><td>60 minutes</td><td>£45</td></tr>
      </tbody></table>
    </div>

    <h3>{service} wellbeing and pressotherapy packages</h3>
    <p>{sleep ? 'Personalised sleep wellbeing guidance is combined with relaxing pressotherapy appointments and planned progress reviews.' : 'Personalised stress wellbeing guidance is combined with pressotherapy and practical follow-up support.'}</p>
    <div className={styles.scroll} role="region" aria-label={`${service} and pressotherapy package prices`} tabIndex={0}>
      <table><caption>{service} wellbeing and pressotherapy packages</caption><thead><tr><th scope="col">Service or Package</th><th scope="col">What Is Included</th><th scope="col">Price</th></tr></thead><tbody>{packages.map(([title, detail, price]) => <tr key={title}><th scope="row">{title}</th><td>{detail}</td><td>{price.endsWith(' monthly') ? <>{price.replace(' monthly', '')}<span>monthly</span></> : price}</td></tr>)}</tbody></table>
    </div>

    <h3>Programme savings</h3>
    <div className={styles.scroll} role="region" aria-label={`${service} programme savings`} tabIndex={0}>
      <table><caption>Compare standard values and programme prices</caption><thead><tr><th scope="col">Programme</th><th scope="col">Standard value</th><th scope="col">Package price</th><th scope="col">You save</th></tr></thead><tbody>
        <tr><th scope="row">{reset}</th><td>£290</td><td>£265</td><td className={styles.saving}>£25</td></tr>
        <tr><th scope="row">{extended}</th><td>£700</td><td>£595</td><td className={styles.saving}>£105</td></tr>
      </tbody></table>
    </div>

    <div className={styles.offer}>
      <h3>Opening month offer</h3>
      <p>For new clients during the advertised opening period. The introductory discount applies to your first eligible appointment only. Full courses remain at their standard package prices.</p>
      <div className={styles.scroll} role="region" aria-label={`${service} introductory appointment offer`} tabIndex={0}>
        <table><caption>{service} introductory appointment pricing</caption><thead><tr><th scope="col">Introductory appointment</th><th scope="col">Usual price</th><th scope="col">Opening price</th></tr></thead><tbody><tr><th scope="row">{appointment}</th><td>£95</td><td>£47.50</td></tr></tbody></table>
      </div>
      <ul><li>Limited to one introductory offer per person.</li><li>Cannot be combined with another promotion.</li><li>Advance booking and suitability screening apply.</li></ul>
    </div>

    <aside className={styles.note}><h3>Important information</h3><p>Pressotherapy courses are personalised following a suitability consultation. The appropriate number and frequency of appointments may vary according to individual circumstances and goals. Results cannot be guaranteed.</p><p>Sleep and stress appointments are wellbeing services that provide education, practical guidance and lifestyle support. They do not diagnose or treat medical or mental health conditions. Where appropriate, clients may be advised to contact their GP or another suitably regulated healthcare professional.</p></aside>
    <Link className={styles.button} href="/#booking">Enquire about {service.toLowerCase()} support <span aria-hidden="true">↗</span></Link>
  </div>;
}
