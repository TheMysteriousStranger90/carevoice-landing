import { Component, ChangeDetectionStrategy, signal, computed, inject } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { RevealDirective } from '../../directives/reveal.directive';

interface Shot {
  type: 'video' | 'image';
  src: string;
  url: string;
  caption: string;
  youtubeId?: string;
}

@Component({
  selector: 'app-dev-diary',
  standalone: true,
  imports: [RevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="section dev-diary" id="progress">
      <div class="container">

        <div class="section-header" appReveal>
          <p class="section-tag">Behind the build</p>
          <h2>Where CareVoice is right now</h2>
          <p>
            We're building in the open. The clinical core already works end-to-end — recording,
            AI SOAP notes, e-signature and PDF export. Right now we're wiring up billing.
          </p>
        </div>

        <!-- Build status -->
        <div class="dev-diary__status" appReveal>
          @for (item of status; track item.title) {
            <div class="dev-diary__status-item" [attr.data-state]="item.state">
              <div class="dev-diary__status-head">
                <span class="dev-diary__status-badge">{{ item.badge }}</span>
                <h3 class="dev-diary__status-title">{{ item.title }}</h3>
              </div>
              <p class="dev-diary__status-text">{{ item.text }}</p>
            </div>
          }
        </div>

        <!-- Screenshot / video viewer in a browser frame -->
        <div class="dev-diary__viewer" appReveal>
          <div class="dev-diary__browser">
            <div class="dev-diary__chrome">
              <span class="dev-diary__dots">
                <span></span><span></span><span></span>
              </span>
              <span class="dev-diary__address">{{ current().url }}</span>
            </div>

            <div
              class="dev-diary__screen"
              [class.dev-diary__screen--video]="current().type === 'video'">

              @if (current().type === 'video' && videoPlaying()) {
                <iframe
                  class="dev-diary__video"
                  [src]="videoEmbedUrl()!"
                  title="CareVoice walkthrough video"
                  frameborder="0"
                  allow="autoplay; encrypted-media; picture-in-picture"
                  allowfullscreen>
                </iframe>
              } @else {
                <img
                  [src]="current().src"
                  [alt]="current().caption"
                  class="dev-diary__img"
                  loading="lazy"
                  decoding="async"
                >
                @if (current().type === 'video') {
                  <button
                    type="button"
                    class="dev-diary__play"
                    aria-label="Play video"
                    (click)="playVideo()">
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </button>
                }
              }
            </div>
          </div>

          <div class="dev-diary__controls">
            <button
              type="button"
              class="dev-diary__nav"
              aria-label="Previous screenshot"
              (click)="prev()">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="15 18 9 12 15 6"/>
              </svg>
            </button>

            <p class="dev-diary__caption">
              <span class="dev-diary__counter">{{ index() + 1 }} / {{ shots.length }}</span>
              {{ current().caption }}
            </p>

            <button
              type="button"
              class="dev-diary__nav"
              aria-label="Next screenshot"
              (click)="next()">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="9 18 15 12 9 6"/>
              </svg>
            </button>
          </div>

          <div class="dev-diary__dotsnav" role="tablist" aria-label="Choose screenshot">
            @for (shot of shots; track shot.src; let i = $index) {
              <button
                type="button"
                class="dev-diary__dot"
                [class.dev-diary__dot--active]="i === index()"
                [attr.aria-label]="shot.caption"
                [attr.aria-selected]="i === index()"
                (click)="goTo(i)">
              </button>
            }
          </div>
        </div>

      </div>
    </section>
  `,
  styleUrls: ['./dev-diary.component.scss']
})
export class DevDiaryComponent {
  private readonly sanitizer = inject(DomSanitizer);

  readonly status = [
    {
      badge: 'Shipped',
      state: 'done',
      title: 'Clinical core',
      text: 'Sessions, speech-to-SOAP transcription, note editing, MFA e-signature and HIPAA-compliant PDF export all work end-to-end.'
    },
    {
      badge: 'In progress',
      state: 'active',
      title: 'Payments & billing',
      text: 'Integrating PayPal Subscriptions (Solo / Practice / Clinic), the 14-day trial, and secure billing webhooks with idempotency.'
    },
    {
      badge: 'Next up',
      state: 'planned',
      title: 'Public launch',
      text: 'Onboarding, team management and the early-2027 public launch for everyone on the waitlist.'
    }
  ];

  readonly shots: Shot[] = [
    {
      type: 'video',
      src: 'https://img.youtube.com/vi/55LaswfdIHc/maxresdefault.jpg',
      url: 'youtube.com/watch?v=55LaswfdIHc',
      caption: 'Watch the full walkthrough on YouTube',
      youtubeId: '55LaswfdIHc'
    },
    { type: 'image', src: 'screenshots/dashboard.png',        url: 'app.carevoice.io/dashboard',        caption: 'Dashboard — your whole practice at a glance' },
    { type: 'image', src: 'screenshots/sessions.png',         url: 'app.carevoice.io/sessions',         caption: 'Sessions — filter and manage therapy sessions' },
    { type: 'image', src: 'screenshots/new-session.png',      url: 'app.carevoice.io/sessions/new',     caption: 'Start a session — patient, type and pre-session notes' },
    { type: 'image', src: 'screenshots/record-transcribe.png', url: 'app.carevoice.io/sessions/active',  caption: 'Record & transcribe — audio deleted after transcription (HIPAA)' },
    { type: 'image', src: 'screenshots/soap-draft.png',       url: 'app.carevoice.io/notes/draft',      caption: 'AI-generated SOAP note, ready for therapist review' },
    { type: 'image', src: 'screenshots/soap-signed.png',      url: 'app.carevoice.io/notes/signed',     caption: 'Electronically signed with a SHA-256 audit trail' },
    { type: 'image', src: 'screenshots/pdf-export.png',       url: 'app.carevoice.io/notes/export.pdf', caption: 'HIPAA-compliant PDF export, ready for records' },
    { type: 'image', src: 'screenshots/subscription.png',     url: 'app.carevoice.io/subscription',     caption: 'Subscription & billing — powered by PayPal' },
    { type: 'image', src: 'screenshots/patient.png',          url: 'app.carevoice.io/patients',         caption: 'Patient record with encrypted PHI' }
  ];

  readonly index = signal(0);
  readonly current = computed(() => this.shots[this.index()]);

  readonly videoPlaying = signal(false);

  readonly videoEmbedUrl = computed<SafeResourceUrl | null>(() => {
    const shot = this.current();
    if (shot.type !== 'video' || !shot.youtubeId) return null;
    return this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://www.youtube-nocookie.com/embed/${shot.youtubeId}?autoplay=1&rel=0`
    );
  });

  next(): void {
    this.videoPlaying.set(false);
    this.index.update(i => (i + 1) % this.shots.length);
  }

  prev(): void {
    this.videoPlaying.set(false);
    this.index.update(i => (i - 1 + this.shots.length) % this.shots.length);
  }

  goTo(i: number): void {
    this.videoPlaying.set(false);
    this.index.set(i);
  }

  playVideo(): void {
    this.videoPlaying.set(true);
  }
}
