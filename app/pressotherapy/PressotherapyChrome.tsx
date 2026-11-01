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
