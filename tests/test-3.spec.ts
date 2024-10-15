import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://bbcw-rm-sandbox512.uat.mymediabox.com/login-form.html?_rtnlink=/rm%27');
  await page.getByLabel('Email').click();
  await page.getByLabel('Email').fill('udit.kandari@bbc.com');
  await page.getByLabel('Email').press('Tab');
  await page.getByLabel('Password').fill('Tmittmif#@5248360');
  await page.getByLabel('I Agree to the Terms of').check();
  await page.getByRole('button', { name: 'Submit' }).click();
});