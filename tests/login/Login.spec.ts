import test, { expect } from "../../Base/BaseTest";

test.describe("Login Tests", () => {
  test("Check Login functionality", async ({
    page,
    dashboardPage,
  }, testinfo) => {
    await dashboardPage.verifyDashboardPageTitle();
  });

  test("Check Language change functionality", async ({
    page,
    dashboardPage,
  }, testinfo) => {
    await dashboardPage.changeLanguageToEnglishUK();
  });
});
