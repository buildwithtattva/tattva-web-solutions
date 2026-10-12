'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { PROJECTS_DATA, ProjectItem } from '@/data/tattvaData';
import { ExternalLink, ArrowUpRight, X, CheckCircle2 } from 'lucide-react';

export function ProjectsClient() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeCaseStudy, setActiveCaseStudy] = useState<ProjectItem | null>(null);

  const categories = [
    'All',
    'Beauty Salon websites',
    'Café websites',
    'Dental clinic websites',
    'Gym websites',
    'AI-agent projects',
    'Business websites',
  ];

  const filteredProjects = PROJECTS_DATA.filter((p) => {
    return selectedCategory === 'All' || p.category === selectedCategory;
  });

  return (
    <div className="asymmetric-page min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="space-y-4 max-w-3xl">
          <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight">
            Selected Works & Case Studies
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Exploring client deliverables, internal AI concepts, and production web applications across diverse business categories.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all focus:outline-none focus:ring-2 focus:ring-amber-400 ${
                selectedCategory === cat
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-lg shadow-amber-500/20'
                  : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* ASYMMETRIC GRID SYSTEM */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {filteredProjects.map((project, index) => {
            const isWide = index % 3 === 0;
            return (
              <div
                key={project.id}
                className={`relative group bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 overflow-hidden transition-all duration-300 hover:border-amber-500/40 hover:-translate-y-1 shadow-2xl ${
                  isWide ? 'md:col-span-8' : 'md:col-span-4'
                }`}
              >
                {/* Visual Accent Bar */}
                <div
                  className="absolute top-0 left-0 right-0 h-1.5 opacity-80"
                  style={{ backgroundColor: project.imageAccent }}
                />

                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-[10px] font-mono px-2.5 py-1 rounded bg-slate-950 text-amber-400 border border-amber-500/20">
                    {project.status}
                  </span>
                  <span className="text-[11px] font-mono text-slate-400">
                    {project.year} • {project.category}
                  </span>
                </div>

                <div className="space-y-2">
                  <h2 className="text-2xl font-bold text-white group-hover:text-amber-300 transition">
                    {project.title}
                  </h2>
                  <p className="text-xs text-slate-300 font-medium">Client: {project.client}</p>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">{project.summary}</p>

                {/* Tech Badges */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {project.technologies.map((t) => (
                    <span
                      key={t}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950 text-slate-300 border border-slate-800"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setActiveCaseStudy(project)}
                    className="text-xs font-bold text-amber-400 hover:underline flex items-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-amber-400 rounded"
                  >
                    <span>Read Full Case Study</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* CASE STUDY DETAIL MODAL */}
        {activeCaseStudy && (
          <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4">
            <div className="bg-slate-900 border-2 border-amber-500/40 rounded-3xl max-w-2xl w-full p-8 relative space-y-6 shadow-2xl text-slate-200 animate-in fade-in zoom-in-95 duration-200">
              <button
                type="button"
                aria-label="Close case study detail modal"
                onClick={() => setActiveCaseStudy(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-2">
                <span className="text-xs font-mono text-amber-400 uppercase tracking-widest">
                  {activeCaseStudy.category} • {activeCaseStudy.year}
                </span>
                <h2 className="text-3xl font-extrabold text-white">{activeCaseStudy.title}</h2>
                <p className="text-xs text-slate-400 font-medium">Client: {activeCaseStudy.client}</p>
              </div>

              {/* Challenge & Solution */}
              <div className="space-y-4 text-xs">
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                  <strong className="block text-amber-400 font-mono text-[10px] uppercase">
                    The Challenge
                  </strong>
                  <p className="text-slate-300 leading-relaxed">{activeCaseStudy.challenge}</p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                  <strong className="block text-emerald-400 font-mono text-[10px] uppercase">
                    Engineered Solution
                  </strong>
                  <p className="text-slate-300 leading-relaxed">{activeCaseStudy.solution}</p>
                </div>
              </div>

              {/* Results */}
              <div className="space-y-2">
                <h3 className="text-xs font-bold uppercase font-mono tracking-wider text-slate-400">
                  Quantifiable Impact & Results:
                </h3>
                <ul className="space-y-1.5 text-xs text-slate-200">
                  {activeCaseStudy.results.map((res, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-amber-400" />
                      <span>{res}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setActiveCaseStudy(null)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-medium hover:bg-slate-700 transition"
                >
                  Close Case Study
                </button>
                <Link
                  href="/contact"
                  className="px-5 py-2 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg hover:bg-amber-400 transition"
                >
                  <span>Build Similar Solution</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
