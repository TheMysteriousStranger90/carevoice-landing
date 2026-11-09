import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  inject,
  signal,
  viewChild
} from '@angular/core';
import { LAUNCH, NAV_LINKS, SECTIONS } from '../../content/site';
import { LogoComponent } from '../logo/logo.component';

@Component({
  selector: 'app-navbar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LogoComponent],
  host: { '(document:keydown.escape)': 'onEscape()' },
  template: `
    <header class="navbar" [class.navbar--scrolled]="scrolled()">
      <div class="navbar__inner container">
        <!-- Brand -->
        <a href="#home" class="navbar__brand" (click)="closeMenu()">
          <app-logo [size]="32" />
          <span class="navbar__name">CareVoice</span>
        </a>

        <!-- Desktop navigation -->
        <nav class="navbar__nav" aria-label="Main navigation">
          @for (link of links; track link.fragment) {
            <a [href]="'#' + link.fragment" class="navbar__link">{{ link.label }}</a>
          }
        </nav>

        <!-- Actions -->
        <div class="navbar__actions">
          <span class="navbar__launch-chip">
            <span class="navbar__pulse" aria-hidden="true"></span>
            {{ launch.chip }}
          </span>
          <a [href]="'#' + waitlistId" class="btn btn--primary">Join Waitlist</a>
        </div>

        <!-- Mobile hamburger -->
        <button
          #hamburger
          type="button"
          class="navbar__hamburger"
          [class.navbar__hamburger--open]="menuOpen()"
          (click)="toggleMenu()"
          [attr.aria-label]="menuOpen() ? 'Close menu' : 'Open menu'"
          aria-controls="mobile-menu"
          [attr.aria-expanded]="menuOpen()"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </button>
      </div>

      <!-- Mobile menu: inert (not focusable, hidden from assistive tech) while closed -->
      <div
        id="mobile-menu"
        class="navbar__mobile"
        [class.navbar__mobile--open]="menuOpen()"
        [attr.inert]="menuOpen() ? null : ''"
      >
        <nav class="navbar__mobile-nav" aria-label="Mobile navigation">
          @for (link of links; track link.fragment) {
            <a [href]="'#' + link.fragment" class="navbar__mobile-link" (click)="closeMenu()">{{
              link.label
            }}</a>
          }
        </nav>
        <a
          [href]="'#' + waitlistId"
          class="btn btn--primary navbar__mobile-cta"
          (click)="closeMenu()"
        >
          Join Waitlist
        </a>
      </div>
    </header>
  `,
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  private readonly destroyRef = inject(DestroyRef);
  private readonly hamburger = viewChild<ElementRef<HTMLButtonElement>>('hamburger');

  readonly links = NAV_LINKS;
  readonly launch = LAUNCH;
  readonly waitlistId = SECTIONS.waitlist.id;

  readonly scrolled = signal(false);
  readonly menuOpen = signal(false);

  constructor() {
    afterNextRender(() => {
      // Passive scroll listener, registered in the browser only. With zoneless
      // change detection it only schedules work when the signal value changes.
      const onScroll = () => this.scrolled.set(window.scrollY > 24);
      onScroll();
      window.addEventListener('scroll', onScroll, { passive: true });
      this.destroyRef.onDestroy(() => window.removeEventListener('scroll', onScroll));
    });
  }

  toggleMenu(): void {
    this.menuOpen.update((open) => !open);
  }

  closeMenu(): void {
    this.menuOpen.set(false);
  }

  onEscape(): void {
    if (!this.menuOpen()) {
      return;
    }
    this.closeMenu();
    this.hamburger()?.nativeElement.focus();
  }
}
