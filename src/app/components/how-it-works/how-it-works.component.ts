import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PIPELINE_STEPS, TECHNOLOGIES } from '../../content/pipeline';
import { SECTIONS } from '../../content/site';
import { RevealDirective } from '../../directives/reveal.directive';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'app-how-it-works',
  imports: [RevealDirective, IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="section how-it-works" [id]="sectionId">
      <div class="container">
        <div class="section-header" appReveal>
          <p class="section-tag">The Pipeline</p>
          <h2>From voice to signed note — without the effort</h2>
          <p>
            A fully automated five-step pipeline handles the heavy lifting. You review and sign.
          </p>
        </div>

        <div class="how-it-works__steps">
          @for (step of steps; track step.number) {
            <div class="how-it-works__step" appReveal>
              <div class="how-it-works__step-icon" [style.background]="step.background">
                <app-icon [name]="step.icon" [size]="28" />
              </div>
              @if (!$last) {
                <div class="how-it-works__arrow" aria-hidden="true">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
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
  readonly sectionId = SECTIONS.howItWorks.id;
  readonly steps = PIPELINE_STEPS;
  readonly technologies = TECHNOLOGIES;
}
