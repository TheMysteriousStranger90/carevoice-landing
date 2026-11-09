import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
  // Home is the landing route, so it is bundled eagerly: lazy-loading it would
  // add a second round trip before anything can render.
  { path: '', component: HomeComponent },
  {
    path: 'privacy',
    loadComponent: () => import('./pages/legal/privacy.component').then((m) => m.PrivacyComponent)
  },
  {
    path: 'terms',
    loadComponent: () => import('./pages/legal/terms.component').then((m) => m.TermsComponent)
  },
  {
    path: 'hipaa',
    loadComponent: () => import('./pages/legal/hipaa.component').then((m) => m.HipaaComponent)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
