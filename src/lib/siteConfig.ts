export const siteConfig = {
  name: 'Tattva Web Solutions',
  shortName: 'Tattva',
  description:
    'Tattva Web Solutions crafts custom high-performance websites, enterprise SaaS software, autonomous AI agents, and intelligent process automation.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://tattvawebsolutions.com',
  ogImage: '/og-image.png',
  locale: 'en_US',
  email: 'tattvawebsolutions@gmail.com',
  phone: '+91 9226885831',
  themeColor: '#020617',
};

export type SiteConfig = typeof siteConfig;
