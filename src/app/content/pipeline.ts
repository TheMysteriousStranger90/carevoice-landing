import type { IconName } from '../components/icon/icon-names';

export interface PipelineStep {
  readonly number: string;
  readonly icon: IconName;
  readonly title: string;
  readonly description: string;
  readonly background: string;
}

export const PIPELINE_STEPS: readonly PipelineStep[] = [
  {
    number: '01',
    icon: 'mic',
    title: 'Dictate',
    description:
      'Record directly in the browser via MediaRecorder API. Up to 500 MB per session. English (US) by default.',
    background: 'rgba(56, 139, 253, 0.12)'
  },
  {
    number: '02',
    icon: 'upload',
    title: 'Upload',
    description:
      'Audio is encrypted in transit (TLS 1.3) and stored in Azure Blob Storage — zero PHI in file paths. Deleted immediately after transcription.',
    background: 'rgba(63, 185, 80, 0.12)'
  },
  {
    number: '03',
    icon: 'table',
    title: 'Transcribe',
    description:
      'Azure Cognitive Services Speech SDK — speaker-aware conversation transcription of the session audio.',
    background: 'rgba(210, 153, 34, 0.12)'
  },
  {
    number: '04',
    icon: 'ai',
    title: 'AI Structures',
    description:
      'GPT-4o via Microsoft.Extensions.AI maps the transcript into all four SOAP sections automatically using clinical-grade prompts.',
    background: 'rgba(188, 140, 255, 0.12)'
  },
  {
    number: '05',
    icon: 'check',
    title: 'Review & Sign',
    description:
      'Edit any section, add an addendum if needed, then sign electronically with MFA verification. A SHA-256 hash records exactly what you signed.',
    background: 'rgba(63, 185, 80, 0.12)'
  }
];

export const TECHNOLOGIES: readonly string[] = [
  'Azure Cognitive Services',
  'GPT-4o',
  'Azure Blob Storage',
  'AES-256-GCM',
  'TLS 1.3',
  'SHA-256 content hash'
];
