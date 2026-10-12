import type { Metadata } from 'next';
import { siteConfig } from '@/lib/siteConfig';
import { HomeClient } from '@/components/home/HomeClient';

export const metadata: Metadata = {
  title: 'Tattva Web Solutions | High-Performance Web, SaaS & AI Engineering Studio',
  description:
    'Tattva Web Solutions delivers custom Next.js web engineering, enterprise SaaS platforms, autonomous AI agents, and intelligent process automation.',
  alternates: {
    canonical: siteConfig.url,
  },
  openGraph: {
    title: 'Tattva Web Solutions | High-Performance Web, SaaS & AI Engineering Studio',
    description:
      'Architecting high-impact custom business websites, enterprise software, Marathi/English AI voice agents, and process automations.',
    url: siteConfig.url,
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630, alt: 'Tattva Web Solutions Studio' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tattva Web Solutions | High-Performance Web, SaaS & AI Engineering Studio',
    description:
      'Architecting high-impact custom business websites, enterprise software, Marathi/English AI voice agents, and process automations.',
    images: [siteConfig.ogImage],
  },
};

export default function HomePage() {
  return <HomeClient />;
}
