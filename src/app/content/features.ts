import type { IconName } from '../components/icon/icon-names';
import type { Tone } from './tones';

export interface Feature {
  readonly icon: IconName;
  readonly tone: Tone;
  readonly title: string;
  readonly description: string;
}

export const FEATURES: readonly Feature[] = [
  {
    icon: 'shield',
    tone: 'accent',
    title: 'Designed to Support HIPAA',
    description:
      'AES-256-GCM encryption on every PHI field at the database level. Keys live in Azure Key Vault. An append-only audit log is retained for 6 years — not an add-on, built in from day one.'
  },
  {
    icon: 'sign',
    tone: 'success',
    title: 'MFA-Gated Electronic Signature',
    description:
      'Sign any note only after two-factor verification. Each signature stores a SHA-256 hash of the content at the moment of signing. Revoke with a reason, or attach a linked addendum to a signed note.'
  },
  {
    icon: 'search',
    tone: 'warning',
    title: 'Full-Text Search',
    description:
      'Search across all four SOAP sections in every note instantly. Find any session by keyword, patient name, or ICD-10 diagnosis code. No manual indexing required.'
  },
  {
    icon: 'file',
    tone: 'danger',
    title: 'PDF Export',
    description:
      'Export any signed note as a formatted PDF — ready for records requests, supervision, or care coordination. Includes therapist info, license, signature, and full audit trail.'
  },
  {
    icon: 'grid',
    tone: 'purple',
    title: 'Practice Dashboard',
    description:
      'Session counts, note totals, subscription status, and last activity — your whole practice at a glance, updated in real time. Monitor usage across your entire team from one screen.'
  },
  {
    icon: 'trash',
    tone: 'accent',
    title: 'Automatic Audio Deletion',
    description:
      'Audio files are physically deleted from cloud storage the moment transcription completes — supporting the HIPAA minimum necessary standard with no manual action needed.'
  }
];
