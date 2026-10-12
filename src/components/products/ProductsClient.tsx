'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { PRODUCTS_DATA, ProductItem } from '@/data/tattvaData';
import { Search, ArrowRight, CheckCircle, X, Layers, ExternalLink } from 'lucide-react';

export function ProductsClient() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeModalProduct, setActiveModalProduct] = useState<ProductItem | null>(null);

  const categories = ['All', 'AI Agents', 'Document Intelligence', 'Automation'];

  const filteredProducts = PRODUCTS_DATA.filter((p) => {
    const matchesCat = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesQuery =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  return (
    <div className="morphing-page min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight">
            Products & Software Solutions
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Data-driven product architectures with fluid shape transformations and interactive feature explorations.
          </p>
        </div>

        {/* Filters & Search Controls */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-slate-900/60 backdrop-blur-md p-4 rounded-2xl border border-slate-800">
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all focus:outline-none focus:ring-2 focus:ring-purple-400 ${
                  selectedCategory === cat
                    ? 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-lg'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              aria-label="Search software products"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400"
            />
          </div>
        </div>

        {/* Product Cards Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-slate-900/40 rounded-3xl border border-slate-800 p-8 space-y-3">
            <Layers className="w-12 h-12 text-slate-600 mx-auto" />
            <h3 className="text-lg font-bold text-white">No Matching Products Found</h3>
            <p className="text-xs text-slate-400">Try adjusting your search query or filter selection.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="morphing-card p-6 flex flex-col justify-between space-y-6 relative overflow-hidden group cursor-pointer"
                onClick={() => setActiveModalProduct(product)}
              >
                {/* Background morphing shape element */}
                <div
                  className="morphing-shape absolute -right-10 -bottom-10 w-40 h-40 opacity-20 pointer-events-none"
                  style={{ background: product.imageBg }}
                />

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">
                      {product.status}
                    </span>
                    <span className="text-[11px] font-mono text-slate-400">{product.category}</span>
                  </div>

                  <h2 className="text-xl font-bold text-white group-hover:text-purple-300 transition">
                    {product.name}
                  </h2>
                  <p className="text-xs text-purple-200/80 font-medium">{product.tagline}</p>
                  <p className="text-slate-300 text-xs leading-relaxed line-clamp-3">
                    {product.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                  <span className="text-xs font-semibold text-purple-400 group-hover:underline">
                    View Product Details
                  </span>
                  <ArrowRight className="w-4 h-4 text-purple-400 group-hover:translate-x-1 transition" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* MORPHING PRODUCT DETAIL MODAL */}
        {activeModalProduct && (
          <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
            <div className="morphing-card max-w-xl w-full p-8 relative space-y-6 bg-slate-900 border-2 border-purple-500/40 shadow-2xl text-slate-200 animate-in fade-in zoom-in-95 duration-200">
              <button
                type="button"
                aria-label="Close product detail modal"
                onClick={() => setActiveModalProduct(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-2">
                <span className="text-xs font-mono text-purple-400 uppercase tracking-widest">
                  {activeModalProduct.category} • {activeModalProduct.status}
                </span>
                <h2 className="text-2xl font-bold text-white">{activeModalProduct.name}</h2>
                <p className="text-xs text-purple-300 font-medium">{activeModalProduct.tagline}</p>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                {activeModalProduct.description}
              </p>

              <div className="space-y-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Key Features:</h3>
                <ul className="space-y-1.5 text-xs text-slate-200">
                  {activeModalProduct.features.map((feat, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-purple-400" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setActiveModalProduct(null)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-medium hover:bg-slate-700 transition"
                >
                  Close
                </button>
                <Link
                  href="/contact"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-bold text-xs flex items-center gap-2 shadow-lg hover:opacity-95 transition"
                >
                  <span>Request Access / Demo</span>
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
