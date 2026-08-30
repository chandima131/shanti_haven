import type { Metadata } from 'next';
import './globals.css';

const siteUrl = process.env.SITE_URL ?? 'http://localhost:3000';

export const metadata: Metadata = {
  title: 'Shanti Haven Wellness Clinic | Manchester',
  description: 'Personal sleep, stress and pressotherapy support in Manchester. Book a free 10-minute consultation, seven days a week.',
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: 'Shanti Haven Wellness Clinic',
    description: 'A quieter mind. A better rhythm. Personal wellbeing support in Manchester.',
    type: 'website',
    images: [{ url: new URL('/og.png', siteUrl).toString(), width: 1200, height: 630, alt: 'Shanti Haven Wellness Clinic — Wellness, Balance, Harmony' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shanti Haven Wellness Clinic',
    description: 'A quieter mind. A better rhythm. Personal wellbeing support in Manchester.',
    images: [new URL('/og.png', siteUrl).toString()],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
