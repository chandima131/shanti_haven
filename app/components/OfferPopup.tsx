'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

export default function OfferPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const timer = window.setTimeout(() => setIsOpen(true), 900);
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
          <p className="offer-kicker"><span /> New client welcome offer</p>
          <h2 id="offer-title">Your first wellness conversation is on us.</h2>
          <p className="offer-price"><strong>Free</strong><span>10-minute consultation</span></p>
          <p className="offer-description">A private introductory call to talk through your sleep, stress or recovery needs and find the right next step.</p>
          <a className="offer-button" href="#booking" onClick={dismiss}>Book your free call <span>→</span></a>
          <small>Limited appointments available</small>
        </div>
      </section>
    </div>
  );
}
