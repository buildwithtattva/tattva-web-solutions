import type { Metadata } from 'next';
import { siteConfig } from '@/lib/siteConfig';
import { ContactClient } from '@/components/contact/ContactClient';

export const metadata: Metadata = {
  title: 'Initiate Project Consultation & Contact Us | Tattva',
  description:
    'Submit your website, software, or AI agent project brief to Tattva Web Solutions engineers for a technical proposal within 24 hours.',
  alternates: {
    canonical: `${siteConfig.url}/contact`,
  },
  openGraph: {
    title: 'Initiate Project Consultation & Contact Us | Tattva',
    description:
      'Reach out to Tattva Web Solutions. We review every business requirement and respond with actionable technical proposals within 24 hours.',
    url: `${siteConfig.url}/contact`,
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630, alt: 'Contact Tattva Web Solutions' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Initiate Project Consultation & Contact Us | Tattva',
    description:
      'Reach out to Tattva Web Solutions. We review every business requirement and respond with actionable technical proposals within 24 hours.',
    images: [siteConfig.ogImage],
  },
};

export default function ContactPage() {
  const jsonLdContact = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact Tattva Web Solutions',
    url: `${siteConfig.url}/contact`,
    description: 'Direct inquiry channel for custom web development, software engineering, and AI agent projects.',
    mainEntity: {
      '@type': 'Organization',
      name: siteConfig.name,
      email: siteConfig.email,
      telephone: siteConfig.phone,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdContact) }}
      />
      <ContactClient />
    </>
  );
}
