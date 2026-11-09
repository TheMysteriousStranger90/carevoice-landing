import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/** CareVoice brand mark. Single source for the navbar, footer and legal header. */
@Component({
  selector: 'app-logo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[style.display]': '"inline-flex"', '[style.flex-shrink]': '0' },
  template: `
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
      [attr.width]="size()"
      [attr.height]="size()"
    >
      <rect width="32" height="32" rx="8" fill="#1f6feb" />
      <path d="M16 8a3 3 0 0 0-3 3v6a3 3 0 0 0 6 0v-6a3 3 0 0 0-3-3z" fill="white" />
      <path
        d="M10 17a1 1 0 0 1 1 1 5 5 0 0 0 10 0 1 1 0 1 1 2 0 7 7 0 0 1-6 6.92V26h2a1 1 0 1 1 0 2h-6a1 1 0 1 1 0-2h2v-2.08A7 7 0 0 1 9 18a1 1 0 0 1 1-1z"
        fill="white"
      />
    </svg>
  `
})
export class LogoComponent {
  readonly size = input(32);
}
