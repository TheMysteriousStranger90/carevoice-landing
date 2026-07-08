import { Component, signal, HostListener, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header class="navbar" [class.navbar--scrolled]="scrolled()">
      <div class="navbar__inner container">

        <!-- Brand -->
        <a href="#home" class="navbar__brand" (click)="closeMenu()">
          <svg class="navbar__logo" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="32" height="32" rx="8" fill="#1f6feb"/>
            <path d="M16 8a3 3 0 0 0-3 3v6a3 3 0 0 0 6 0v-6a3 3 0 0 0-3-3z" fill="white"/>
            <path d="M10 17a1 1 0 0 1 1 1 5 5 0 0 0 10 0 1 1 0 1 1 2 0 7 7 0 0 1-6 6.92V26h2a1 1 0 1 1 0 2h-6a1 1 0 1 1 0-2h2v-2.08A7 7 0 0 1 9 18a1 1 0 0 1 1-1z" fill="white"/>
          </svg>
          <span class="navbar__name">CareVoice</span>
        </a>

        <!-- Desktop navigation -->
        <nav class="navbar__nav" aria-label="Main navigation">
          <a href="#features" class="navbar__link">Features</a>
          <a href="#how-it-works" class="navbar__link">How It Works</a>
          <a href="#pricing" class="navbar__link">Pricing</a>
          <a href="#security" class="navbar__link">Security</a>
        </nav>

        <!-- Actions -->
        <div class="navbar__actions">
          <span class="navbar__launch-chip">
            <span class="navbar__pulse"></span>
            Launching 2027
          </span>
          <a href="#waitlist" class="btn btn--primary">Join Waitlist</a>
        </div>

        <!-- Mobile hamburger -->
        <button
          class="navbar__hamburger"
          [class.navbar__hamburger--open]="menuOpen()"
          (click)="toggleMenu()"
          aria-label="Toggle menu"
          [attr.aria-expanded]="menuOpen()">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      <!-- Mobile menu -->
      <div class="navbar__mobile" [class.navbar__mobile--open]="menuOpen()">
        <nav class="navbar__mobile-nav">
          <a href="#features" class="navbar__mobile-link" (click)="closeMenu()">Features</a>
          <a href="#how-it-works" class="navbar__mobile-link" (click)="closeMenu()">How It Works</a>
          <a href="#pricing" class="navbar__mobile-link" (click)="closeMenu()">Pricing</a>
          <a href="#security" class="navbar__mobile-link" (click)="closeMenu()">Security</a>
        </nav>
        <a href="#waitlist" class="btn btn--primary" style="width:100%;justify-content:center" (click)="closeMenu()">
          Join Waitlist
        </a>
      </div>
    </header>
  `,
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  scrolled = signal(false);
  menuOpen = signal(false);

  @HostListener('window:scroll')
  onScroll(): void {
    this.scrolled.set(window.scrollY > 24);
  }

  toggleMenu(): void {
    this.menuOpen.update(v => !v);
  }

  closeMenu(): void {
    this.menuOpen.set(false);
  }
}
