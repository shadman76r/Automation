import { test, expect } from '@playwright/test';
//Finance page
test('Finance',async ({page}) =>{
 await page.goto('https://www.staging12.autoluxaa.com/');
  await page.locator('#navbarNav').getByRole('link', { name: ' Financement ' }).click();
  await page.waitForLoadState('networkidle');
  await expect(page).toHaveURL(/finance/);

});

test('Finance page - Automobile button updates content on same page', async ({ page }) => {
  await page.goto('https://www.staging12.autoluxaa.com/finance', {
    waitUntil: 'domcontentloaded',
  });
});
