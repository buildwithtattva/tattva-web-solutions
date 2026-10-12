'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { FAQ_DATA } from '@/data/tattvaData';
import { Plus, Minus, ArrowRight } from 'lucide-react';

export function FAQClient() {
  const [openId, setOpenId] = useState<string>('faq-1');

  const toggleAccordion = (id: string) => {
    setOpenId((prev) => (prev === id ? '' : id));
  };

  return (
    <div className="antidesign-page min-h-screen py-12 px-4 sm:px-6 lg:px-8 overflow-x-hidden">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Anti-Design Banner Header */}
        <div className="antidesign-block p-8 border-4 border-black text-center space-y-4">
          <h1 className="text-4xl sm:text-6xl uppercase tracking-tighter text-yellow-300">
            FREQUENTLY ASKED QUESTIONS
          </h1>
          <p className="font-sans text-xs sm:text-sm text-neutral-300 max-w-xl mx-auto">
            Raw, unfiltered technical answers regarding Tattva Web Solutions processes, capabilities, and pricing engagements.
          </p>
        </div>

        {/* Accordions */}
        <div className="space-y-6">
          {FAQ_DATA.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div key={item.id} className="antidesign-block p-6 transition-all duration-200">
                <button
                  type="button"
                  onClick={() => toggleAccordion(item.id)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${item.id}`}
                  id={`faq-button-${item.id}`}
                  className="w-full text-left flex items-start justify-between gap-4 font-sans focus:outline-none focus:ring-2 focus:ring-yellow-400 p-1"
                >
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-red-400 font-bold uppercase tracking-widest">
                      [{item.category}]
                    </span>
                    <h2 className="text-lg sm:text-xl font-extrabold text-white leading-snug">
                      {item.question}
                    </h2>
                  </div>
                  <div className="p-2 bg-yellow-400 text-black shrink-0 font-bold">
                    {isOpen ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                  </div>
                </button>

                {isOpen && (
                  <div
                    id={`faq-answer-${item.id}`}
                    role="region"
                    aria-labelledby={`faq-button-${item.id}`}
                    className="mt-4 pt-4 border-t border-neutral-800 font-sans text-xs sm:text-sm text-neutral-300 leading-relaxed animate-in fade-in duration-200"
                  >
                    <p>{item.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* CTA Footer Block */}
        <div className="antidesign-block p-8 text-center space-y-4">
          <h2 className="text-2xl uppercase text-white font-sans font-bold">Have a Question Not Answered Here?</h2>
          <p className="font-sans text-xs text-neutral-300">
            Our Marathi and English AI Assistant is online right now, or you can send a direct inquiry.
          </p>
          <div className="pt-2">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-yellow-400 text-black font-extrabold text-xs uppercase font-sans hover:bg-yellow-300 transition focus:outline-none focus:ring-2 focus:ring-yellow-400"
            >
              <span>Ask Tattva Team Directly</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
