import { expect, Locator, Page } from "@playwright/test";
import { CommonPage } from "../../Util/CommonPage";
import { CommonScenario } from "../../Util/Common_Library";
import { contractPageLocator } from "./ContractPageLocators";
import logger from "../../Util/logger";

export class ContractPage extends CommonPage {
  constructor(public page: Page, readonly scenario: CommonScenario) {
    super(page, scenario);
  }

  //search for contract

  //add contract
  async startNewContract() {
    await this.clickAddContract();
    logger.info("Creating new contract");
  }
  async clickAddContract() {
    logger.info("Clicking 'Add Contract' button");
    await this.clickElement(contractPageLocator.startContractWizard);
  }

  async searchContract(contractNumber: string) {
    logger.info(`Searching for contract with number: ${contractNumber}`);
    await this.fillContractNumber(contractNumber);
    await this.clickSearchButton();
    await this.page.waitForTimeout(2000);
    await this.selectContract(contractNumber);
    logger.info(`Contract with number: ${contractNumber} selected`);
  }

  private async clickSearchButton() {
    logger.info("Clicking 'Search' button");
    await this.clickElement(contractPageLocator.searchButton);
  }

  private async fillContractNumber(contractNumber: string) {
    logger.info(`Filling contract number: ${contractNumber}`);
    await this.fillInputField(
      contractPageLocator.searchTextBox,
      contractNumber
    );
  }

  private async selectContract(contractNumber: string) {
    logger.info(`Selecting contract with number: ${contractNumber}`);
    let table = this.page.locator(contractPageLocator.searchResultTableId);
    const rows = table.locator("tbody tr");
    for (const row of await rows.all()) {
      const foundContractNumber = await row
        .locator('//td[@class="ContractNumber"]')
        .innerText();

      if (foundContractNumber.toLowerCase() === contractNumber.toLowerCase()) {
        logger.info(
          `Found contract number: ${foundContractNumber}, clicking on it`
        );
        await row.click();
        break;
      }
    }
  }
}
