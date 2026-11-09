import { ApplicationConfig } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { routes } from './app.routes';

/**
 * The app is zoneless (Angular's default since v21): no zone.js, change detection
 * is driven by signals and template events. Components are OnPush + signals, so
 * scroll listeners and timers no longer trigger application-wide checks.
 */
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      routes,
      withInMemoryScrolling({ scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled' })
    ),
    provideHttpClient(withFetch())
  ]
};
