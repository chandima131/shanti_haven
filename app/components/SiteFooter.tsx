import Image from 'next/image';
import Link from 'next/link';
import CurrentYear from './CurrentYear';

export default function SiteFooter() {
  const year = Number(new Intl.DateTimeFormat('en-GB', {
    year: 'numeric',
    timeZone: 'Europe/London',
  }).format(new Date()));

  return (
    <footer className="site-footer" id="contact">
      <div className="footer-brand">
        <Image src="/shanti-haven-logo.png" alt="Shanti Haven Wellness Clinic" width={130} height={130} />
        <strong className="footer-company">Shanti Haven Ltd</strong>
        <p>Wellness · Balance · Harmony</p>
      </div>
      <div>
        <small>Visit us</small>
        <p><a href="https://www.google.com/maps/search/?api=1&query=Unit%20110%2C%20Gainsborough%20House%2C%20109%20Portland%20Street%2C%20Manchester%2C%20M1%206DN" target="_blank" rel="noreferrer">Unit 110, Gainsborough House<br />109 Portland Street<br />Manchester<br />M1 6DN</a></p>
      </div>
      <div>
        <small>Contact us</small>
        <p>
          <Link className="footer-contact-link" href="/#booking"><b>Book an appointment</b></Link>
          <a className="footer-contact-link" href="tel:+447940503546"><b>Call now:</b> 07940 503546</a>
          <a className="footer-contact-link" href="mailto:info@shantihaven.co.uk"><b>Email us:</b> info@shantihaven.co.uk</a>
          <a className="footer-instagram" href="https://www.instagram.com/shanti_haven?igsi=OWdva3BxeHZjc2h6&utm_source=qr" target="_blank" rel="noreferrer"><b>Instagram:</b> @shanti_haven ↗</a>
        </p>
      </div>
      <div>
        <small>Hours</small>
        <p>Monday—Sunday<br />10:00—18:00</p>
      </div>
      <div className="footer-bottom">
        <p>© <CurrentYear initialYear={year} /> Shanti Haven Ltd. All rights reserved.</p>
        <p>Powered by <a href="https://neuraxai.co.uk/" target="_blank" rel="noreferrer"><strong>NeuraxAI</strong></a></p>
      </div>
    </footer>
  );
}
