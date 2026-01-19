import { test, expect } from '@playwright/test';
//Home_page
test('Home_page', async ({ page }) => {
  await page.goto('https://www.staging12.autoluxaa.com/', { waitUntil: 'networkidle' });
  await expect(page).toHaveTitle(/AutoBonChoix - Concessionnaire de voitures d'occasion à Québec/);
  await expect(page).toHaveURL('https://www.staging12.autoluxaa.com/');
//   if needed alternative to that the url have the autoluxaa
//   await expect(page).toHaveURL(/autoluxaa/);
});
