import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RevealDirective } from '../../directives/reveal.directive';

@Component({
  selector: 'app-target-users',
  standalone: true,
  imports: [RevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="section target-users">
      <div class="container">
        <div class="section-header" appReveal>
          <p class="section-tag">Who It's Built For</p>
          <h2>Built for mental health professionals</h2>
          <p>CareVoice helps licensed therapists, clinical psychologists, and counselors reclaim the hours lost to clinical documentation every week.</p>
        </div>

        <div class="grid grid--3 target-users__grid">
          @for (user of users; track user.title) {
            <div class="card target-users__card" appReveal>
              <div class="target-users__icon">
                <svg [innerHTML]="user.icon" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"></svg>
              </div>
              <h3 class="target-users__title">{{ user.title }}</h3>
              <p class="target-users__desc">{{ user.description }}</p>
              <ul class="check-list target-users__list">
                @for (feat of user.features; track feat) {
                  <li>
                    <svg class="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                    {{ feat }}
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
  readonly users = [
    {
      icon: '<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle>',
      title: 'Solo Therapists',
      description: 'Private practice clinicians who dictate between sessions and need accurate, structured notes without hiring administrative staff.',
      features: ['50 sessions / month', 'Speech-to-SOAP AI', 'PDF export', '1-year note storage']
    },
    {
      icon: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path>',
      title: 'Group Practices',
      description: 'Multi-therapist offices that need supervisor review workflows, team analytics, and EHR-compatible export — up to 5 clinicians.',
      features: ['Up to 5 therapists', 'Unlimited sessions', 'Supervisor review', 'Team analytics & EHR export']
    },
    {
      icon: '<rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>',
      title: 'Clinics & Institutions',
      description: 'Large organizations requiring a Business Associate Agreement, SSO / Active Directory, custom AI prompts, and priority support — up to 25 clinicians.',
      features: ['Up to 25 therapists', 'BAA included', 'SSO / Active Directory', 'Custom AI prompts']
    }
  ];
}
