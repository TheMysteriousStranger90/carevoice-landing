import { Component, ChangeDetectionStrategy } from '@angular/core';
import { UpperCasePipe } from '@angular/common';
import { RevealDirective } from '../../directives/reveal.directive';

@Component({
  selector: 'app-soap-format',
  standalone: true,
  imports: [RevealDirective, UpperCasePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="section soap-format" id="soap-format">
      <div class="container">
        <div class="soap-format__layout">

          <!-- Left: Explanation -->
          <div class="soap-format__left" appReveal>
            <p class="section-tag">Clinical Standard</p>
            <h2 class="soap-format__title">The format clinicians trust</h2>
            <p class="soap-format__subtitle">
              Every note is structured as a proper <strong>SOAP note</strong> — the documentation format used across
              psychotherapy, psychiatry, and counseling worldwide. CareVoice understands clinical context, not just dictation.
            </p>
            <ul class="check-list soap-format__features">
              @for (feat of features; track feat) {
                <li>
                  <svg class="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="9 12 12 15 16 9"/>
                  </svg>
                  {{ feat }}
                </li>
              }
            </ul>
          </div>

          <!-- Right: SOAP cards -->
          <div class="soap-format__right">
            @for (section of sections; track section.key) {
              <div class="soap-format__card soap-format__card--{{ section.key }}" appReveal>
                <div class="soap-format__card-header">
                  <span class="soap-format__letter">{{ section.key | uppercase }}</span>
                  <span class="soap-format__section-name">{{ section.name }}</span>
                </div>
                <p class="soap-format__card-text">{{ section.description }}</p>
                <div class="soap-format__example">{{ section.example }}</div>
              </div>
            }
          </div>

        </div>
      </div>
    </section>
  `,
  styleUrls: ['./soap-format.component.scss']
})
export class SoapFormatComponent {
  readonly features = [
    'Up to 10,000 characters per section',
    'Uncertain content flagged for therapist review',
    'Full edit history with version tracking',
    'HIPAA-compliant PDF export with watermark',
    'SHA-256 electronic signature with audit trail'
  ];

  readonly sections: { key: string; name: string; description: string; example: string }[] = [
    {
      key: 's',
      name: 'Subjective',
      description: "The client's own words — feelings, key themes, quotes, reported experiences, and stated concerns.",
      example: '"Patient reports feeling better since adjusting sleep schedule. Rates mood 5/10."'
    },
    {
      key: 'o',
      name: 'Objective',
      description: 'Observable facts: affect, behavior, test results (e.g., PHQ-9), session duration, contact quality.',
      example: 'Affect congruent. Eye contact maintained. PHQ-9 score 14 (moderate).'
    },
    {
      key: 'a',
      name: 'Assessment',
      description: 'Clinical analysis: current ICD-10 diagnosis, progress toward treatment goals, clinical judgment.',
      example: 'MDD, recurrent, moderate (F32.2). Partial response to current regimen.'
    },
    {
      key: 'p',
      name: 'Plan',
      description: 'Next steps: homework, follow-up date, treatment plan changes, referrals.',
      example: 'Continue CBT. Behavioral activation exercises assigned. Follow-up in 1 week.'
    }
  ];
}
