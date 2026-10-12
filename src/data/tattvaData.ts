export interface ServiceItem {
  id: string;
  title: string;
  category: string;
  shortDesc: string;
  fullDesc: string;
  problem: string;
  benefit: string;
  deliverables: string[];
  iconName: string;
  badge: string;
}

export interface ProductItem {
  id: string;
  name: string;
  tagline: string;
  category: string;
  description: string;
  features: string[];
  status: 'Available' | 'Beta' | 'In Development';
  demoUrl?: string;
  imageBg: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  client: string;
  summary: string;
  challenge: string;
  solution: string;
  results: string[];
  technologies: string[];
  status: 'Internal Concept' | 'Delivered Client Work' | 'Live Production Demo';
  demoUrl?: string;
  imageAccent: string;
  year: string;
}

export interface BlogArticle {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string[];
  category: string;
  readTime: string;
  date: string;
  author: string;
  tags: string[];
}

export interface FAQItem {
  id: string;
  category: 'General' | 'Development' | 'AI & Automation' | 'Pricing & Engagement';
  question: string;
  answer: string;
}

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'web-dev',
    title: 'Web Development',
    category: 'Core Engineering',
    shortDesc: 'High-performance business websites and custom web applications tailored for scalability.',
    fullDesc: 'We craft hyper-responsive, modern web applications leveraging Next.js, React, and cloud-native backends.',
    problem: 'Slow loading times, outdated UI templates, and poor mobile conversions hurting brand growth.',
    benefit: 'Sub-second load times, 95+ Lighthouse scores, and conversion-optimized visual hierarchy.',
    deliverables: ['Custom Next.js Frontend', 'Headless CMS / API Integration', 'SEO & Performance Optimization', 'Mobile-First Responsive Design'],
    iconName: 'Globe',
    badge: 'Popular'
  },
  {
    id: 'software-dev',
    title: 'Software Development',
    category: 'Enterprise Solutions',
    shortDesc: 'Custom business software, SaaS platforms, internal dashboards, and scalable API ecosystems.',
    fullDesc: 'From complex ERP systems to streamlined custom CRM software, we build resilient software architectures.',
    problem: 'Off-the-shelf software tools failing to adapt to unique internal business workflows.',
    benefit: 'Tailor-made software aligned 100% with operational needs, eliminating manual workarounds.',
    deliverables: ['SaaS Platform Engineering', 'REST & GraphQL API Suites', 'Database Architecture & Security', 'Cloud Deployment & Monitoring'],
    iconName: 'Cpu',
    badge: 'Enterprise'
  },
  {
    id: 'ai-solutions',
    title: 'AI Solutions & LLMs',
    category: 'Artificial Intelligence',
    shortDesc: 'Intelligent AI agents, custom voice assistants, document intelligence, and semantic search.',
    fullDesc: 'Integrating state-of-the-art LLMs, custom fine-tuning, and RAG pipelines to automate decision making.',
    problem: 'Unstructured business data and repetitive customer support queries wasting team bandwidth.',
    benefit: '24/7 automated support, intelligent document extraction, and real-time contextual recommendations.',
    deliverables: ['Multilingual AI Voice & Chat Assistants', 'RAG Document Search Pipelines', 'Custom LLM API Integrations', 'Automated Decision Workflow Engines'],
    iconName: 'Sparkles',
    badge: 'Next-Gen'
  },
  {
    id: 'automation',
    title: 'Workflow Automation',
    category: 'Process Optimization',
    shortDesc: 'Intelligent process automation connecting your CRM, payment gateways, and data pipelines.',
    fullDesc: 'Eliminate repetitive manual data entry by crafting event-driven automated workflows.',
    problem: 'Siloed applications requiring redundant manual data entry across teams.',
    benefit: '90% reduction in manual data tasks and zero human copy-paste errors.',
    deliverables: ['Zapier & Make Custom Webhooks', 'API Microservices & Webhooks', 'Automated Email & Invoice Pipelines', 'Real-Time Sync Systems'],
    iconName: 'Zap',
    badge: 'High ROI'
  },
  {
    id: 'ui-ux-design',
    title: 'UI/UX Design',
    category: 'Product Design',
    shortDesc: 'User journey mapping, wireframing, high-fidelity prototypes, and cohesive design systems.',
    fullDesc: 'We design intuitive visual experiences with distinct visual identities tailored to targeted audiences.',
    problem: 'Cluttered interfaces confusing users and driving high bounce rates.',
    benefit: 'Delightful user journeys, accessible interface components, and rapid prototyping.',
    deliverables: ['Complete Design Systems', 'Interactive Figma Prototypes', 'Accessibility (WCAG 2.1) Audits', 'User Journey Maps'],
    iconName: 'Palette',
    badge: 'Creative'
  },
  {
    id: 'ecommerce-dev',
    title: 'E-commerce Development',
    category: 'Digital Commerce',
    shortDesc: 'High-converting online stores with custom cart engines and seamless payment integrations.',
    fullDesc: 'Building fast, secure storefronts with custom checkout experiences, inventory sync, and analytics.',
    problem: 'High cart abandonment rates caused by clunky checkout flows and slow mobile pages.',
    benefit: 'Frictionless purchasing flows, instant payment processing, and automated order updates.',
    deliverables: ['Custom Storefronts & Shopify Apps', 'Razorpay & Stripe Payment Integrations', 'Real-Time Inventory Management', 'Conversion Rate Optimization'],
    iconName: 'ShoppingBag',
    badge: 'Growth'
  },
  {
    id: 'digital-transform',
    title: 'Digital Transformation',
    category: 'Strategic Tech',
    shortDesc: 'Modernization of legacy systems, cloud migration, and end-to-end digital process audit.',
    fullDesc: 'Empowering traditional businesses to transition into agile, cloud-first digital organizations.',
    problem: 'Legacy desktop tools and paper processes slowing down business scale.',
    benefit: 'Future-proof tech stack, remote accessibility, and operational agility.',
    deliverables: ['Legacy Codebase Refactoring', 'Cloud Architecture Migration', 'Digital Process Audits', 'Team Tech Onboarding'],
    iconName: 'RefreshCw',
    badge: 'Strategy'
  }
];

