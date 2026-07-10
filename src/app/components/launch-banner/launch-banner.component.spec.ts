import { TestBed, ComponentFixture } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { LaunchBannerComponent } from './launch-banner.component';
import { environment } from '../../../environments/environment';

describe('LaunchBannerComponent — waitlist form', () => {
  let fixture: ComponentFixture<LaunchBannerComponent>;
  let component: LaunchBannerComponent;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LaunchBannerComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()]
    }).compileComponents();

    fixture = TestBed.createComponent(LaunchBannerComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  afterEach(() => {
    httpMock.verify();
    fixture.destroy();
  });

  it('rejects an invalid email and sends no request', () => {
    component.waitlistForm.setValue({ email: 'not-an-email' });
    component.onSubmit();

    expect(component.showError()).toBe(true);
    expect(component.submitted()).toBe(false);
    httpMock.expectNone(environment.waitlistEndpoint);
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
