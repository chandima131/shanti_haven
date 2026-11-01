import type { Metadata } from 'next';
import WellbeingPricing from '../components/WellbeingPricing';
import Image from 'next/image';
import Link from 'next/link';

import { PressotherapyHeader } from '../pressotherapy/PressotherapyChrome';
import styles from './SleepPage.module.css';

export const metadata: Metadata = {
  title: 'Sleep Consultation in Manchester | Shanti Haven',
  description: 'Private, unhurried sleep wellbeing consultations with practical, personalised routine support and clear pricing at Shanti Haven in Manchester.',
  alternates: { canonical: '/sleep' },
};

const topics = [
  ['Your natural pattern', 'Bedtime, waking time, night waking, naps and how rested you feel.'],
  ['Light & screens', 'Morning daylight, evening lighting and technology close to bedtime.'],
  ['Food & caffeine', 'The timing of caffeine, alcohol, heavy meals and hydration.'],
  ['Body & environment', 'Movement, comfort, noise, room temperature and your wind-down space.'],
  ['Thoughts & stress', 'Racing thoughts, worry, unfinished tasks and difficulty switching off.'],
  ['A realistic plan', 'Two or three achievable steps, followed by a review of what actually helped.'],
];
const steps = [
  ['Before', 'Complete a short sleep and wellbeing questionnaire.'],
  ['During', 'Talk through patterns, routines, pressures and goals without judgement.'],
  ['Plan', 'Leave with simple, personalised steps and a sleep diary if useful.'],
  ['Review', 'See what changed, remove what was unrealistic and refine your routine.'],
];
const signs = ['Loud snoring with pauses, choking or gasping', 'Severe daytime sleepiness or falling asleep unexpectedly', 'Persistent insomnia affecting daily life', 'Unusual movements, behaviours or injuries during sleep', 'Restless or uncomfortable legs that regularly prevent sleep', 'A sudden or unexplained change in sleep'];

export default function SleepPage() {
  return <>
    <PressotherapyHeader />
    <main id="main-content" className={`${styles.page} ${styles.wellbeingPage}`}>
      <section className={styles.hero} aria-labelledby="sleep-title">
        <div className={styles.heroCopy}>
          <Link className={styles.back} href="/#services">← All services</Link>
          <p className={styles.kicker}>Sleep wellbeing</p>
          <h1 id="sleep-title">Better rest starts with<br/><em>understanding your rhythm.</em></h1>
          <p>A private, unhurried consultation to explore what may be getting in the way of rest—and create manageable changes that fit your real life.</p>
          <Link className={styles.button} href="/#booking">Book sleep support <span aria-hidden="true">↗</span></Link>
        </div>
        <div className={styles.heroImage}><Image src="/service-sleep-consultation.png" alt="A calm setting for a personal sleep wellbeing consultation" fill sizes="(max-width: 800px) 100vw, 43vw" priority /></div>
      </section>
      <section className={`${styles.section} ${styles.overviewSection}`} aria-labelledby="why-title">
        <div className={styles.split}>
          <div><p className={styles.kicker}>Why sleep matters</p><h2 id="why-title">Rest supports the<br/><em>whole day ahead.</em></h2></div>
          <div><p>Sleep gives the body and mind regular time to recover. It supports concentration, mood, energy, appetite regulation and the ability to cope with daily demands. A difficult night is normal from time to time; the concern is when poor sleep becomes a pattern and begins to affect how you function.</p><p>Common difficulties include taking a long time to fall asleep, waking repeatedly, waking too early, an irregular schedule or feeling unrefreshed despite enough time in bed.</p><aside className={styles.note}><h3>You do not need a “perfect” routine</h3><p>Small, repeatable changes are usually more useful than a strict list of rules. We help you identify the few adjustments most relevant to you.</p></aside></div>
        </div>
      </section>
      {/* <section className={`${styles.section} ${styles.tint}`} aria-labelledby="explore-title">
        <p className={styles.kicker}>What we explore together</p><h2 id="explore-title">Your sleep has<br/><em>a wider story.</em></h2>
        <div className={styles.topics}>{topics.map(([title, text], index) => <article key={title}><span className={styles.number}>0{index + 1}</span><h3>{title}</h3><p>{text}</p></article>)}</div>
      </section> */}
      <section className={`${styles.section} ${styles.consultationSection}`} aria-labelledby="consultation-title">
        <p className={styles.kicker}>Your consultation</p><h2 id="consultation-title">Listen. Understand.<br/><em>Adjust gently.</em></h2>
        <ol className={styles.steps} role="list">{steps.map(([title, text]) => <li key={title}><h3>{title}</h3><p>{text}</p></li>)}</ol>
      </section>
      {/* <section className={`${styles.section} ${styles.boundaries}`} aria-labelledby="boundaries-title">
        <div className={styles.split}><div><p className={styles.kicker}>Knowing when to seek medical help</p><h2 id="boundaries-title">Wellbeing support<br/><em>has clear boundaries.</em></h2><p>Our consultations offer education and practical routine support. They do not diagnose sleep disorders, provide CBT-I, prescribe medication or replace a GP or sleep specialist.</p></div><div><h3>Please speak with your GP if you experience:</h3><ul>{signs.map(sign => <li key={sign}>{sign}</li>)}</ul></div></div>
      </section> */}
      <section className={`${styles.section} ${styles.pricingSection}`} id="pricing" aria-labelledby="pricing-title">
        <p className={styles.kicker}>Personalised care. Clear pricing.</p><h2 id="pricing-title">Sleep Wellbeing Packages</h2>
        <WellbeingPricing service="Sleep" />
      </section>
    </main>
  </>;
}
