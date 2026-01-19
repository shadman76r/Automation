const { test, expect } = require('@playwright/test');

test('Home page loads correctly', async ({ page }) => {
  await page.goto('https://www.staging12.autoluxaa.com/', {
    waitUntil: 'domcontentloaded',
  });

  await expect(page).toHaveTitle(/AutoBonChoix - Concessionnaire de voitures d'occasion à Québec/);
  // Logo visible
  await expect(page.locator('a.navbar-brand')).toBeVisible();
  // Page loaded
  await expect(page.locator('.home')).toBeVisible();
  //car visible
  await expect(page.locator('.elementor-element-2d9f763')).toBeVisible();
  //car view check
  const cards = page.locator(
    'a[data-id="779a711"], a[data-id="a4b150f"], a[data-id="b2b4e88"]'
  );
  await expect(cards).toHaveCount(3);
  for (let i = 0; i < 3; i++) {
    const card = cards.nth(i);
    await card.scrollIntoViewIfNeeded();
    await expect(card).toBeVisible();
  }
//Google review part
await page.locator('[data-id="40ef472"]').scrollIntoViewIfNeeded();
await expect(page.locator('[data-id="b1b2285"]')).toBeVisible();
await expect(page.locator('[data-id="cd3c64e"]')).toBeVisible();
await expect(page.locator('[data-id="3a9d658"]')).toBeVisible();
await expect(page.locator('[data-id="13fbb95"]')).toBeVisible();

//view the car

const visibleSection = page.locator('[data-id="2ce3541"]');
const carViewSection = page.locator('[data-id="fc3cda7"]');
await visibleSection.scrollIntoViewIfNeeded();
await expect(visibleSection).toBeVisible();
await expect(carViewSection).toBeHidden(); //if i give hidden it come but when i give visible it give me error



});
