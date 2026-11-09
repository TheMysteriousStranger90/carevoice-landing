import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { FooterComponent } from './footer.component';
import { FOOTER_GROUPS } from '../../content/site';

describe('FooterComponent', () => {
  let fixture: ComponentFixture<FooterComponent>;
  const host = () => fixture.nativeElement as HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterComponent],
      providers: [provideRouter([])]
    }).compileComponents();
    fixture = TestBed.createComponent(FooterComponent);
    fixture.detectChanges();
    await fixture.whenStable();
  });

  afterEach(() => fixture.destroy());

  it('routes the brand link through the router (no full page reload from legal pages)', () => {
    const brand = host().querySelector<HTMLAnchorElement>('.footer__logo')!;
    // routerLink renders a real href resolved by the router, not a bare "#home" against <base>.
    expect(brand.getAttribute('href')).toMatch(/^\/(#home)?$/);
    expect(brand.getAttribute('href')).not.toBe('#home');
  });

  it('renders every footer link with its own target', () => {
    const links = Array.from(host().querySelectorAll<HTMLAnchorElement>('.footer__link'));
    expect(links).toHaveLength(FOOTER_GROUPS.flatMap((g) => g.links).length);

    const hrefs = links.map((a) => a.getAttribute('href'));
    expect(new Set(hrefs).size).toBe(hrefs.length);
  });

  it('describes compliance as "built to support", not as a certification', () => {
    const text = host().textContent ?? '';
    expect(text).toContain('Built to support HIPAA');
    expect(text).not.toMatch(/HIPAA[- ]compliant/i);
  });

  it('uses section headings (not a skipped heading level)', () => {
    expect(host().querySelectorAll('h2.footer__link-title')).toHaveLength(FOOTER_GROUPS.length);
  });
});
