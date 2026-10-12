import { GoogleGenAI } from '@google/genai';
import {
  SERVICES_DATA,
  PRODUCTS_DATA,
  PROJECTS_DATA,
  FAQ_DATA,
} from '@/data/tattvaData';

export interface ChatHistoryMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface AIQueryOptions {
  query: string;
  language?: 'en' | 'mr';
  history?: ChatHistoryMessage[];
}

export interface AIResponseResult {
  response: string;
  source: 'llm_api' | 'dynamic_nlp_engine';
  language: 'en' | 'mr';
  matchedContext?: string[];
  suggestedActions?: { label: string; href: string }[];
}

/**
 * Compiles comprehensive real-time knowledge base context from tattvaData.ts
 */
function buildSystemKnowledgeContext(): string {
  const servicesText = SERVICES_DATA.map(
    (s) => `[SERVICE] ${s.title} (${s.category}): ${s.shortDesc} Problem solved: ${s.problem}. Deliverables: ${s.deliverables.join(', ')}`
  ).join('\n');

  const productsText = PRODUCTS_DATA.map(
    (p) => `[PRODUCT] ${p.name} (${p.category}, ${p.status}): ${p.description}. Features: ${p.features.join(', ')}`
  ).join('\n');

  const projectsText = PROJECTS_DATA.map(
    (pr) => `[PROJECT] ${pr.title} (${pr.category}, ${pr.client}): ${pr.summary}. Technologies: ${pr.technologies.join(', ')}. Results: ${pr.results.join(', ')}`
  ).join('\n');

  const faqText = FAQ_DATA.map(
    (f) => `[FAQ] Q: ${f.question} | A: ${f.answer}`
  ).join('\n');

  return `
You are Tattva AI, the official intelligent digital consultant for Tattva Web Solutions.
Languages supported: English & Marathi (मराठी).

CORE BEHAVIOR RULES:
1. DEEPLY ANALYZE the user's specific context and intent before responding.
2. NEVER return a generic or identical boilerplate answer to every question.
3. PRICING INQUIRIES: Explain that pricing is value-driven and customized based on project scope, architectural complexity, feature set, and milestone timeline after an initial discovery consultation. Direct them to submit a project brief or schedule a call via the Contact page.
4. SERVICES INQUIRIES: If asked what services are offered, summarize our core engineering offerings (Custom Web Development, Software & SaaS, AI & LLMs, Workflow Automation, UI/UX Design, E-Commerce).
5. TECH STACK INQUIRIES: Clearly explain our stack: Next.js, React, TypeScript, Node.js, Express, Python for AI, PostgreSQL, and AWS/Vercel cloud deployments.
6. TIMELINE INQUIRIES: Explain typical turnaround times (2-4 weeks for modern websites, 6-12 weeks for complex software/SaaS), delivered in agile milestone sprints.
7. CUSTOM DEVELOPMENT INQUIRIES: Confirm bespoke capability (100% custom-built code without bloatware or rigid templates).
8. MARATHI INQUIRIES: If the query is in Marathi or the user asks for Marathi, respond fluently, respectfully, and professionally in Marathi.
9. Keep responses concise, direct, helpful, and under 130 words unless the user explicitly requests an exhaustive breakdown.

KNOWLEDGE BASE:
${servicesText}

${productsText}

${projectsText}

${faqText}
`.trim();
}

/**
 * Context-Aware Fallback Engine (when LLM is offline or unconfigured)
 * Provides distinct, tailored answers for pricing, services, tech stack, timelines, etc.
 */
