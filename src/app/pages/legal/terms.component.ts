import { Component, ChangeDetectionStrategy } from '@angular/core';
import { LegalLayoutComponent } from './legal-layout.component';

@Component({
  selector: 'app-terms',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LegalLayoutComponent],
  template: `
    <app-legal-layout title="Terms of Service">
      <h2>1. Acceptance of terms</h2>
      <p>
        By accessing or using CareVoice, you agree to these Terms of Service. If you are using the
        service on behalf of a practice or organization, you represent that you are authorized to
        accept these terms on its behalf.
      </p>

      <h2>2. Eligibility</h2>
      <p>
        CareVoice is intended for licensed mental health professionals and their authorized staff.
        You are responsible for ensuring your use complies with your professional, legal, and
        ethical obligations.
      </p>

      <h2>3. Clinical responsibility</h2>
      <p>
        CareVoice assists with documentation but does not provide medical advice. Generated SOAP
        notes are drafts that must be reviewed, edited, and signed by a qualified clinician. You
        remain solely responsible for the accuracy and completeness of your clinical records.
      </p>

      <h2>4. Subscriptions and billing</h2>
      <p>
        Paid plans are billed monthly through our payment processor. Each plan includes a 14-day
        free trial. You may cancel at any time; cancellation takes effect at the end of the current
        billing period.
      </p>

      <h2>5. Acceptable use</h2>
      <ul>
        <li>Do not upload data you are not authorized to process.</li>
        <li>
          Do not attempt to disrupt, reverse engineer, or gain unauthorized access to the service.
        </li>
        <li>Do not use the service for any unlawful purpose.</li>
      </ul>

      <h2>6. Availability</h2>
      <p>
        The service is provided on an "as is" and "as available" basis prior to and after launch. We
        strive for high availability but do not guarantee uninterrupted service.
      </p>

      <h2>7. Contact</h2>
      <p>
        Questions about these terms can be sent to
        <a href="mailto:legal&#64;carevoice.io">legal&#64;carevoice.io</a>.
      </p>
    </app-legal-layout>
  `
})
export class TermsComponent {}
