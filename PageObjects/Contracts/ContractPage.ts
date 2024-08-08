import { expect, Locator, Page } from "@playwright/test";
import { CommonPage } from "../../Util/CommonPage";
import { CommonScenario } from "../../Util/Common_Library";
import { contractPageLocator } from "./ContractPageLocators";

export class ContractPage extends CommonPage {
  constructor(public page: Page, readonly scenario: CommonScenario) {
    super(page, scenario);
  }

  //search for contract

  //add contract
  async startNewContract() {
    await this.clickAddContract();
    console.log("Creating new contract");
  }
  async clickAddContract() {
    await this.clickElement(contractPageLocator.startContractWizard);
  }

  async searchContract(contractNumber: string) {
    await this.fillContractNumber(contractNumber);
    await this.clickSearchButton();
    await this.page.waitForTimeout(2000);
    await this.selectContract(contractNumber);
  }
  private async clickSearchButton() {
    await this.clickElement(contractPageLocator.searchButton);
  }

  private async fillContractNumber(contractNumber: string) {
    await this.fillInputField(
      contractPageLocator.searchTextBox,
      contractNumber
    );
    // await this.page
    //   .locator(contractPageLocator.searchTextBox)
    //   .fill(contractNumber);
  }

  private async selectContract(contractNumber: string) {
    let table = this.page.locator(contractPageLocator.searchResultTableId);
    const rows = table.locator("tbody tr");
    for (const row of await rows.all()) {
      const foundContractNumber = await row
        .locator('//td[@class="ContractNumber"]')
        .innerText();
      if (foundContractNumber.toLowerCase() === contractNumber.toLowerCase()) {
        await row.click();
        break;
      }
    }
  }
}
