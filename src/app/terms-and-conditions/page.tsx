import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { siteConfig } from '@/lib/siteConfig';

export const metadata: Metadata = {
  title: 'Terms & Conditions | Legal Services Agreement | Tattva',
  description:
    'Legal terms and conditions governing digital engineering services, milestone payments, intellectual property ownership, and SLAs with Tattva Web Solutions.',
  alternates: {
    canonical: `${siteConfig.url}/terms-and-conditions`,
  },
  openGraph: {
    title: 'Terms & Conditions | Legal Services Agreement | Tattva',
    description:
      'Official terms and conditions governing digital software development and client contracts with Tattva Web Solutions.',
    url: `${siteConfig.url}/terms-and-conditions`,
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630, alt: 'Tattva Terms & Conditions' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Terms & Conditions | Legal Services Agreement | Tattva',
    description:
      'Official terms and conditions governing digital software development and client contracts with Tattva Web Solutions.',
    images: [siteConfig.ogImage],
  },
};

export default function TermsAndConditionsPage() {
  const lastUpdated = 'October 10, 2026';

  const jsonLdLegal = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Terms & Conditions - Tattva Web Solutions',
    url: `${siteConfig.url}/terms-and-conditions`,
    description: 'Legal terms governing software development engagements and IP ownership.',
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
    },
  };

  return (
    <div className="brutalism-page min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdLegal) }}
      />
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Brutalism Banner */}
        <div className="brutalism-box p-8 space-y-4">
          <h1 className="text-4xl sm:text-5xl font-black uppercase tracking-tight text-black">
            Terms & Conditions
          </h1>
          <div className="text-xs font-mono text-neutral-700 border-t-2 border-black pt-2 flex justify-between">
            <span>DOC ID: LEGAL-TATTVA-TC-2026</span>
            <span>LAST REVISED: {lastUpdated}</span>
          </div>
        </div>

        {/* Table of Contents */}
        <div className="brutalism-box p-6 space-y-3 bg-neutral-100">
          <h2 className="font-bold text-sm uppercase">Table of Contents</h2>
          <ol className="list-decimal list-inside text-xs space-y-1 font-mono text-neutral-800">
            <li>1.0 Scope of Digital Engineering Services</li>
            <li>2.0 Intellectual Property Rights & Code Ownership</li>
            <li>3.0 Payment Terms & Milestone Deliverables</li>
            <li>4.0 Performance SLAs & Uptime Commitments</li>
            <li>5.0 Confidentiality & Data Protection</li>
          </ol>
        </div>

        {/* Clause Sections */}
        <div className="space-y-6 text-xs leading-relaxed text-black font-mono">
          {/* Section 1 */}
          <section className="brutalism-box p-6 space-y-2">
            <h2 className="text-lg font-bold uppercase border-b-2 border-black pb-2">
              1.0 Scope of Digital Engineering Services
            </h2>
            <p>
              Tattva Web Solutions provides bespoke frontend and backend software development, Next.js web application engineering, AI agent integrations, and process automation tools under agreed milestone contracts.
            </p>
          </section>

          {/* Section 2 */}
          <section className="brutalism-box p-6 space-y-2">
            <h2 className="text-lg font-bold uppercase border-b-2 border-black pb-2">
              2.0 Intellectual Property & Code Ownership
            </h2>
            <p>
              Upon final settlement of project invoices, the client retains full ownership of custom application source code, custom graphic assets, and domain configurations engineered specifically for their project.
            </p>
          </section>

          {/* Section 3 */}
          <section className="brutalism-box p-6 space-y-2">
            <h2 className="text-lg font-bold uppercase border-b-2 border-black pb-2">
              3.0 Payment Terms & Milestone Deliverables
            </h2>
            <p>
              Engagements operate on structured milestone payments (e.g. 40% deposit, 30% beta delivery, 30% final sign-off & production deployment). Invoices are payable within 14 business days.
            </p>
          </section>

          {/* Section 4 */}
          <section className="brutalism-box p-6 space-y-2">
            <h2 className="text-lg font-bold uppercase border-b-2 border-black pb-2">
              4.0 Performance SLAs & Uptime Commitments
            </h2>
            <p>
              Tattva Web Solutions targets sub-second initial page rendering and 95+ Lighthouse performance scores for custom web builds. Server uptime commitments match standard hosting cloud providers (99.9%).
            </p>
          </section>

          {/* Section 5 */}
          <section className="brutalism-box p-6 space-y-2">
            <h2 className="text-lg font-bold uppercase border-b-2 border-black pb-2">
              5.0 Confidentiality & Data Protection
            </h2>
            <p>
              Both parties agree to protect proprietary business data, trade secrets, and customer records under strict non-disclosure obligations.
            </p>
          </section>
        </div>

        {/* Footer Navigation */}
        <div className="brutalism-box p-6 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs">
          <span>Questions regarding these legal terms?</span>
          <Link
            href="/contact"
            className="px-4 py-2 bg-black text-white font-bold uppercase hover:bg-neutral-800 transition focus:outline-none focus:ring-2 focus:ring-black"
          >
            Contact Legal Team
          </Link>
        </div>
      </div>
    </div>
  );
}
