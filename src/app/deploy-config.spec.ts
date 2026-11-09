import { readFileSync } from 'node:fs';
import { join } from 'node:path';

interface SwaRoute {
  route: string;
  headers?: Record<string, string>;
}
interface SwaConfig {
  globalHeaders: Record<string, string>;
  routes: SwaRoute[];
  mimeTypes: Record<string, string>;
  navigationFallback: { rewrite: string; exclude: string[] };
}

const config: SwaConfig = JSON.parse(
  readFileSync(join(__dirname, '..', '..', 'public', 'staticwebapp.config.json'), 'utf8')
);
const cacheFor = (route: string) =>
  config.routes.find((r) => r.route === route)?.headers?.['Cache-Control'];

describe('staticwebapp.config.json — caching', () => {
  it('never marks everything immutable by default (index.html must revalidate after a deploy)', () => {
    expect(config.globalHeaders['Cache-Control']).toBe('no-cache');
    expect(config.globalHeaders['Cache-Control']).not.toMatch(/immutable|max-age=31536000/);
  });

  it.each(['/*.js', '/*.css'])('caches content-hashed %s bundles for a year', (route) => {
    expect(cacheFor(route)).toBe('public, max-age=31536000, immutable');
  });

  it('gives un-hashed screenshots a short cache', () => {
    expect(cacheFor('/screenshots/*')).toMatch(/max-age=86400/);
    expect(cacheFor('/screenshots/*')).not.toMatch(/immutable/);
  });

  it('serves JSON with the correct MIME type', () => {
    expect(config.mimeTypes['.json']).toBe('application/json');
  });

  it('keeps static files out of the SPA fallback', () => {
    expect(config.navigationFallback.exclude).toContain('/screenshots/*');
    expect(config.navigationFallback.exclude.join(',')).toMatch(/js,css/);
  });
});
