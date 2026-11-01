import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import type { CSSProperties } from 'react';
import { PressotherapyFaq } from './PressotherapyFaq';
import { PressotherapyMotion } from './PressotherapyMotion';
import { PressotherapySubnav } from './PressotherapySubnav';
import styles from './PressotherapyPage.module.css';
import { PressotherapyHeader } from './PressotherapyChrome';

export const metadata: Metadata = {
  title: 'Pressotherapy in Manchester | Shanti Haven Wellness Clinic',
  description: 'Discover personalised pressotherapy at Shanti Haven in Manchester: what to expect, treatment options, suitability information and clear pricing.',
  alternates: { canonical: '/pressotherapy' },
};

const navItems = [
  { id: 'basics', label: 'The basics' },
  { id: 'how-it-works', label: 'How it works' },
  { id: 'lymphatic-system', label: 'Lymphatic system' },
  { id: 'benefits', label: 'Benefits' },
  { id: 'experience', label: 'Your experience' },
  { id: 'results', label: 'Results' },
  { id: 'safety', label: 'Safety' },
  { id: 'faqs', label: 'FAQs' },
  { id: 'pricing', label: 'Pricing' },
];

const benefits = [
  { icon: 'legs', label: 'Everyday comfort', title: 'Tired, heavy-feeling legs', text: 'A gentle wellbeing option for long days when your legs feel ready for rest.', audience: 'Standing · Sitting · Busy working days' },
  { icon: 'movement', label: 'Active routines', title: 'Post-exercise relaxation', text: 'A calming addition to a sensible recovery and wellbeing routine for active lifestyles.', audience: 'Runners · Gym-goers · Dancers' },
  { icon: 'flow', label: 'Gentle rhythm', title: 'Support for fluid movement', text: 'Sequential compression may support temporary fluid movement in suitable individuals.', audience: 'Personalised after suitability screening' },
  { icon: 'calm', label: 'Time for you', title: 'A moment to unwind', text: 'Lie back, switch off and enjoy the steady rhythm of compression and release.', audience: 'Work · Family · Everyday life' },
];

const stages = [
  { number: '01', title: 'Inflate', text: 'Air chambers fill in a controlled sequence.' },
  { number: '02', title: 'Compress', text: 'Comfortable pressure moves gently through the garment.' },
  { number: '03', title: 'Release', text: 'Each chamber softens before the rhythm continues.' },
  { number: '04', title: 'Repeat', text: 'The selected programme repeats at your comfort level.' },
];

const journey = [
  { number: '01', eyebrow: 'Consultation', title: 'Let’s talk', text: 'We begin with a brief conversation about your health, what brings you to Shanti Haven and how you feel that day.' },
  { number: '02', eyebrow: 'Get comfortable', title: 'Settle in', text: 'We position you comfortably and fit the appropriate garments over your clothing.' },
  { number: '03', eyebrow: 'Simply relax', title: 'Feel the rhythm', text: 'Lie back as the chambers gently inflate and release. Nothing to do. Nowhere to rush.' },
];

const faqs = [
  ['Does pressotherapy hurt?', 'It should feel like gentle, rhythmic squeezing rather than pain. Pressure is selected for your comfort and can be adjusted or stopped at any time.'],
  ['What should I wear?', 'Choose clean, thin and comfortable clothing with socks beneath the garments. Jewellery should be removed from the treatment area.'],
  ['Which areas can be treated?', 'Depending on your suitability and goals, garments may be used on the legs, waist or arms. We will agree the treatment area with you before the session.'],
  ['How long does treatment take?', 'Each appointment includes individual suitability screening and a personalised 45-minute pressotherapy treatment.'],
  ['How often can I have pressotherapy?', 'Frequency is agreed individually according to your goals, comfort, suitability and response.'],
  ['Can I have it after exercise?', 'Suitable clients may choose pressotherapy as a calming addition to their normal post-exercise wellness routine.'],
  ['Is pressotherapy a weight-loss treatment?', 'No. Pressotherapy is offered as a wellbeing treatment rather than a weight-loss treatment. Individual experiences and results are vary.'],
  ['Is it the same as manual lymphatic drainage?', 'No. Pressotherapy uses programmed air compression, while manual lymphatic drainage is a specialist hands-on technique. One should not be presented as a replacement for the other.'],
] as const;



