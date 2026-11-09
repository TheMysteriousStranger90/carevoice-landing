import type { IconName } from '../components/icon/icon-names';
import type { Tone } from './tones';

export interface SecurityItem {
  readonly icon: IconName;
  readonly tone: Tone;
  readonly title: string;
  readonly description: string;
}

export interface SecurityBadge {
  readonly icon: IconName;
  readonly text: string;
}

export const SECURITY_ITEMS: readonly SecurityItem[] = [
  {
    icon: 'lock',
    tone: 'accent',
    title: 'AES-256-GCM Encryption',
    description:
      'Every PHI field is encrypted at the database level with AES-256-GCM — authenticated encryption providing both confidentiality and integrity. Each value carries a unique 12-byte random nonce.'
  },
  {
    icon: 'shield',
    tone: 'warning',
    title: 'Azure Key Vault',
    description:
      'Encryption keys are stored in Azure Key Vault — never in your database or code. Key rotation is zero-downtime. In development, a safe local key is used automatically.'
  },
  {
    icon: 'device',
    tone: 'success',
    title: 'TOTP Multi-Factor Auth',
    description:
      'Every user sign-in can be protected by TOTP (RFC 6238) compatible with Google Authenticator. Email OTP and 8 one-time backup codes are also supported.'
  },
  {
    icon: 'activity',
    tone: 'purple',
    title: '6-Year Audit Log',
    description:
      'An append-only audit log records every access and modification to PHI — retained for 6 years as required by HIPAA. Logs are immutable and cannot be deleted by users.'
  },
  {
    icon: 'send',
    tone: 'accent',
    title: 'TLS 1.3 in Transit',
    description:
      'All data in transit is protected with TLS 1.3. HSTS preload is enforced in production. Inter-service communication within the platform also uses encrypted connections.'
  },
  {
    icon: 'trash',
    tone: 'danger',
    title: 'Automatic Audio Deletion',
    description:
      'Session audio is permanently deleted from Azure Blob Storage immediately after transcription completes — minimizing PHI exposure and supporting the HIPAA minimum necessary standard.'
  }
];

export const SECURITY_BADGES: readonly SecurityBadge[] = [
  { icon: 'lock', text: 'AES-256-GCM at rest' },
  { icon: 'send', text: 'TLS 1.3 in transit' },
  { icon: 'shield', text: 'Azure Key Vault' },
  { icon: 'device', text: 'TOTP MFA' },
  { icon: 'activity', text: '6-year audit log' },
  { icon: 'users', text: 'BAA (Clinic plan only)' }
];
