// PageObjects/Contracts/ContractPage/pages/ContractPage.ts

import { Page } from "@playwright/test";
import { CommonPage } from "../../../../Util/CommonPage";
import { CommonScenario } from "../../../../Util/CommonScenario";
import { contractPageLocator } from "../locators/ContractPageLocators";
import logger from "../../../../Util/logger";

export class ContractPage extends CommonPage {
  constructor(public page: Page, readonly scenario: CommonScenario) {
    super(page, scenario);
  }

  // Start a new contract
  async startNewContract() {
    logger.info("Starting a new contract");
    await this.clickAddContract();
  }

  // Click the 'Add Contract' button
  async clickAddContract() {
    logger.info("Clicking 'Add Contract' button");
    await this.clickElement(contractPageLocator.startContractWizard);
  }

  // Search for a contract by number
  async searchContract(contractNumber: string) {
    logger.info(`Searching for contract with number: ${contractNumber}`);
    await this.fillContractNumber(contractNumber);
    await this.clickSearchButton();
    await this.waitForSearchResults();
    await this.selectContract(contractNumber);
    logger.info(`Contract with number: ${contractNumber} selected`);
  }

  // Click the 'Search' button
  private async clickSearchButton() {
    logger.info("Clicking 'Search' button");
    await this.clickElement(contractPageLocator.searchButton);
  }

  // Fill the contract number in the search field
  private async fillContractNumber(contractNumber: string) {
    logger.info(`Filling contract number: ${contractNumber}`);
    await this.fillInputField(
      contractPageLocator.searchTextBox,
      contractNumber
    );
  }

  // Wait for search results to appear
  private async waitForSearchResults() {
    logger.info("Waiting for search results");
    await this.page.waitForSelector(contractPageLocator.searchResultTableId, {
      state: "visible",
      timeout: 5000,
    });
  }

  // Select the contract from the search results
  private async selectContract(contractNumber: string) {
    let foundContract: boolean = false;
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
        foundContract = true;
        await row.click();
        break;
      }
    }
    if (!foundContract) {
      logger.error(
        `Contract number: ${contractNumber} not found in search results`
      );
      throw new Error(`Contract number ${contractNumber} not found`);
    }
  }
}
