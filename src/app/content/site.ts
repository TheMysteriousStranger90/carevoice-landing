/**
 * Site-wide copy and configuration. Anything that appears in more than one
 * component (section names, launch timing, contact points, claims) lives here.
 */

export const LAUNCH = {
  /**
   * Target launch moment, in UTC so every visitor counts down to the same
   * instant. This is a target, not a promise – the UI says so.
   */
  targetDateIso: '2027-03-01T00:00:00Z',
  /** Human-readable window used in badges and body copy. */
  label: 'Early 2027',
  chip: 'Launching 2027',
  quarterLabel: 'Q1 2027'
} as const;

export const CONTACT = {
  compliance: 'compliance@carevoice.io'
} as const;

/** One name per section, used by the navbar, footer and section headings. */
export const SECTIONS = {
  who: { id: 'who-its-for', label: 'Who it’s for' },
  howItWorks: { id: 'how-it-works', label: 'How it works' },
  soap: { id: 'soap-format', label: 'SOAP format' },
  features: { id: 'features', label: 'Features' },
  pricing: { id: 'pricing', label: 'Pricing' },
  security: { id: 'security', label: 'Security' },
  progress: { id: 'progress', label: 'Progress' },
  waitlist: { id: 'waitlist', label: 'Join waitlist' }
} as const;

export interface NavLink {
  readonly label: string;
  readonly fragment: string;
}

export const NAV_LINKS: readonly NavLink[] = [
  { label: SECTIONS.features.label, fragment: SECTIONS.features.id },
  { label: 'How It Works', fragment: SECTIONS.howItWorks.id },
  { label: SECTIONS.pricing.label, fragment: SECTIONS.pricing.id },
  { label: SECTIONS.security.label, fragment: SECTIONS.security.id },
  { label: SECTIONS.progress.label, fragment: SECTIONS.progress.id }
];

export interface FooterLink {
  readonly label: string;
  /** In-page anchor on the home page. */
  readonly fragment?: string;
  /** Separate route (legal pages). */
  readonly route?: string;
}

export interface FooterGroup {
  readonly title: string;
  readonly links: readonly FooterLink[];
}

/** Every link points at its own target – no two labels share an anchor. */
export const FOOTER_GROUPS: readonly FooterGroup[] = [
  {
    title: 'Product',
    links: [
      { label: SECTIONS.features.label, fragment: SECTIONS.features.id },
      { label: 'How It Works', fragment: SECTIONS.howItWorks.id },
      { label: SECTIONS.pricing.label, fragment: SECTIONS.pricing.id },
      { label: SECTIONS.progress.label, fragment: SECTIONS.progress.id },
      { label: SECTIONS.waitlist.label, fragment: SECTIONS.waitlist.id }
    ]
  },
  {
    title: 'For Clinicians',
    links: [
      { label: SECTIONS.who.label, fragment: SECTIONS.who.id },
      { label: 'SOAP Documentation', fragment: SECTIONS.soap.id }
    ]
  },
  {
    title: 'Compliance',
    links: [
      { label: 'Security Overview', fragment: SECTIONS.security.id },
      { label: 'HIPAA Notice', route: '/hipaa' }
    ]
  }
];

export const AUTHOR = {
  name: 'Bohdan Harabadzhyu (Bogdan Garabagiu)',
  website: 'https://bohdan-harabadzhyu-homepage.vercel.app/',
  github: 'https://github.com/TheMysteriousStranger90',
  email: 'bohdan_harabadzhyu@outlook.com'
} as const;

/**
 * Wording for compliance-related claims. HIPAA compliance is not something a
 * product can be "certified" for, so copy says what the product is built to do.
 */
export const COMPLIANCE_COPY = {
  badge: 'Built to support HIPAA',
  tagline: 'Built to support HIPAA compliance.',
  baaNote:
    'A Business Associate Agreement (BAA) is currently included with the Clinic plan only. HIPAA requires a BAA before a covered entity shares patient data with a vendor, so if you are on another plan, contact us about BAA options before using CareVoice with real patient data.'
} as const;
