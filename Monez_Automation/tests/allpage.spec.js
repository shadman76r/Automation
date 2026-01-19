import { test, expect } from '@playwright/test';
//Home page for FR language
test('Home page', async ({ page }) => {
  await page.goto('https://www.staging12.autoluxaa.com/', { waitUntil: 'networkidle' });
  await expect(page).toHaveTitle(/AutoBonChoix - Concessionnaire de voitures d'occasion à Québec/);
  await expect(page).toHaveURL('https://www.staging12.autoluxaa.com/');
//   if needed alternative to that the url have the autoluxaa
//   await expect(page).toHaveURL(/autoluxaa/);
});
//Inventory page
test('Inventory', async ({ page }) => {
  await page.goto('https://www.staging12.autoluxaa.com/');
  await page.locator('#navbarNav').getByRole('link', { name: 'Inventaire' }).click();
  await page.waitForLoadState('networkidle');
  await expect(page).toHaveURL(/cars/);
  // Assert Elementor content loaded
  // await expect(
  //   page.locator('.elementor-widget-container')
  // ).toBeVisible();
});
//Finance page
test('Finance',async ({page}) =>{
 await page.goto('https://www.staging12.autoluxaa.com/');
  await page.locator('#navbarNav').getByRole('link', { name: ' Financement ' }).click();
  await page.waitForLoadState('networkidle');
  await expect(page).toHaveURL(/finance/);
});

//Contact_us_page
test('Contact_us', async ({ page }) => {
   await page.goto('https://www.staging12.autoluxaa.com/', {   waitUntil: 'domcontentloaded',});
  await page.waitForLoadState('networkidle');
  await page.locator('#navbarNav').getByRole('link', { name: 'Nous Joindre' }).click();
  await page.waitForLoadState('networkidle');
  await expect(page).toHaveURL(/contactez-nous/);
  await page.waitForTimeout(3000); 
  await page.goBack({ waitUntil: 'domcontentloaded' });
  await expect(page).toHaveURL('https://www.staging12.autoluxaa.com/');
 });

 //logo click
test('Logo', async ({ page }) => {
  await page.goto('https://www.staging12.autoluxaa.com/contactez-nous/', {
    waitUntil: 'domcontentloaded',
  });
  await page.locator('a.navbar-brand.mobile').click();
  await expect(page).toHaveURL('https://www.staging12.autoluxaa.com/');
});


