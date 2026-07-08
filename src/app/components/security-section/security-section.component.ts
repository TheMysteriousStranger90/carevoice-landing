import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { RevealDirective } from '../../directives/reveal.directive';

@Component({
  selector: 'app-security-section',
  standalone: true,
  imports: [RevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="section security" id="security">
      <div class="container">
        <div class="section-header" appReveal>
          <p class="section-tag">Security & Compliance</p>
          <h2>Built secure from the ground up</h2>
          <p>HIPAA compliance is not a checkbox — it's the foundation every feature is built on.</p>
        </div>

        <div class="grid grid--3 security__cards" appReveal>
          @for (item of securityItems; track item.title) {
            <div class="card security__card">
              <div class="security__icon" [style.color]="item.color" [style.background]="item.bg" [innerHTML]="item.icon">
              </div>
              <h3 class="security__title">{{ item.title }}</h3>
              <p class="security__desc">{{ item.description }}</p>
            </div>
          }
        </div>

        <!-- Security badges strip -->
        <div class="security__strip" appReveal>
          <span class="security__strip-label">SECURITY</span>
          @for (badge of badges; track $index) {
            <div class="security__badge" [innerHTML]="badge.html">
            </div>
          }
        </div>

        <!-- HIPAA compliance statement -->
        <div class="security__statement" appReveal>
          <div class="security__statement-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              <polyline points="9 12 12 15 16 9"/>
            </svg>
          </div>
          <div>
            <h3 class="security__statement-title">HIPAA Security Rule Compliant</h3>
            <p class="security__statement-text">
              CareVoice implements technical safeguards aligned with 45 CFR §164.312, including access controls,
              audit controls, integrity controls, and transmission security. A Business Associate Agreement (BAA)
              is included with the Clinic plan.
            </p>
          </div>
        </div>

      </div>
    </section>
  `,
  styleUrls: ['./security-section.component.scss']
})
export class SecuritySectionComponent {
  constructor(private sanitizer: DomSanitizer) {}

  private svg(path: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(
      `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">${path}</svg>`
    );
  }

  private badge(iconPath: string, text: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(
      `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">${iconPath}</svg> ${text}`
    );
  }

  readonly securityItems = [
    {
      icon: this.svg('<rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path>'),
      title: 'AES-256-GCM Encryption',
      description: 'Every PHI field is encrypted at the database level with AES-256-GCM — authenticated encryption providing both confidentiality and integrity. Each value carries a unique 12-byte random nonce.',
      color: 'var(--accent)',
      bg: 'rgba(56, 139, 253, 0.1)'
    },
    {
      icon: this.svg('<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>'),
      title: 'Azure Key Vault',
      description: 'Encryption keys are stored in Azure Key Vault — never in your database or code. Key rotation is zero-downtime. In development, a safe local key is used automatically.',
      color: 'var(--warning)',
      bg: 'rgba(210, 153, 34, 0.1)'
    },
    {
      icon: this.svg('<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path>'),
      title: 'TOTP Multi-Factor Auth',
      description: 'Every user sign-in can be protected by TOTP (RFC 6238) compatible with Google Authenticator. Email OTP and 8 one-time backup codes are also supported.',
      color: 'var(--success)',
      bg: 'rgba(63, 185, 80, 0.1)'
    },
    {
      icon: this.svg('<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>'),
      title: '6-Year Audit Log',
      description: 'An append-only audit log records every access and modification to PHI — retained for 6 years as required by HIPAA. Logs are immutable and cannot be deleted by users.',
      color: 'var(--purple)',
      bg: 'rgba(188, 140, 255, 0.1)'
    },
    {
      icon: this.svg('<line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>'),
      title: 'TLS 1.3 in Transit',
      description: 'All data in transit is protected with TLS 1.3. HSTS preload is enforced in production. Inter-service communication within the platform also uses encrypted connections.',
      color: 'var(--accent)',
      bg: 'rgba(56, 139, 253, 0.1)'
    },
    {
      icon: this.svg('<polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"></path>'),
      title: 'Automatic Audio Deletion',
      description: 'Session audio is permanently deleted from Azure Blob Storage immediately after transcription completes — minimizing PHI exposure and satisfying the HIPAA minimum necessary standard.',
      color: 'var(--danger)',
      bg: 'rgba(248, 81, 73, 0.1)'
    }
  ];

  readonly badges = [
    { html: this.badge('<rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path>', 'AES-256-GCM at rest') },
    { html: this.badge('<line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>', 'TLS 1.3 in transit') },
    { html: this.badge('<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>', 'Azure Key Vault') },
    { html: this.badge('<rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line>', 'TOTP MFA') },
    { html: this.badge('<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>', '6-year audit log') },
    { html: this.badge('<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle>', 'BAA (Clinic plan)') }
  ];
}
