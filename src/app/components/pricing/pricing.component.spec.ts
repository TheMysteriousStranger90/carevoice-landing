import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PricingComponent } from './pricing.component';
import { PLANS } from '../../content/plans';

describe('PricingComponent', () => {
  let fixture: ComponentFixture<PricingComponent>;
  const host = () => fixture.nativeElement as HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [PricingComponent] }).compileComponents();
    fixture = TestBed.createComponent(PricingComponent);
    fixture.detectChanges();
    await fixture.whenStable();
  });

  afterEach(() => fixture.destroy());

  it('renders one card per plan with its price', () => {
    const amounts = Array.from(host().querySelectorAll('.pricing__amount')).map((e) =>
      Number(e.textContent)
    );
    expect(amounts).toEqual(PLANS.map((p) => p.price));
  });

  it('sends every CTA to the waitlist, labelled honestly (product is pre-launch)', () => {
    const ctas = Array.from(host().querySelectorAll<HTMLAnchorElement>('.pricing__cta'));
    expect(ctas).toHaveLength(PLANS.length);
    for (const cta of ctas) {
      expect(cta.textContent?.trim()).toBe('Join waitlist');
      expect(cta.getAttribute('href')).toBe('#waitlist');
    }
  });

  it('discloses that the BAA is Clinic-only, in plain text', () => {
    const note = host().querySelector('.pricing__note--baa')?.textContent ?? '';
    expect(note).toContain('Clinic plan only');
    expect(note).toContain('BAA');
  });

  it('makes unavailable features understandable without colour', () => {
    const hidden = host().querySelectorAll('.pricing__feat--unavailable .sr-only');
    const unavailable = PLANS.flatMap((p) => p.features).filter((f) => !f.included).length;
    expect(hidden).toHaveLength(unavailable);
  });

  it('no longer promises a trial or "no credit card" before launch', () => {
    const text = host().textContent ?? '';
    expect(text).not.toMatch(/no credit card/i);
    expect(text).toMatch(/will include a 14-day\s+free trial/i);
  });
});