function generateDynamicNLPResponse(query: string, language: 'en' | 'mr'): AIResponseResult {
  const qLower = query.toLowerCase();
  const isMarathi = language === 'mr' || /नमस्कार|सेवा|वेबसाईट|माहिती|प्रकल्प|किंमत|सॉफ्टवेअर|ॲप|कस्टम|दर|खर्च|कधी|कसे/.test(query);

  // 1. Pricing & Quotations
  if (/pric|cost|budget|quot|rate|fee|charge|how much|expens|किंमत|दर|खर्च|बजेट/.test(qLower)) {
    return {
      response: isMarathi
        ? 'तत्त्व वेब सोल्यूशन्समध्ये प्रत्येक प्रकल्पाची किंमत त्याच्या व्याप्ती (scope), तांत्रिक क्लिष्टता आणि आवश्यक वैशिष्ट्यांवर आधारित ठरवली जाते. प्राथमिक चर्चेनंतर आम्ही पारदर्शक बजेट आणि टप्पे असलेला सविस्तर प्रस्ताव देतो. आपल्या प्रकल्पाचा अंदाज घेण्यासाठी Contact पृष्ठावरून संपर्क साधा.'
        : 'At Tattva Web Solutions, pricing is fully customized rather than one-size-fits-all. It is determined by your project scope, technical complexity, feature requirements, and delivery milestones. Following an initial discovery session, we provide a transparent technical roadmap and milestone-based quotation. Reach out via our Contact page for a tailored proposal within 24 hours.',
      source: 'dynamic_nlp_engine',
      language: isMarathi ? 'mr' : 'en',
      suggestedActions: [
        { label: 'Request Proposal', href: '/contact' },
        { label: 'View Services', href: '/services' },
      ],
    };
  }

  // 2. Services Overview
  if (/what services|list services|offerings|capabilities|what do you do|what do you offer|काय सेवा|सेवांची माहिती/.test(qLower)) {
    return {
      response: isMarathi
        ? 'आम्ही पुढील प्रमुख डिजिटल इंजिनिअरिंग सेवा पुरवतो: १) कस्टम वेब डेव्हलपमेंट (Next.js/React), २) बिझनेस सॉफ्टवेअर व SaaS, ३) AI सोल्युशन्स व LLM एजंट्स, ४) वर्कफ्लो ऑटोमेशन, ५) UI/UX डिझाईन आणि ६) ई-कॉमर्स प्लॅटफॉर्म्स.'
        : 'Tattva Web Solutions delivers end-to-end digital engineering services: 1) Custom Web Development (high-speed Next.js/React), 2) Business Software & SaaS Architecture, 3) AI Agents & Multilingual Voice Solutions, 4) Business Workflow Automation, 5) Conversion UI/UX Design, and 6) Scalable E-commerce Platforms.',
      source: 'dynamic_nlp_engine',
      language: isMarathi ? 'mr' : 'en',
      suggestedActions: [
        { label: 'Explore Services', href: '/services' },
        { label: 'View Case Studies', href: '/projects' },
      ],
    };
  }

  // 3. Tech Stack
  if (/tech|stack|framework|technolog|language|next\.?js|react|python|node|डेटाबेस|तंत्रज्ञान/.test(qLower)) {
    return {
      response: isMarathi
        ? 'आम्ही आधुनिक तंत्रज्ञान वापरतो: फ्रंटएंडसाठी Next.js, React आणि TypeScript; बॅकएंडसाठी Node.js, Express आणि Python (AI मॉडेल्ससाठी); डेटाबेससाठी PostgreSQL व MongoDB; तसेच AWS व Vercel वर क्लाउड डिप्लॉयमेंट.'
        : 'Our engineering stack is built on modern, resilient technologies: Next.js, React, and TypeScript for the frontend; Node.js, Express, and Python for backend APIs and AI pipelines; PostgreSQL and Prisma for data; with automated cloud deployments on AWS and Vercel.',
      source: 'dynamic_nlp_engine',
      language: isMarathi ? 'mr' : 'en',
      suggestedActions: [
        { label: 'Case Studies', href: '/projects' },
        { label: 'Contact Us', href: '/contact' },
      ],
    };
  }

  // 4. Timelines
  if (/time|how long|deadline|duration|turnaround|schedule|कालावधी|वेळ/.test(qLower)) {
    return {
      response: isMarathi
        ? 'साधारणपणे बिझनेस वेबसाईट २ ते ४ आठवड्यांत, तर सविस्तर कस्टम सॉफ्टवेअर किंवा SaaS प्लॅटफॉर्म ६ ते १२ आठवड्यांत विकसित केले जाते. आम्ही प्रत्येक टप्प्यावर नियमित रिव्ह्यू देतो.'
        : 'Project timelines typically range from 2 to 4 weeks for conversion-focused web applications, and 6 to 12 weeks for enterprise SaaS or custom software platforms, delivered in transparent agile sprints.',
      source: 'dynamic_nlp_engine',
      language: isMarathi ? 'mr' : 'en',
      suggestedActions: [
        { label: 'Schedule Consultation', href: '/contact' },
      ],
    };
  }

  // 5. Custom Capabilities
  if (/custom|bespoke|tailored|unique|crm|erp|portal|dashboard|कस्टम|विशिष्ट/.test(qLower)) {
    return {
      response: isMarathi
        ? 'होय, आम्ही १००% कस्टम सॉफ्टवेअर आणि वेब ॲप्लिकेशन्स तयार करतो. तुमच्या व्यवसायाच्या अंतर्गत गरजांनुसार CRM, ERP किंवा AI एजंट्स विकसित केले जातात.'
        : 'Yes, absolutely! Every solution we engineer is 100% custom-built for your specific business logic. We avoid cookie-cutter templates to ensure lightning speed, clean architecture, and seamless integrations with your existing tools.',
      source: 'dynamic_nlp_engine',
      language: isMarathi ? 'mr' : 'en',
      suggestedActions: [
        { label: 'Discuss Your Project', href: '/contact' },
        { label: 'View Past Projects', href: '/projects' },
      ],
    };
  }

  // 6. Contact / Inquiry
  if (/contact|hire|email|phone|call|talk|reach|meeting|संपर्क|भेट/.test(qLower)) {
    return {
      response: isMarathi
        ? 'तुम्ही आमच्या Contact Us पृष्ठावरून थेट फॉर्म भरू शकता किंवा ईमेल पाठवू शकता. आमची टीम २४ तासांच्या आत सल्ला मसलत आणि प्रस्ताव घेऊन संपर्क साधेल.'
        : 'You can reach us directly through our Contact page, or talk to our AI voice consultant. Our engineering team reviews inquiries and responds with an actionable roadmap within 24 hours.',
      source: 'dynamic_nlp_engine',
      language: isMarathi ? 'mr' : 'en',
      suggestedActions: [
        { label: 'Go to Contact Page', href: '/contact' },
      ],
    };
  }

  // 7. General Contextual Fallback
  return {
    response: isMarathi
      ? 'तत्त्व वेब सोल्यूशन्समध्ये आपले स्वागत आहे! आम्ही आधुनिक वेब ॲप्स, कस्टम सॉफ्टवेअर आणि AI सोल्यूशन्स तयार करतो. आपल्या प्रकल्पाबद्दल किंवा सेवांबद्दल आपल्याला काय जाणून घ्यायचे आहे?'
      : 'Welcome to Tattva Web Solutions! We engineer high-performance web applications, bespoke business software, and intelligent AI agents. How can we assist your business goals today?',
    source: 'dynamic_nlp_engine',
    language: isMarathi ? 'mr' : 'en',
    suggestedActions: [
      { label: 'Explore Services', href: '/services' },
      { label: 'Submit Inquiry', href: '/contact' },
      { label: 'View Case Studies', href: '/projects' },
    ],
  };
}

