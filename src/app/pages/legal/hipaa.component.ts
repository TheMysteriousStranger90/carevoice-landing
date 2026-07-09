import { Component, ChangeDetectionStrategy } from '@angular/core';
import { LegalLayoutComponent } from './legal-layout.component';

@Component({
  selector: 'app-hipaa',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LegalLayoutComponent],
  template: `
    <app-legal-layout title="HIPAA Notice">
      <h2>1. Our commitment</h2>
      <p>
        CareVoice is designed to help covered entities and their business associates meet the
        requirements of the HIPAA Security Rule (45 CFR §164.312). This notice summarizes the
        technical safeguards built into the platform.
      </p>

      <h2>2. Encryption</h2>
      <p>
        All Protected Health Information (PHI) is encrypted at rest using AES-256-GCM authenticated
        encryption, with keys managed in a dedicated key vault. Data in transit is protected with
        TLS 1.3.
      </p>

      <h2>3. Minimum necessary</h2>
      <p>
        Audio recordings are physically deleted from storage immediately after transcription, and raw
        transcripts are cleared once a SOAP note is created — retaining only what is necessary for
        clinical documentation.
      </p>

      <h2>4. Access controls</h2>
      <ul>
        <li>Multi-factor authentication (TOTP) gates electronic signature and revocation.</li>
        <li>All data is scoped to the authenticated clinician; therapists cannot access each other's records.</li>
        <li>Short-lived access tokens with refresh-token rotation limit session exposure.</li>
      </ul>

      <h2>5. Audit logging</h2>
      <p>
        An append-only audit trail records who accessed or modified PHI, when, and from where. Audit
        records are retained for six years and are never modified or deleted.
      </p>

      <h2>6. Business Associate Agreement</h2>
      <p>
        A Business Associate Agreement (BAA) is available to Clinic-plan subscribers. Underlying
        cloud and AI services are configured to run on HIPAA-eligible infrastructure.
      </p>

      <h2>7. Contact</h2>
      <p>
        For compliance inquiries, contact <a href="mailto:compliance&#64;carevoice.io">compliance&#64;carevoice.io</a>.
      </p>
    </app-legal-layout>
  `
})
export class HipaaComponent {}
