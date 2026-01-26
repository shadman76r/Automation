
// home_page_load.spec.js
const { test, expect } = require('@playwright/test');

test('Home page loads correctly', async ({ page }) => {
  // 1) Navigate with a stronger load signal
  await page.goto('https://www.staging12.autoluxaa.com/', { waitUntil: 'domcontentloaded' });

  // 2) Handle the black overlay (if it exists)
  const overlay = page.locator('#blackOverlay');
  if (await overlay.count()) {
    // Wait for it to either be hidden or detached, up to 10s
    // We don't assert it's visible; we just ensure it's gone before proceeding.
    await Promise.race([
      expect(overlay).toBeHidden({ timeout: 10000 }),
      overlay.waitFor({ state: 'detached', timeout: 10000 }),
    ]).catch(() => {
      // If overlay is still present and visible after waiting, fail with a clearer message
      throw new Error('Loading overlay (#blackOverlay) did not disappear.');
    });
  }

  // 3) Title check
  await expect(page).toHaveTitle(/AutoBonChoix - Concessionnaire de voitures d'occasion à Québec/);

  // 4) Basic UI checks
  await expect(page.locator('a.navbar-brand')).toBeVisible();
  await expect(page.locator('.home')).toBeVisible();

  // 5) Car block visible
  await expect(page.locator('.elementor-element-2d9f763')).toBeVisible();

  // 6) Check the three car cards exist and are visible
  const cards = page.locator(
    'a[data-id="779a711"], a[data-id="a4b150f"], a[data-id="b2b4e88"]'
  );
  await expect(cards).toHaveCount(3);

  for (let i = 0; i < 3; i++) {
    const card = cards.nth(i);
    await card.scrollIntoViewIfNeeded();
    await expect(card).toBeVisible();
  }

  // 7) Google review part
  await page.locator('[data-id="40ef472"]').scrollIntoViewIfNeeded();
  await expect(page.locator('[data-id="b1b2285"]')).toBeVisible();
  await expect(page.locator('[data-id="cd3c64e"]')).toBeVisible();
  await expect(page.locator('[data-id="3a9d658"]')).toBeVisible();
  await expect(page.locator('[data-id="13fbb95"]')).toBeVisible();

  // 8) View the car section expectations
  const visibleSection = page.locator('[data-id="2ce3541"]');
  const carViewSection = page.locator('[data-id="fc3cda7"]');

  await visibleSection.scrollIntoViewIfNeeded();
  await expect(visibleSection).toBeVisible();

  // IMPORTANT: Decide what you want to assert here:

  // (A) If you mean "this section should NOT be in the viewport yet":
  await expect(carViewSection).not.toBeInViewport();

  // (B) If you really mean "it should be hidden by CSS", replace (A) with one of these:
  // await expect(carViewSection).toHaveCSS('display', 'none');
  // await expect(carViewSection).toHaveCSS('visibility', 'hidden');
  // await expect(carViewSection).toHaveCSS('opacity', '0');

  // (C) If you expect it to be visible (not hidden by CSS):
  // await expect(carViewSection).toBeVisible();

  // Choose (A), (B), or (C) depending on the intended behavior of the page.
});
