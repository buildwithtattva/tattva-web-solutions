import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { siteConfig } from '@/lib/siteConfig';
import { Bot, Sparkles, Cpu, Zap, ShieldAlert, Terminal, MessageSquare, FileText, ArrowRight, Mic } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Autonomous AI Agents & Regional Voice Intelligence | Tattva',
  description:
    'Deploy autonomous AI agents, regional speech processing in Marathi and English, RAG document search pipelines, and custom LLM workflow integrations.',
  alternates: {
    canonical: `${siteConfig.url}/ai-solutions`,
  },
  openGraph: {
    title: 'Autonomous AI Agents & Regional Voice Intelligence | Tattva',
    description:
      'Integrating cutting-edge LLM reasoning engines, real-time speech processing (Marathi & English), RAG document search, and autonomous multi-agent pipelines.',
    url: `${siteConfig.url}/ai-solutions`,
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630, alt: 'Tattva AI Solutions' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Autonomous AI Agents & Regional Voice Intelligence | Tattva',
    description:
      'Integrating cutting-edge LLM reasoning engines, real-time speech processing (Marathi & English), RAG document search, and autonomous multi-agent pipelines.',
    images: [siteConfig.ogImage],
  },
};

export default function AISolutionsPage() {
  const jsonLdAI = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Tattva Autonomous AI Solutions & Multilingual Voice Agents',
    description:
      'Deploy autonomous AI agents, regional speech recognition in Marathi and English, RAG document vector search, and process automation webhooks.',
    provider: {
      '@type': 'Organization',
      name: siteConfig.name,
      url: siteConfig.url,
    },
    serviceType: 'Artificial Intelligence Engineering',
  };

  return (
    <div className="cyberpunk-page min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdAI) }}
      />
      <div className="max-w-7xl mx-auto space-y-12">
        {/* HERO HUD HEADER */}
        <div className="cyberpunk-card p-8 sm:p-12 relative overflow-hidden space-y-6 border border-cyan-500/50">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
            <Terminal className="w-4 h-4 text-cyan-400" />
            <span>SYS_SYS_AI_ENGINE // PROTOCOL_ONLINE</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white uppercase">
            Autonomous <span className="cyberpunk-neon-cyan">AI Agents</span> &{' '}
            <span className="cyberpunk-neon-magenta">Multilingual Intelligence</span>
          </h1>

          <p className="max-w-3xl text-slate-300 text-sm sm:text-base leading-relaxed">
            Integrating cutting-edge LLM reasoning engines, real-time speech processing (Marathi & English), RAG document search, and autonomous multi-agent pipelines into corporate business workflows.
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            <Link
              href="/contact"
              className="px-6 py-3 bg-cyan-400 text-slate-950 font-bold text-xs uppercase tracking-widest hover:bg-cyan-300 transition shadow-[0_0_20px_rgba(0,240,255,0.6)] flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            >
              <span>Deploy Custom AI Agent</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* FEATURED VOICE ASSISTANT DEMO HIGHLIGHT */}
        <div className="cyberpunk-card p-8 border-2 border-pink-500/60 bg-slate-950/90 relative space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-pink-950 border border-pink-500 text-pink-300 text-xs font-mono">
                <Mic className="w-4 h-4 animate-pulse" />
                <span>MARATHI & ENGLISH VOICE WIDGET</span>
              </div>
              <h2 className="text-2xl font-bold text-white uppercase">
                Interactive Site Voice Assistant (Tattva AI)
              </h2>
              <p className="text-xs text-slate-300 leading-relaxed">
                Experience natural speech recognition and contextual Q&A in Marathi (मराठी) and English directly on this website. Click the floating widget on the bottom right to activate voice input.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-slate-900 border border-cyan-500/40 text-center space-y-3 shrink-0">
              <Bot className="w-12 h-12 text-cyan-400 mx-auto animate-pulse" />
              <div className="text-xs font-mono text-cyan-300">WIDGET ACTIVE NOW</div>
              <p className="text-[10px] text-slate-400 max-w-[200px]">
                Click the bottom-right cyan widget to test speech capabilities live.
              </p>
            </div>
          </div>
        </div>

        {/* 6 AI CAPABILITY MODULES GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: 'Autonomous AI Agents',
              desc: 'Multi-agent architectures capable of web search, doc analysis, and task routing.',
              icon: <Bot className="w-6 h-6 text-cyan-400" />,
              code: 'AGENT_01_ACTIVE',
            },
            {
              title: 'Multilingual Voice AI',
              desc: 'Real-time Marathi & English speech processing for web widgets and hotline support.',
              icon: <MessageSquare className="w-6 h-6 text-pink-400" />,
              code: 'SPEECH_MR_EN',
            },
            {
              title: 'RAG Document Intelligence',
              desc: 'Vector embedding search across PDFs, contracts, and internal databases.',
              icon: <FileText className="w-6 h-6 text-emerald-400" />,
              code: 'VECTOR_DB_SEARCH',
            },
            {
              title: 'Process Automation',
              desc: 'Event-driven webhooks connecting LLM reasoning to WhatsApp and CRM APIs.',
              icon: <Zap className="w-6 h-6 text-amber-400" />,
              code: 'WORKFLOW_AUTO',
            },
            {
              title: 'Conversational Chatbots',
              desc: 'Stateful conversational flows tailored for lead capture and customer onboarding.',
              icon: <Sparkles className="w-6 h-6 text-purple-400" />,
              code: 'CHAT_INTEL_V2',
            },
            {
              title: 'Custom Fine-Tuning',
              desc: 'Domain-specific model optimization on proprietary business data with privacy guarantees.',
              icon: <Cpu className="w-6 h-6 text-cyan-400" />,
              code: 'MODEL_FINE_TUNE',
            },
          ].map((item, idx) => (
            <div key={idx} className="cyberpunk-card p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="p-3 bg-slate-950 border border-cyan-500/40 rounded-lg">{item.icon}</div>
                <span className="text-[10px] font-mono text-cyan-400">{item.code}</span>
              </div>
              <h3 className="text-lg font-bold text-white uppercase">{item.title}</h3>
              <p className="text-xs text-slate-300 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* AI PRIVACY & INTEGRATION BOUNDARY NOTICE */}
        <div className="p-6 bg-slate-950 border border-slate-800 text-xs space-y-2 text-slate-400 font-mono">
          <div className="flex items-center gap-2 text-cyan-400 font-bold">
            <ShieldAlert className="w-4 h-4 text-cyan-400" />
            <span>ETHICAL AI & USER PRIVACY DISCLOSURE</span>
          </div>
          <p>
            Tattva AI Assistant relies on client-side browser Web Speech API for voice recognition and local API endpoints for natural language responses. Audio is processed transparently without unauthorized remote telemetry.
          </p>
        </div>
      </div>
    </div>
  );
}
