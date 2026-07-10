import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { HeroComponent } from '../../components/hero/hero.component';
import { TargetUsersComponent } from '../../components/target-users/target-users.component';
import { HowItWorksComponent } from '../../components/how-it-works/how-it-works.component';
import { SoapFormatComponent } from '../../components/soap-format/soap-format.component';
import { FeaturesComponent } from '../../components/features/features.component';
import { PricingComponent } from '../../components/pricing/pricing.component';
import { SecuritySectionComponent } from '../../components/security-section/security-section.component';
import { DevDiaryComponent } from '../../components/dev-diary/dev-diary.component';
import { LaunchBannerComponent } from '../../components/launch-banner/launch-banner.component';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NavbarComponent,
    HeroComponent,
    TargetUsersComponent,
    HowItWorksComponent,
    SoapFormatComponent,
    FeaturesComponent,
    PricingComponent,
    SecuritySectionComponent,
    DevDiaryComponent,
    LaunchBannerComponent,
    FooterComponent
  ],
  template: `
    <app-navbar />
    <main>
      <app-hero />
      <app-target-users />
      <app-how-it-works />
      <app-soap-format />
      <app-features />
      <app-pricing />
      <app-security-section />
      <app-dev-diary />
      <app-launch-banner />
    </main>
    <app-footer />
  `
})
export class HomeComponent {}
