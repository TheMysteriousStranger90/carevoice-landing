import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FooterComponent } from '../../components/footer/footer.component';
import { LogoComponent } from '../../components/logo/logo.component';

@Component({
  selector: 'app-legal-layout',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, FooterComponent, LogoComponent],
  template: `
    <header class="legal-header">
      <div class="legal-header__inner container">
        <a routerLink="/" class="legal-header__brand">
          <app-logo [size]="32" />
          <span class="legal-header__name">CareVoice</span>
        </a>
        <a routerLink="/" class="legal-header__back">← Back to home</a>
      </div>
    </header>

    <main class="legal">
      <div class="container legal__container">
        <article class="legal__article">
          <p class="legal__eyebrow">Legal</p>
          <h1 class="legal__title">{{ title() }}</h1>
          <p class="legal__updated">Last updated: {{ lastUpdated() }}</p>

          <div class="legal__notice">
            <strong>Placeholder document.</strong> CareVoice is pre-launch (early 2027). This page
            is a template and does not yet constitute a binding legal agreement. Final wording will
            be reviewed by counsel before launch.
          </div>

          <div class="legal__body">
            <ng-content />
          </div>
        </article>
      </div>
    </main>

    <app-footer />
  `,
  styleUrls: ['./legal-layout.component.scss']
})
export class LegalLayoutComponent {
  readonly title = input.required<string>();
  readonly lastUpdated = input('July 2026');
}