export const PRODUCTS_DATA: ProductItem[] = [
  {
    id: 'tattva-voice-ai',
    name: 'Tattva Voice Assistant',
    tagline: 'Multilingual Conversational AI Widget',
    category: 'AI Agents',
    description: 'An embeddable voice and text assistant that understands regional languages including Marathi & English. Designed for business websites to qualify leads and capture customer inquiries.',
    features: ['Real-time Marathi & English Speech Processing', 'Contextual Knowledge Base Integration', 'Lead Qualification & CRM Sync', 'Zero External Plugin Dependency'],
    status: 'Beta',
    imageBg: 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 50%, #8b5cf6 100%)'
  },
  {
    id: 'tattva-docu-mind',
    name: 'Tattva DocuMind',
    tagline: 'AI Document Extraction & Semantic Search Engine',
    category: 'Document Intelligence',
    description: 'Upload complex PDFs, invoices, and contracts to automatically extract structured data and execute natural language queries across thousands of documents.',
    features: ['OCR & Layout Recognition', 'Vector Embedding Search', 'Automated JSON/CSV Export', 'Role-Based Access Control'],
    status: 'In Development',
    imageBg: 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 50%, #6366f1 100%)'
  },
  {
    id: 'tattva-flow-hub',
    name: 'Tattva FlowHub',
    tagline: 'Event-Driven Micro-Automation Engine',
    category: 'Automation',
    description: 'A lightweight automation broker connecting custom webhooks, WhatsApp Business APIs, and PostgreSQL databases with automated retry logic.',
    features: ['Visual Workflow Builder', 'Encrypted Webhook Receiver', 'WhatsApp & SMS Alert Dispatcher', 'Audit Trail & Analytics'],
    status: 'Available',
    imageBg: 'linear-gradient(135deg, #10b981 0%, #059669 50%, #047857 100%)'
  }
];

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: 'proj-luxe-salon',
    title: 'Aura Luxe Beauty Salon',
    category: 'Beauty Salon websites',
    client: 'Aura Salon & Spa',
    summary: 'A sleek, appointment-booking web application for a premier beauty salon with real-time stylist availability.',
    challenge: 'High phone call volume for booking causing double bookings and missed appointments.',
    solution: 'Designed an interactive booking portal with automated WhatsApp appointment reminders.',
    results: ['+140% Online Bookings', 'Zero Double-Bookings', '4.9/5 Rating from Clients'],
    technologies: ['Next.js', 'Tailwind CSS', 'PostgreSQL', 'Twilio API'],
    status: 'Delivered Client Work',
    demoUrl: '#',
    imageAccent: '#ec4899',
    year: '2025'
  },
  {
    id: 'proj-artisan-cafe',
    title: 'Velvet Brew Café & Roastery',
    category: 'Café websites',
    client: 'Velvet Brew Co.',
    summary: 'An aesthetic digital menu and online ordering platform built with warm typography and micro-interactions.',
    challenge: 'Printed paper menus needed frequent updates due to seasonal single-origin coffee arrivals.',
    solution: 'Engineered a QR-code instant menu app with real-time stock toggles and table-side ordering.',
    results: ['+35% Average Table Order Value', 'Instant Menu Updates', 'Sub-second Load Times'],
    technologies: ['React', 'CSS Modules', 'Node.js', 'Framer Motion'],
    status: 'Live Production Demo',
    demoUrl: '#',
    imageAccent: '#d97706',
    year: '2025'
  },
  {
    id: 'proj-apex-dental',
    title: 'Apex Smile Dental Clinic',
    category: 'Dental clinic websites',
    client: 'Dr. Deshmukh Dental Care',
    summary: 'A high-trust medical portal featuring patient booking, pre-treatment guides, and emergency consult requests.',
    challenge: 'Patients found medical forms tedious and lacked clear pre-procedure instructions.',
    solution: 'Created an accessible patient portal with interactive procedure visualizers and digital intake forms.',
    results: ['+80% Digital Intake Completion', '99.8% Uptime', 'WCAG AAA Accessibility'],
    technologies: ['Next.js', 'TypeScript', 'Prisma', 'Tailwind CSS'],
    status: 'Delivered Client Work',
    demoUrl: '#',
    imageAccent: '#0ea5e9',
    year: '2024'
  },
  {
    id: 'proj-titan-gym',
    title: 'Titan Forge Fitness Gym',
    category: 'Gym websites',
    client: 'Titan Fitness Club',
    summary: 'A high-energy gym portal with membership tier selectors, trainer profiles, and workout class schedules.',
    challenge: 'Low lead conversion on general membership inquiry forms.',
    solution: 'Built a dynamic membership calculator with instant day-pass booking and virtual facility tour.',
    results: ['+210% Day-Pass Downloads', '3x Higher Lead Conversion', '4.8 Star User Feedback'],
    technologies: ['Next.js', 'Vanilla CSS', 'Express.js'],
    status: 'Live Production Demo',
    demoUrl: '#',
    imageAccent: '#ef4444',
    year: '2025'
  },
  {
    id: 'proj-ai-agent-desk',
    title: 'Intelligent AI Support Desk',
    category: 'AI-agent projects',
    client: 'Tattva R&D',
    summary: 'An autonomous multi-agent system that triages inbound customer inquiries, reads documentation, and drafts verified responses.',
    challenge: 'Customer support teams overloaded with repetitive technical questions.',
    solution: 'Deployed a dual-agent workflow: Agent 1 parses docs, Agent 2 validates answer precision before response.',
    results: ['75% First-Contact Resolution', '<5sec Average Response Time'],
    technologies: ['Python', 'LangChain', 'Next.js', 'FastAPI'],
    status: 'Internal Concept',
    demoUrl: '#',
    imageAccent: '#8b5cf6',
    year: '2026'
  },
  {
    id: 'proj-business-suite',
    title: 'OmniBiz Operations ERP',
    category: 'Business websites',
    client: 'Global Trade Logistics',
    summary: 'A custom web ERP solution for real-time inventory tracking, dispatch schedules, and invoice generation.',
    challenge: 'Fragmented spreadsheets leading to dispatch errors and delayed invoicing.',
    solution: 'Centralized ops dashboard with automated PDF invoice creation and live driver tracking.',
    results: ['+40% Operational Efficiency', 'Zero Invoice Discrepancies'],
    technologies: ['React', 'TypeScript', 'Node.js', 'MongoDB'],
    status: 'Delivered Client Work',
    demoUrl: '#',
    imageAccent: '#10b981',
    year: '2025'
  }
];

