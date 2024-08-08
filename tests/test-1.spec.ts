import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
  await page.goto(
    "https://bbcw-rm-sandbox512.uat.mymediabox.com/login-form.html?_rtnlink=/rm"
  );
  await page.getByLabel("Email").click();
  await page.getByLabel("Email").fill("udit.kandari@bbc.com");
  await page.getByLabel("Password").click();
  await page.getByLabel("Password").fill("Tmittmif#@5248360");
  await page.getByLabel("I Agree to the Terms of").check();
  await page.getByRole("button", { name: "Submit" }).click();
  await page.getByRole("link", { name: " Contracts" }).click();
  await page.locator(".col-sm-6 > .btn").click();
  await page.locator("#s2id_ContractTypeGUID").getByRole("link").click();
  await page.locator("#select2-result-label-10").click();
  await page.locator("#s2id_ContractStatusGUID").getByRole("link").click();
  await page.locator("#select2-result-label-15").click();
  await page.getByPlaceholder("Enter Contract Number").click();
  await page.getByPlaceholder("Enter Contract Number").fill("MD12345");
  await page.getByLabel("Alternate Contract ID").click();
  await page.getByLabel("Alternate Contract ID").fill("auto");
  await page.locator("#s2id_EntityGUID > .select2-choice").click();
  await page.locator("#select2-result-label-22").click();
  await page.locator("#s2id_CompanyGUID > .select2-choice").click();
  await page.locator("#select2-result-label-27").click();
  await page.getByRole("link", { name: "None" }).click();
  await page.locator("#select2-result-label-521").click();
  await page.getByLabel("Deal Memo Expiration Date").click();
  await page.getByRole("cell", { name: "31" }).nth(1).click();
  await page.getByLabel("Start Date").click();
  await page.getByRole("cell", { name: "31" }).nth(1).click();
  await page.getByLabel("End Date").click();
  await page.getByRole("cell", { name: "31" }).nth(1).click();
  await page.getByLabel("Sell Off Days").click();
});
