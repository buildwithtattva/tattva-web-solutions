import type { Metadata } from 'next';
import { siteConfig } from '@/lib/siteConfig';
import { FAQ_DATA } from '@/data/tattvaData';
import { FAQClient } from '@/components/faq/FAQClient';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions | Process, Pricing & AI | Tattva',
  description:
    'Find technical answers regarding Tattva Web Solutions processes, web engineering stack, milestone contracts, custom code ownership, and AI capabilities.',
  alternates: {
    canonical: `${siteConfig.url}/faq`,
  },
  openGraph: {
    title: 'Frequently Asked Questions | Process, Pricing & AI | Tattva',
    description:
      'Raw, unfiltered technical answers regarding Tattva Web Solutions processes, capabilities, and pricing engagements.',
    url: `${siteConfig.url}/faq`,
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630, alt: 'Tattva FAQ' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Frequently Asked Questions | Process, Pricing & AI | Tattva',
    description:
      'Raw, unfiltered technical answers regarding Tattva Web Solutions processes, capabilities, and pricing engagements.',
    images: [siteConfig.ogImage],
  },
};

export default function FAQPage() {
  const jsonLdFAQ = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ_DATA.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFAQ) }}
      />
      <FAQClient />
    </>
  );
}
