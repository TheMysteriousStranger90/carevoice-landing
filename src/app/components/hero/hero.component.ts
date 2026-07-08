import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-hero',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
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
          <span>Launching Early 2027 &nbsp;·&nbsp; Join the Waitlist</span>
        </div>

        <!-- Headline -->
        <h1 class="hero__title">
          Dictate sessions.<br>
          <span class="gradient-text">AI writes the notes.</span>
        </h1>

        <!-- Subtitle -->
        <p class="hero__subtitle">
          Built for psychotherapists who spend more time on paperwork than on clients.
          Upload a session recording, get a structured SOAP note — ready to sign in under 3 seconds.
        </p>

        <!-- CTA buttons -->
        <div class="hero__cta">
          <a href="#waitlist" class="btn btn--primary btn--lg">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M18 8h1a4 4 0 0 1 0 8h-1"/>
              <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/>
              <line x1="6" y1="1" x2="6" y2="4"/>
              <line x1="10" y1="1" x2="10" y2="4"/>
              <line x1="14" y1="1" x2="14" y2="4"/>
            </svg>
            Join the Waitlist
          </a>
          <a href="#how-it-works" class="btn btn--outline btn--lg">
            See How It Works
          </a>
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
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
              app.carevoice.io
            </div>
            <div class="mockup__actions">
              <span></span><span></span><span></span>
            </div>
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
                <button class="mockup__btn">Revoke</button>
                <button class="mockup__btn mockup__btn--primary">Export PDF</button>
              </div>
            </div>

            <div class="mockup__sections">
              <div class="mockup__section mockup__section--s">
                <div class="mockup__section-label">S — Subjective</div>
                <p>Patient reports feeling 'a bit better' since last week. Sleep has improved to 5-6 hours nightly. Still experiencing low energy and difficulty concentrating at work. Appetite remains decreased. Denies suicidal ideation. Rates mood as 4/10 today.</p>
              </div>
              <div class="mockup__section mockup__section--o">
                <div class="mockup__section-label">O — Objective</div>
                <p>Patient appears slightly more animated than previous session. Eye contact maintained. Speech rate normal. Affect congruent with reported mood. No psychomotor retardation observed. Thought process linear and goal-directed.</p>
              </div>
              <div class="mockup__section mockup__section--a">
                <div class="mockup__section-label">A — Assessment</div>
                <p>Major Depressive Disorder, recurrent episode, moderate severity (ICD-10: F32.2). Patient shows partial response to current medication with improvement in sleep but persistent cognitive symptoms and low energy.</p>
              </div>
              <div class="mockup__section mockup__section--p">
                <div class="mockup__section-label">P — Plan</div>
                <p>Continue current medication regimen; monitor sleep quality, energy levels, and concentration. Consider augmenting therapy with cognitive behavioral strategies. Schedule follow-up in one week to assess progress.</p>
              </div>
            </div>
          </div>

          <!-- Floating badges -->
          <div class="mockup__badge mockup__badge--1">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
            HIPAA Compliant
          </div>
          <div class="mockup__badge mockup__badge--2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
            Generated in 2.8s
          </div>
        </div>

      </div>
    </section>
  `,
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent {
  readonly stats = [
    { value: '40 min', label: 'saved per day' },
    { value: '≤ 3s', label: 'speech-to-SOAP' },
    { value: 'SOAP', label: 'clinical note format' },
    { value: 'E2E', label: 'encrypted PHI' }
  ];
}
