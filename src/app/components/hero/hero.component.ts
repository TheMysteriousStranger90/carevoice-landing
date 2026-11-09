import { ChangeDetectionStrategy, Component } from '@angular/core';
import { COMPLIANCE_COPY, LAUNCH, SECTIONS } from '../../content/site';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'app-hero',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IconComponent],
  template: `
    <section class="hero" id="home">
      <!-- Ambient background -->
      <div class="hero__glow hero__glow--1" aria-hidden="true"></div>
      <div class="hero__glow hero__glow--2" aria-hidden="true"></div>
      <div class="hero__grid" aria-hidden="true"></div>

      <div class="container hero__container">
        <!-- Launch badge -->
        <div class="hero__badge">
          <span class="hero__badge-dot"></span>
          <span>Launching {{ launch.label }} &nbsp;·&nbsp; Join the Waitlist</span>
        </div>

        <!-- Headline -->
        <h1 class="hero__title">
          Dictate sessions.<br />
          <span class="gradient-text">AI writes the notes.</span>
        </h1>

        <!-- Subtitle -->
        <p class="hero__subtitle">
          Built for psychotherapists who spend more time on paperwork than on clients. Upload a
          session recording and get a structured SOAP note draft — ready for your review and
          signature.
        </p>

        <!-- CTA buttons -->
        <div class="hero__cta">
          <a [href]="'#' + waitlistId" class="btn btn--primary btn--lg">
            <app-icon name="mail" [size]="18" [strokeWidth]="2" />
            Join the Waitlist
          </a>
          <a [href]="'#' + howItWorksId" class="btn btn--outline btn--lg"> See How It Works </a>
        </div>

        <!-- Stats strip -->
        <div class="hero__stats">
          @for (s of stats; track s.value) {
            <div class="hero__stat">
              <div class="hero__stat-value">{{ s.value }}</div>
              <div class="hero__stat-label">{{ s.label }}</div>
            </div>
          }
        </div>

        <!-- Floating SOAP note mockup -->
        <div class="hero__mockup" role="img" aria-label="CareVoice SOAP note preview">
          <!-- Browser chrome -->
          <div class="mockup__chrome">
            <div class="mockup__dots">
              <span class="mockup__dot mockup__dot--red"></span>
              <span class="mockup__dot mockup__dot--yellow"></span>
              <span class="mockup__dot mockup__dot--green"></span>
            </div>
            <div class="mockup__url">
              <app-icon name="lock" [size]="12" [strokeWidth]="2" />
              app.carevoice.io
            </div>
            <div class="mockup__actions"><span></span><span></span><span></span></div>
          </div>

          <!-- SOAP note content -->
          <div class="mockup__body">
            <div class="mockup__header">
              <div>
                <div class="mockup__title">SOAP Note</div>
                <div class="mockup__meta">
                  <span class="badge badge--green">✓ Signed</span>
                  <span class="mockup__version">v5 · Robert Chen</span>
                </div>
              </div>
              <div class="mockup__header-actions">
                <span class="mockup__btn">Revoke</span>
                <span class="mockup__btn mockup__btn--primary">Export PDF</span>
              </div>
            </div>

            <div class="mockup__sections">
              <div class="mockup__section mockup__section--s">
                <div class="mockup__section-label">S — Subjective</div>
                <p>
                  Patient reports feeling 'a bit better' since last week. Sleep has improved to 5-6
                  hours nightly. Still experiencing low energy and difficulty concentrating at work.
                  Appetite remains decreased. Denies suicidal ideation. Rates mood as 4/10 today.
                </p>
              </div>
              <div class="mockup__section mockup__section--o">
                <div class="mockup__section-label">O — Objective</div>
                <p>
                  Patient appears slightly more animated than previous session. Eye contact
                  maintained. Speech rate normal. Affect congruent with reported mood. No
                  psychomotor retardation observed. Thought process linear and goal-directed.
                </p>
              </div>
              <div class="mockup__section mockup__section--a">
                <div class="mockup__section-label">A — Assessment</div>
                <p>
                  Major Depressive Disorder, recurrent episode, moderate severity (ICD-10: F32.2).
                  Patient shows partial response to current medication with improvement in sleep but
                  persistent cognitive symptoms and low energy.
                </p>
              </div>
              <div class="mockup__section mockup__section--p">
                <div class="mockup__section-label">P — Plan</div>
                <p>
                  Continue current medication regimen; monitor sleep quality, energy levels, and
                  concentration. Consider augmenting therapy with cognitive behavioral strategies.
                  Schedule follow-up in one week to assess progress.
                </p>
              </div>
            </div>
          </div>

          <!-- Floating badges -->
          <div class="mockup__badge mockup__badge--1">
            <app-icon name="check" [size]="14" [strokeWidth]="2" />
            {{ compliance.badge }}
          </div>
          <div class="mockup__badge mockup__badge--2">
            <app-icon name="file" [size]="14" [strokeWidth]="2" />
            AI draft · you review &amp; sign
          </div>
        </div>
      </div>
    </section>
  `,
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent {
  readonly launch = LAUNCH;
  readonly compliance = COMPLIANCE_COPY;
  readonly waitlistId = SECTIONS.waitlist.id;
  readonly howItWorksId = SECTIONS.howItWorks.id;

  /** Only statements that describe how the product is built – no unmeasured speed or savings claims. */
  readonly stats = [
    { value: 'SOAP', label: 'clinical note format' },
    { value: 'Encrypted', label: 'at rest and in transit' },
    { value: 'MFA', label: 'gated e-signature' },
    { value: 'You sign', label: 'every note after review' }
  ];
}
