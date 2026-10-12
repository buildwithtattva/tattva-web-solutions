import type { Metadata } from 'next';
import { siteConfig } from '@/lib/siteConfig';
import { PRODUCTS_DATA } from '@/data/tattvaData';
import { ProductsClient } from '@/components/products/ProductsClient';

export const metadata: Metadata = {
  title: 'Ready-to-Deploy Software Products & AI Solutions | Tattva',
  description:
    'Browse Tattva Web Solutions software products including Tattva Voice Agent, DocuMind RAG Intelligence, and AutoFlow Enterprise Automation.',
  alternates: {
    canonical: `${siteConfig.url}/products`,
  },
  openGraph: {
    title: 'Ready-to-Deploy Software Products & AI Solutions | Tattva',
    description:
      'Data-driven software product architectures with fluid shape transformations and interactive feature explorations.',
    url: `${siteConfig.url}/products`,
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630, alt: 'Tattva Software Products' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ready-to-Deploy Software Products & AI Solutions | Tattva',
    description:
      'Data-driven software product architectures with fluid shape transformations and interactive feature explorations.',
    images: [siteConfig.ogImage],
  },
};

export default function ProductsPage() {
  const jsonLdProducts = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Tattva Web Solutions Ready-to-Deploy Software Products',
    itemListElement: PRODUCTS_DATA.map((product, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'SoftwareApplication',
        name: product.name,
        description: product.description,
        applicationCategory: product.category,
        operatingSystem: 'Web-based',
        author: {
          '@type': 'Organization',
          name: siteConfig.name,
        },
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdProducts) }}
      />
      <ProductsClient />
    </>
  );
}
