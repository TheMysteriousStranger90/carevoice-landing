import { TestBed, ComponentFixture } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { LaunchBannerComponent, timeLeft } from './launch-banner.component';
import { environment } from '../../../environments/environment';
import { LAUNCH } from '../../content/site';

describe('timeLeft', () => {
  it('splits a duration into days/hours/minutes/seconds', () => {
    const now = Date.UTC(2027, 0, 1, 0, 0, 0);
    const target = now + (2 * 86400 + 3 * 3600 + 4 * 60 + 5) * 1000;
    expect(timeLeft(target, now)).toEqual({ days: 2, hours: 3, minutes: 4, seconds: 5 });
  });

  it('clamps at zero once the target has passed', () => {
    expect(timeLeft(1000, 5000)).toEqual({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  });
});

describe('LaunchBannerComponent', () => {
  let fixture: ComponentFixture<LaunchBannerComponent>;
  let component: LaunchBannerComponent;
  let httpMock: HttpTestingController;

  const host = () => fixture.nativeElement as HTMLElement;

  async function setup(now?: number): Promise<void> {
    if (now !== undefined) {
      jest.useFakeTimers({ now });
    }
    await TestBed.configureTestingModule({
      imports: [LaunchBannerComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()]
    }).compileComponents();

    fixture = TestBed.createComponent(LaunchBannerComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
    await fixture.whenStable();
  }

  afterEach(() => {
    httpMock.verify();
    fixture.destroy();
    jest.useRealTimers();
  });

  describe('waitlist form', () => {
    beforeEach(() => setup());

    it('rejects an invalid email and sends no request', () => {
      component.waitlistForm.setValue({ email: 'not-an-email' });
      component.onSubmit();

      expect(component.showError()).toBe(true);
      expect(component.submitted()).toBe(false);
      httpMock.expectNone(environment.waitlistEndpoint);
    });

    it('links the error message to the input (aria-invalid + aria-describedby)', async () => {
      const input = host().querySelector<HTMLInputElement>('input[type="email"]')!;
      expect(input.getAttribute('aria-invalid')).toBeNull();
      expect(input.getAttribute('aria-describedby')).toBeNull();

      component.waitlistForm.setValue({ email: 'nope' });
      component.onSubmit();
      fixture.detectChanges();

      const errorId = input.getAttribute('aria-describedby');
      expect(input.getAttribute('aria-invalid')).toBe('true');
      expect(errorId).toBe('waitlist-email-error');
      expect(host().querySelector(`#${errorId}`)?.textContent).toContain('valid email');
    });

    it('clears the error as soon as the person edits the field', () => {
      component.waitlistForm.setValue({ email: 'nope' });
      component.onSubmit();
      expect(component.showError()).toBe(true);

      component.clearErrors();
      expect(component.showError()).toBe(false);
    });

    it('posts a valid email to Formspree and shows success', () => {
      component.waitlistForm.setValue({ email: 'therapist@example.com' });
      component.onSubmit();

      const req = httpMock.expectOne(environment.waitlistEndpoint);
      expect(req.request.method).toBe('POST');
      expect(req.request.body.email).toBe('therapist@example.com');
      expect(component.loading()).toBe(true);

      req.flush({ ok: true });

      expect(component.loading()).toBe(false);
      expect(component.submitted()).toBe(true);
      expect(component.showError()).toBe(false);
    });

    it('announces the confirmation through a persistent live region', () => {
      const region = host().querySelector('[role="status"]');
      expect(region).not.toBeNull();
      expect(region?.getAttribute('aria-live')).toBe('polite');
      expect(region?.textContent?.trim()).toBe('');

      component.waitlistForm.setValue({ email: 'therapist@example.com' });
      component.onSubmit();
      httpMock.expectOne(environment.waitlistEndpoint).flush({ ok: true });
      fixture.detectChanges();

      // Same element, now with content: assistive tech announces the change.
      expect(host().querySelector('[role="status"]')).toBe(region);
      expect(region?.textContent).toContain("You're on the list!");
    });

    it('surfaces an error message when the request fails', () => {
      component.waitlistForm.setValue({ email: 'therapist@example.com' });
      component.onSubmit();

      httpMock
        .expectOne(environment.waitlistEndpoint)
        .flush({ error: 'boom' }, { status: 500, statusText: 'Server Error' });

      expect(component.loading()).toBe(false);
      expect(component.submitted()).toBe(false);
      expect(component.submitError()).toBeTruthy();
    });
  });

  describe('countdown', () => {
    it('counts down to the same UTC instant for every visitor', async () => {
      const target = Date.parse(LAUNCH.targetDateIso);
      await setup(target - (3 * 86400 + 2 * 3600 + 1 * 60 + 9) * 1000);

      expect(component.launched()).toBe(false);
      expect(component.countdownUnits().map((u) => u.value)).toEqual([3, 2, 1, 9]);
      expect(component.targetLabel).toBe('March 1, 2027');
    });

    it('ticks once per second and re-renders', async () => {
      const target = Date.parse(LAUNCH.targetDateIso);
      await setup(target - 10_000);

      expect(component.countdownUnits()[3].value).toBe(10);
      jest.advanceTimersByTime(3000);
      expect(component.countdownUnits()[3].value).toBe(7);
    });

    it('hides the timer from assistive tech and exposes the target date as text', async () => {
      await setup(Date.parse(LAUNCH.targetDateIso) - 100_000);
      expect(host().querySelector('.launch-banner__countdown')?.getAttribute('aria-hidden')).toBe(
        'true'
      );
      expect(host().querySelector('.launch-banner__target-note')?.textContent).toContain(
        'March 1, 2027'
      );
      expect(host().querySelector('.launch-banner__target-note')?.textContent).toContain(
        'may change'
      );
    });

    it('replaces the timer with a message after the target instead of freezing at 00:00:00:00', async () => {
      await setup(Date.parse(LAUNCH.targetDateIso) + 60_000);

      expect(component.launched()).toBe(true);
      expect(host().querySelector('.launch-banner__countdown')).toBeNull();
      expect(host().textContent).toContain('Launch is imminent');
    });

    it('does not render fabricated social proof', async () => {
      await setup();
      expect(host().textContent).not.toMatch(/240\+/);
      expect(host().querySelector('.launch-banner__avatars')).toBeNull();
    });
  });
});
