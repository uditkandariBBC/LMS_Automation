import test from "../../Base/BaseTest";

test.describe("Manufacturer Tests", () => {
  test("Test Manufacturer Functionality", async ({ pageObjectManager }) => {
    const {
      dashboardPage,
      contractPage,
      termsPage,
      rightsPage,
      manufacturerPopup,
    } = pageObjectManager;

    await dashboardPage.navigateToContractPage();
    await contractPage.searchContract("md00085");
    //await termsPage.manufacturerFun();
    await termsPage.clickOnManufacturer();
    await manufacturerPopup.addManufacturer(
      "md00085",
      "Premium Shirts S de RL de CV Sucursal",
      "4M SLR"
    );
  });
});
