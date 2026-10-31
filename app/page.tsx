import Image from 'next/image';
import BookingForm from './components/BookingForm';
import OfferPopup from './components/OfferPopup';

const services = [
  { slug: 'pressotherapy', href: '/pressotherapy', eyebrow: 'Body & recovery', title: 'Pressotherapy', text: 'Pressotherapy is a comfortable, non-invasive treatment that uses inflatable garments and controlled, rhythmic air compression to create a gentle, wave-like massage across targeted areas of the body.', more: '', outcomeLabel: 'People often choose it for', outcomes: ['Tired or heavy-feeling legs', 'Post-exercise recovery', 'Relaxation and general wellbeing', 'A feeling of lightness after sitting or standing'], closing: 'Simply lie back and relax while the compression programme runs.', detail: 'Non-invasive · Relaxing · No downtime' },
  { slug: 'sleep', href: '/sleep', eyebrow: 'Rest & reset', title: 'Sleep consultation', text: 'If restless nights, difficulty switching off or an inconsistent sleep routine are affecting your days, this one-to-one consultation gives you time to explore what may be getting in the way of better rest.', more: 'We look at your current sleep patterns, evening habits, lifestyle and everyday stressors, then create a realistic routine tailored to you.', outcomeLabel: 'You may leave with', outcomes: ['A clearer understanding of your sleep patterns', 'Practical evening strategies', 'A personalised sleep routine', 'Simple steps towards calmer nights'], detail: 'One-to-one · Personal plan · Confidential' },
  { slug: 'stress', href: '/stress', eyebrow: 'Mind & balance', title: 'Stress consultation', text: 'A private, unhurried conversation designed to help you recognise the situations, habits and thought patterns that may be contributing to everyday stress.', more: 'Together, we explore practical techniques that fit naturally into your normal routine, rather than giving you another complicated programme to follow.', outcomeLabel: 'You may leave with', outcomes: ['A better understanding of your stress triggers', 'Practical coping techniques', 'Relaxation strategies', 'A personalised plan for daily pressure'], detail: 'Private · Supportive · Personalised' },
];

const serviceImages: Record<string, string> = {
  pressotherapy: '/pressotherapy-hero.jpg',
  sleep: '/service-sleep-consultation.png',
  stress: '/service-stress-consultation.png',
};

const upcoming = [
  { title: 'Sports massage', tag: 'Movement & recovery', text: 'A targeted hands-on treatment planned to ease muscular tension, support recovery and help you move more comfortably—whether you are active, training or managing everyday stiffness.' },
  { title: 'O₂ aroma therapy', tag: 'Breathe & unwind', text: 'A calming sensory experience combining restorative relaxation with carefully selected aromas, created to help you pause, breathe deeply and enjoy a quiet moment of reset.' },
  { title: 'Quick blood test reports', tag: 'Convenient insights', text: 'A convenient in-clinic service planned for selected blood tests, with prompt reports and clear signposting on appropriate next steps where needed.' },
];

