'use client';

import React, { useState } from 'react';
import { BLOG_DATA, BlogArticle } from '@/data/tattvaData';
import { Search, X } from 'lucide-react';

export function InsightsClient() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeArticle, setActiveArticle] = useState<BlogArticle | null>(null);

  const categories = ['All', 'Web Engineering', 'AI & Automation', 'UI/UX Design'];

  const filteredArticles = BLOG_DATA.filter((article) => {
    const matchesCat = selectedCategory === 'All' || article.category === selectedCategory;
    const matchesQuery =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  return (
    <div className="monochrome-page min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <div className="border-b border-neutral-800 pb-8 space-y-4">
          <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-white">
            Tattva Insights & Engineering Papers
          </h1>
          <p className="text-neutral-400 text-sm max-w-2xl">
            Thought leadership, deep dives into web performance, and practical AI implementations for modern enterprises.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-neutral-800">
          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 text-xs font-bold uppercase transition focus:outline-none focus:ring-2 focus:ring-white ${
                  selectedCategory === cat
                    ? 'bg-white text-black'
                    : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              aria-label="Search articles"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search articles..."
              className="w-full bg-neutral-900 border border-neutral-800 px-9 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-white focus:ring-1 focus:ring-white"
            />
          </div>
        </div>

        {/* Articles List */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredArticles.map((article) => (
            <article
              key={article.id}
              className="monochrome-card p-6 flex flex-col justify-between space-y-6 cursor-pointer group"
              onClick={() => setActiveArticle(article)}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400">
                  <span>{article.category}</span>
                  <span>{article.readTime}</span>
                </div>

                <h2 className="text-xl font-bold text-white group-hover:underline leading-snug">
                  {article.title}
                </h2>

                <p className="text-neutral-400 text-xs leading-relaxed line-clamp-3">
                  {article.excerpt}
                </p>
              </div>

              <div className="pt-4 border-t border-neutral-800 flex items-center justify-between text-xs text-neutral-400">
                <span>{article.date}</span>
                <span className="font-bold text-white group-hover:translate-x-1 transition">
                  Read Article →
                </span>
              </div>
            </article>
          ))}
        </div>

        {/* FULL ARTICLE READER MODAL */}
        {activeArticle && (
          <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-neutral-950 border border-neutral-700 max-w-2xl w-full p-8 relative space-y-6 text-white my-8">
              <button
                type="button"
                aria-label="Close article reader modal"
                onClick={() => setActiveArticle(null)}
                className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="space-y-2 border-b border-neutral-800 pb-4">
                <span className="text-xs font-mono uppercase text-neutral-400">
                  {activeArticle.category} • {activeArticle.readTime}
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold">{activeArticle.title}</h2>
                <div className="flex items-center gap-4 text-xs font-mono text-neutral-400 pt-2">
                  <span>By {activeArticle.author}</span>
                  <span>{activeArticle.date}</span>
                </div>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-neutral-300 leading-relaxed font-sans">
                {activeArticle.content.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>

              <div className="pt-4 border-t border-neutral-800 flex items-center justify-between">
                <div className="flex flex-wrap gap-2">
                  {activeArticle.tags.map((t) => (
                    <span key={t} className="text-[10px] font-mono px-2 py-0.5 border border-neutral-700 text-neutral-400">
                      #{t}
                    </span>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => setActiveArticle(null)}
                  className="px-4 py-2 bg-white text-black font-bold text-xs uppercase hover:bg-neutral-200 transition"
                >
                  Close Reader
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
