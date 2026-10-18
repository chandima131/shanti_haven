import type { MetadataRoute } from 'next';

const siteUrl = (process.env.SITE_URL ?? 'https://shantihaven.co.uk').replace(/\/$/, '');

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${siteUrl}/pressotherapy`,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
  ];
}
