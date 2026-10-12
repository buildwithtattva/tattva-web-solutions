import type { Metadata } from 'next';
import { siteConfig } from '@/lib/siteConfig';
import { PROJECTS_DATA } from '@/data/tattvaData';
import { ProjectsClient } from '@/components/projects/ProjectsClient';

export const metadata: Metadata = {
  title: 'Selected Case Studies & Engineering Portfolio | Tattva',
  description:
    'Explore real client deliverables, web engineering case studies, and custom AI agent projects built by Tattva Web Solutions across diverse business categories.',
  alternates: {
    canonical: `${siteConfig.url}/projects`,
  },
  openGraph: {
    title: 'Selected Case Studies & Engineering Portfolio | Tattva',
    description:
      'Exploring client deliverables, internal AI concepts, and production web applications across diverse business categories.',
    url: `${siteConfig.url}/projects`,
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630, alt: 'Tattva Case Studies Portfolio' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Selected Case Studies & Engineering Portfolio | Tattva',
    description:
      'Exploring client deliverables, internal AI concepts, and production web applications across diverse business categories.',
    images: [siteConfig.ogImage],
  },
};

export default function ProjectsPage() {
  const jsonLdProjects = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Tattva Web Solutions Featured Case Studies',
    itemListElement: PROJECTS_DATA.map((proj, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'CreativeWork',
        name: proj.title,
        description: proj.summary,
        genre: proj.category,
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdProjects) }}
      />
      <ProjectsClient />
    </>
  );
}
