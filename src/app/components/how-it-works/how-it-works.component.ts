import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { RevealDirective } from '../../directives/reveal.directive';

@Component({
  selector: 'app-how-it-works',
  standalone: true,
  imports: [RevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="section how-it-works" id="how-it-works">
      <div class="container">
        <div class="section-header" appReveal>
          <p class="section-tag">The Pipeline</p>
          <h2>From voice to signed note — without the effort</h2>
          <p>A fully automated five-step pipeline handles the heavy lifting. You review and sign.</p>
        </div>

        <div class="how-it-works__steps">
          @for (step of steps; track step.number) {
            <div class="how-it-works__step" appReveal>
              <div class="how-it-works__step-icon" [style.background]="step.bgColor" [innerHTML]="step.icon">
              </div>
              @if (!$last) {
                <div class="how-it-works__arrow" aria-hidden="true">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </div>
              }
              <div class="how-it-works__step-content">
                <div class="how-it-works__step-number">{{ step.number }}</div>
                <h3 class="how-it-works__step-title">{{ step.title }}</h3>
                <p class="how-it-works__step-desc">{{ step.description }}</p>
              </div>
            </div>
          }
        </div>

        <!-- Technology strip -->
        <div class="how-it-works__tech" appReveal>
          <span class="how-it-works__tech-label">Powered by</span>
          @for (tech of technologies; track tech) {
            <span class="how-it-works__tech-badge">{{ tech }}</span>
          }
        </div>
      </div>
    </section>
  `,
  styleUrls: ['./how-it-works.component.scss']
})
export class HowItWorksComponent {
  constructor(private sanitizer: DomSanitizer) {}

  private svg(path: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(
      `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">${path}</svg>`
    );
  }

  readonly steps = [
    {
      number: '01',
      title: 'Dictate',
      description: 'Record directly in the browser via MediaRecorder API. Up to 500 MB per session. English (US) by default.',
      icon: this.svg('<path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/>'),
      bgColor: 'rgba(56, 139, 253, 0.12)'
    },
    {
      number: '02',
      title: 'Upload',
      description: 'Audio is encrypted in transit (TLS 1.3) and stored in Azure Blob Storage — zero PHI in file paths. Deleted immediately after transcription.',
      icon: this.svg('<polyline points="16 16 12 12 8 16"/><line x1="12" y1="12" x2="12" y2="21"/><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"/>'),
      bgColor: 'rgba(63, 185, 80, 0.12)'
    },
    {
      number: '03',
      title: 'Transcribe',
      description: 'Azure Cognitive Services Speech SDK — speaker-aware conversation transcription in ≤ 3 seconds per session.',
      icon: this.svg('<rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="3" y1="15" x2="21" y2="15"/><line x1="9" y1="3" x2="9" y2="21"/>'),
      bgColor: 'rgba(210, 153, 34, 0.12)'
    },
    {
      number: '04',
      title: 'AI Structures',
      description: 'GPT-4o via Microsoft.Extensions.AI maps the transcript into all four SOAP sections automatically using clinical-grade prompts.',
      icon: this.svg('<circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/>'),
      bgColor: 'rgba(188, 140, 255, 0.12)'
    },
    {
      number: '05',
      title: 'Review & Sign',
      description: 'Edit any section, add an addendum if needed, then sign electronically with MFA verification. SHA-256 hash seals the note.',
      icon: this.svg('<polyline points="20 6 9 17 4 12"/>'),
      bgColor: 'rgba(63, 185, 80, 0.12)'
    }
  ];

  readonly technologies = [
    'Azure Cognitive Services', 'GPT-4o', 'Azure Blob Storage', 'AES-256-GCM', 'TLS 1.3', 'SHA-256 Signatures'
  ];
}
