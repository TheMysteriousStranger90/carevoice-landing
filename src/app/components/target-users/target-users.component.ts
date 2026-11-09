import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PLANS } from '../../content/plans';
import { SECTIONS } from '../../content/site';
import { RevealDirective } from '../../directives/reveal.directive';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'app-target-users',
  imports: [RevealDirective, IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="section target-users" [id]="sectionId">
      <div class="container">
        <div class="section-header" appReveal>
          <p class="section-tag">Who It's Built For</p>
          <h2>Built for mental health professionals</h2>
          <p>
            CareVoice helps licensed therapists, clinical psychologists, and counselors reclaim the
            hours lost to clinical documentation every week.
          </p>
        </div>

        <div class="grid grid--3 target-users__grid">
          @for (plan of plans; track plan.id) {
            <div class="card target-users__card" appReveal>
              <div class="target-users__icon">
                <app-icon [name]="plan.audience.icon" [size]="28" />
              </div>
              <h3 class="target-users__title">{{ plan.audience.title }}</h3>
              <p class="target-users__desc">{{ plan.audience.description }}</p>
              <ul class="check-list target-users__list">
                @for (item of plan.audience.highlights; track item) {
                  <li>
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
                    {{ item }}
                  </li>
                }
              </ul>
            </div>
          }
        </div>
      </div>
    </section>
  `,
  styleUrls: ['./target-users.component.scss']
})
export class TargetUsersComponent {
  readonly plans = PLANS;
  readonly sectionId = SECTIONS.who.id;
}
