'use client';

import { useEffect } from 'react';

export function PressotherapyMotion() {
  useEffect(() => {
    const targets = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion || !('IntersectionObserver' in window)) return;

    // Animate without mutating attributes that React may still be hydrating.
    // Content remains visible if JavaScript or animation support is unavailable.
    const animations: Animation[] = [];
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = entry.target as HTMLElement;
          if (typeof target.animate === 'function') {
            const delay = Number.parseFloat(getComputedStyle(target).getPropertyValue('--delay')) || 0;
            animations.push(target.animate([
              { opacity: 0, transform: 'translateY(20px)' },
              { opacity: 1, transform: 'translateY(0)' },
            ], { duration: 720, delay, easing: 'cubic-bezier(.2,.65,.3,1)' }));
          }
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -9% 0px', threshold: 0.08 });
    targets.forEach((target) => observer.observe(target));
    return () => {
      observer.disconnect();
      animations.forEach((animation) => animation.cancel());
    };
  }, []);
  return null;
}
