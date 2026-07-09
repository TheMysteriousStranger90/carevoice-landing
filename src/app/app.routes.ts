import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'privacy',
    loadComponent: () =>
      import('./pages/legal/privacy.component').then(m => m.PrivacyComponent)
  },
  {
    path: 'terms',
    loadComponent: () =>
      import('./pages/legal/terms.component').then(m => m.TermsComponent)
  },
  {
    path: 'hipaa',
    loadComponent: () =>
      import('./pages/legal/hipaa.component').then(m => m.HipaaComponent)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
