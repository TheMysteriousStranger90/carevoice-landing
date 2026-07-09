import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-legal-layout',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, FooterComponent],
  template: `
    <header class="legal-header">
      <div class="legal-header__inner container">
        <a routerLink="/" class="legal-header__brand">
          <svg class="legal-header__logo" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="32" height="32" rx="8" fill="#1f6feb"/>
            <path d="M16 8a3 3 0 0 0-3 3v6a3 3 0 0 0 6 0v-6a3 3 0 0 0-3-3z" fill="white"/>
            <path d="M10 17a1 1 0 0 1 1 1 5 5 0 0 0 10 0 1 1 0 1 1 2 0 7 7 0 0 1-6 6.92V26h2a1 1 0 1 1 0 2h-6a1 1 0 1 1 0-2h2v-2.08A7 7 0 0 1 9 18a1 1 0 0 1 1-1z" fill="white"/>
          </svg>
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
            <strong>Placeholder document.</strong> CareVoice is pre-launch (early 2027). This page is a
            template and does not yet constitute a binding legal agreement. Final wording will be
            reviewed by counsel before launch.
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
