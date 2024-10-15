import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://bbcw-rm-sandbox512.uat.mymediabox.com/login-form.html?_rtnlink=/rm');
  await page.getByLabel('Email').click();
  await page.getByLabel('Email').fill('udit.kandari@bbc.com');
  await page.getByLabel('Password').click();
});