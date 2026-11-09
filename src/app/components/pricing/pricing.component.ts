import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PLANS } from '../../content/plans';
import { COMPLIANCE_COPY, LAUNCH, SECTIONS } from '../../content/site';
import { RevealDirective } from '../../directives/reveal.directive';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'app-pricing',
  imports: [RevealDirective, IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="section pricing" [id]="sectionId">
      <div class="container">
        <div class="section-header" appReveal>
          <p class="section-tag">Pricing</p>
          <h2>Straightforward pricing</h2>
          <p>
            Planned launch pricing, {{ launch.label.toLowerCase() }}. Every plan will include a
            14-day free trial, and you can cancel anytime.
          </p>
        </div>

        <div class="pricing__grid">
          @for (plan of plans; track plan.id) {
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

              <hr class="divider" />

              <ul class="check-list pricing__features">
                @for (feat of plan.features; track feat.text) {
                  <li>
                    @if (feat.included) {
                      <svg
                        class="check-icon"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2.5"
                        stroke-linecap="round"
                        aria-hidden="true"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    } @else {
                      <svg
                        class="cross-icon"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2.5"
                        stroke-linecap="round"
                        aria-hidden="true"
                      >
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
                    }
                    <span [class.pricing__feat--unavailable]="!feat.included">
                      @if (!feat.included) {
                        <span class="sr-only">Not included: </span>
                      }
                      {{ feat.text }}
                    </span>
                  </li>
                }
              </ul>

              <!-- The product is pre-launch, so every plan CTA leads to the waitlist. -->
              <a
                [href]="'#' + waitlistId"
                class="btn pricing__cta"
                [class.btn--primary]="plan.popular"
                [class.btn--outline]="!plan.popular"
              >
                Join waitlist
              </a>
            </div>
          }
        </div>

        <p class="pricing__note" appReveal>
          <app-icon name="shield" [size]="14" [strokeWidth]="2" />
          Free trial and billing start at launch. Cancel anytime. Powered by PayPal. Prices in USD.
        </p>
        <p class="pricing__note pricing__note--baa" appReveal>
          {{ compliance.baaNote }}
        </p>
      </div>
    </section>
  `,
  styleUrls: ['./pricing.component.scss']
})
export class PricingComponent {
  readonly plans = PLANS;
  readonly launch = LAUNCH;
  readonly compliance = COMPLIANCE_COPY;
  readonly sectionId = SECTIONS.pricing.id;
  readonly waitlistId = SECTIONS.waitlist.id;
}
