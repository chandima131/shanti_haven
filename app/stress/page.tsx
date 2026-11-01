import type { Metadata } from 'next';
import WellbeingPricing from '../components/WellbeingPricing';
import Image from 'next/image';
import Link from 'next/link';

import { PressotherapyHeader } from '../pressotherapy/PressotherapyChrome';
import styles from '../sleep/SleepPage.module.css';
import stressStyles from './StressPage.module.css';

export const metadata: Metadata = {
  title: 'Stress Consultation in Manchester | Shanti Haven',
  description: 'Private stress wellbeing consultations in Manchester. Understand everyday pressures, recognise early signs and build practical routines with personalised support.',
  alternates: { canonical: '/stress' },
};

const topics = [
  ['Spot the pattern', 'Identify situations, thoughts and habits that tend to increase pressure.'],
  ['Notice early signs', 'Recognise physical, emotional and behavioural signals before overload.'],
  ['Create pause points', 'Use brief breathing, grounding or movement breaks within your existing day.'],
  ['Protect recovery', 'Plan rest, sleep routines and enjoyable activities without guilt.'],
  ['Set kinder boundaries', 'Explore priorities, saying no and reducing avoidable demands.'],
  ['Make it workable', 'Choose a few steps you can repeat—not a complicated programme.'],
];
const steps = [
  ['Understand', 'Talk through current pressures and the effect on daily life.'],
  ['Prioritise', 'Choose the one or two areas where change would help most.'],
  ['Practise', 'Try simple techniques together and adapt them to you.'],
  ['Review', 'Notice what helped and decide on the next manageable step.'],
];

export default function StressPage() {
  return <>
    <PressotherapyHeader />
    <main id="main-content" className={`${styles.page} ${styles.wellbeingPage}`}>
      <section className={styles.hero} aria-labelledby="stress-title">
        <div className={styles.heroCopy}>
          <Link className={styles.back} href="/#services">← All services</Link>
          <p className={styles.kicker}>Stress wellbeing</p>
          <h1 id="stress-title">Make space between<br/><em>pressure and response.</em></h1>
          <p>A supportive conversation to understand everyday stress, notice your early signs and choose practical ways to steady your routine.</p>
          <Link className={styles.button} href="/#booking">Book stress support <span aria-hidden="true">↗</span></Link>
        </div>
        <div className={styles.heroImage}><Image src="/service-stress-consultation.png" alt="A supportive wellbeing consultation at Shanti Haven" fill sizes="(max-width: 800px) 100vw, 43vw" priority /></div>
      </section>

      <section className={`${styles.section} ${styles.overviewSection}`} aria-labelledby="understanding-title">
        <div className={styles.split}>
          <div><p className={styles.kicker}>Understanding stress</p><h2 id="understanding-title">A normal response<br/><em>that can become too much.</em></h2></div>
          <div><p>Stress is the body&apos;s response to demand or pressure. In short bursts it can help us focus and act. When pressure continues without enough recovery, it can leave us feeling mentally busy, irritable, tense, tired or disconnected from normal routines.</p><p>People experience stress differently. You may notice tight muscles, a racing mind, changes in sleep or appetite, difficulty concentrating, procrastination or feeling that even small tasks are too much.</p><aside className={styles.note}><h3>The goal is not “never feel stressed”</h3><p>We focus on recognising your pattern earlier and building a practical response before pressure takes over the day.</p></aside></div>
        </div>
      </section>

      {/* <section className={`${styles.section} ${styles.tint}`} aria-labelledby="tools-title">
        <p className={styles.kicker}>What we work on</p><h2 id="tools-title">Small tools for<br/><em>real situations.</em></h2>
        <div className={styles.topics}>{topics.map(([title, text], index) => <article key={title}><span className={styles.number}>0{index + 1}</span><h3>{title}</h3><p>{text}</p></article>)}</div>
      </section> */}

      <section className={`${styles.section} ${styles.consultationSection}`} aria-labelledby="consultation-title">
        <p className={styles.kicker}>Your consultation</p><h2 id="consultation-title">A private place<br/><em>to take stock.</em></h2>
        <ol className={styles.steps} role="list">{steps.map(([title, text]) => <li key={title}><h3>{title}</h3><p>{text}</p></li>)}</ol>
      </section>

      {/* <section className={`${styles.section} ${styles.boundaries}`} aria-labelledby="boundaries-title">
        <div className={styles.split}>
          <div><p className={styles.kicker}>The right support matters</p><h2 id="boundaries-title">We know the limits<br/><em>of our service.</em></h2><p>This is wellbeing education, not counselling, psychotherapy, diagnosis or treatment for anxiety, depression, trauma or another mental-health condition. We will encourage you to speak to your GP or an appropriate professional when your needs fall outside our scope.</p></div>
          <aside className={stressStyles.support} aria-labelledby="urgent-title"><h3 id="urgent-title">When you need urgent support</h3><p>If you feel unable to keep yourself or someone else safe, call <a href="tel:999">999</a> or go to A&amp;E.</p><p>For urgent mental-health support in England, call <a href="tel:111">NHS 111</a> and select the mental-health option.</p><p>Samaritans can be reached free on <a href="tel:116123?oai_link_source=model_response_hotline">116 123</a>.</p><a className={stressStyles.source} href="https://www.nhs.uk/nhs-services/mental-health-services/where-to-get-urgent-help-for-mental-health/" target="_blank" rel="noreferrer">NHS urgent mental-health guidance ↗</a></aside>
        </div>
      </section> */}

      <section className={`${styles.section} ${styles.pricingSection}`} id="pricing" aria-labelledby="pricing-title">
        <p className={styles.kicker}>Personalised care. Clear pricing.</p><h2 id="pricing-title">Stress Wellbeing Packages</h2>
        <WellbeingPricing service="Stress" />
      </section>

    </main>
  </>;
}
