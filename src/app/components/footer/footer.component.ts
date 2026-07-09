import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  template: `
    <footer class="footer">
      <div class="container">

        <!-- Top row -->
        <div class="footer__top">
          <!-- Brand -->
          <div class="footer__brand">
            <a href="#home" class="footer__logo">
              <svg class="footer__logo-icon" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="32" height="32" rx="8" fill="#1f6feb"/>
                <path d="M16 8a3 3 0 0 0-3 3v6a3 3 0 0 0 6 0v-6a3 3 0 0 0-3-3z" fill="white"/>
                <path d="M10 17a1 1 0 0 1 1 1 5 5 0 0 0 10 0 1 1 0 1 1 2 0 7 7 0 0 1-6 6.92V26h2a1 1 0 1 1 0 2h-6a1 1 0 1 1 0-2h2v-2.08A7 7 0 0 1 9 18a1 1 0 0 1 1-1z" fill="white"/>
              </svg>
              <span>CareVoice</span>
            </a>
            <p class="footer__tagline">
              AI-powered SOAP note generation for mental health professionals. HIPAA-compliant by design.
            </p>
            <div class="footer__hipaa-badge">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                <polyline points="9 12 12 15 16 9"/>
              </svg>
              HIPAA-compliant
            </div>
          </div>

          <!-- Links -->
          <div class="footer__links">
            @for (group of linkGroups; track group.title) {
              <div class="footer__link-group">
                <h4 class="footer__link-title">{{ group.title }}</h4>
                <ul class="footer__link-list">
                  @for (link of group.links; track link.label) {
                    <li>
                      <a routerLink="/" [fragment]="link.fragment" class="footer__link">{{ link.label }}</a>
                    </li>
                  }
                </ul>
              </div>
            }
          </div>
        </div>

        <hr class="divider footer__divider">

        <!-- Bottom row -->
        <div class="footer__bottom">
          <p class="footer__copyright">
            &copy; {{ year }} CareVoice. All rights reserved.
            Launching early 2027.
          </p>
          <div class="footer__legal">
            <a routerLink="/privacy" class="footer__legal-link">Privacy Policy</a>
            <span class="footer__legal-dot"></span>
            <a routerLink="/terms" class="footer__legal-link">Terms of Service</a>
            <span class="footer__legal-dot"></span>
            <a routerLink="/hipaa" class="footer__legal-link">HIPAA Notice</a>
          </div>
        </div>

      </div>
    </footer>
  `,
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  readonly year = new Date().getFullYear();

  readonly linkGroups = [
    {
      title: 'Product',
      links: [
        { label: 'Features', fragment: 'features' },
        { label: 'How It Works', fragment: 'how-it-works' },
        { label: 'Pricing', fragment: 'pricing' },
        { label: 'Security', fragment: 'security' },
        { label: 'Join Waitlist', fragment: 'waitlist' }
      ]
    },
    {
      title: 'For Clinicians',
      links: [
        { label: 'Solo Therapists', fragment: 'features' },
        { label: 'Group Practices', fragment: 'features' },
        { label: 'Clinics & Institutions', fragment: 'features' },
        { label: 'SOAP Documentation', fragment: 'soap-format' }
      ]
    },
    {
      title: 'Compliance',
      links: [
        { label: 'HIPAA Compliance', fragment: 'security' },
        { label: 'Data Security', fragment: 'security' },
        { label: 'Audit & Logging', fragment: 'security' },
        { label: 'BAA (Clinic plan)', fragment: 'pricing' }
      ]
    }
  ];
}
