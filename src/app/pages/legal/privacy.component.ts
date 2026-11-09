import { Component, ChangeDetectionStrategy } from '@angular/core';
import { LegalLayoutComponent } from './legal-layout.component';

@Component({
  selector: 'app-privacy',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LegalLayoutComponent],
  template: `
    <app-legal-layout title="Privacy Policy">
      <h2>1. Overview</h2>
      <p>
        This Privacy Policy explains how CareVoice ("we", "us") collects, uses, and protects
        information when you use our website and services. Because CareVoice handles Protected
        Health Information (PHI) on behalf of licensed clinicians, privacy and security are
        foundational to how the product is built.
      </p>

      <h2>2. Information we collect</h2>
      <ul>
        <li><strong>Account data</strong> — name, email, professional license details.</li>
        <li>
          <strong>Waitlist data</strong> — the email address you submit to join the launch waitlist.
        </li>
        <li>
          <strong>Clinical data (PHI)</strong> — session recordings and generated SOAP notes you
          create.
        </li>
        <li>
          <strong>Usage data</strong> — logs, device and browser information for security and
          reliability.
        </li>
      </ul>

      <h2>3. How we use information</h2>
      <p>
        We use information to provide and secure the service, generate clinical documentation you
        request, communicate launch and account updates, and meet our legal and regulatory
        obligations. We do not sell personal information.
      </p>

      <h2>4. Protected Health Information</h2>
      <p>
        PHI is encrypted at rest (AES-256-GCM) and in transit (TLS 1.3). Audio recordings are
        physically deleted after transcription in line with the HIPAA minimum-necessary principle.
        For Clinic-plan customers, a Business Associate Agreement (BAA) governs our handling of PHI.
      </p>

      <h2>5. Data retention</h2>
      <p>
        Clinical notes are retained according to your subscription plan. Audit logs are retained for
        six years to meet HIPAA requirements. Waitlist emails are kept until launch, after which you
        may unsubscribe at any time.
      </p>

      <h2>6. Your rights</h2>
      <p>
        You may request access to, correction of, or deletion of your personal information, subject
        to legal and clinical record-keeping obligations.
      </p>

      <h2>7. Contact</h2>
      <p>
        Questions about this policy can be sent to
        <a href="mailto:privacy&#64;carevoice.io">privacy&#64;carevoice.io</a>.
      </p>
    </app-legal-layout>
  `
})
export class PrivacyComponent {}
