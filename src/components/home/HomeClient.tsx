'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { TattvaLogo } from '@/components/TattvaLogo';
import { SERVICES_DATA, PRODUCTS_DATA, PROJECTS_DATA } from '@/data/tattvaData';
import { ArrowRight, Sparkles, Code, CheckCircle2, ChevronRight, Bot } from 'lucide-react';

export function HomeClient() {
  const [introFinished, setIntroFinished] = useState(false);
  const [showIntro, setShowIntro] = useState(false);

  useEffect(() => {
    // Check if user already saw intro sequence in current session
    const seen = sessionStorage.getItem('tattva_intro_seen');
    if (!seen) {
      setShowIntro(true);
    } else {
      setIntroFinished(true);
    }
  }, []);

  const handleIntroComplete = () => {
    sessionStorage.setItem('tattva_intro_seen', 'true');
    setIntroFinished(true);
    setTimeout(() => setShowIntro(false), 500);
  };

  return (
    <div className="liquid-chrome-page relative min-h-screen">
      {/* 1. ANIMATED SVG LOGO INTRO OVERLAY */}
      {showIntro && (
        <div
          className={`fixed inset-0 z-50 bg-slate-950 flex flex-col items-center justify-center transition-opacity duration-700 ${
            introFinished ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
        >
          <div className="text-center space-y-6">
            <TattvaLogo size={120} animated={true} onAnimationComplete={handleIntroComplete} />
            <div className="space-y-2">
              <p className="text-xs font-mono tracking-widest text-sky-400 uppercase animate-pulse">
                Building Elements of Reality...
              </p>
            </div>
            <button
              type="button"
              onClick={handleIntroComplete}
              className="text-[10px] text-slate-500 underline hover:text-slate-300 pt-4 focus:outline-none focus:ring-2 focus:ring-sky-400 rounded"
            >
              Skip Intro
            </button>
          </div>
        </div>
      )}

      {/* Decorative Metallic Background Blobs */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-full max-w-[800px] h-[350px] sm:h-[500px] liquid-metallic-blob rounded-full pointer-events-none -z-10" />
      <div className="absolute top-[1200px] right-0 w-full max-w-[600px] h-[400px] sm:h-[600px] liquid-metallic-blob rounded-full pointer-events-none -z-10 opacity-20" />

      {/* 2. HERO SECTION */}
      <section className="relative pt-12 pb-20 sm:pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-slate-900/80 border border-sky-500/30 text-sky-300 text-[11px] sm:text-xs font-medium mb-6 sm:mb-8 shadow-[0_0_15px_rgba(56,189,248,0.2)]">
          <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-sky-400" />
          <span>Next-Generation Digital Engineering & AI Studio</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight leading-tight sm:leading-none mb-6">
          Architecting High-Impact <br className="hidden sm:inline" />
          <span className="chrome-text-gradient">Websites, Software & AI Agents</span>
        </h1>

        <p className="max-w-3xl mx-auto text-slate-300 text-base sm:text-lg leading-relaxed mb-10">
          Tattva Web Solutions delivers custom web engineering, enterprise SaaS software, autonomous AI agents, and intelligent process automation built for performance and scale.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/contact"
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-sky-400 via-indigo-500 to-purple-500 text-white font-bold text-sm shadow-xl shadow-sky-500/25 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3 focus:outline-none focus:ring-2 focus:ring-sky-400"
          >
            <span>Initiate Project Consultation</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/projects"
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-slate-900/80 border border-slate-700/70 text-slate-200 font-semibold text-sm hover:bg-slate-800 hover:text-white transition flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-sky-400"
          >
            <span>Explore Case Studies</span>
          </Link>
        </div>

        {/* Liquid Chrome Hero Metrics Strip */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {[
            { label: 'Lighthouse Target', value: '95+' },
            { label: 'Engineering Stack', value: 'Next.js 16' },
            { label: 'Multilingual AI', value: 'MR & EN' },
            { label: 'Uptime SLA', value: '99.9%' },
          ].map((item, idx) => (
            <div key={idx} className="chrome-card p-5 text-center">
              <div className="text-2xl font-black text-white chrome-text-gradient">{item.value}</div>
              <div className="text-[11px] font-mono uppercase text-sky-400 mt-1">{item.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. COMPANY INTRODUCTION */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="chrome-card p-8 sm:p-12 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs font-mono text-sky-400 uppercase tracking-widest">About Tattva</span>
              <h2 className="text-2xl sm:text-4xl font-bold text-white">
                Engineering Modern Elements of Digital Success
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed">
                Derived from the ancient concept of <strong className="text-sky-300">Tattva</strong> (fundamental reality), we build software systems with mathematical precision and art-directed visual languages. We discard cookie-cutter templates in favor of bespoke frontend architectures and resilient backend microservices.
              </p>
              <div className="pt-2 flex flex-wrap gap-4 text-xs font-medium text-slate-300">
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Custom Next.js & React Architectures</span>
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Regional Language AI Speech Support</span>
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Zero Bloat Performance Guarantee</span>
                </span>
              </div>
            </div>
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative p-8 rounded-3xl bg-gradient-to-br from-sky-900/30 to-indigo-950/50 border border-sky-500/30 shadow-2xl text-center space-y-4">
                <Bot className="w-16 h-16 text-sky-400 mx-auto animate-bounce" />
                <h3 className="font-bold text-white text-lg">Interactive AI Voice Agent</h3>
                <p className="text-xs text-slate-300">
                  Try talking to our site AI assistant on the bottom-right for instant answers in Marathi and English!
                </p>
                <Link
                  href="/ai-solutions"
                  className="inline-flex items-center gap-2 text-xs font-bold text-sky-300 hover:text-white underline focus:outline-none focus:ring-2 focus:ring-sky-400 rounded"
                >
                  <span>Discover AI Capabilities</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FEATURED SERVICES */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-xs font-mono text-sky-400 uppercase tracking-widest">Capabilities</span>
            <h2 className="text-3xl font-bold text-white mt-1">Core Digital Engineering Services</h2>
          </div>
          <Link
            href="/services"
            className="mt-4 md:mt-0 text-xs font-bold text-sky-400 hover:text-sky-300 flex items-center gap-1 focus:outline-none focus:ring-2 focus:ring-sky-400 rounded"
          >
            <span>View All Services</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SERVICES_DATA.slice(0, 3).map((service) => (
            <div key={service.id} className="chrome-card p-6 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-sky-400">
                    <Code className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-sky-500/20 text-sky-300 border border-sky-500/30">
                    {service.badge}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white">{service.title}</h3>
                <p className="text-slate-300 text-xs mt-2 leading-relaxed">{service.shortDesc}</p>
              </div>
              <div className="pt-4 border-t border-slate-800/80">
                <Link
                  href="/services"
                  className="text-xs font-semibold text-sky-400 hover:text-sky-300 flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-sky-400 rounded"
                >
                  <span>Explore Deliverables</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. FEATURED PRODUCTS */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="chrome-card p-8 sm:p-10">
          <div className="mb-8">
            <span className="text-xs font-mono text-purple-400 uppercase tracking-widest">Solutions</span>
            <h2 className="text-3xl font-bold text-white mt-1">Ready-to-Deploy Software Products</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PRODUCTS_DATA.map((prod) => (
              <div key={prod.id} className="bg-slate-950/80 border border-slate-800 rounded-xl p-5 space-y-3">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/20 text-purple-300">
                  {prod.status}
                </span>
                <h3 className="text-base font-bold text-white">{prod.name}</h3>
                <p className="text-xs text-slate-300 leading-relaxed">{prod.description}</p>
                <Link
                  href="/products"
                  className="inline-block text-xs font-medium text-sky-400 hover:underline pt-2 focus:outline-none focus:ring-2 focus:ring-sky-400 rounded"
                >
                  Product Details →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. SELECTED PROJECTS */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-10">
          <div>
            <span className="text-xs font-mono text-sky-400 uppercase tracking-widest">Portfolio</span>
            <h2 className="text-3xl font-bold text-white mt-1">Featured Case Studies</h2>
          </div>
          <Link href="/projects" className="text-xs font-bold text-sky-400 hover:underline focus:outline-none focus:ring-2 focus:ring-sky-400 rounded">
            View Portfolio →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {PROJECTS_DATA.slice(0, 2).map((proj) => (
            <div key={proj.id} className="chrome-card p-8 space-y-4">
              <span className="text-[10px] font-mono px-2.5 py-1 rounded bg-slate-900 text-slate-400 border border-slate-800">
                {proj.category}
              </span>
              <h3 className="text-xl font-bold text-white">{proj.title}</h3>
              <p className="text-xs text-slate-300 leading-relaxed">{proj.summary}</p>
              <div className="flex flex-wrap gap-2 pt-2">
                {proj.technologies.map((t) => (
                  <span key={t} className="text-[10px] px-2 py-0.5 rounded bg-slate-900 text-sky-400">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. INQUIRY CTA */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <div className="chrome-card p-12 relative overflow-hidden space-y-6">
          <div className="w-16 h-16 rounded-full bg-sky-500/20 text-sky-400 border border-sky-400/30 flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(56,189,248,0.4)]">
            <Sparkles className="w-8 h-8" />
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white">Ready to Engineer Your Digital Vision?</h2>
          <p className="max-w-2xl mx-auto text-slate-300 text-sm leading-relaxed">
            Partner with Tattva Web Solutions to build fast, beautiful, and intelligent software tailored to your growth goals.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-sky-400 via-indigo-500 to-purple-500 text-white font-bold text-sm shadow-xl shadow-sky-500/25 hover:scale-105 transition focus:outline-none focus:ring-2 focus:ring-sky-400"
          >
            <span>Start Your Project Now</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
