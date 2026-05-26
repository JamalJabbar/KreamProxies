export type Product = {
  name: string
  tone: string
  eyebrow: string
  price: string
  description: string
  bullets: string[]
}

export type UseCase = {
  title: string
  description: string
  accent: string
}

export type Metric = {
  value: string
  label: string
  detail: string
}

export type Faq = {
  question: string
  answer: string
}

export const products: Product[] = [
  {
    name: 'Residential Swirl',
    tone: 'strawberry',
    eyebrow: 'Rotating + sticky',
    price: 'from $3.80 / GB',
    description: 'Real household IPs for checkouts, scraping, market research, and regional testing.',
    bullets: ['195+ countries', 'Sticky sessions to 120m', 'Instant endpoint generation']
  },
  {
    name: 'Mobile Sherbet',
    tone: 'mint',
    eyebrow: '4G / 5G carrier trust',
    price: 'from $4.40 / GB',
    description: 'Carrier-grade routes for harder targets where account trust and device reputation matter.',
    bullets: ['US and global carriers', 'Rotation controls', 'High-trust ASN mix']
  },
  {
    name: 'ISP Vanilla',
    tone: 'vanilla',
    eyebrow: 'Static residential',
    price: 'from $2.95 / proxy',
    description: 'Dedicated ISP endpoints with residential reputation and datacenter-like stability.',
    bullets: ['Static IPs', 'Unlimited-session tasks', 'Private allocation']
  },
  {
    name: 'Datacenter Crunch',
    tone: 'blueberry',
    eyebrow: 'Speed-first pool',
    price: 'from $1.20 / GB',
    description: 'Fast rotating datacenter IPs for volume workloads that need throughput over stealth.',
    bullets: ['Low-latency routing', 'Bulk generation', 'Concurrent tasks']
  },
  {
    name: 'Retail Float',
    tone: 'pistachio',
    eyebrow: 'Drop-ready routing',
    price: 'custom plans',
    description: 'A tuned bundle for sneaker drops, retail monitors, queue holds, and launch-day bursts.',
    bullets: ['Bot-friendly exports', 'Site templates', 'Discord support']
  }
]

export const useCases: UseCase[] = [
  {
    title: 'Sneaker drops',
    description: 'Queue, monitor, and checkout with regional pools tuned for high-pressure releases.',
    accent: 'strawberry'
  },
  {
    title: 'Retail automation',
    description: 'Run restock monitors, account workflows, and marketplace checks without burning one pool.',
    accent: 'pistachio'
  },
  {
    title: 'Web scraping',
    description: 'Rotate clean routes, keep per-domain usage visible, and scale collection jobs by region.',
    accent: 'blueberry'
  },
  {
    title: 'Ad verification',
    description: 'Preview placements, search results, and localized pages from the markets your customers see.',
    accent: 'vanilla'
  }
]

export const metrics: Metric[] = [
  {
    value: '99.97%',
    label: '30-day uptime',
    detail: 'Monitored gateway availability'
  },
  {
    value: '195+',
    label: 'Target countries',
    detail: 'Residential and mobile routing'
  },
  {
    value: '250K',
    label: 'Endpoints / batch',
    detail: 'Generated from one dashboard'
  },
  {
    value: '120m',
    label: 'Sticky sessions',
    detail: 'Stable IP windows for account tasks'
  }
]

export const faqs: Faq[] = [
  {
    question: 'Do prepaid GB expire?',
    answer: 'No. Kream balance stays on the account, so teams can buy before a busy launch week and use it when traffic arrives.'
  },
  {
    question: 'Can I use sticky and rotating sessions together?',
    answer: 'Yes. Generate rotating endpoints for broad collection work, then switch to sticky session IDs when a workflow needs continuity.'
  },
  {
    question: 'What support channel is fastest?',
    answer: 'Discord tickets are the fastest route. The page is written for operators who need a real answer during active retail or scraping windows.'
  },
  {
    question: 'Is this only for sneaker bots?',
    answer: 'No. Sneaker workflows are one use case. Kream also supports compliant scraping, retail monitoring, ad QA, and geo-testing.'
  }
]

export const workflow = [
  'Choose a flavor: residential, mobile, ISP, datacenter, or a retail bundle.',
  'Generate exactly the endpoint format your tools need: user/pass, sticky, country, state, or city.',
  'Watch bandwidth, domains, and session health from one compact control plane.'
]

export const flavorTags = [
  'Residential',
  'Mobile',
  'ISP',
  'Datacenter',
  'Sneakers',
  'Retail',
  'Scraping',
  'Ad QA',
  'Social QA',
  'Geo testing'
]
