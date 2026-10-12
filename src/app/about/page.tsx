import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { siteConfig } from '@/lib/siteConfig';
import { ArrowRight, Feather } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us | Engineering Philosophy & Vision | Tattva Web Solutions',
  description:
    'Discover Tattva Web Solutions: our fundamental software engineering principles, zero-bloat commitment, art-directed interfaces, and vision for accessible enterprise AI.',
  alternates: {
    canonical: `${siteConfig.url}/about`,
  },
  openGraph: {
    title: 'About Us | Engineering Philosophy & Vision | Tattva Web Solutions',
    description:
      'Learn how Tattva Web Solutions strips away visual clutter and inefficient code to build software that performs with mathematical precision.',
    url: `${siteConfig.url}/about`,
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630, alt: 'About Tattva Web Solutions' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Us | Engineering Philosophy & Vision | Tattva Web Solutions',
    description:
      'Learn how Tattva Web Solutions strips away visual clutter and inefficient code to build software that performs with mathematical precision.',
    images: [siteConfig.ogImage],
  },
};

export default function AboutPage() {
  const currentDate = 'SATURDAY, OCTOBER 10, 2026';

  const jsonLdAbout = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'About Tattva Web Solutions',
    url: `${siteConfig.url}/about`,
    description:
      'Tattva Web Solutions is a digital engineering studio specializing in high-performance web applications, custom software, and AI agents.',
    mainEntity: {
      '@type': 'Organization',
      name: siteConfig.name,
      url: siteConfig.url,
      description: siteConfig.description,
    },
  };

  return (
    <div className="newspaper-page min-h-screen py-10 px-4 sm:px-6 lg:px-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdAbout) }}
      />
      <div className="max-w-6xl mx-auto space-y-8">
        {/* NEWSPAPER HEADER */}
        <header className="text-center space-y-4 pb-6 newspaper-header-border">
          <div className="flex items-center justify-between text-[11px] newspaper-meta py-1 border-b border-neutral-400">
            <span>VOL. III — NO. 284</span>
            <span>{currentDate}</span>
            <span>SPECIAL EDITORIAL EDITION</span>
          </div>
          <h1 className="text-5xl sm:text-7xl font-extrabold newspaper-title tracking-tight py-2 uppercase">
            The Tattva Gazette
          </h1>
          <p className="italic text-sm text-neutral-700 max-w-2xl mx-auto">
            "Deconstructing complex digital problems into pure engineering elements."
          </p>
        </header>

        {/* MAIN EDITORIAL DISPATCH GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-4">
          {/* COLUMN 1: MAIN STORY (8 Cols) */}
          <article className="lg:col-span-8 space-y-8 lg:newspaper-divider lg:pr-8">
            {/* Story Lead */}
            <div className="space-y-4">
              <span className="newspaper-meta text-red-900 font-bold">FRONT PAGE DISPATCH</span>
              <h2 className="text-3xl sm:text-4xl font-bold newspaper-title leading-tight">
                Architecting High-Performance Web Systems & AI Infrastructure
              </h2>
              <p className="text-sm leading-relaxed text-neutral-800 first-letter:text-5xl first-letter:font-bold first-letter:float-left first-letter:mr-3 first-letter:leading-none">
                Tattva Web Solutions was founded on a simple realization: modern web applications have grown overly bloated, reliant on fragile templates, and disconnected from genuine user needs. Named after the Sanskrit term <em className="font-semibold">Tattva</em>—meaning fundamental element or essential reality—our mission is to strip away visual clutter and inefficient code to build software that performs with precision.
              </p>
            </div>

            {/* Sub-Section 1: What We Do */}
            <div className="space-y-3 pt-6 border-t border-neutral-300">
              <h3 className="text-xl font-bold newspaper-title flex items-center gap-2">
                <Feather className="w-4 h-4 text-neutral-700" />
                <span>Our Core Focus & Capabilities</span>
              </h3>
              <p className="text-xs leading-relaxed text-neutral-800">
                We specialize in six core engineering domains: high-speed web application development, custom business SaaS platforms, multilingual AI agents (with Marathi and English capabilities), intelligent process automation, bespoke UI/UX design systems, and e-commerce infrastructure.
              </p>
            </div>

            {/* Sub-Section 2: Vision & Mission */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-neutral-300">
              <div className="p-4 bg-amber-50 border border-neutral-300 space-y-2">
                <h4 className="font-bold text-sm uppercase tracking-wider newspaper-title">Company Vision</h4>
                <p className="text-xs text-neutral-700 leading-relaxed">
                  To become the gold standard in bespoke web engineering and accessible artificial intelligence for growing enterprises across regional and global markets.
                </p>
              </div>
              <div className="p-4 bg-amber-50 border border-neutral-300 space-y-2">
                <h4 className="font-bold text-sm uppercase tracking-wider newspaper-title">Company Mission</h4>
                <p className="text-xs text-neutral-700 leading-relaxed">
                  To deliver software that scores 95+ on Lighthouse performance, respects user privacy, and automates tedious manual operations without introducing unnecessary technical debt.
                </p>
              </div>
            </div>

            {/* Sub-Section 3: Working Philosophy */}
            <div className="space-y-3 pt-6 border-t border-neutral-300">
              <h3 className="text-xl font-bold newspaper-title">Working Philosophy & Values</h3>
              <ul className="space-y-2 text-xs text-neutral-800 list-disc list-inside">
                <li><strong className="font-semibold">Zero Superficial Bloat:</strong> Every line of JavaScript and CSS serves an explicit functional purpose.</li>
                <li><strong className="font-semibold">Art-Directed Interfaces:</strong> Rejecting single-template monotony in favor of distinct visual languages per page context.</li>
                <li><strong className="font-semibold">Honest AI Boundaries:</strong> Implementing AI models with strict privacy consent and zero false promises.</li>
              </ul>
            </div>
          </article>

          {/* COLUMN 2: SIDEBAR EDITORIAL (4 Cols) */}
          <aside className="lg:col-span-4 space-y-8">
            {/* Editorial Note Box */}
            <div className="p-5 border-2 border-neutral-900 bg-neutral-100 space-y-3">
              <span className="newspaper-meta font-bold text-neutral-900">TECHNOLOGY APPROACH</span>
              <h3 className="text-lg font-bold newspaper-title">The Tattva Stack</h3>
              <p className="text-xs leading-relaxed text-neutral-700">
                We strictly utilize modern production stacks: Next.js App Router, React, TypeScript, Tailwind CSS, Python LLM pipelines, and PostgreSQL.
              </p>
              <div className="pt-2 text-xs font-mono text-neutral-600 space-y-1">
                <div>• Next.js App Router</div>
                <div>• TypeScript Strict Mode</div>
                <div>• Web Speech API (Marathi/English)</div>
                <div>• Tailwind & Custom CSS</div>
              </div>
            </div>

            {/* Column Quote */}
            <blockquote className="p-4 border-l-4 border-neutral-900 italic text-xs text-neutral-800 space-y-2">
              <p>
                "Great software is like a great news article—clear, accurate, fast, and structured so the reader immediately understands its value."
              </p>
              <cite className="block font-mono text-[10px] uppercase text-neutral-600 not-italic">
                — Tattva Engineering Principles
              </cite>
            </blockquote>

            {/* Call to Action Box */}
            <div className="p-5 bg-neutral-900 text-neutral-100 space-y-3">
              <h4 className="font-bold text-sm uppercase tracking-wider text-amber-200">Initiate Contact</h4>
              <p className="text-xs text-neutral-300 leading-relaxed">
                Have a software project, website, or AI automation requirement? Consult with our team today.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-4 py-2 bg-amber-400 text-neutral-950 font-bold text-xs hover:bg-amber-300 transition focus:outline-none focus:ring-2 focus:ring-amber-500 rounded"
              >
                <span>Read Contact Information</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
