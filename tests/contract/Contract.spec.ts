// tests/contract/Contract.spec.ts

import test from "../../Base/BaseTest";

test.describe("Contract Tests", () => {
  test("Test Contract Creation Functionality", async ({
    pageObjectManager,
  }) => {
    const { dashboardPage, contractPage, detailsPage } = pageObjectManager;

    await dashboardPage.navigateToContractPage();
    await contractPage.startNewContract();
    await detailsPage.fillDataInDetails();
  });

  test("Test Edit Contract Functionality", async ({ pageObjectManager }) => {
    const { dashboardPage, contractPage, termsPage, rightsPage } =
      pageObjectManager;

    await dashboardPage.navigateToContractPage();
    await contractPage.searchContract("md00085");
    await termsPage.editInContractWizard("md00085");
    await rightsPage.fillDataInRights();
  });
});
