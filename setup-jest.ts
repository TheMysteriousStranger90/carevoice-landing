import { setupZonelessTestEnv } from 'jest-preset-angular/setup-env/zoneless';

// The app is zoneless, so tests run zoneless too (use `await fixture.whenStable()`).
setupZonelessTestEnv();

// jsdom lacks IntersectionObserver; provide a minimal, TypeScript-6-compatible stub.
class MockIntersectionObserver implements IntersectionObserver {
  readonly root: Element | Document | null = null;
  readonly rootMargin = '';
  readonly scrollMargin = '';
  readonly thresholds: readonly number[] = [];
  observe = jest.fn();
  unobserve = jest.fn();
  disconnect = jest.fn();
  takeRecords = jest.fn((): IntersectionObserverEntry[] => []);
}

Object.defineProperty(window, 'IntersectionObserver', {
  writable: true,
  configurable: true,
  value: MockIntersectionObserver
});
