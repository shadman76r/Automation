const { test, expect } = require('@playwright/test');

test('Test Financement Page Flow', async ({ page }) => {
  // Go to the finance page
  await page.goto('https://www.staging12.autoluxaa.com/');
  await page.locator('#navbarNav').getByRole('link', { name: ' Financement ' }).click();
  await page.waitForLoadState('networkidle');
  await expect(page).toHaveURL(/finance/);  
});

// test('ClickTheAutomobile', async ({ page }) => {
//   test.setTimeout(200000);

//   await page.goto('https://www.staging12.autoluxaa.com/finance/', {
//     waitUntil: 'domcontentloaded',   // less strict than 'networkidle'
//     timeout: 90000,                  // 90s for navigation
//   });

//   await page
//     .locator('.app-button-list__item', { hasText: 'Automobile' })
//     .click();

//   await expect(page.locator('.step-component')).toBeVisible();
// });

test('finance wizard – current real order', async ({ page }) => {
  test.setTimeout(120000);

  await page.goto('https://www.staging12.autoluxaa.com/finance/', {
    waitUntil: 'domcontentloaded',
    timeout: 90000,
  });

  // STEP A – whatever question you really see FIRST
  // (for example: vehicle type)
  await page
    .locator('.app-button-list__item', { hasText: 'Automobile' })
    .click();
  await page.getByRole('button', { name: 'Continuer' }).click();

  // STEP B – the question you see SECOND (for example: budget)
  await expect(page.getByText('Quel est votre budget')).toBeVisible();
  await page.getByText('$250 - 374 / mois', { exact: true }).click();
  await page.getByRole('button', { name: 'Continuer' }).click();

  // STEP C – the question you see THIRD (for example: date of birth)
  await expect(
    page.getByText('Quelle est votre date de naissance')
  ).toBeVisible();
  await page.getByPlaceholder('MM / JJ / AAAA').fill('01/01/1990');
  await page.getByRole('button', { name: 'Continuer' }).click();

  // Check that next step loaded
  await expect(page.locator('.step-component')).toBeVisible();
});