export const BLOG_DATA: BlogArticle[] = [
  {
    id: 'blog-1',
    slug: 'why-custom-web-development-outperforms-generic-templates',
    title: 'Why Custom Web Development Outperforms Generic Page Builders in 2026',
    excerpt: 'Generic templates look easy at first, but bloat, slow speed, and rigid code ruin your long-term growth. Here is why bespoke code wins.',
    content: [
      'In today’s competitive digital landscape, a business website is no longer just a static brochure—it is your primary sales engine, brand ambassador, and customer portal.',
      'While off-the-shelf website builders promise quick setups, they ship with megabytes of unneeded JavaScript, generic layouts, and terrible mobile performance. Every extra second of page load time reduces conversions by up to 20%.',
      'At Tattva Web Solutions, we engineer custom Next.js web applications that score 95+ on Lighthouse out of the box. By writing clean code tailored specifically to your business workflows, your site stays blazing fast, secure, and easily scalable.'
    ],
    category: 'Web Engineering',
    readTime: '4 min read',
    date: 'October 8, 2026',
    author: 'Tattva Engineering Team',
    tags: ['Web Development', 'Performance', 'Next.js', 'SEO']
  },
  {
    id: 'blog-2',
    slug: 'building-practical-ai-agents-for-small-and-medium-enterprises',
    title: 'Building Practical AI Agents for SMEs: Beyond the Hype',
    excerpt: 'AI is not just for mega-corporations. How small and medium enterprises can implement simple, high-impact AI tools today.',
    content: [
      'Artificial intelligence is transforming business operations, but many small businesses feel overwhelmed by the technical complexity and cost.',
      'The reality is that you do not need a multi-million dollar AI budget. Modern LLM APIs, fine-tuning, and semantic search allow SMEs to build practical tools that yield instant ROI.',
      'Key high-impact AI use cases include: 24/7 customer service voice/chat widgets in local languages (like Marathi and English), automated document data extraction, and smart lead qualification routing.'
    ],
    category: 'AI & Automation',
    readTime: '6 min read',
    date: 'September 24, 2026',
    author: 'Tattva AI Research',
    tags: ['AI Agents', 'Automation', 'Voice AI', 'Business']
  },
  {
    id: 'blog-3',
    slug: 'the-art-of-page-specific-ui-design-systems',
    title: 'The Art of Page-Specific UI Design Systems: Breaking the Monolith',
    excerpt: 'Why applying the exact same design layout to every single page makes your web app feel generic, and how distinct UI visual languages elevate your brand.',
    content: [
      'Many contemporary websites suffer from layout fatigue—every page uses identical card borders, identical gray backgrounds, and identical rounded buttons.',
      'By establishing dedicated visual aesthetics tailored to each page context—such as Liquid Chrome for futuristic impact, Newspaper for editorial authority, and Cyberpunk for cutting-edge AI—you create an unforgettable brand narrative.',
      'In this article, we showcase how Tattva Web Solutions crafts distinct page visual styles while preserving core brand harmony across typography and logo guidelines.'
    ],
    category: 'UI/UX Design',
    readTime: '5 min read',
    date: 'September 12, 2026',
    author: 'Tattva Design Studio',
    tags: ['UI/UX', 'Design Systems', 'Web Aesthetics', 'Frontend']
  }
];

