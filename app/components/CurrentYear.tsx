'use client';

import { useSyncExternalStore } from 'react';

function currentYear() {
  return Number(new Intl.DateTimeFormat('en-GB', {
    year: 'numeric',
    timeZone: 'Europe/London',
  }).format(new Date()));
}

function subscribe(onChange: () => void) {
  const timer = window.setInterval(onChange, 60_000);
  window.addEventListener('focus', onChange);
  return () => {
    window.clearInterval(timer);
    window.removeEventListener('focus', onChange);
  };
}

export default function CurrentYear({ initialYear }: { initialYear: number }) {
  return useSyncExternalStore(subscribe, currentYear, () => initialYear);
}
