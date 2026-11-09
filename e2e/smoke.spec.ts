import { expect, test, type Page } from '@playwright/test';

const WAITLIST_ENDPOINT = '**/formspree.io/**';

/** Fails a test on uncaught exceptions and console errors (ignores blocked third-party fonts). */
function collectErrors(page: Page): string[] {
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(`pageerror: ${e.message}`));
  page.on('console', (m) => {
    if (
      m.type() === 'error' &&
      !/fonts\.(googleapis|gstatic)|Failed to load resource/.test(m.text())
    ) {
      errors.push(`console: ${m.text()}`);
    }
  });
  return errors;
}

test.describe('landing page', () => {
  test('renders the hero and every section without errors', async ({ page }) => {
    const errors = collectErrors(page);
    await page.goto('/');

    await expect(page.getByRole('heading', { level: 1 })).toContainText('Dictate sessions');
    for (const id of [
      'home',
      'who-its-for',
      'how-it-works',
      'soap-format',
      'features',
      'pricing',
      'security',
      'progress',
      'waitlist'
    ]) {
      await expect(page.locator(`#${id}`), `section #${id}`).toBeAttached();
    }
    expect(errors).toEqual([]);
  });

  test('no longer makes claims we removed', async ({ page }) => {
    await page.goto('/');
    const text = await page.locator('body').innerText();
    for (const banned of [
      /HIPAA[- ]compliant/i,
      /\bE2E\b/,
      /under 3 seconds/i,
      /240\+/,
      /Start Free Trial/i
    ]) {
      expect(text).not.toMatch(banned);
    }
    // Pre-launch: every pricing CTA leads to the waitlist.
    await expect(page.locator('#pricing').getByRole('link', { name: 'Join waitlist' })).toHaveCount(
      3
    );
  });

  test('anchor navigation lands below the fixed navbar', async ({ page, isMobile }) => {
    test.skip(!!isMobile, 'desktop nav only');
    await page.goto('/');
    await page.getByRole('navigation', { name: 'Main navigation' }).getByText('Pricing').click();
    await expect(page).toHaveURL(/#pricing$/);
    await page.waitForTimeout(800); // smooth scroll
    const top = await page
      .locator('#pricing .section-tag')
      .evaluate((el) => el.getBoundingClientRect().top);
    expect(top).toBeGreaterThanOrEqual(68);
  });

  test('waitlist form: validation is announced, success is announced', async ({ page }) => {
    await page.route(WAITLIST_ENDPOINT, (route) =>
      route.fulfill({ status: 200, contentType: 'application/json', body: '{"ok":true}' })
    );
    await page.goto('/#waitlist');

    const email = page.getByLabel('Email address for waitlist');
    await email.fill('not-an-email');
    await page.getByRole('button', { name: 'Join Waitlist' }).click();

    await expect(email).toHaveAttribute('aria-invalid', 'true');
    const describedBy = await email.getAttribute('aria-describedby');
    await expect(page.locator(`#${describedBy}`)).toContainText('valid email');

    await email.fill('therapist@example.com');
    await expect(email).not.toHaveAttribute('aria-invalid', 'true');
    await page.getByRole('button', { name: 'Join Waitlist' }).click();

    await expect(page.getByRole('status')).toContainText("You're on the list!");
  });

  test('countdown is replaced by text for screen readers and states the target is not a promise', async ({
    page
  }) => {
    await page.goto('/');
    await expect(page.locator('.launch-banner__countdown')).toHaveAttribute('aria-hidden', 'true');
    await expect(page.locator('.launch-banner__target-note')).toContainText('may change');
  });
});

test.describe('mobile menu', () => {
  test.use({ viewport: { width: 390, height: 800 } });

  test('closed menu is out of the tab order; Escape closes it and restores focus', async ({
    page
  }) => {
    await page.goto('/');
    const button = page.getByRole('button', { name: 'Open menu' });
    const menu = page.locator('#mobile-menu');

    await expect(menu).toHaveAttribute('inert', '');
    await expect(menu.getByRole('link', { name: 'Features' })).toBeHidden();

    await button.click();
    await expect(page.getByRole('button', { name: 'Close menu' })).toHaveAttribute(
      'aria-expanded',
      'true'
    );
    await expect(menu.getByRole('link', { name: 'Features' })).toBeVisible();

    await page.keyboard.press('Escape');
    await expect(page.getByRole('button', { name: 'Open menu' })).toBeFocused();
    await expect(menu).toHaveAttribute('inert', '');
  });
});

test.describe('progress viewer tabs', () => {
  test('arrow keys move selection and focus between tabs', async ({ page }) => {
    await page.goto('/#progress');
    const tabs = page.getByRole('tab');
    await expect(tabs.first()).toHaveAttribute('aria-selected', 'true');

    await tabs.first().focus();
    await page.keyboard.press('ArrowRight');
    await expect(tabs.nth(1)).toHaveAttribute('aria-selected', 'true');
    await expect(tabs.nth(1)).toBeFocused();

    await page.keyboard.press('End');
    await expect(tabs.last()).toHaveAttribute('aria-selected', 'true');

    await expect(page.getByRole('tabpanel')).toHaveAttribute('aria-labelledby', /diary-tab-\d+/);
  });
});

test.describe('motion and print', () => {
  test('reduced motion: nothing is parked at opacity 0', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');
    await expect(page.locator('.reveal')).toHaveCount(0);
    await expect(page.locator('#pricing .pricing__card').first()).toHaveCSS('opacity', '1');
  });

  test('print: scroll-reveal content is visible and the navbar is hidden', async ({ page }) => {
    await page.goto('/');
    await page.emulateMedia({ media: 'print' });
    const hidden = await page
      .locator('.reveal:not(.revealed)')
      .evaluateAll((els) => els.filter((el) => getComputedStyle(el).opacity !== '1').length);
    expect(hidden).toBe(0);
    await expect(page.locator('app-navbar')).toBeHidden();
  });
});

test.describe('legal pages', () => {
  for (const path of ['privacy', 'terms', 'hipaa']) {
    test(`/${path} deep link renders`, async ({ page }) => {
      const errors = collectErrors(page);
      await page.goto(`/${path}`);
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
      expect(errors).toEqual([]);
    });
  }

  test('footer brand link returns home without a full page reload', async ({ page }) => {
    await page.goto('/privacy');
    await page.evaluate(() => ((window as unknown as { __marker: number }).__marker = 1));

    await page.locator('.footer__logo').click();
    await expect(page).toHaveURL(/\/(#home)?$/);
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Dictate sessions');

    // A full reload would have wiped the marker.
    expect(await page.evaluate(() => (window as unknown as { __marker?: number }).__marker)).toBe(
      1
    );
  });
});
