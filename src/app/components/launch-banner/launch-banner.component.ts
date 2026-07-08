import {
  Component,
  OnInit,
  OnDestroy,
  signal,
  computed,
  ChangeDetectionStrategy,
  inject
} from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { RevealDirective } from '../../directives/reveal.directive';

interface Countdown {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

@Component({
  selector: 'app-launch-banner',
  standalone: true,
  imports: [ReactiveFormsModule, RevealDirective, DecimalPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="section launch-banner" id="waitlist">
      <div class="launch-banner__glow" aria-hidden="true"></div>
      <div class="container">
        <div class="launch-banner__inner" appReveal>

          <!-- Launch countdown -->
          <div class="launch-banner__header">
            <div class="launch-banner__chip">
              <span class="launch-banner__chip-dot"></span>
              Launching Early 2027
            </div>
            <h2 class="launch-banner__title">
              CareVoice is almost here.<br>
              <span class="gradient-text">Be the first to know.</span>
            </h2>
            <p class="launch-banner__subtitle">
              We're building the future of clinical documentation for mental health professionals.
              Join the waitlist and get early access when we launch in Q1 2027.
            </p>
          </div>

          <!-- Countdown timer -->
          <div class="launch-banner__countdown">
            @for (unit of countdownUnits(); track unit.label) {
              <div class="launch-banner__unit">
                <div class="launch-banner__digit">{{ unit.value | number:'2.0-0' }}</div>
                <div class="launch-banner__label">{{ unit.label }}</div>
              </div>
              @if (!$last) {
                <div class="launch-banner__separator">:</div>
              }
            }
          </div>

          <!-- Waitlist form -->
          <form class="launch-banner__form" [formGroup]="waitlistForm" (ngSubmit)="onSubmit()" novalidate>
            @if (!submitted()) {
              <div class="launch-banner__form-row">
                <div class="launch-banner__field" [class.launch-banner__field--error]="showError()">
                  <input
                    type="email"
                    placeholder="your@email.com"
                    formControlName="email"
                    class="launch-banner__input"
                    aria-label="Email address for waitlist"
                    autocomplete="email"
                  >
                  @if (showError()) {
                    <span class="launch-banner__error">Please enter a valid email address.</span>
                  }
                </div>
                <button type="submit" class="btn btn--primary btn--lg launch-banner__submit">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <line x1="22" y1="2" x2="11" y2="13"/>
                    <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                  </svg>
                  Join Waitlist
                </button>
              </div>
              <p class="launch-banner__disclaimer">
                No spam, ever. We'll only reach out with launch news and early access invites.
              </p>
            } @else {
              <div class="launch-banner__success">
                <div class="launch-banner__success-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </div>
                <div>
                  <p class="launch-banner__success-title">You're on the list!</p>
                  <p class="launch-banner__success-text">We'll notify you as soon as CareVoice launches in early 2027.</p>
                </div>
              </div>
            }
          </form>

          <!-- Social proof -->
          <div class="launch-banner__social">
            <div class="launch-banner__avatars">
              @for (i of [1,2,3,4,5]; track i) {
                <div class="launch-banner__avatar">{{ avatarLetters[i - 1] }}</div>
              }
            </div>
            <p class="launch-banner__social-text">
              <strong>240+</strong> mental health professionals already on the waitlist
            </p>
          </div>

        </div>
      </div>
    </section>
  `,
  styleUrls: ['./launch-banner.component.scss']
})
export class LaunchBannerComponent implements OnInit, OnDestroy {
  private readonly fb = inject(FormBuilder);

  // Target: March 1, 2027
  private readonly launchDate = new Date('2027-03-01T00:00:00');
  private intervalId: ReturnType<typeof setInterval> | null = null;

  submitted = signal(false);
  showError = signal(false);

  readonly waitlistForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]]
  });

  readonly avatarLetters = ['S', 'M', 'J', 'A', 'R'];

  private countdown = signal<Countdown>(this.computeCountdown());

  readonly countdownUnits = computed(() => {
    const c = this.countdown();
    return [
      { value: c.days, label: 'Days' },
      { value: c.hours, label: 'Hours' },
      { value: c.minutes, label: 'Min' },
      { value: c.seconds, label: 'Sec' }
    ];
  });

  ngOnInit(): void {
    this.intervalId = setInterval(() => {
      this.countdown.set(this.computeCountdown());
    }, 1000);
  }

  ngOnDestroy(): void {
    if (this.intervalId) clearInterval(this.intervalId);
  }

  onSubmit(): void {
    if (this.waitlistForm.invalid) {
      this.showError.set(true);
      this.waitlistForm.markAllAsTouched();
      return;
    }
    this.showError.set(false);
    // In production this would call an API endpoint
    this.submitted.set(true);
  }

  private computeCountdown(): Countdown {
    const now = new Date();
    const diff = Math.max(0, this.launchDate.getTime() - now.getTime());

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds };
  }
}
