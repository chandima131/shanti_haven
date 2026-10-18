'use client';

import { useEffect, useState } from 'react';
import styles from './PressotherapyPage.module.css';

type NavItem = { id: string; label: string };

export function PressotherapySubnav({ items }: { items: NavItem[] }) {
  const [active, setActive] = useState(items[0]?.id ?? '');

  useEffect(() => {
    const sections = items.map((item) => document.getElementById(item.id)).filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible?.target.id) setActive(visible.target.id);
    }, { rootMargin: '-24% 0px -62% 0px', threshold: [0, 0.15, 0.4] });
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [items]);

  return <nav className={styles.subnav} aria-label="On this page"><div>{items.map((item) => <a className={active === item.id ? styles.subnavActive : ''} href={`#${item.id}`} aria-current={active === item.id ? 'location' : undefined} key={item.id}>{item.label}</a>)}</div></nav>;
}