export const FAQ_DATA: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'General',
    question: 'What services does Tattva Web Solutions provide?',
    answer: 'Tattva Web Solutions delivers end-to-end digital engineering services including custom Web Development, Business Software Development, AI Solutions & Agents, Workflow Automation, UI/UX Design, E-commerce Platforms, and Digital Transformation.'
  },
  {
    id: 'faq-2',
    category: 'Development',
    question: 'What technologies do you use to build websites and software?',
    answer: 'We leverage modern tech stacks centered around Next.js, React, TypeScript, Node.js, Express, Python for AI workflows, PostgreSQL, and cloud deployments (Vercel, AWS, Cloudflare). We prioritize speed, security, and accessibility.'
  },
  {
    id: 'faq-3',
    category: 'AI & Automation',
    question: 'Can your AI assistant converse in regional languages like Marathi?',
    answer: 'Yes! Tattva AI Assistant is designed to support multilingual conversations including English and Marathi. It assists website visitors in understanding services, requesting quotes, and answering business FAQs.'
  },
  {
    id: 'faq-4',
    category: 'Pricing & Engagement',
    question: 'How do project timelines and engagements work at Tattva?',
    answer: 'We offer flexible engagement models tailored to project scope. After an initial discovery session, we provide a clear roadmap with fixed milestones, transparent pricing, and regular client review updates.'
  },
  {
    id: 'faq-5',
    category: 'Development',
    question: 'Will my website be mobile-responsive and SEO-optimized?',
    answer: '100% yes. All Tattva websites are engineered mobile-first with sub-second load targets, clean semantic HTML, structured metadata, and responsive visual layouts tested across all screen sizes.'
  },
  {
    id: 'faq-6',
    category: 'Pricing & Engagement',
    question: 'How can I request a project proposal or consultation?',
    answer: 'You can submit an inquiry through our Contact Us page, talk directly with our AI Voice Assistant on the site, or email us. Our team responds within 24 hours with an actionable consultation plan.'
  }
];
