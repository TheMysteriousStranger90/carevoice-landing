import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DevDiaryComponent } from './dev-diary.component';

describe('DevDiaryComponent', () => {
  let fixture: ComponentFixture<DevDiaryComponent>;
  let component: DevDiaryComponent;
  const host = () => fixture.nativeElement as HTMLElement;
  const tabs = () => Array.from(host().querySelectorAll<HTMLButtonElement>('[role="tab"]'));
  // Keys are handled on the focused tab, exactly like a real keyboard user.
  const key = (name: string) =>
    tabs()[component.index()].dispatchEvent(
      new KeyboardEvent('keydown', { key: name, bubbles: true, cancelable: true })
    );

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [DevDiaryComponent] }).compileComponents();
    fixture = TestBed.createComponent(DevDiaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  afterEach(() => fixture.destroy());

  it('is called "Progress" like the navigation says', () => {
    expect(host().querySelector('.section-tag')?.textContent?.trim()).toBe('Progress');
    expect(host().querySelector('section')?.id).toBe('progress');
  });

  describe('tabs semantics', () => {
    it('renders a tablist of real tabs controlling one tabpanel', () => {
      expect(tabs()).toHaveLength(component.shots.length);
      const panel = host().querySelector('[role="tabpanel"]')!;
      expect(panel.id).toBe('diary-panel');
      for (const tab of tabs()) {
        expect(tab.getAttribute('aria-controls')).toBe('diary-panel');
      }
    });

    it('labels the panel with the selected tab', () => {
      component.goTo(2);
      fixture.detectChanges();
      const panel = host().querySelector('[role="tabpanel"]')!;
      expect(panel.getAttribute('aria-labelledby')).toBe('diary-tab-2');
      expect(host().querySelector('#diary-tab-2')).toBe(tabs()[2]);
    });

    it('uses a roving tabindex: only the selected tab is in the tab order', () => {
      component.goTo(3);
      fixture.detectChanges();
      expect(tabs().map((t) => t.getAttribute('tabindex'))).toEqual(
        tabs().map((_, i) => (i === 3 ? '0' : '-1'))
      );
      expect(tabs().map((t) => t.getAttribute('aria-selected'))).toEqual(
        tabs().map((_, i) => String(i === 3))
      );
    });
  });

  describe('keyboard', () => {
    it('ArrowRight / ArrowLeft move selection and focus, wrapping at the ends', () => {
      key('ArrowRight');
      fixture.detectChanges();
      expect(component.index()).toBe(1);
      expect(document.activeElement).toBe(tabs()[1]);

      key('ArrowLeft');
      key('ArrowLeft');
      fixture.detectChanges();
      expect(component.index()).toBe(component.shots.length - 1);
    });

    it('Home and End jump to the first and last tab', () => {
      key('End');
      fixture.detectChanges();
      expect(component.index()).toBe(component.shots.length - 1);

      key('Home');
      fixture.detectChanges();
      expect(component.index()).toBe(0);
    });

    it('does not hijack other keys', () => {
      key('a');
      expect(component.index()).toBe(0);
    });
  });

  describe('live caption and images', () => {
    it('announces the caption politely when the slide changes', () => {
      const caption = host().querySelector('.dev-diary__caption')!;
      expect(caption.getAttribute('aria-live')).toBe('polite');
    });

    it('serves responsive WebP with intrinsic size to prevent layout shift', () => {
      component.goTo(1);
      fixture.detectChanges();
      const img = host().querySelector<HTMLImageElement>('img.dev-diary__img')!;
      expect(img.getAttribute('srcset')).toMatch(/-800\.webp 800w, .*-1600\.webp 1600w/);
      expect(img.getAttribute('width')).toBe('1600');
      expect(img.getAttribute('height')).toBe('726');
      expect(img.src).toMatch(/\.webp$/);
    });
  });

  describe('video', () => {
    it('embeds only a validated YouTube id from the privacy-friendly domain', () => {
      component.playVideo();
      fixture.detectChanges();
      const iframe = host().querySelector<HTMLIFrameElement>('iframe')!;
      expect(iframe.src).toContain('https://www.youtube-nocookie.com/embed/55LaswfdIHc');
      expect(iframe.hasAttribute('frameborder')).toBe(false);
      expect(iframe.getAttribute('referrerpolicy')).toBe('strict-origin-when-cross-origin');
    });

    it('refuses a malformed video id', () => {
      (component.shots as unknown as { youtubeId?: string }[])[0].youtubeId = '../evil';
      component.goTo(0);
      expect(component.videoEmbedUrl()).toBeNull();
    });
  });
});
