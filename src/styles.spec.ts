import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const scss = readFileSync(join(__dirname, 'styles.scss'), 'utf8');

function token(name: string): string {
  const match = scss.match(new RegExp(`--${name}:\\s*(#[0-9a-fA-F]{6})`));
  if (!match) {
    throw new Error(`Design token --${name} not found in styles.scss`);
  }
  return match[1];
}

function luminance(hex: string): number {
  const [r, g, b] = [1, 3, 5]
    .map((i) => parseInt(hex.slice(i, i + 2), 16) / 255)
    .map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrast(a: string, b: string): number {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

describe('design tokens: WCAG AA text contrast', () => {
  const surfaces = ['bg-primary', 'bg-secondary', 'bg-card', 'bg-card-hover'];

  it.each(['text-primary', 'text-secondary', 'text-muted'])(
    '--%s is at least 4.5:1 on every surface',
    (text) => {
      for (const surface of surfaces) {
        expect({ text, surface, ratio: contrast(token(text), token(surface)) >= 4.5 }).toEqual({
          text,
          surface,
          ratio: true
        });
      }
    }
  );
});

describe('global stylesheet: motion and print', () => {
  it('respects prefers-reduced-motion', () => {
    expect(scss).toMatch(/@media \(prefers-reduced-motion: reduce\)/);
    expect(scss).toMatch(/scroll-behavior:\s*auto/);
  });

  it('keeps scroll-revealed content visible when printing', () => {
    expect(scss).toMatch(/@media print[\s\S]*\.reveal[\s\S]*opacity:\s*1/);
  });

  it('offsets anchor jumps below the fixed navbar', () => {
    expect(scss).toMatch(/scroll-padding-top:/);
  });
});
