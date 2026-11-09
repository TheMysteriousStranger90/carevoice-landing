/**
 * Every icon the landing page can render. Content modules reference icons by
 * these ids so data never carries markup (and nothing needs to be sanitised).
 */
export const ICON_NAMES = [
  'activity',
  'ai',
  'building',
  'check',
  'check-circle',
  'device',
  'file',
  'grid',
  'lock',
  'mail',
  'mic',
  'search',
  'send',
  'shield',
  'shield-check',
  'sign',
  'table',
  'trash',
  'upload',
  'user',
  'users',
  'clock'
] as const;

export type IconName = (typeof ICON_NAMES)[number];
