import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RevealDirective } from '../../directives/reveal.directive';

interface PricingPlan {
  name: string;
  price: number;
  period: string;
  tagline: string;
  popular: boolean;
  features: { text: string; included: boolean }[];
}

@Component({
  selector: 'app-pricing',
  standalone: true,
  imports: [RevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="section pricing" id="pricing">
      <div class="container">
        <div class="section-header" appReveal>
          <p class="section-tag">Pricing</p>
          <h2>Straightforward pricing</h2>
          <p>Every plan includes a 14-day free trial. No credit card required. Cancel anytime.</p>
        </div>

        <div class="pricing__grid">
          @for (plan of plans; track plan.name) {
            <div class="pricing__card" [class.pricing__card--popular]="plan.popular" appReveal>
              @if (plan.popular) {
                <div class="pricing__popular-badge">Most Popular</div>
              }
              <div class="pricing__header">
                <h3 class="pricing__name">{{ plan.name }}</h3>
                <div class="pricing__price">
                  <span class="pricing__currency">$</span>
                  <span class="pricing__amount">{{ plan.price }}</span>
                  <span class="pricing__period">/ mo</span>
                </div>
                <p class="pricing__tagline">{{ plan.tagline }}</p>
              </div>

              <hr class="divider">

              <ul class="check-list pricing__features">
                @for (feat of plan.features; track feat.text) {
                  <li>
                    @if (feat.included) {
                      <svg class="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                    } @else {
                      <svg class="cross-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
                        <line x1="18" y1="6" x2="6" y2="18"/>
                        <line x1="6" y1="6" x2="18" y2="18"/>
                      </svg>
                    }
                    <span [class.pricing__feat--unavailable]="!feat.included">{{ feat.text }}</span>
                  </li>
                }
              </ul>

              <a href="#waitlist" class="btn pricing__cta" [class.btn--primary]="plan.popular" [class.btn--outline]="!plan.popular">
                Start Free Trial
              </a>
            </div>
          }
        </div>

        <p class="pricing__note" appReveal>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
          All plans include a 14-day free trial. Cancel anytime. Powered by PayPal. Prices in USD.
        </p>
      </div>
    </section>
  `,
  styleUrls: ['./pricing.component.scss']
})
export class PricingComponent {
  readonly plans: PricingPlan[] = [
    {
      name: 'Solo',
      price: 29,
      period: 'month',
      tagline: 'For one therapist in private practice.',
      popular: false,
      features: [
        { text: '1 therapist', included: true },
        { text: '50 sessions / month', included: true },
        { text: 'Speech-to-SOAP AI', included: true },
        { text: 'PDF export', included: true },
        { text: '1-year note storage', included: true },
        { text: 'Supervisor review', included: false },
        { text: 'EHR-compatible export', included: false },
        { text: 'BAA included', included: false }
      ]
    },
    {
      name: 'Practice',
      price: 79,
      period: 'month',
      tagline: 'For group practices — up to 5 therapists.',
      popular: true,
      features: [
        { text: 'Up to 5 therapists', included: true },
        { text: 'Unlimited sessions', included: true },
        { text: 'Speech-to-SOAP AI', included: true },
        { text: 'PDF export', included: true },
        { text: '7-year note storage', included: true },
        { text: 'Supervisor review', included: true },
        { text: 'Team analytics', included: true },
        { text: 'EHR-compatible export', included: true }
      ]
    },
    {
      name: 'Clinic',
      price: 299,
      period: 'month',
      tagline: 'For clinics and institutions — up to 25 therapists.',
      popular: false,
      features: [
        { text: 'Up to 25 therapists', included: true },
        { text: 'Unlimited sessions', included: true },
        { text: 'Everything in Practice', included: true },
        { text: 'BAA included', included: true },
        { text: 'SSO / Active Directory', included: true },
        { text: 'Custom AI prompts', included: true },
        { text: 'Priority support', included: true },
        { text: 'Dedicated onboarding', included: true }
      ]
    }
  ];
}
