import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://neki.io';
  const pages = [
    '',
    '/about',
    '/impact',
    '/missions',
    '/network',
    '/tracking',
    '/trust',
    '/why-neki',
  ];

  return pages.map((page) => ({
    url: `${baseUrl}${page}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: page === '' ? 1.0 : 0.8,
  }));
}
