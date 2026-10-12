import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { siteConfig } from '@/lib/siteConfig';
import { SERVICES_DATA } from '@/data/tattvaData';
import { ArrowRight, CheckCircle2, Globe, Cpu, Sparkles, Zap, Palette, ShoppingBag, RefreshCw } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Tactile Digital Services | Web, SaaS & AI Engineering | Tattva',
  description:
    'Explore Tattva Web Solutions 7 core engineering services: Next.js web development, custom software SaaS, Marathi/English AI agents, process automation, UI/UX design, and e-commerce platforms.',
  alternates: {
    canonical: `${siteConfig.url}/services`,
  },
  openGraph: {
    title: 'Tactile Digital Services | Web, SaaS & AI Engineering | Tattva',
    description:
      'Every service we offer is engineered to solve concrete business challenges with soft-edge 3D precision and high performance.',
    url: `${siteConfig.url}/services`,
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630, alt: 'Tattva Web Solutions Services' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tactile Digital Services | Web, SaaS & AI Engineering | Tattva',
    description:
      'Every service we offer is engineered to solve concrete business challenges with soft-edge 3D precision and high performance.',
    images: [siteConfig.ogImage],
  },
};

export default function ServicesPage() {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Globe': return <Globe className="w-8 h-8 text-sky-400" />;
      case 'Cpu': return <Cpu className="w-8 h-8 text-indigo-400" />;
      case 'Sparkles': return <Sparkles className="w-8 h-8 text-purple-400" />;
      case 'Zap': return <Zap className="w-8 h-8 text-amber-400" />;
      case 'Palette': return <Palette className="w-8 h-8 text-pink-400" />;
      case 'ShoppingBag': return <ShoppingBag className="w-8 h-8 text-emerald-400" />;
      default: return <RefreshCw className="w-8 h-8 text-cyan-400" />;
    }
  };

  const jsonLdServices = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Tattva Web Solutions Engineering Services',
    itemListElement: SERVICES_DATA.map((service, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Service',
        name: service.title,
        description: service.fullDesc,
        provider: {
          '@type': 'Organization',
          name: siteConfig.name,
        },
      },
    })),
  };

  return (
    <div className="inflated-page min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdServices) }}
      />
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight">
            Tactile Digital Engineering Services
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Every service we offer is engineered to solve concrete business challenges with soft-edge 3D precision and high performance.
          </p>
        </div>

        {/* 7 Inflated Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES_DATA.map((service) => (
            <div
              key={service.id}
              className="inflated-card p-8 flex flex-col justify-between space-y-6 relative group overflow-hidden"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="p-4 rounded-2xl bg-slate-900 shadow-inner border border-slate-700/50">
                    {getIcon(service.iconName)}
                  </div>
                  <span className="text-[10px] font-bold px-3 py-1 rounded-full bg-slate-800 text-sky-300 border border-slate-700">
                    {service.badge}
                  </span>
                </div>

                <div className="space-y-1">
                  <span className="text-[11px] font-mono uppercase text-sky-400 tracking-wider">
                    {service.category}
                  </span>
                  <h2 className="text-2xl font-black text-white">{service.title}</h2>
                </div>

                <p className="text-slate-300 text-xs leading-relaxed">{service.fullDesc}</p>

                {/* Problem & Benefit Pill */}
                <div className="space-y-2 pt-2 text-xs">
                  <div className="p-3 rounded-xl bg-slate-900/80 border border-rose-500/20 text-rose-300">
                    <strong className="block text-[10px] uppercase font-mono text-rose-400">Problem Solved</strong>
                    {service.problem}
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900/80 border border-emerald-500/20 text-emerald-300">
                    <strong className="block text-[10px] uppercase font-mono text-emerald-400">Key Benefit</strong>
                    {service.benefit}
                  </div>
                </div>

                {/* Deliverables */}
                <div className="space-y-1.5 pt-2">
                  <strong className="block text-[10px] font-mono uppercase text-slate-400">Deliverables:</strong>
                  <ul className="space-y-1 text-[11px] text-slate-300">
                    {service.deliverables.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800">
                <Link
                  href="/contact"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition focus:outline-none focus:ring-2 focus:ring-sky-400"
                >
                  <span>Inquire for {service.title}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
