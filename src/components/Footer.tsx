'use client';

import React from 'react';
import Link from 'next/link';
import { TattvaLogo } from './TattvaLogo';
import { ShieldCheck, Cookie } from 'lucide-react';

interface FooterProps {
  onOpenCookiePrefs?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenCookiePrefs }) => {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800/80 pt-16 pb-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-800/60">
          {/* Column 1: Brand & Bio */}
          <div className="md:col-span-1 space-y-4">
            <Link href="/" className="inline-block">
              <TattvaLogo size={40} />
            </Link>
            <p className="text-xs leading-relaxed text-slate-400">
              Tattva Web Solutions engineers high-performance custom websites, business software, AI agents, and automated digital systems.
            </p>
          </div>

          {/* Column 2: Solutions */}
          <div>
            <h3 className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-4">Solutions</h3>
            <ul className="space-y-2.5 text-xs">
              <li><Link href="/services" className="hover:text-sky-400 transition">Web Engineering</Link></li>
              <li><Link href="/services" className="hover:text-sky-400 transition">Custom SaaS & Software</Link></li>
              <li><Link href="/ai-solutions" className="hover:text-sky-400 transition">AI Agents & LLM Integration</Link></li>
              <li><Link href="/services" className="hover:text-sky-400 transition">Process Automation</Link></li>
              <li><Link href="/products" className="hover:text-sky-400 transition">Products & Solutions</Link></li>
            </ul>
          </div>

          {/* Column 3: Company */}
          <div>
            <h3 className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-4">Company</h3>
            <ul className="space-y-2.5 text-xs">
              <li><Link href="/about" className="hover:text-sky-400 transition">About Tattva</Link></li>
              <li><Link href="/projects" className="hover:text-sky-400 transition">Selected Work</Link></li>
              <li><Link href="/insights" className="hover:text-sky-400 transition">Insights & Articles</Link></li>
              <li><Link href="/faq" className="hover:text-sky-400 transition">Frequently Asked Questions</Link></li>
              <li><Link href="/contact" className="hover:text-sky-400 transition">Get In Touch</Link></li>
            </ul>
          </div>

          {/* Column 4: Legal & Preferences */}
          <div>
            <h3 className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-4">Legal & Privacy</h3>
            <ul className="space-y-2.5 text-xs mb-5">
              <li><Link href="/privacy-policy" className="hover:text-sky-400 transition">Privacy Policy</Link></li>
              <li><Link href="/terms-and-conditions" className="hover:text-sky-400 transition">Terms & Conditions</Link></li>
              <li><Link href="/terms-of-use" className="hover:text-sky-400 transition">Terms of Use</Link></li>
            </ul>

            <button
              type="button"
              onClick={onOpenCookiePrefs}
              className="inline-flex items-center gap-2 text-xs font-medium px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition"
            >
              <Cookie className="w-3.5 h-3.5 text-amber-400" />
              <span>Cookie Preferences</span>
            </button>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© 2026 Tattva Web Solutions. All rights reserved.</p>
          <div className="flex items-center gap-2 text-slate-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>High-Performance & Accessible Digital Engineering</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
