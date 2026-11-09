import type { IconName } from '../components/icon/icon-names';

export interface PlanFeature {
  readonly text: string;
  readonly included: boolean;
}

export interface PlanAudience {
  readonly title: string;
  readonly description: string;
  readonly highlights: readonly string[];
  readonly icon: IconName;
}

export interface Plan {
  readonly id: 'solo' | 'practice' | 'clinic';
  readonly name: string;
  /** USD per month. Mirrored in the JSON-LD block of index.html (see content.spec.ts). */
  readonly price: number;
  readonly tagline: string;
  readonly popular: boolean;
  readonly features: readonly PlanFeature[];
  /** Copy for the "Who it's built for" section. */
  readonly audience: PlanAudience;
}

export const PLANS: readonly Plan[] = [
  {
    id: 'solo',
    name: 'Solo',
    price: 29,
    tagline: 'For one therapist in private practice.',
    popular: false,
    features: [
      { text: '1 therapist', included: true },
      { text: '50 sessions / month', included: true },
      { text: 'Speech-to-SOAP AI', included: true },
      { text: 'PDF export', included: true },
      { text: '1-year note storage', included: true },
      { text: 'Supervisor review', included: false },
      { text: 'EHR-compatible export', included: false },
      { text: 'BAA included', included: false }
    ],
    audience: {
      title: 'Solo Therapists',
      description:
        'Private practice clinicians who dictate between sessions and need accurate, structured notes without hiring administrative staff.',
      highlights: ['50 sessions / month', 'Speech-to-SOAP AI', 'PDF export', '1-year note storage'],
      icon: 'user'
    }
  },
  {
    id: 'practice',
    name: 'Practice',
    price: 79,
    tagline: 'For group practices — up to 5 therapists.',
    popular: true,
    features: [
      { text: 'Up to 5 therapists', included: true },
      { text: 'Unlimited sessions', included: true },
      { text: 'Speech-to-SOAP AI', included: true },
      { text: 'PDF export', included: true },
      { text: '7-year note storage', included: true },
      { text: 'Supervisor review', included: true },
      { text: 'Team analytics', included: true },
      { text: 'EHR-compatible export', included: true }
    ],
    audience: {
      title: 'Group Practices',
      description:
        'Multi-therapist offices that need supervisor review workflows, team analytics, and EHR-compatible export — up to 5 clinicians.',
      highlights: [
        'Up to 5 therapists',
        'Unlimited sessions',
        'Supervisor review',
        'Team analytics & EHR export'
      ],
      icon: 'users'
    }
  },
  {
    id: 'clinic',
    name: 'Clinic',
    price: 299,
    tagline: 'For clinics and institutions — up to 25 therapists.',
    popular: false,
    features: [
      { text: 'Up to 25 therapists', included: true },
      { text: 'Unlimited sessions', included: true },
      { text: 'Everything in Practice', included: true },
      { text: 'BAA included', included: true },
      { text: 'SSO / Active Directory', included: true },
      { text: 'Custom AI prompts', included: true },
      { text: 'Priority support', included: true },
      { text: 'Dedicated onboarding', included: true }
    ],
    audience: {
      title: 'Clinics & Institutions',
      description:
        'Large organizations requiring a Business Associate Agreement, SSO / Active Directory, custom AI prompts, and priority support — up to 25 clinicians.',
      highlights: [
        'Up to 25 therapists',
        'BAA included',
        'SSO / Active Directory',
        'Custom AI prompts'
      ],
      icon: 'building'
    }
  }
];
