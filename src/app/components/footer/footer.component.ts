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

            <div class="footer__author">
              <p class="footer__author-label">Designed &amp; built by</p>
              <a [href]="author.website" class="footer__author-name" target="_blank" rel="noopener">
                {{ author.name }}
              </a>
              <div class="footer__author-links">
                <a [href]="author.website" class="footer__author-link" target="_blank" rel="noopener" aria-label="Personal website">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="2" y1="12" x2="22" y2="12"/>
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                  </svg>
                </a>
                <a [href]="author.github" class="footer__author-link" target="_blank" rel="noopener" aria-label="GitHub">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 .5C5.7.5.5 5.7.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.2.8-.6v-2c-3.2.7-3.9-1.5-3.9-1.5-.5-1.3-1.3-1.7-1.3-1.7-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.7 1.3 3.4 1 .1-.8.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17.3 4.7 18.3 5 18.3 5c.6 1.6.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A11.5 11.5 0 0 0 23.5 12C23.5 5.7 18.3.5 12 .5z"/>
                  </svg>
                </a>
                <a [href]="'mailto:' + author.email" class="footer__author-link" aria-label="Email">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="2" y="4" width="20" height="16" rx="2"/>
                    <path d="m22 7-10 6L2 7"/>
                  </svg>
                </a>
              </div>
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

  readonly author = {
    name: 'Bohdan Harabadzhyu (Bogdan Garabagiu)',
    website: 'https://bohdan-harabadzhyu-homepage.vercel.app/',
    github: 'https://github.com/TheMysteriousStranger90',
    email: 'bohdan_harabadzhyu@outlook.com'
  };

  readonly linkGroups = [
    {
      title: 'Product',
      links: [
        { label: 'Features', fragment: 'features' },
        { label: 'How It Works', fragment: 'how-it-works' },
        { label: 'Pricing', fragment: 'pricing' },
        { label: 'Security', fragment: 'security' },
        { label: 'Development', fragment: 'progress' },
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
