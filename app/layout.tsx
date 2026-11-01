import type { Metadata } from 'next';
import './globals.css';
import SiteFooter from './components/SiteFooter';

const siteUrl = process.env.SITE_URL ?? 'https://shantihaven.co.uk';

export const metadata: Metadata = {
  title: 'Shanti Haven Wellness Clinic | Manchester',
  description: 'Personal sleep, stress and pressotherapy support in Manchester. Book your wellbeing consultation or treatment, seven days a week.',
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: 'Vrk7Tgs-lZuafLEl0dGzz1Fu5xCaZ9dik9jMF1QqmJ4',
  },
  icons: {
    icon: [{ url: '/shanti-haven-logo.png', type: 'image/png' }],
    shortcut: '/shanti-haven-logo.png',
    apple: '/shanti-haven-logo.png',
  },
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
  return <html lang="en"><body>{children}<SiteFooter /></body></html>;
}
