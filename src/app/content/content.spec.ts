import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { ICON_NAMES } from '../components/icon/icon-names';
import { FEATURES } from './features';
import { PIPELINE_STEPS } from './pipeline';
import { PLANS } from './plans';
import { FOOTER_GROUPS, NAV_LINKS, SECTIONS } from './site';
import { SECURITY_BADGES, SECURITY_ITEMS } from './security';

const SRC = resolve(__dirname, '..', '..');

function walk(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    return statSync(path).isDirectory() ? walk(path) : [path];
  });
}

describe('content: single source of truth', () => {
  it('keeps JSON-LD offers in index.html in sync with PLANS', () => {
    const html = readFileSync(join(SRC, 'index.html'), 'utf8');
    const json = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)?.[1];
    expect(json).toBeTruthy();

    const offers = JSON.parse(json!).offers as {
      name: string;
      price: string;
      priceCurrency: string;
    }[];
    expect(offers.map((o) => [o.name, Number(o.price)])).toEqual(
      PLANS.map((p) => [p.name, p.price])
    );
    expect(new Set(offers.map((o) => o.priceCurrency))).toEqual(new Set(['USD']));
  });

  it('has unique plan ids and exactly one popular plan', () => {
    expect(new Set(PLANS.map((p) => p.id)).size).toBe(PLANS.length);
    expect(PLANS.filter((p) => p.popular)).toHaveLength(1);
  });

  it('only references icons that exist', () => {
    const used = [
      ...PLANS.map((p) => p.audience.icon),
      ...FEATURES.map((f) => f.icon),
      ...SECURITY_ITEMS.map((s) => s.icon),
      ...SECURITY_BADGES.map((b) => b.icon),
      ...PIPELINE_STEPS.map((s) => s.icon)
    ];
    for (const icon of used) {
      expect(ICON_NAMES).toContain(icon);
    }
  });

  it('gives every section a unique id', () => {
    const ids = Object.values(SECTIONS).map((s) => s.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('never points two footer labels at the same target', () => {
    const targets = FOOTER_GROUPS.flatMap((g) => g.links).map((l) => l.route ?? `#${l.fragment}`);
    expect(new Set(targets).size).toBe(targets.length);
  });

  it('only links to sections that exist', () => {
    const ids = new Set(Object.values(SECTIONS).map((s) => s.id));
    const fragments = [
      ...NAV_LINKS.map((l) => l.fragment),
      ...FOOTER_GROUPS.flatMap((g) => g.links).flatMap((l) => (l.fragment ? [l.fragment] : []))
    ];
    for (const fragment of fragments) {
      expect(ids).toContain(fragment);
    }
  });

  it('names the build-progress section the same way everywhere', () => {
    expect(SECTIONS.progress.label).toBe('Progress');
    const labels = [...NAV_LINKS, ...FOOTER_GROUPS.flatMap((g) => g.links)]
      .filter((l) => l.fragment === SECTIONS.progress.id)
      .map((l) => l.label);
    expect(new Set(labels)).toEqual(new Set(['Progress']));
  });
});

describe('guard: claims we deliberately removed must not come back', () => {
  const banned: [string, RegExp][] = [
    ['"HIPAA compliant" as a product claim', /HIPAA[- ]compliant/i],
    ['"E2E" encryption (server-side processing is not end-to-end)', /\bE2E\b/],
    ['unmeasured speed claims', /under 3 seconds|≤\s*3\s*s|\b2\.8\s?s\b/i],
    ['"legally-binding" signature', /legally[- ]binding/i],
    ['hash described as a signature', /SHA-256 (electronic )?signature/i],
    ['made-up waitlist size', /240\+/],
    ['unsourced time-saving stat', /\b40 min\b/i],
    ['trial CTA before launch', /Start Free Trial/i],
    ['unconfirmed "no credit card" promise', /No credit card/i]
  ];

  const files = [
    ...walk(join(SRC, 'app')).filter((f) => f.endsWith('.ts') && !f.endsWith('.spec.ts')),
    join(SRC, 'index.html')
  ];

  it.each(banned)('has no %s', (_label, pattern) => {
    const offenders = files.filter((f) => pattern.test(readFileSync(f, 'utf8')));
    expect(offenders.map((f) => f.replace(SRC, 'src'))).toEqual([]);
  });

  it('states the BAA limitation next to the pricing plans', () => {
    const pricing = readFileSync(join(SRC, 'app/components/pricing/pricing.component.ts'), 'utf8');
    expect(pricing).toContain('compliance.baaNote');
  });
});

describe('guard: no sanitiser bypass for markup', () => {
  const sources = walk(join(SRC, 'app')).filter(
    (f) => f.endsWith('.ts') && !f.endsWith('.spec.ts')
  );

  it('never uses innerHTML bindings or bypassSecurityTrustHtml', () => {
    for (const file of sources) {
      const text = readFileSync(file, 'utf8');
      expect({ file, hit: /bypassSecurityTrustHtml|\[innerHTML\]/.test(text) }).toEqual({
        file,
        hit: false
      });
    }
  });

  it('keeps bypassSecurityTrustResourceUrl to the single, validated YouTube embed', () => {
    const hits = sources.filter((f) => /bypassSecurityTrust/.test(readFileSync(f, 'utf8')));
    expect(hits.map((f) => f.replace(SRC, 'src'))).toEqual([
      'src/app/components/dev-diary/dev-diary.component.ts'
    ]);
  });
});
