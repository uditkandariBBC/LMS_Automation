import test, { expect } from "../../Base/BaseTest";

test.describe("Login Tests", () => {
  test("Check Login functionality", async ({ pageObjectManager }) => {
    const { loginPage, dashboardPage } = pageObjectManager;
    await dashboardPage.verifyDashboardPageTitle();
  });

  test("Check Language change functionality", async ({ pageObjectManager }) => {
    const { dashboardPage } = pageObjectManager;
    await dashboardPage.changeLanguageToEnglishUK();
  });
});