function BenefitIcon({ type }: { type: string }) {
  if (type === 'movement') return <svg viewBox="0 0 32 32" aria-hidden="true"><path d="M7 22c5-1 8-5 9-12m-4 5 4-5 4 4M12 26c5 0 9-2 13-7"/></svg>;
  if (type === 'flow') return <svg viewBox="0 0 32 32" aria-hidden="true"><path d="M16 5c4 5 7 8 7 13a7 7 0 0 1-14 0c0-5 3-8 7-13Z"/><path d="M12 19c1 2 2 3 5 3"/></svg>;
  if (type === 'calm') return <svg viewBox="0 0 32 32" aria-hidden="true"><path d="M16 25c7-4 10-9 9-16-6 0-10 3-11 9-1-4-3-6-7-7-1 7 3 12 9 14Z"/><path d="M16 25V14"/></svg>;
  return <svg viewBox="0 0 32 32" aria-hidden="true"><path d="M12 5v10l-3 10h6l1-8 1 8h6l-3-10V5"/><path d="M12 13h8"/></svg>;
}

function HighlightIcon({ type }: { type: 'rhythm' | 'comfort' | 'relaxation' }) {
  if (type === 'comfort') return <svg viewBox="0 0 32 32" aria-hidden="true"><path d="M7 9h18M7 16h18M7 23h18"/><circle cx="12" cy="9" r="2.5"/><circle cx="21" cy="16" r="2.5"/><circle cx="15" cy="23" r="2.5"/></svg>;
  if (type === 'relaxation') return <svg viewBox="0 0 32 32" aria-hidden="true"><path d="M7 20c4-6 8-8 18-9-1 9-6 14-14 14"/><path d="M10 25c3-5 7-8 12-11"/></svg>;
  return <svg viewBox="0 0 32 32" aria-hidden="true"><path d="M5 10c3 0 3 3 6 3s3-3 6-3 3 3 6 3 3-3 4-3M5 19c3 0 3 3 6 3s3-3 6-3 3 3 6 3 3-3 4-3"/></svg>;
}

function JourneyIcon({ step }: { step: string }) {
  return <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    {step === '01' ? <path d="M20 11.5a8 8 0 0 1-8 8H8l-5 2 1.5-5A8 8 0 1 1 20 11.5ZM8 10h8M8 14h5"/> : step === '02' ? <><path d="M6 12V7a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v5M5 11a2 2 0 0 1 2 2v2h10v-2a2 2 0 0 1 4 0v5H3v-5a2 2 0 0 1 2-2ZM5 18v3M19 18v3"/></> : <><path d="M5 16c3-5 7-7 14-8-.7 7-4.5 11-11 11M7 19c2.5-4 5.5-6.7 9.5-9"/></>}
  </svg>;
}

function HeroHighlightIcon({ type }: { type: 'gentle' | 'personalised' | 'calm' }) {
  if (type === 'personalised') return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/><circle cx="9" cy="7" r="1.8"/><circle cx="15" cy="12" r="1.8"/><circle cx="11" cy="17" r="1.8"/></svg>;
  if (type === 'calm') return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 16c3-5 7-7 14-8-.7 7-4.5 11-11 11"/><path d="M7 19c2.5-4 5.5-6.7 9.5-9"/></svg>;
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3.5c2 2.2 4.7 3.1 7 3.5v4.7c0 4.3-2.8 7.3-7 8.8-4.2-1.5-7-4.5-7-8.8V7c2.3-.4 5-1.3 7-3.5Z"/><path d="m8.8 12 2 2 4.5-4.5"/></svg>;
}

