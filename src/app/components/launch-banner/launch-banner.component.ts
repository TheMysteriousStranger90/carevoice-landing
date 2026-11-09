import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  inject,
  signal
} from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { environment } from '../../../environments/environment';
import { LAUNCH, SECTIONS } from '../../content/site';
import { RevealDirective } from '../../directives/reveal.directive';
import { IconComponent } from '../icon/icon.component';

export interface Countdown {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const SECOND = 1000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

/** Pure helper (exported for tests): time left until `target`, clamped at zero. */
export function timeLeft(target: number, now: number): Countdown {
  const diff = Math.max(0, target - now);
  return {
    days: Math.floor(diff / DAY),
    hours: Math.floor((diff % DAY) / HOUR),
    minutes: Math.floor((diff % HOUR) / MINUTE),
    seconds: Math.floor((diff % MINUTE) / SECOND)
  };
}

@Component({
  selector: 'app-launch-banner',
  imports: [ReactiveFormsModule, RevealDirective, DecimalPipe, IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="section launch-banner" [id]="sectionId">
      <div class="launch-banner__glow" aria-hidden="true"></div>
      <div class="container">
        <div class="launch-banner__inner" appReveal>
          <!-- Launch header -->
          <div class="launch-banner__header">
            <div class="launch-banner__chip">
              <span class="launch-banner__chip-dot" aria-hidden="true"></span>
              Launching {{ launch.label }}
            </div>
            <h2 class="launch-banner__title">
              CareVoice is almost here.<br />
              <span class="gradient-text">Be the first to know.</span>
            </h2>
            <p class="launch-banner__subtitle">
              We're building the future of clinical documentation for mental health professionals.
              Join the waitlist and get early access when we launch in {{ launch.quarterLabel }}.
            </p>
          </div>

          <!-- Countdown: decorative for screen readers (a ticking value is noise), who get the date instead -->
          @if (!launched()) {
            <div class="launch-banner__countdown" aria-hidden="true">
              @for (unit of countdownUnits(); track unit.label) {
                <div class="launch-banner__unit">
                  <div class="launch-banner__digit">{{ unit.value | number: '2.0-0' }}</div>
                  <div class="launch-banner__label">{{ unit.label }}</div>
                </div>
                @if (!$last) {
                  <div class="launch-banner__separator">:</div>
                }
              }
            </div>
            <p class="launch-banner__target-note">
              <span class="sr-only">Target launch date:</span>
              Target date: {{ targetLabel }} (UTC) — may change.
            </p>
          } @else {
            <p class="launch-banner__target-note">
              Launch is imminent. Join the waitlist and we'll email you as soon as access opens.
            </p>
          }

          <!-- Waitlist form -->
          <form
            class="launch-banner__form"
            [formGroup]="waitlistForm"
            (ngSubmit)="onSubmit()"
            novalidate
          >
            @if (!submitted()) {
              <div class="launch-banner__form-row">
                <div class="launch-banner__field" [class.launch-banner__field--error]="showError()">
                  <input
                    type="email"
                    name="email"
                    placeholder="your@email.com"
                    formControlName="email"
                    class="launch-banner__input"
                    aria-label="Email address for waitlist"
                    autocomplete="email"
                    inputmode="email"
                    [attr.aria-invalid]="showError() ? 'true' : null"
                    [attr.aria-describedby]="showError() ? 'waitlist-email-error' : null"
                    (input)="clearErrors()"
                  />
                  @if (showError()) {
                    <span class="launch-banner__error" id="waitlist-email-error"
                      >Please enter a valid email address.</span
                    >
                  }
                </div>
                <button
                  type="submit"
                  class="btn btn--primary btn--lg launch-banner__submit"
                  [disabled]="loading()"
                >
                  <app-icon name="send" [size]="16" [strokeWidth]="2.5" />
                  {{ loading() ? 'Joining…' : 'Join Waitlist' }}
                </button>
              </div>
              @if (submitError()) {
                <p class="launch-banner__submit-error" role="alert">{{ submitError() }}</p>
              }
              <p class="launch-banner__disclaimer">
                No spam, ever. We'll only reach out with launch news and early access invites.
              </p>
            }

            <!-- Persistent live region: the confirmation is announced when it appears -->
            <div role="status" aria-live="polite">
              @if (submitted()) {
                <div class="launch-banner__success">
                  <div class="launch-banner__success-icon">
                    <app-icon name="check" [size]="24" [strokeWidth]="2.5" />
                  </div>
                  <div>
                    <p class="launch-banner__success-title">You're on the list!</p>
                    <p class="launch-banner__success-text">
                      We'll notify you as soon as CareVoice launches in
                      {{ launch.label.toLowerCase() }}.
                    </p>
                  </div>
                </div>
              }
            </div>
          </form>
        </div>
      </div>
    </section>
  `,
  styleUrls: ['./launch-banner.component.scss']
})
export class LaunchBannerComponent {
  private readonly fb = inject(FormBuilder);
  private readonly http = inject(HttpClient);
  private readonly destroyRef = inject(DestroyRef);

  readonly launch = LAUNCH;
  readonly sectionId = SECTIONS.waitlist.id;

  /** Same instant for every visitor (UTC), unlike a local-time `new Date('…T00:00:00')`. */
  private readonly target = Date.parse(LAUNCH.targetDateIso);
  readonly targetLabel = new Date(this.target).toLocaleDateString('en-US', {
    timeZone: 'UTC',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  readonly submitted = signal(false);
  readonly showError = signal(false);
  readonly loading = signal(false);
  readonly submitError = signal<string | null>(null);

  readonly waitlistForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]]
  });

  private readonly now = signal(Date.now());
  private readonly countdown = computed(() => timeLeft(this.target, this.now()));

  /** After the target moment the timer is replaced by a message instead of freezing at 00:00:00:00. */
  readonly launched = computed(() => this.target - this.now() <= 0);

  readonly countdownUnits = computed(() => {
    const c = this.countdown();
    return [
      { value: c.days, label: 'Days' },
      { value: c.hours, label: 'Hours' },
      { value: c.minutes, label: 'Min' },
      { value: c.seconds, label: 'Sec' }
    ];
  });

  constructor() {
    afterNextRender(() => {
      this.now.set(Date.now());
      if (this.launched()) {
        return;
      }
      // Zoneless: setting the signal is what schedules a re-render, so this tick only
      // touches this component and stops itself once the target has passed.
      const id = setInterval(() => {
        this.now.set(Date.now());
        if (this.launched()) {
          clearInterval(id);
        }
      }, SECOND);
      this.destroyRef.onDestroy(() => clearInterval(id));
    });
  }

  clearErrors(): void {
    this.showError.set(false);
    this.submitError.set(null);
  }

  onSubmit(): void {
    if (this.waitlistForm.invalid) {
      this.showError.set(true);
      this.waitlistForm.markAllAsTouched();
      return;
    }
    this.clearErrors();
    this.loading.set(true);

    const email = this.waitlistForm.value.email;

    this.http
      .post(
        environment.waitlistEndpoint,
        { email, _subject: 'New CareVoice waitlist signup' },
        { headers: { Accept: 'application/json' } }
      )
      .subscribe({
        next: () => {
          this.loading.set(false);
          this.submitted.set(true);
        },
        error: () => {
          this.loading.set(false);
          this.submitError.set('Something went wrong. Please try again in a moment.');
        }
      });
  }
}
