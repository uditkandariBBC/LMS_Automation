import test, { expect } from "../base/Basetest";
test.describe("Contract Tests", () => {
  test("Test Contract Creation Functionality", async ({
    page,
    dashboardPage,
    contractPage,
    detailsPage,
  }) => {
    await dashboardPage.navigateToContractPage();
    await contractPage.startNewContract();
    await detailsPage.fillDataInDetails();
  });

  test("Test search contract Functionality", async ({
    page,
    dashboardPage,
    contractPage,
    detailsPage,
    termsPage,
  }) => {
    await dashboardPage.navigateToContractPage();
    await contractPage.searchContract("md00085");
    await termsPage.editInContractWizard("md00085");
    // await rightsPage.addRights();
  });
});
