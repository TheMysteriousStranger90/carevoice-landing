import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FEATURES } from '../../content/features';
import { SECTIONS } from '../../content/site';
import { TONES } from '../../content/tones';
import { RevealDirective } from '../../directives/reveal.directive';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'app-features',
  imports: [RevealDirective, IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="section features" [id]="sectionId">
      <div class="container">
        <div class="section-header" appReveal>
          <p class="section-tag">Capabilities</p>
          <h2>Everything a modern practice needs</h2>
          <p>
            From voice capture to MFA-protected electronic signature — all in one platform built to
            support HIPAA compliance.
          </p>
        </div>

        <div class="grid grid--3 features__grid">
          @for (feat of features; track feat.title) {
            <div class="card features__card" appReveal>
              <div
                class="features__icon"
                [style.background]="tones[feat.tone].background"
                [style.color]="tones[feat.tone].color"
              >
                <app-icon [name]="feat.icon" [size]="22" />
              </div>
              <h3 class="features__title">{{ feat.title }}</h3>
              <p class="features__desc">{{ feat.description }}</p>
            </div>
          }
        </div>
      </div>
    </section>
  `,
  styleUrls: ['./features.component.scss']
})
export class FeaturesComponent {
  readonly sectionId = SECTIONS.features.id;
  readonly features = FEATURES;
  readonly tones = TONES;
}
