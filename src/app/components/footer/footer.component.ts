import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AUTHOR, COMPLIANCE_COPY, FOOTER_GROUPS, LAUNCH, SECTIONS } from '../../content/site';
import { IconComponent } from '../icon/icon.component';
import { LogoComponent } from '../logo/logo.component';

@Component({
  selector: 'app-footer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, IconComponent, LogoComponent],
  template: `
    <footer class="footer">
      <div class="container">
        <!-- Top row -->
        <div class="footer__top">
          <!-- Brand -->
          <div class="footer__brand">
            <!-- routerLink (not href="#home"): works from the legal pages without a full reload -->
            <a routerLink="/" [fragment]="homeId" class="footer__logo">
              <app-logo [size]="32" />
              <span>CareVoice</span>
            </a>
            <p class="footer__tagline">
              AI-powered SOAP note generation for mental health professionals.
              {{ compliance.tagline }}
            </p>
            <div class="footer__hipaa-badge">
              <app-icon name="shield-check" [size]="14" [strokeWidth]="2" />
              {{ compliance.badge }}
            </div>

            <div class="footer__author">
              <p class="footer__author-label">Designed &amp; built by</p>
              <a [href]="author.website" class="footer__author-name" target="_blank" rel="noopener">
                {{ author.name }}
              </a>
              <div class="footer__author-links">
                <a
                  [href]="author.website"
                  class="footer__author-link"
                  target="_blank"
                  rel="noopener"
                  aria-label="Personal website"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.8"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    aria-hidden="true"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <line x1="2" y1="12" x2="22" y2="12" />
                    <path
                      d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"
                    />
                  </svg>
                </a>
                <a
                  [href]="author.github"
                  class="footer__author-link"
                  target="_blank"
                  rel="noopener"
                  aria-label="GitHub"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      d="M12 .5C5.7.5.5 5.7.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.2.8-.6v-2c-3.2.7-3.9-1.5-3.9-1.5-.5-1.3-1.3-1.7-1.3-1.7-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.7 1.3 3.4 1 .1-.8.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17.3 4.7 18.3 5 18.3 5c.6 1.6.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A11.5 11.5 0 0 0 23.5 12C23.5 5.7 18.3.5 12 .5z"
                    />
                  </svg>
                </a>
                <a [href]="'mailto:' + author.email" class="footer__author-link" aria-label="Email">
                  <app-icon name="mail" [size]="18" [strokeWidth]="1.8" />
                </a>
              </div>
            </div>
          </div>

          <!-- Links -->
          <div class="footer__links">
            @for (group of groups; track group.title) {
              <div class="footer__link-group">
                <h2 class="footer__link-title">{{ group.title }}</h2>
                <ul class="footer__link-list">
                  @for (link of group.links; track link.label) {
                    <li>
                      @if (link.route) {
                        <a [routerLink]="link.route" class="footer__link">{{ link.label }}</a>
                      } @else {
                        <a routerLink="/" [fragment]="link.fragment" class="footer__link">{{
                          link.label
                        }}</a>
                      }
                    </li>
                  }
                </ul>
              </div>
            }
          </div>
        </div>

        <hr class="divider footer__divider" />

        <!-- Bottom row -->
        <div class="footer__bottom">
          <p class="footer__copyright">
            &copy; {{ year }} CareVoice. All rights reserved. Launching
            {{ launch.label.toLowerCase() }}.
          </p>
          <div class="footer__legal">
            <a routerLink="/privacy" class="footer__legal-link">Privacy Policy</a>
            <span class="footer__legal-dot" aria-hidden="true"></span>
            <a routerLink="/terms" class="footer__legal-link">Terms of Service</a>
            <span class="footer__legal-dot" aria-hidden="true"></span>
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
  readonly author = AUTHOR;
  readonly groups = FOOTER_GROUPS;
  readonly launch = LAUNCH;
  readonly compliance = COMPLIANCE_COPY;
  readonly homeId = 'home';

  protected readonly sections = SECTIONS;
}
