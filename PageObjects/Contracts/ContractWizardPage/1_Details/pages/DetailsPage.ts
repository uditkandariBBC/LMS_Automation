import { Logger, Page } from "@playwright/test";
import { CommonScenario } from "../../../../../Util/Common_Library";
import {
  Contract,
  ContractWizardPage,
} from "../../../ContractWizardPage/NewContractWizard/pages/ContractWizard";
import { detailsLocator } from "../locators/DetailsPageLocators";

export class DetailsPage extends ContractWizardPage {
  constructor(public page: Page, readonly scenario: CommonScenario) {
    super(page, scenario);
  }

  async fillDataInDetails() {
    const contractData: Contract = await this.scenario.readJsonFile(
      "ContractData.json"
    );
    const details = contractData.details;
    await this.selectContractType(details.contractType);
    await this.selectContractStage(details.contractStages);
    await this.enterContractNo();
    await this.enterAlternateContractID(details.alternateContractID);
    await this.selectLicensor(details.licensor);
    await this.selectLicensee(details.licensee);
    await this.selectAgent(details.primaryAgent);
    await this.dealMemoExpirationDate(details.memoExpirationDate);
    await this.enterStartDate(details.startDate);
    await this.enterEndDate(details.endDate);
    await this.enterSellOffDays(details.sellOffDays);
    await this.selectContractCurrency(details.contractCurrency);
    await this.selectExchangeService(details.exchangeService);
    await this.takeScreenshot("Test screenshot");
  }

  async enterDateUsingPress(selector: string, date: string) {
    // Focus on the input element
    await this.page.focus(selector);

    // Clear existing content (if any)
    await this.page.keyboard.press("Control+A");
    await this.page.keyboard.press("Backspace");

    // Enter the date using individual key presses
    for (const char of date) {
      if (char === "/") {
        await this.page.keyboard.press("Slash");
      } else {
        await this.page.keyboard.press(char);
      }
    }
  }

  async selectContractType(selectOptionText: string) {
    await this.selectOptionById(
      detailsLocator.contractTypeId,
      selectOptionText
    );
    await console.log(`Selected ${selectOptionText} for Contract Type`);
  }

  async selectContractStage(selectOptionText: string) {
    await this.selectOptionById(
      detailsLocator.contractStageId,
      selectOptionText
    );
    await console.log(`Selected ${selectOptionText} for Contract Stage`);
  }

  async selectLicensor(selectOptionText: string) {
    await this.selectOptionById(detailsLocator.licensorId, selectOptionText);
    await console.log(`Selected ${selectOptionText} for Licensor`);
  }

  async selectLicensee(selectOptionText: string) {
    await this.selectOptionById(detailsLocator.licenseeId, selectOptionText);
    await console.log(`Selected ${selectOptionText} for Licensee`);
  }

  async selectAgent(selectOptionText: string) {
    try {
      // Locate the dropdown container element
      const dropdownLocator = await this.page.locator(".col-sm-4.agentSelect");
      await dropdownLocator.waitFor();
      // Check if the dropdown element is visible
      const isVisible = await dropdownLocator.isVisible();

      if (isVisible) {
        // Find the specific option based on text
        const optionLocator = await dropdownLocator.locator("#AgentGUID");

        // Check if the option exists
        const optionCount = await optionLocator.count();
        console.log(optionCount);
        if (optionCount > 0) {
          // Click on the option
          await optionLocator.selectOption(selectOptionText);
          console.log(`Selected ${selectOptionText} for Agent`);
        } else {
          console.log(`Option "${selectOptionText}" not found in the dropdown`);
        }
      } else {
        console.log("Dropdown element is not visible");
      }
    } catch (error) {
      console.error("Error selecting agent:", error);
    }
  }

  async selectContractCurrency(selectOptionText: string) {
    await this.selectOptionById(
      detailsLocator.contractCurrencyId,
      selectOptionText
    );
    await console.log(`Selected ${selectOptionText} for Contract Currency`);
  }

  async selectExchangeService(selectOptionText: string) {
    await this.selectOptionById(
      detailsLocator.exchangeServiceId,
      selectOptionText
    );
    await console.log(`Selected ${selectOptionText} for Exchange Service`);
  }

  async enterContractNo() {
    const contract = await this.page.locator(detailsLocator.contractNoId);
    const contractNo = await this.generateRandomContractNumber();
    await contract.fill(contractNo);
    await console.log(`Entered Contract Number: ${contractNo}`);
  }

  async enterAlternateContractID(alternateContractIdText: string) {
    const alternateContractID = await this.page.locator(
      detailsLocator.alternateContractId
    );
    await alternateContractID.fill(alternateContractIdText);
    await console.log(
      `Entered Alternate Contract ID: ${alternateContractIdText}`
    );
  }

  async dealMemoExpirationDate(date: string) {
    await this.enterDateUsingPress(detailsLocator.dealMemoExpDateId, date);
    await this.page.locator(detailsLocator.alternateContractId).click();
    await console.log(`Entered Memo Expiration Date: ${date}`);
  }

  async enterStartDate(startDateText: string) {
    await this.enterDateUsingPress(detailsLocator.startDateId, startDateText);
    await this.page.locator(detailsLocator.alternateContractId).click();
    await console.log(`Entered Start Date: ${startDateText}`);
  }

  async enterEndDate(endDateText: string) {
    await this.enterDateUsingPress(detailsLocator.endDateId, endDateText);
    await this.page.locator(detailsLocator.alternateContractId).click();
    await console.log(`Entered End Date: ${endDateText}`);
  }
  
  async enterSellOffDays(sellOffDaysText: string) {
    const sellOffDays = await this.page.locator(detailsLocator.sellOffDaysId);
    await sellOffDays.fill(sellOffDaysText);
    await console.log(`Entered Sell-Off Days: ${sellOffDaysText}`);
  }
}
