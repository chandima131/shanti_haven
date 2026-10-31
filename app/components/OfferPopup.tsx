'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

// Resets on a full page load, but survives navigation between Next.js routes.
let offerShownForDocument = false;

export default function OfferPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (offerShownForDocument || window.location.pathname !== '/') return;

    const navigation = performance.getEntriesByType('navigation')[0];
    if (navigation && new URL(navigation.name).pathname !== '/') return;

    const timer = window.setTimeout(() => {
      if (offerShownForDocument) return;
      offerShownForDocument = true;
      setIsOpen(true);
    }, 900);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false);
    };

    window.addEventListener('keydown', closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, [isOpen]);

  const dismiss = () => {
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="offer-overlay" role="presentation" onMouseDown={(event) => {
      if (event.target === event.currentTarget) dismiss();
    }}>
      <section className="offer-modal" role="dialog" aria-modal="true" aria-labelledby="offer-title">
        <div className="offer-image">
          <Image
            src="/consultation-offer.png"
            alt="A private wellness consultation at Shanti Haven"
            fill
            sizes="(max-width: 700px) 100vw, 48vw"
            priority
          />
        </div>
        <div className="offer-copy">
          <button ref={closeButtonRef} className="offer-close" type="button" onClick={dismiss} aria-label="Close offer">×</button>
          <p className="offer-kicker"><span /> Opening month · New clients</p>
          <h2 id="offer-title">Your wellbeing.<br/>A welcoming start.</h2>
          <p className="offer-price"><strong>50% off</strong><span>your first eligible appointment</span></p>
          <dl className="offer-discounts" aria-label="Opening month appointment prices">
            <div><dt>Pressotherapy Experience<small>45-minute treatment</small></dt><dd><del>£60</del><strong>£30</strong></dd></div>
            <div><dt>Sleep and Unwind<small>Consultation + pressotherapy</small></dt><dd><del>£95</del><strong>£47.50</strong></dd></div>
            <div><dt>Stress and Release<small>Consultation + pressotherapy</small></dt><dd><del>£95</del><strong>£47.50</strong></dd></div>
          </dl>
          <p className="offer-terms">Available during the advertised opening period. One introductory offer per person. Advance booking and suitability screening apply. Cannot be combined with another promotion. Full courses remain at standard package prices.</p>
          <a className="offer-button" href="#booking" onClick={dismiss}>Book your opening offer <span aria-hidden="true">→</span></a>
        </div>
      </section>
    </div>
  );
}
