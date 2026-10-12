import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { siteConfig } from '@/lib/siteConfig';
import { ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Website Terms of Use & Acceptable Use Policy | Tattva',
  description:
    'Website usage terms and acceptable use policies governing visitors accessing Tattva Web Solutions online services and AI Assistant.',
  alternates: {
    canonical: `${siteConfig.url}/terms-of-use`,
  },
  openGraph: {
    title: 'Website Terms of Use & Acceptable Use Policy | Tattva',
    description:
      'Rules and acceptable use policies governing visitor interaction with Tattva Web Solutions website, AI Voice assistant, and digital assets.',
    url: `${siteConfig.url}/terms-of-use`,
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630, alt: 'Tattva Website Terms of Use' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Website Terms of Use & Acceptable Use Policy | Tattva',
    description:
      'Rules and acceptable use policies governing visitor interaction with Tattva Web Solutions website, AI Voice assistant, and digital assets.',
    images: [siteConfig.ogImage],
  },
};

export default function TermsOfUsePage() {
  const jsonLdTermsUse = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Website Terms of Use - Tattva Web Solutions',
    url: `${siteConfig.url}/terms-of-use`,
    description: 'Acceptable use rules governing website interactions and AI Assistant usage.',
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
    },
  };

  return (
    <div className="fullbleed-page min-h-screen py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdTermsUse) }}
      />
      {/* Full-Bleed Hero Section */}
      <section className="fullbleed-section bg-gradient-to-r from-sky-950 via-indigo-950 to-slate-950 py-20 px-6 sm:px-12 text-center space-y-4 border-b border-sky-500/30">
        <h1 className="text-4xl sm:text-7xl font-black uppercase tracking-tight text-white">
          Website Terms of Use
        </h1>
        <p className="max-w-2xl mx-auto text-slate-300 text-sm sm:text-base leading-relaxed">
          Rules and acceptable use policies governing visitor interaction with Tattva Web Solutions website, AI Voice assistant, and digital assets.
        </p>
      </section>

      {/* Content Container */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        {/* Section 1 */}
        <div className="space-y-4 border-l-4 border-sky-500 pl-6 py-2">
          <h2 className="text-2xl font-bold text-white uppercase">1. Acceptable Site Usage</h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            By accessing or interacting with tattvawebsolutions.com, you agree to use our online services, AI Voice widget, and contact portals solely for lawful business inquiries. Any attempt to flood, scrape, or inject malicious code into our web infrastructure is strictly prohibited.
          </p>
        </div>

        {/* Section 2 */}
        <div className="space-y-4 border-l-4 border-indigo-500 pl-6 py-2">
          <h2 className="text-2xl font-bold text-white uppercase">2. AI Voice Assistant Interaction Guidelines</h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Our embedded AI Assistant is designed to assist visitors with information regarding our services in English and Marathi. Queries submitted to the AI widget are processed in real-time to generate helpful responses. Do not submit sensitive passwords or personal financial data to the AI assistant.
          </p>
        </div>

        {/* Section 3 */}
        <div className="space-y-4 border-l-4 border-purple-500 pl-6 py-2">
          <h2 className="text-2xl font-bold text-white uppercase">3. Intellectual Property Notice</h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            All original SVG logo vectors, visual design aesthetics, brand typography, custom code snippets, and published articles on this website are protected under copyright laws of India and international treaties.
          </p>
        </div>

        {/* Full-Bleed Callout Bar */}
        <div className="fullbleed-section bg-slate-900 border-y border-slate-800 py-12 px-6 text-center space-y-4">
          <h3 className="text-2xl font-bold text-white">Need Clarification on Website Terms?</h3>
          <p className="text-xs text-slate-400">Our engineering and legal teams are ready to answer your questions.</p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-sky-500 text-slate-950 font-bold text-xs uppercase hover:bg-sky-400 transition focus:outline-none focus:ring-2 focus:ring-sky-400"
          >
            <span>Reach Out via Contact Form</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
