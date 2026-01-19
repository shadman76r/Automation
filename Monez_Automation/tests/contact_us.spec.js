import { test, expect } from '@playwright/test';
//valid testcase
test('contact_us_valid', async ({ page }) => {
  await page.goto('https://www.staging12.autoluxaa.com/');
  await page.locator('#navbarNav').getByRole('link', { name: 'Nous Joindre' }).click();
  await expect(page).toHaveURL(/contactez-nous/);
  await page.fill('input[name="fname"]', 'Testautomation');
  await page.fill('input[name="email"]', 'testautomation@gmail.com');
  await page.fill('input[name="phone"]', '0181556886');
  await page.fill('#nf-field-231', 'submit the text');
  await page.locator('input#nf-field-232').click();
  //This part need to be update a little bit
  await expect(page.locator('#nf-field-231')).toHaveAttribute('aria-invalid', 'true');
  await expect(page.locator('#nf-error-231')).toBeVisible();
});
// invalid email but phone number valid
test('contact_us_invalid_email', async ({ page }) => {
  await page.goto('https://www.staging12.autoluxaa.com/');
  await page.locator('#navbarNav').getByRole('link', { name: 'Nous Joindre' }).click();
  await expect(page).toHaveURL(/contactez-nous/);
  await page.fill('input[name="fname"]', 'Testautomation');
  await page.fill('input[name="email"]', 'testautomation@gmail');
  await page.fill('input[name="phone"]', '0181556886');
  await page.fill('#nf-field-231', 'submit the text');
  await page.locator('input#nf-field-232').click();
  //This part need to be update a little bit
  await expect(page.locator('#nf-field-231')).toHaveAttribute('aria-invalid', 'true');
  await expect(page.locator('#nf-error-231')).toBeVisible();
});
// invalid testcases
test('contact_us_ivalid_Phone_number', async ({ page }) => {
  await page.goto('https://www.staging12.autoluxaa.com/');
  await page.locator('#navbarNav').getByRole('link', { name: 'Nous Joindre' }).click();
  await expect(page).toHaveURL(/contactez-nous/);
  await page.fill('input[name="fname"]', 'Test Automation');
  await page.fill('input[name="email"]', 'testautomation@gmail.com');
  await page.fill('input[name="phone"]', 'abcdef');
  await page.fill('#nf-field-231', 'Invalid phone number');
  await page.locator('input#nf-field-232').click();
  //This part need to be update a little bit
  await expect(page.locator('#nf-field-231')).toHaveAttribute('aria-invalid', 'true');
  await expect(page.locator('#nf-error-231')).toBeVisible();
});