export default function Home() {
  return (
    <main>
      <OfferPopup />
      <header className="site-header">
        <a className="brand" href="#home" aria-label="Shanti Haven home">
          <Image src="/shanti-haven-logo.png" alt="" width={96} height={96} priority />
          <span><strong>Shanti Haven</strong><small>Wellness Clinic</small></span>
        </a>
        <nav aria-label="Main navigation"><a href="#services">Services</a><a href="#about">About us</a><a href="#contact">Contact us</a></nav>
        <a className="nav-cta" href="#booking">Book consultation</a>
      </header>

      <section className="hero" id="home">
        <div className="hero-copy">
          <p className="eyebrow"><span /> Manchester city centre · Open daily</p>
          <h1>Find your calm.<br/><em>Restore your balance.</em></h1>
          <p className="hero-lead">A welcoming wellness space supporting better sleep, stress management and physical wellbeing through personalised consultations and treatments.</p>
          <div className="hero-actions"><a className="button primary" href="#booking">Book your appointment</a><a className="text-link" href="#services">Explore treatments <span>↗</span></a></div>
          <div className="hero-trust"><span>7 days a week</span><span>10:00—18:00</span><span>In-clinic</span></div>
        </div>
        <div className="hero-visual">
          <div className="hero-image-wrap"><Image src="/clinic-room.jpeg" alt="A calm private consultation room at Shanti Haven" fill sizes="(max-width: 900px) 100vw, 48vw" priority /></div>
        </div>
      </section>

      <section className="welcome" id="about">
        <div className="about-panel">
          <p className="about-kicker"><span /> About us</p>
          <h2>A Gentle Approach to Better Wellbeing.</h2>
          <div></div><br></br>
          {/* <div className="about-values" aria-label="Our approach"><span><i />Personalised support</span><span><i />Calm and confidential</span><span><i />Practical wellbeing plans</span><span><i />In-clinic care</span></div> */}
          <div className="about-copy">
            <p>Welcome to Shanti Haven Wellness Clinic — a peaceful space for your mind, body and wellbeing. We believe wellbeing begins with taking time for yourself. Our aim is to provide personalised, caring and supportive services to help you feel calmer, more balanced and refreshed.</p>
            <p>From sleep and stress consultations to pressotherapy, with more wellbeing services coming soon, we are here to support you on your journey towards better wellbeing and a healthier, happier you. At Shanti Haven, your wellbeing is at the heart of everything we do.</p>
          </div>
          <a className="about-cta" href="#clinic">Discover our clinic <span>→</span></a>
        </div>
        <div className="about-image"><Image src="/consultation-offer.png" alt="A calm, supportive wellness consultation" fill sizes="(max-width: 960px) 100vw, 48vw" /></div>
      </section>

      <section className="services-section" id="services">
        <div className="section-head"><div><p className="section-kicker">Our services</p><h2>Personalised care for<br/><em>sleep, stress & recovery.</em></h2></div><div className="section-intro"><p>Explore our current consultations and treatments. Every appointment begins with listening, so your care is shaped around your needs, comfort and wellbeing.</p></div></div>
        <div className="service-card-grid" aria-label="Available treatments">
          {services.map((service) => <article className="service-showcase-card" key={service.slug}>
            <div className="service-card-heading"><p><span>{service.eyebrow}</span></p><h3>{service.title}</h3></div>
            <div className="service-card-image"><Image src={serviceImages[service.slug]} alt={`${service.title} at Shanti Haven`} fill sizes="(max-width: 760px) 92vw, (max-width: 1100px) 46vw, 30vw" /></div>
            <div className="service-card-copy"><p>{service.text}</p><div><small>{service.detail}</small><a href={service.href} aria-label={`Discover ${service.title}`}>Discover <span>→</span></a></div></div>
          </article>)}
        </div>
        <div className="services-editorial">
          <aside className="consult-feature">
            <Image src="/therapy-room.jpeg" alt="A calm consultation room at Shanti Haven" fill sizes="(max-width: 900px) 100vw, 42vw" />
            <div className="consult-feature-shade" />
            <div className="consult-feature-content"><span>Personalised · In-clinic</span><p>Make time for your wellbeing.</p><h3>Find the support<br/>that fits you.</h3><a href="#booking">Book your appointment <b>↗</b></a></div>
          </aside>
          <div className="treatment-list" aria-label="Available treatments">
            {services.map((service) => <article className="treatment-row" key={service.slug}>
              <div className="treatment-row-copy">
                <small>{service.eyebrow}</small><h3>{service.title}</h3>
                <p>{service.text}</p><p className="service-more">{service.more}</p>
                <div className="service-outcomes"><span>{service.outcomeLabel}</span><ul>{service.outcomes.map((outcome) => <li key={outcome}>{outcome}</li>)}</ul></div>
                {'closing' in service && service.closing ? <p className="service-closing">{service.closing}</p> : null}
                <b>{service.detail}</b>
              </div>
              <a href={service.href} aria-label={`Discover ${service.title}`}>↗</a>
            </article>)}
          </div>
        </div>
        <section className="upcoming-services" aria-labelledby="coming-soon-title">
          <div className="upcoming-intro"><span>Coming soon</span><h3 id="coming-soon-title">More ways to support<br/><em>your wellbeing.</em></h3><p>Thoughtfully selected services are being prepared for the next chapter of care at Shanti Haven.</p></div>
          <div className="upcoming-grid">{upcoming.map((item) => <article className="upcoming-card" key={item.title}><div className="upcoming-card-top"><span>Launching soon</span></div><p className="upcoming-tag">{item.tag}</p><h4>{item.title}</h4><p>{item.text}</p></article>)}</div>
        </section>
      </section>

      <section className="clinic-section" id="clinic">
        <div className="clinic-copy"><p className="section-kicker">A haven in Manchester</p><h2>Quiet rooms.<br/><em>Warm welcomes.</em></h2><p>Our calm, private rooms are thoughtfully arranged so you can settle in and feel at ease from the moment you arrive.</p><div className="detail-list"><div><small>Find us</small><strong>Unit 110, Gainsborough House<br/>109 Portland Street<br/>Manchester<br/>M1 6DN</strong><a className="clinic-instagram" href="https://www.instagram.com/shanti_haven?igsi=OWdva3BxeHZjc2h6&utm_source=qr" target="_blank" rel="noreferrer">Follow on Instagram <span>@shanti_haven ↗</span></a></div><div><small>Opening hours</small><strong>Monday—Sunday<br/>10:00—18:00</strong></div></div></div>
        <div className="gallery" aria-label="Shanti Haven clinic gallery"><div className="photo photo-main"><Image src="/clinic-wide.jpeg" alt="Shanti Haven consultation space" fill sizes="(max-width: 800px) 100vw, 50vw" /></div><div className="photo"><Image src="/calm-room.jpeg" alt="Private calm treatment room" fill sizes="(max-width: 800px) 100vw, 50vw" /></div></div>
        <div className="map-block">
          <div className="map-details"><p className="section-kicker">Plan your visit</p><h3>Find your way<br/>to Shanti Haven.</h3><a href="https://www.google.com/maps/search/?api=1&query=Unit%20110%2C%20Gainsborough%20House%2C%20109%20Portland%20Street%2C%20Manchester%2C%20M1%206DN" target="_blank" rel="noreferrer">Open in Google Maps <span>↗</span></a></div>
          <div className="map-frame"><iframe src="https://www.google.com/maps?q=Unit%20110%2C%20Gainsborough%20House%2C%20109%20Portland%20Street%2C%20Manchester%2C%20M1%206DN&z=16&output=embed" title="Map showing Shanti Haven Wellness Clinic at Unit 110, Gainsborough House, 109 Portland Street, Manchester, M1 6DN" loading="lazy" referrerPolicy="no-referrer-when-downgrade" /></div>
        </div>
      </section>

      <section className="booking-section" id="booking">
        <div className="booking-intro"><p className="section-kicker light">Begin with a conversation</p><h2>Make time for you.<br/><em>Book your appointment.</em></h2><p>After your booking is confirmed, we’ll email your appointment details.</p><div className="booking-points"><span><b>01</b> Choose your time</span><span><b>02</b> Tell us what you need</span><span><b>03</b> Meet us at the clinic</span></div></div>
        <BookingForm />
      </section>

      <footer id="contact"><div className="footer-brand"><Image src="/shanti-haven-logo.png" alt="Shanti Haven Wellness Clinic" width={130} height={130}/><strong className="footer-company">Shanti Haven Ltd</strong><p>Wellness · Balance · Harmony</p></div><div><small>Visit us</small><p><a href="https://www.google.com/maps/search/?api=1&query=Unit%20110%2C%20Gainsborough%20House%2C%20109%20Portland%20Street%2C%20Manchester%2C%20M1%206DN" target="_blank" rel="noreferrer">Unit 110, Gainsborough House<br/>109 Portland Street<br/>Manchester<br/>M1 6DN</a></p></div><div><small>Contact us</small><p><a className="footer-contact-link" href="#booking"><b>Book an appointment</b></a><a className="footer-contact-link" href="tel:+447940503546"><b>Call now:</b> 07940 503546</a><a className="footer-contact-link" href="mailto:info@shantihaven.co.uk"><b>Email us:</b> info@shantihaven.co.uk</a><a className="footer-instagram" href="https://www.instagram.com/shanti_haven?igsi=OWdva3BxeHZjc2h6&utm_source=qr" target="_blank" rel="noreferrer"><b>Instagram:</b> @shanti_haven ↗</a></p></div><div><small>Hours</small><p>Monday—Sunday<br/>10:00—18:00</p></div><div className="footer-bottom"><p>Powered by <a href="https://neuraxai.co.uk/" target="_blank" rel="noreferrer"><strong>NeuraxAI</strong></a></p></div></footer>
      <a className="whatsapp-float" href="https://wa.me/447940503546?text=Hello%20Shanti%20Haven%2C%20I%27d%20like%20to%20ask%20about%20your%20services." target="_blank" rel="noreferrer" aria-label="Chat with Shanti Haven on WhatsApp">
        <span className="whatsapp-icon" aria-hidden="true"><svg viewBox="0 0 24 24" role="img"><path fill="currentColor" d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.64-2.04-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.63.71.23 1.36.19 1.87.12.57-.08 1.76-.72 2.01-1.41.25-.7.25-1.3.17-1.42-.07-.13-.27-.2-.57-.35M12.04 21.5h-.01a9.47 9.47 0 0 1-4.83-1.32l-.35-.21-3.59.94.96-3.5-.23-.36a9.46 9.46 0 1 1 8.05 4.45m8.06-17.56A11.33 11.33 0 0 0 12.05.6C5.78.6.68 5.7.68 11.97c0 2 .52 3.95 1.51 5.66L.58 23.5l6.01-1.58a11.36 11.36 0 0 0 5.46 1.39h.01c6.27 0 11.37-5.1 11.37-11.37 0-3.04-1.18-5.9-3.33-8"/></svg></span><span className="whatsapp-label"><small>Need help?</small><strong>Chat on WhatsApp</strong></span>
      </a>
    </main>
  );
}
