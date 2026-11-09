/** Shared accent colours for icon tiles (features, security, pipeline). */
export type Tone = 'accent' | 'success' | 'warning' | 'danger' | 'purple';

export const TONES: Readonly<Record<Tone, { color: string; background: string }>> = {
  accent: { color: 'var(--accent)', background: 'rgba(56, 139, 253, 0.1)' },
  success: { color: 'var(--success)', background: 'rgba(63, 185, 80, 0.1)' },
  warning: { color: 'var(--warning)', background: 'rgba(210, 153, 34, 0.1)' },
  danger: { color: 'var(--danger)', background: 'rgba(248, 81, 73, 0.1)' },
  purple: { color: 'var(--purple)', background: 'rgba(188, 140, 255, 0.1)' }
};
