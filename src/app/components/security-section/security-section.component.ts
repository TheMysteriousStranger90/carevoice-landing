import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SECURITY_BADGES, SECURITY_ITEMS } from '../../content/security';
import { COMPLIANCE_COPY, CONTACT, SECTIONS } from '../../content/site';
import { TONES } from '../../content/tones';
import { RevealDirective } from '../../directives/reveal.directive';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'app-security-section',
  imports: [RevealDirective, IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="section security" [id]="sectionId">
      <div class="container">
        <div class="section-header" appReveal>
          <p class="section-tag">Security & Compliance</p>
          <h2>Built secure from the ground up</h2>
          <p>Security safeguards are the foundation every feature is built on.</p>
        </div>

        <div class="grid grid--3 security__cards" appReveal>
          @for (item of items; track item.title) {
            <div class="card security__card">
              <div
                class="security__icon"
                [style.color]="tones[item.tone].color"
                [style.background]="tones[item.tone].background"
              >
                <app-icon [name]="item.icon" [size]="24" />
              </div>
              <h3 class="security__title">{{ item.title }}</h3>
              <p class="security__desc">{{ item.description }}</p>
            </div>
          }
        </div>

        <!-- Security badges strip -->
        <div class="security__strip" appReveal>
          <span class="security__strip-label">SECURITY</span>
          @for (badge of badges; track badge.text) {
            <div class="security__badge">
              <app-icon [name]="badge.icon" [size]="14" [strokeWidth]="2" />
              {{ badge.text }}
            </div>
          }
        </div>

        <!-- Compliance statement: says what the product is built to do, not that it is "certified" -->
        <div class="security__statement" appReveal>
          <div class="security__statement-icon">
            <app-icon name="shield-check" [size]="32" [strokeWidth]="1.5" />
          </div>
          <div>
            <h3 class="security__statement-title">
              Built to support HIPAA Security Rule compliance
            </h3>
            <p class="security__statement-text">
              CareVoice implements technical safeguards aligned with 45 CFR §164.312, including
              access controls, audit controls, integrity controls, and transmission security. HIPAA
              compliance also depends on how each practice uses the product and on its own policies.
            </p>
            <p class="security__statement-text">
              {{ compliance.baaNote }}
              <a [href]="'mailto:' + contact.compliance">{{ contact.compliance }}</a>
            </p>
          </div>
        </div>
      </div>
    </section>
  `,
  styleUrls: ['./security-section.component.scss']
})
export class SecuritySectionComponent {
  readonly sectionId = SECTIONS.security.id;
  readonly items = SECURITY_ITEMS;
  readonly badges = SECURITY_BADGES;
  readonly tones = TONES;
  readonly compliance = COMPLIANCE_COPY;
  readonly contact = CONTACT;
}
