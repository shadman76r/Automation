// @ts-check
import { test, expect } from '@playwright/test';

//main page
test('has title and correct URL', async ({ page }) => {
  // Navigate to the website
  await page.goto('https://staging9.autoluxaa.com/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Auto Prestige Montreal - Concessionnaire de voitures d'occasion à Quebec/);

  // Check if the current URL matches the expected URL
  await expect(page).toHaveURL('https://staging9.autoluxaa.com/');  // Exact URL check

  // Alternatively, check if the URL contains a part of the string
  await expect(page).toHaveURL(/autoluxaa/);  // URL contains 'autoluxaa'
});

//Contact us page

// test('Navigate using slider button', async ({ page }) => {
//   await page.goto('https://www.afocus.ca/', {
//   waitUntil: 'domcontentloaded',
// });
//   await page.waitForLoadState('networkidle');
//   await page.locator('a.slider-btn').getByRole('link', {name: 'Nous joindre!'} ).click();
//   await page.waitForLoadState('networkidle');
//   await expect(page).toHaveURL(/contactez-nous/);
// });


//Inventory page
test('Inventory', async ({ page }) => {
  await page.goto('https://www.afocus.ca/');
  await page.locator('#navbarNav').getByRole('link', { name: 'Inventaire' }).click();
  await page.waitForLoadState('networkidle'); //wait for page render
  await expect(page).toHaveURL(/cars/);
  // Assert Elementor content loaded
  // await expect(
  //   page.locator('.elementor-widget-container')
  // ).toBeVisible();
});

//Finance page
test('Finance', async ({ page }) => {

  await page.goto('https://www.afocus.ca/');
  await page.locator('#navbarNav').getByRole('link', { name: 'Financement' }).click();
  await page.waitForLoadState('networkidle');
  await expect(page).toHaveURL(/finance/);
});

// Service
test('Service', async ({ page }) => {

  await page.goto('https://www.afocus.ca/');
  await page.locator('#navbarNav').getByRole('link', { name: 'Services' }).click();
  await page.waitForLoadState('networkidle');
  await expect(page).toHaveURL(/service/);
});





//contact us page

test('Form submission', async ({ page }) => {
  // Navigate to the contact us page
  await page.goto('https://staging9.autoluxaa.com/en/contact-us/');

  // Fill in the form fields with valid data
  await page.fill('input[name="fname"]', 'Testname');
  await page.fill('input[name="email"]', 'john.doe@gmail.com');
  await page.fill('input[name="phone"]', '112adva');
  await page.fill('textarea[name="nf-field-238"]', 'Looking forward to hearing from you.');

  // Simulate interaction with reCAPTCHA
  // (You can only check its visibility, not actual completion)

  // Click the "Submit" button
  //await page.locator('button[type="submit"]').click();

  // Check if the form submission was successful
  // Assuming the page redirects to a "Thank you" page after submission
  //await expect(page).toHaveURL(/thank-you/);  // Replace with actual URL if needed
});