export default function PressotherapyPage() {
  return (
    <main id="main-content" className={styles.page}>
      <PressotherapyMotion />
      <PressotherapyHeader />
      <section className={styles.hero} aria-labelledby="pressotherapy-title">
        <Image className={styles.heroImage} src="/pressotherapy-hero.jpg" alt="A client receiving a full pressotherapy treatment with compression garments" fill sizes="100vw" priority />
        <div className={styles.heroShade}/>
        <div className={styles.heroContent}>
          <div className={styles.heroCopy}>
            <Link className={styles.backLink} href="/#services">← All services</Link>
            <p className={styles.eyebrow}>Pressotherapy at Shanti Haven</p>
            <h1 id="pressotherapy-title">Feel lighter.<br/><em>Find your calm.</em></h1>
            <p className={styles.heroLead}>Discover a gentle, personalised compression experience designed to help you relax, unwind and enjoy a moment that&apos;s entirely yours.</p>
            <div className={styles.heroActions}><Link className={styles.primaryButton} href="/#booking">Book your session</Link><a className={styles.secondaryLink} href="#basics">Explore the treatment <span>↓</span></a></div>
            <div className={styles.trustRow} aria-label="Treatment highlights">
              <div className={styles.trustItem}><span className={styles.trustIcon}><HeroHighlightIcon type="gentle"/></span><strong>Non-invasive treatment</strong></div>
              <div className={styles.trustItem}><span className={styles.trustIcon}><HeroHighlightIcon type="personalised"/></span><strong>Personalised comfort</strong></div>
              <div className={styles.trustItem}><span className={styles.trustIcon}><HeroHighlightIcon type="calm"/></span><strong>Relaxing experience</strong></div>
            </div>
          </div>
        </div>
      </section>

      <PressotherapySubnav items={navItems} />

      <section className={styles.basics} id="basics" aria-labelledby="basics-title">
        <div className={styles.shell}>
          <div className={styles.basicsGrid}>
            <div className={`${styles.editorialCopy} ${styles.reveal}`} data-reveal><h2 id="basics-title">What is Pressotherapy?</h2><p>Pressotherapy uses soft inflatable garments and controlled sequential air compression to create a gentle, wave-like massage across selected areas of the body.</p><p>Each session is shaped around your comfort, treatment area and suitability. You remain fully clothed beneath the garments and simply relax while the programme runs.</p><div className={styles.highlights}><div className={styles.highlightItem}><span><HighlightIcon type="rhythm"/></span><strong>Rhythmic compression</strong></div><div className={styles.highlightItem}><span><HighlightIcon type="comfort"/></span><strong>Adjustable comfort</strong></div><div className={styles.highlightItem}><span><HighlightIcon type="relaxation"/></span><strong>Relaxation focused</strong></div></div></div>
            <figure className={`${styles.basicsImage} ${styles.reveal}`} data-reveal><Image src="/pressotherapy-fitting.jpg" alt="A practitioner carefully fitting pressotherapy garments" fill sizes="(max-width: 820px) 100vw, 52vw" /><figcaption>Comfortable garments are fitted over clean, light clothing.</figcaption></figure>
          </div>
        </div>
      </section>

      <section className={styles.process} id="how-it-works" aria-labelledby="process-title"><div className={styles.shell}>
        <div className={styles.processIntro}><div className={`${styles.processCopy} ${styles.reveal}`} data-reveal><h2 id="process-title">How it works</h2><p>Soft compression garments are comfortably fitted over your clothing on the legs, waist or arms. Air chambers gently inflate and release in sequence, creating a smooth, wave-like pressure that moves from one area to the next.</p>

<p>At Shanti Haven, we use the Zemits Sisley 2.0, a 24-channel dynamic air compression system with four pressure levels and six manufacturer programmes. Your treatment area, pressure, rhythm and session duration are selected for your comfort while you relax in a reclined position.</p>

<p>Your comfort comes first. Pressure can be adjusted at any time, and the treatment should always feel comfortable—never painful.</p></div>
        <div className={styles.processMedia}>
          <figure className={`${styles.processImage} ${styles.reveal}`} data-reveal><Image src="/pressotherapy-system.jpg" alt="The Zemits Sisley 2.0 pressotherapy system being adjusted" fill sizes="(max-width: 820px) 100vw, 44vw" /></figure>
        <div className={styles.treatmentVideo}>
          <iframe
            src="https://www.youtube-nocookie.com/embed/Lr5M4NbtK2I"
            title="Watch how pressotherapy works"
            width={1280}
            height={720}
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>
        </div></div>
        <div className={`${styles.stageSequence} ${styles.reveal}`} data-reveal aria-label="Four stages of the pressotherapy sequence">{stages.map((stage, index) => <article className={styles.stage} key={stage.title}><div className={styles.stageSignal} aria-hidden="true">{[0,1,2,3].map((item) => <i className={item <= index ? styles.signalActive : ''} key={item}/>)}</div><h3>{stage.title}</h3><p>{stage.text}</p></article>)}</div>
      </div></section>

      <section className={styles.lymphaticSection} id="lymphatic-system" aria-labelledby="lymphatic-title">
        <div className={`${styles.shell} ${styles.lymphaticGrid}`}>
          <figure className={styles.lymphaticFigure}>
            <a href="/lymphatic-system.png" target="_blank" rel="noreferrer" aria-label="Open the full lymphatic system illustration">
              <Image src="/lymphatic-system.png" alt="Labelled human lymphatic system showing the tonsil, thymus gland, spleen, lymph nodes and lymphatic vessels" width={317} height={578} sizes="(max-width: 820px) 85vw, 317px" />
            </a>
            <figcaption>Human lymphatic system</figcaption>
          </figure>
          <div className={styles.lymphaticCopy}>
            <p className={styles.sectionLabel}>Know your body</p>
            <h2 id="lymphatic-title">Understanding your<br/><em>lymphatic system.</em></h2>
            <p>The lymphatic system is a network of vessels, lymph nodes and organs. It helps maintain fluid balance by collecting excess fluid from the tissues and returning it to the bloodstream, and supports the body’s immune defences.</p>
            <h3>Why is it important?</h3>
            <p>Lymph nodes filter lymph and contain immune cells that help respond to infection. Other lymphatic organs support immune function, while specialised vessels in the intestine absorb and transport dietary fats.</p>
            <h3>How does lymph move?</h3>
            <p>Unlike blood circulation, the lymphatic system has no central pump like the heart. Movement, breathing and contractions in lymphatic vessel walls help move lymph through the body.</p>
            <h3>Where pressotherapy fits</h3>
            <p>Pressotherapy uses garments that inflate and release in sequence. At Shanti Haven, it is offered as a personalised wellbeing experience, with pressure and treatment areas selected following suitability screening.</p>
          </div>
        </div>
      </section>

      <section className={styles.benefits} id="benefits" aria-labelledby="benefits-title"><div className={styles.shell}>
        <div className={`${styles.sectionHeading} ${styles.reveal}`} data-reveal>
          <div>
            <p className={styles.sectionLabel}>Why people choose it</p>
            <h2 id="benefits-title" className={styles.benefitsTitle}>A little lighter.<br/>A little more at ease.</h2>
          </div>
          <p>Standing, sitting, training or simply a busy day. Make space for a calming treatment, shaped around your comfort.</p>
        </div>
        <div className={styles.benefitGrid}>{benefits.map((benefit, index) => <article className={`${styles.benefitCard} ${styles.reveal}`} data-reveal style={{'--delay': `${index * 90}ms`} as CSSProperties} key={benefit.title}><div className={styles.benefitIcon}><BenefitIcon type={benefit.icon}/></div><div><span>{benefit.label}</span><h3>{benefit.title}</h3><p>{benefit.text}</p><small>{benefit.audience}</small></div></article>)}</div>
      </div></section>

      <section className={styles.experience} id="experience" aria-labelledby="experience-title"><div className={styles.shell}><div className={styles.experienceGrid}>
        <figure className={`${styles.experienceImage} ${styles.reveal}`} data-reveal><Image src="/pressotherapy-garment.jpg" alt="A practitioner preparing pressotherapy garments for a comfortable session" fill sizes="(max-width: 820px) 100vw, 45vw" /><figcaption className={styles.experienceCaption}><span>Thoughtfully prepared</span>Personal settings. Your comfort first.</figcaption></figure>
        <div className={`${styles.experiencePanel} ${styles.reveal}`} data-reveal><p className={styles.sectionLabel}>Your Shanti Haven experience</p><h2 id="experience-title" className={styles.experienceTitle}>Arrive. Settle.<br/>Simply unwind.</h2><p className={styles.experienceIntro}>A little time for yourself, with guidance at every step.</p><div className={styles.journey}>{journey.map((step) => <article key={step.number}><span><JourneyIcon step={step.number}/></span><div><small>{step.eyebrow}</small><h3>{step.title}</h3><p>{step.text}</p></div></article>)}</div><details className={styles.preparationDetails}><summary><span className={styles.preparationLabel}>Before you arrive<small>A few simple ways to prepare for your visit</small></span><span aria-hidden="true">+</span></summary><ul><li><b>Hydration</b> Drink as you normally would; there is no need to over-hydrate.</li><li><b>Clothing</b> Wear clean, thin, loose, comfortable clothing and socks beneath the garments.</li><li><b>Jewellery</b> Remove jewellery from the treatment area.</li><li><b>Health information</b> Tell us about relevant conditions, medication, implants or recent procedures.</li></ul></details></div>
      </div></div></section>

      <section className={styles.results} id="results" aria-labelledby="results-title"><div className={styles.shell}>
        <div className={`${styles.resultsHeading} ${styles.reveal}`} data-reveal><h2 id="results-title">RESULTS</h2></div>
        <div className={styles.resultsGrid}>{['01','02','03'].map((item, index) => <figure className={`${styles.resultCard} ${styles.reveal}`} data-reveal style={{'--delay': `${index * 100}ms`} as CSSProperties} key={item}><div><Image src={`/pressotherapy-result-${item}.jpg`} alt={`Manufacturer-supplied pressotherapy example ${item}: before on the left and after on the right`} fill sizes="(max-width: 760px) 92vw, 31vw" /><div className={styles.comparisonTags}><span>Before</span><span>After</span></div></div><figcaption><span>Example {item}</span></figcaption></figure>)}</div>
        <div className={styles.resultsDisclaimer}><strong>Important context</strong><p><b>Individual experiences vary. Lighting, posture, clothing and normal fluid variation can influence appearance. Temporary measurement changes should not be confused with fat loss.</b></p></div>
        <aside className={`${styles.safetyPanel} ${styles.reveal}`} data-reveal id="safety" aria-labelledby="safety-title"><div><p className={`${styles.sectionLabel} ${styles.labelLight}`}>Safety & suitability</p><h2 id="safety-title">Your comfort and wellbeing<br/><em>come first.</em></h2></div><div><p>Pressotherapy is gentle, but it is not suitable for everyone. A brief suitability assessment helps us make sure your treatment is appropriate, comfortable and tailored to you.</p><p>Please share relevant health conditions, medication, implants, pregnancy or recent procedures before treatment.</p></div></aside>
      </div></section>

      <section className={styles.faqSection} id="faqs" aria-labelledby="faq-title"><div className={`${styles.shell} ${styles.faqGrid}`}><div className={`${styles.faqIntro} ${styles.reveal}`} data-reveal><h2 id="faq-title">Questions before<br/><em>you begin.</em></h2><p>Clear, practical information before your first pressotherapy experience.</p><a href="https://wa.me/447940503546?text=Hello%20Shanti%20Haven%2C%20I%20have%20a%20question%20about%20pressotherapy." target="_blank" rel="noreferrer">Ask us a question <span>↗</span></a></div><PressotherapyFaq items={faqs} /></div></section>

      <section className={styles.pricing} id="pricing" aria-labelledby="pricing-title">
        <div className={styles.shell}>
          <div className={styles.tableHeading}>
            <p className={styles.sectionLabel}>Personalised care. Clear pricing.</p>
            <h2 id="pricing-title">Pressotherapy Packages</h2>
            <p>Each appointment includes individual suitability screening and a personalised 45-minute pressotherapy treatment.</p>
          </div>
          <div className={styles.tableScroll} role="region" aria-label="Pressotherapy packages and prices" tabIndex={0}>
            <table className={styles.pricingTable}>
              <caption className={styles.visuallyHidden}>Pressotherapy packages, inclusions and prices</caption>
              <thead><tr><th scope="col">Package</th><th scope="col">What Is Included</th><th scope="col">Price</th></tr></thead>
              <tbody>
                <tr><th scope="row">Pressotherapy Experience</th><td>Suitability consultation and one personalised 45-minute treatment</td><td>&pound;60</td></tr>
                <tr><th scope="row">10 Session Pressotherapy Course</th><td>Ten personalised 45-minute treatments</td><td>&pound;540</td></tr>
                <tr><th scope="row">15 Session Pressotherapy Course</th><td>Fifteen personalised 45-minute treatments</td><td>&pound;765</td></tr>
                <tr><th scope="row">Monthly Maintenance</th><td>Two 45-minute pressotherapy sessions each month following completion of a course</td><td>&pound;108 <span>monthly</span></td></tr>
              </tbody>
            </table>
          </div>
          <div className={styles.tableBooking}>
            <Link className={styles.primaryButton} href="/#booking">Enquire about a package <span aria-hidden="true">&rarr;</span></Link>
          </div>
          <h3 className={styles.savingsHeading} id="savings-title">Pressotherapy Course Savings</h3>
          <div className={styles.tableScroll} role="region" aria-labelledby="savings-title" tabIndex={0}>
            <table className={styles.pricingTable}>
              <caption className={styles.visuallyHidden}>Compare standard values, package prices and savings</caption>
              <thead><tr><th scope="col">Package</th><th scope="col">Standard Value</th><th scope="col">Package Price</th><th scope="col">Saving</th></tr></thead>
              <tbody>
                <tr><th scope="row">10 Session Course</th><td><s>&pound;600</s></td><td>&pound;540</td><td>&pound;60</td></tr>
                <tr><th scope="row">15 Session Course</th><td><s>&pound;900</s></td><td>&pound;765</td><td>&pound;135</td></tr>
                <tr><th scope="row">Monthly Maintenance</th><td><s>&pound;120</s></td><td>&pound;108</td><td>&pound;12 <span>monthly</span></td></tr>
              </tbody>
            </table>
          </div>
          <div className={styles.tableBooking}>
            <p>All treatments are subject to individual suitability screening. Appointment frequency is agreed individually. Experiences and results vary.</p>
          </div>
        </div>
      </section>

      <section className={styles.finalCta} aria-labelledby="final-cta-title"><Image src="/pressotherapy-waist.jpg" alt="A pressotherapy garment being fitted for a treatment" fill sizes="100vw" /><div className={styles.finalShade}/><div className={`${styles.finalContent} ${styles.reveal}`} data-reveal><p className={`${styles.sectionLabel} ${styles.labelLight}`}>Ready when you are</p><h2 id="final-cta-title">Ready for a moment<br/><em>that’s yours?</em></h2><p>A calming experience, personalised around your comfort.</p><div><Link className={styles.primaryButton} href="/#booking">Book your pressotherapy session</Link><a className={styles.finalSecondary} href="https://wa.me/447940503546?text=Hello%20Shanti%20Haven%2C%20I%27d%20like%20to%20ask%20about%20pressotherapy." target="_blank" rel="noreferrer">Ask us a question ↗</a></div></div></section>
      <a className={styles.whatsapp} href="https://wa.me/447940503546?text=Hello%20Shanti%20Haven%2C%20I%27d%20like%20to%20ask%20about%20pressotherapy." target="_blank" rel="noreferrer" aria-label="Ask Shanti Haven about pressotherapy on WhatsApp"><svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.64-2.04-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.63.71.23 1.36.19 1.87.12.57-.08 1.76-.72 2.01-1.41.25-.7.25-1.3.17-1.42-.07-.13-.27-.2-.57-.35M12.04 21.5h-.01a9.47 9.47 0 0 1-4.83-1.32l-.35-.21-3.59.94.96-3.5-.23-.36a9.46 9.46 0 1 1 8.05 4.45m8.06-17.56A11.33 11.33 0 0 0 12.05.6C5.78.6.68 5.7.68 11.97c0 2 .52 3.95 1.51 5.66L.58 23.5l6.01-1.58a11.36 11.36 0 0 0 5.46 1.39h.01c6.27 0 11.37-5.1 11.37-11.37 0-3.04-1.18-5.9-3.33-8"/></svg></a>
    </main>
  );
}
