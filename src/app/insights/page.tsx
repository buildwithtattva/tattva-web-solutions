import type { Metadata } from 'next';
import { siteConfig } from '@/lib/siteConfig';
import { BLOG_DATA } from '@/data/tattvaData';
import { InsightsClient } from '@/components/insights/InsightsClient';

export const metadata: Metadata = {
  title: 'Insights & Engineering Papers | Tattva Web Solutions',
  description:
    'Read thought leadership articles, web performance engineering papers, and practical AI implementations by Tattva Web Solutions experts.',
  alternates: {
    canonical: `${siteConfig.url}/insights`,
  },
  openGraph: {
    title: 'Insights & Engineering Papers | Tattva Web Solutions',
    description:
      'Thought leadership, deep dives into web performance, and practical AI implementations for modern enterprises.',
    url: `${siteConfig.url}/insights`,
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630, alt: 'Tattva Engineering Insights' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Insights & Engineering Papers | Tattva Web Solutions',
    description:
      'Thought leadership, deep dives into web performance, and practical AI implementations for modern enterprises.',
    images: [siteConfig.ogImage],
  },
};

export default function InsightsPage() {
  const jsonLdInsights = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Tattva Engineering Insights',
    url: `${siteConfig.url}/insights`,
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
    },
    blogPost: BLOG_DATA.map((article) => ({
      '@type': 'BlogPosting',
      headline: article.title,
      description: article.excerpt,
      author: {
        '@type': 'Person',
        name: article.author,
      },
      datePublished: '2026-10-01',
      keywords: article.tags.join(', '),
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdInsights) }}
      />
      <InsightsClient />
    </>
  );
}
