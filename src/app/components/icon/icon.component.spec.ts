import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { IconComponent } from './icon.component';
import { ICON_NAMES, IconName } from './icon-names';

@Component({
  imports: [IconComponent],
  template: `<app-icon [name]="name" [size]="20" />`
})
class HostComponent {
  name: IconName = 'mic';
}

describe('IconComponent', () => {
  it.each(ICON_NAMES)('renders drawable shapes for "%s"', async (name) => {
    const fixture = TestBed.createComponent(HostComponent);
    fixture.componentInstance.name = name;
    fixture.detectChanges();

    const svg = (fixture.nativeElement as HTMLElement).querySelector('svg')!;
    expect(svg.children.length).toBeGreaterThan(0);
    fixture.destroy();
  });

  it('is decorative: hidden from assistive tech and not focusable', () => {
    const fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
    const svg = (fixture.nativeElement as HTMLElement).querySelector('svg')!;
    expect(svg.getAttribute('aria-hidden')).toBe('true');
    expect(svg.getAttribute('focusable')).toBe('false');
    expect(svg.getAttribute('width')).toBe('20');
    fixture.destroy();
  });
});