const MAX_LLM_TIMEOUT_MS = 20000; // 20 seconds maximum thinking time

function withTimeout<T>(promise: Promise<T>, timeoutMs: number, errorMsg: string): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error(errorMsg)), timeoutMs);
    promise
      .then((res) => {
        clearTimeout(timer);
        resolve(res);
      })
      .catch((err) => {
        clearTimeout(timer);
        reject(err);
      });
  });
}

/**
 * Main AI Chatbot Entry Point
 */
export async function processAIQuery({
  query,
  language = 'en',
  history = [],
}: AIQueryOptions): Promise<AIResponseResult> {
  const apiKey = (process.env.GEMINI_API_KEY || process.env.OPENAI_API_KEY || process.env.LLM_API_KEY || '').trim();

  // If API key is configured, utilize Gemini model suite
  if (apiKey.length > 0) {
    const candidateModels = ['gemini-3.8-flash', 'gemini-3.5-flash-lite', 'gemini-2.5-flash'];
    const systemContext = buildSystemKnowledgeContext();
    const ai = new GoogleGenAI({ apiKey });

    // Format conversational history for context continuity
    const contents: Array<{ role: 'user' | 'model'; parts: Array<{ text: string }> }> = [];

    if (Array.isArray(history) && history.length > 0) {
      for (const h of history.slice(-6)) {
        if (h && typeof h.content === 'string' && h.content.trim()) {
          contents.push({
            role: h.role === 'assistant' ? 'model' : 'user',
            parts: [{ text: h.content.trim() }],
          });
        }
      }
    }

    contents.push({
      role: 'user',
      parts: [
        {
          text: `[SYSTEM CONTEXT & KNOWLEDGE BASE]\n${systemContext}\n\n[USER INQUIRY] (Preferred Language: ${language === 'mr' ? 'Marathi' : 'English'}):\n${query}`,
        },
      ],
    });

    for (const model of candidateModels) {
      try {
        const response = await withTimeout(
          ai.models.generateContent({
            model,
            contents,
          }),
          MAX_LLM_TIMEOUT_MS,
          `LLM thinking exceeded ${MAX_LLM_TIMEOUT_MS}ms`
        );

        const text = response.text || '';
        if (text.trim().length > 0) {
          const lowerQ = query.toLowerCase();
          const suggestedActions = lowerQ.includes('price') || lowerQ.includes('cost') || lowerQ.includes('contact') || lowerQ.includes('hire')
            ? [
                { label: 'Submit Project Inquiry', href: '/contact' },
                { label: 'Explore Services', href: '/services' },
              ]
            : [
                { label: 'Explore Services', href: '/services' },
                { label: 'View Case Studies', href: '/projects' },
                { label: 'Contact Team', href: '/contact' },
              ];

          return {
            response: text.trim(),
            source: 'llm_api',
            language: language === 'mr' ? 'mr' : 'en',
            suggestedActions,
          };
        }
      } catch (err: unknown) {
        const errorMsg = err instanceof Error ? err.message : String(err);
        console.warn(`[Tattva AI Engine] Model ${model} unavailable, falling back:`, errorMsg);
      }
    }
  }

  // Graceful fallback to Context-Aware NLP Engine
  return generateDynamicNLPResponse(query, language);
}
