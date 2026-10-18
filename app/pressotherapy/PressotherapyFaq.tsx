'use client';

import { useState } from 'react';
import styles from './PressotherapyPage.module.css';

export function PressotherapyFaq({ items }: { items: readonly (readonly [string, string])[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return <div className={`${styles.faqList} ${styles.reveal}`} data-reveal>{items.map(([question, answer], index) => {
    const open = openIndex === index;
    const panelId = `pressotherapy-faq-${index}`;
    return <article className={open ? styles.faqOpen : ''} key={question}>
      <h3><button type="button" aria-expanded={open} aria-controls={panelId} onClick={() => setOpenIndex(open ? null : index)}><span>{question}</span><i aria-hidden="true">+</i></button></h3>
      <div className={styles.faqAnswer} id={panelId} aria-hidden={!open}><div><p>{answer}</p></div></div>
    </article>;
  })}</div>;
}
