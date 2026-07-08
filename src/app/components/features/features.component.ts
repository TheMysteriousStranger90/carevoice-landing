import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RevealDirective } from '../../directives/reveal.directive';

@Component({
  selector: 'app-features',
  standalone: true,
  imports: [RevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="section features" id="features">
      <div class="container">
        <div class="section-header" appReveal>
          <p class="section-tag">Capabilities</p>
          <h2>Everything a modern practice needs</h2>
          <p>From voice capture to legally-binding electronic signature — all in one HIPAA-compliant platform.</p>
        </div>

        <div class="grid grid--3 features__grid">
          @for (feat of features; track feat.title) {
            <div class="card features__card" appReveal>
              <div class="features__icon" [style.background]="feat.iconBg" [style.color]="feat.iconColor">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" [innerHTML]="feat.icon"></svg>
              </div>
              <h3 class="features__title">{{ feat.title }}</h3>
              <p class="features__desc">{{ feat.description }}</p>
            </div>
          }
        </div>
      </div>
    </section>
  `,
  styleUrls: ['./features.component.scss']
})
export class FeaturesComponent {
  readonly features = [
    {
      icon: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
      title: 'HIPAA Compliance by Design',
      description: 'AES-256-GCM encryption on every PHI field at the database level. Keys live in Azure Key Vault. An append-only audit log is retained for 6 years — not an add-on, built in from day one.',
      iconBg: 'rgba(56, 139, 253, 0.1)',
      iconColor: 'var(--accent)'
    },
    {
      icon: '<polyline points="20 6 9 17 4 12"/><path d="M22 2L7 17"/>',
      title: 'MFA-Gated Electronic Signature',
      description: 'Sign any note only after two-factor verification. Each signature stores a SHA-256 hash of the content at the moment of signing. Revoke with a reason, or attach a linked addendum to a signed note.',
      iconBg: 'rgba(63, 185, 80, 0.1)',
      iconColor: 'var(--success)'
    },
    {
      icon: '<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>',
      title: 'Full-Text Search',
      description: 'Search across all four SOAP sections in every note instantly. Find any session by keyword, patient name, or ICD-10 diagnosis code. No manual indexing required.',
      iconBg: 'rgba(210, 153, 34, 0.1)',
      iconColor: 'var(--warning)'
    },
    {
      icon: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>',
      title: 'PDF Export',
      description: 'Export any signed note as a formatted, HIPAA-compliant PDF — ready for records requests, supervision, or care coordination. Includes therapist info, license, signature, and full audit trail.',
      iconBg: 'rgba(248, 81, 73, 0.1)',
      iconColor: 'var(--danger)'
    },
    {
      icon: '<rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>',
      title: 'Practice Dashboard',
      description: 'Session counts, note totals, subscription status, and last activity — your whole practice at a glance, updated in real time. Monitor usage across your entire team from one screen.',
      iconBg: 'rgba(188, 140, 255, 0.1)',
      iconColor: 'var(--purple)'
    },
    {
      icon: '<polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>',
      title: 'Automatic Audio Deletion',
      description: 'Audio files are physically deleted from cloud storage the moment transcription completes — satisfying the HIPAA minimum necessary rule automatically, with no manual action needed.',
      iconBg: 'rgba(56, 139, 253, 0.1)',
      iconColor: 'var(--accent)'
    }
  ];
}
