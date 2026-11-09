import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RevealDirective } from './reveal.directive';

@Component({
  imports: [RevealDirective],
  template: `<div appReveal id="target">Hello</div>`
})
class HostComponent {}

function mockMatchMedia(reduce: boolean): void {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    configurable: true,
    value: (query: string) => ({ matches: reduce && query.includes('reduce'), media: query })
  });
}

describe('RevealDirective', () => {
  let fixture: ComponentFixture<HostComponent>;
  const target = () => (fixture.nativeElement as HTMLElement).querySelector('#target')!;

  async function render(): Promise<void> {
    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
    await fixture.whenStable();
  }

  afterEach(() => {
    fixture.destroy();
    // @ts-expect-error – remove the stub so other tests see jsdom's default again
    delete window.matchMedia;
  });

  it('hides the element only after hydration and starts observing it', async () => {
    mockMatchMedia(false);
    await render();

    expect(target().classList.contains('reveal')).toBe(true);
    expect(target().classList.contains('revealed')).toBe(false);
  });

  it('leaves content visible for people who prefer reduced motion', async () => {
    mockMatchMedia(true);
    await render();

    expect(target().classList.contains('reveal')).toBe(false);
  });

  it('leaves content visible when IntersectionObserver is unavailable', async () => {
    mockMatchMedia(false);
    const original = window.IntersectionObserver;
    // @ts-expect-error – simulate an old browser
    delete window.IntersectionObserver;
    try {
      await render();
      expect(target().classList.contains('reveal')).toBe(false);
    } finally {
      window.IntersectionObserver = original;
    }
  });
});
