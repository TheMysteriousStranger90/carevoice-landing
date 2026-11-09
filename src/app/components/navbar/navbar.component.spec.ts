import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavbarComponent } from './navbar.component';
import { NAV_LINKS } from '../../content/site';

describe('NavbarComponent', () => {
  let fixture: ComponentFixture<NavbarComponent>;
  let component: NavbarComponent;
  const host = () => fixture.nativeElement as HTMLElement;
  const hamburger = () => host().querySelector<HTMLButtonElement>('.navbar__hamburger')!;
  const menu = () => host().querySelector<HTMLElement>('#mobile-menu')!;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [NavbarComponent] }).compileComponents();
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  afterEach(() => fixture.destroy());

  it('uses the shared section names for its links', () => {
    const labels = Array.from(host().querySelectorAll('.navbar__nav a')).map((a) =>
      a.textContent?.trim()
    );
    expect(labels).toEqual(NAV_LINKS.map((l) => l.label));
    expect(labels).toContain('Progress');
    expect(labels).not.toContain('Diary');
  });

  describe('mobile menu', () => {
    it('starts closed: inert, collapsed and wired to the button', () => {
      expect(hamburger().getAttribute('aria-controls')).toBe('mobile-menu');
      expect(hamburger().getAttribute('aria-expanded')).toBe('false');
      expect(hamburger().getAttribute('aria-label')).toBe('Open menu');
      expect(menu().hasAttribute('inert')).toBe(true);
      expect(menu().classList.contains('navbar__mobile--open')).toBe(false);
    });

    it('opens on click and becomes interactive', () => {
      hamburger().click();
      fixture.detectChanges();

      expect(hamburger().getAttribute('aria-expanded')).toBe('true');
      expect(hamburger().getAttribute('aria-label')).toBe('Close menu');
      expect(menu().hasAttribute('inert')).toBe(false);
      expect(menu().classList.contains('navbar__mobile--open')).toBe(true);
    });

    it('closes on Escape and returns focus to the button', () => {
      hamburger().click();
      fixture.detectChanges();

      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
      fixture.detectChanges();

      expect(component.menuOpen()).toBe(false);
      expect(menu().hasAttribute('inert')).toBe(true);
      expect(document.activeElement).toBe(hamburger());
    });

    it('ignores Escape while closed (does not steal focus)', () => {
      const outside = document.createElement('button');
      document.body.appendChild(outside);
      outside.focus();

      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));

      expect(document.activeElement).toBe(outside);
      outside.remove();
    });

    it('closes after choosing a link', () => {
      hamburger().click();
      fixture.detectChanges();
      host().querySelector<HTMLAnchorElement>('.navbar__mobile-link')!.click();
      fixture.detectChanges();

      expect(component.menuOpen()).toBe(false);
    });
  });
});
