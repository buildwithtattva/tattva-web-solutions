import { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/siteConfig';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url.replace(/\/$/, '');
  const lastModified = new Date();

  const routes = [
    '',
    '/about',
    '/services',
    '/products',
    '/projects',
    '/ai-solutions',
    '/insights',
    '/contact',
    '/faq',
    '/terms-and-conditions',
    '/terms-of-use',
    '/privacy-policy',
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified,
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority: route === '' ? 1.0 : route === '/services' || route === '/ai-solutions' ? 0.9 : 0.8,
  }));
}
