import { routes } from './app.routes';

describe('app routes — smoke', () => {
  it('defines the expected top-level paths', () => {
    const paths = routes.map(r => r.path);
    expect(paths).toEqual(
      expect.arrayContaining(['', 'privacy', 'terms', 'hipaa', '**'])
    );
  });

  it('redirects unknown paths to home', () => {
    const wildcard = routes.find(r => r.path === '**');
    expect(wildcard?.redirectTo).toBe('');
  });

  for (const path of ['', 'privacy', 'terms', 'hipaa']) {
    it(`lazily loads a component for "/${path}"`, async () => {
      const route = routes.find(r => r.path === path);
      expect(route?.loadComponent).toBeDefined();

      const loaded = await route!.loadComponent!();
      expect(loaded).toBeTruthy();
      expect(typeof loaded).toBe('function');
    });
  }
});
