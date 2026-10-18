import Image from 'next/image';
import Link from 'next/link';
import styles from './PressotherapyPage.module.css';

export function PressotherapyHeader() {
  return (
    <header className={styles.clinicHeader}>
      <Link className={styles.clinicBrand} href="/" aria-label="Shanti Haven home">
        <Image src="/shanti-haven-logo.png" alt="" width={82} height={82} priority />
        <span><strong>Shanti Haven</strong><small>Wellness Clinic</small></span>
      </Link>
      <nav className={styles.clinicNav} aria-label="Main navigation">
        <Link href="/#services">Services</Link>
        <Link href="/#about">About us</Link>
        <a href="#pricing">Pricing</a>
      </nav>
      <Link className={styles.clinicBook} href="/#booking">Book now</Link>
    </header>
  );
}

export function PressotherapyFooter() {
  return (
    <footer className={styles.clinicFooter} id="contact">
      <div className={styles.clinicFooterGrid}>
        <div><Link className={styles.clinicBrand} href="/"><Image src="/shanti-haven-logo.png" alt="" width={60} height={60}/><span>Shanti Haven<small>Wellness Clinic</small></span></Link><p>Wellness · Balance · Harmony</p></div>
        <div><h3>Visit us</h3><p>Unit 110, 109 Portland St<br/>Manchester M1 6DN</p><a href="https://maps.app.goo.gl/aJ7hYaKdos5GRLio7" target="_blank" rel="noreferrer">Find us on Google Maps ↗</a></div>
        <div><h3>Contact us</h3><a href="tel:+447940503546">07940 503546</a><a href="mailto:info@shantihaven.co.uk">info@shantihaven.co.uk</a><a href="https://wa.me/447940503546">Chat on WhatsApp ↗</a><a href="https://www.instagram.com/shanti_haven" target="_blank" rel="noreferrer">Instagram · @shanti_haven ↗</a></div>
        <div><h3>Opening hours</h3><p>Monday–Sunday<br/>10:00–18:00</p><Link href="/">Home</Link><Link href="/#booking">Book a consultation</Link></div>
      </div>
      <div className={styles.clinicFooterBase}><p>Wellbeing support only. We do not diagnose medical conditions or replace care from your healthcare professional. Treatments are subject to suitability.</p><span>© {new Date().getFullYear()} Shanti Haven Ltd</span><a href="https://neuraxai.co.uk/">Powered by NeuraxAI</a></div>
    </footer>
  );
}
