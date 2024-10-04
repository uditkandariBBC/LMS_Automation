import test, { expect } from "../../Base/BaseTest";
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

  test("Test Edit contract Functionality", async ({
    page,
    dashboardPage,
    contractPage,
    detailsPage,
    termsPage,
    rightsPage,
  }) => {
    await dashboardPage.navigateToContractPage();
    await contractPage.searchContract("md00085");
    await termsPage.editInContractWizard("md00085");
    await rightsPage.fillDataInRights();
  });
});
