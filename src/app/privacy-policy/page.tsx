import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { siteConfig } from '@/lib/siteConfig';
import { Shield, Eye, Lock, Database, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy & Data Rights Disclosures | Tattva',
  description:
    'Learn how Tattva Web Solutions protects visitor data across contact form submissions, minimalist cookie consent choices, and local AI Voice Assistant speech processing.',
  alternates: {
    canonical: `${siteConfig.url}/privacy-policy`,
  },
  openGraph: {
    title: 'Privacy Policy & Data Rights Disclosures | Tattva',
    description:
      'Transparent data processing disclosures covering contact form submissions, cookie consent options, and AI Voice Assistant interactions.',
    url: `${siteConfig.url}/privacy-policy`,
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630, alt: 'Tattva Privacy Policy' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Privacy Policy & Data Rights Disclosures | Tattva',
    description:
      'Transparent data processing disclosures covering contact form submissions, cookie consent options, and AI Voice Assistant interactions.',
    images: [siteConfig.ogImage],
  },
};

export default function PrivacyPolicyPage() {
  const jsonLdPrivacy = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Privacy Policy - Tattva Web Solutions',
    url: `${siteConfig.url}/privacy-policy`,
    description: 'Data rights and privacy policy for contact forms, cookies, and local voice AI processing.',
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
    },
  };

  return (
    <div className="abstract-page min-h-screen py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdPrivacy) }}
      />
      {/* Abstract Background Shapes */}
      <div className="absolute top-10 left-10 w-96 h-96 rounded-full bg-gradient-to-tr from-purple-600/30 to-pink-600/20 blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-gradient-to-bl from-indigo-600/30 to-cyan-600/20 blur-3xl pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white">
            Privacy Policy & Data Rights
          </h1>
          <p className="text-purple-200 text-sm leading-relaxed">
            Transparent data processing disclosures covering contact form submissions, cookie consent options, and AI Voice Assistant interactions.
          </p>
        </div>

        {/* Abstract Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card 1 */}
          <div className="abstract-card p-8 space-y-4">
            <div className="p-3 rounded-2xl bg-purple-900/40 border border-purple-500/30 w-fit text-purple-300">
              <Database className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-white">1. Contact Form Data Collection</h2>
            <p className="text-xs text-purple-200 leading-relaxed">
              When you submit an inquiry on our Contact Us page, we collect your name, email address, subject, and project details. This data is used exclusively by Tattva engineers to evaluate your requirement and respond with proposals. We never sell or share your contact info with third-party advertisers.
            </p>
          </div>

          {/* Card 2 */}
          <div className="abstract-card p-8 space-y-4">
            <div className="p-3 rounded-2xl bg-pink-900/40 border border-pink-500/30 w-fit text-pink-300">
              <Lock className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-white">2. AI Voice Assistant Privacy</h2>
            <p className="text-xs text-purple-200 leading-relaxed">
              Our website AI Assistant utilizes the client-side browser Web Speech API for speech-to-text. Voice audio input is processed locally by your browser. No voice recordings or microphone audio feeds are saved or sent to external servers without explicit user consent.
            </p>
          </div>

          {/* Card 3 */}
          <div className="abstract-card p-8 space-y-4">
            <div className="p-3 rounded-2xl bg-cyan-900/40 border border-cyan-500/30 w-fit text-cyan-300">
              <Eye className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-white">3. Minimalist Cookie Setup</h2>
            <p className="text-xs text-purple-200 leading-relaxed">
              We use strictly necessary cookies to remember your consent preferences. We do not use intrusive cross-site tracking cookies. You can revisit your cookie consent choices at any time using the "Cookie Preferences" link in our site footer.
            </p>
          </div>

          {/* Card 4 */}
          <div className="abstract-card p-8 space-y-4">
            <div className="p-3 rounded-2xl bg-indigo-900/40 border border-indigo-500/30 w-fit text-indigo-300">
              <Shield className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-white">4. Your Data Rights</h2>
            <p className="text-xs text-purple-200 leading-relaxed">
              You have the right to request access to, update, or permanently delete your contact inquiry records from our system. To exercise your data rights, contact us at tattvawebsolutions@gmail.com.
            </p>
          </div>
        </div>

        {/* Footer Link */}
        <div className="abstract-card p-8 text-center space-y-4">
          <h3 className="text-xl font-bold text-white">Have Privacy Concerns or Requests?</h3>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-purple-500 hover:bg-purple-400 text-slate-950 font-bold text-xs uppercase focus:outline-none focus:ring-2 focus:ring-purple-400"
          >
            <span>Submit Data Request</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
