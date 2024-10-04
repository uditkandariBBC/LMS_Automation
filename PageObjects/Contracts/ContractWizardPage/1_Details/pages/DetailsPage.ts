// PageObjects/Contracts/ContractWizardPage/DetailsPage/pages/DetailsPage.ts

import { Page } from "@playwright/test";
import { CommonScenario } from "../../../../../Util/CommonScenario";
import {
  Contract,
  ContractWizardPage,
} from "../../NewContractWizard/pages/ContractWizard";
import { detailsLocator } from "../locators/DetailsPageLocators";
import logger from "../../../../../Util/logger";

export class DetailsPage extends ContractWizardPage {
  constructor(public page: Page, readonly scenario: CommonScenario) {
    super(page, scenario);
  }

  // Fill in the details section of the contract wizard
  async fillDataInDetails() {
    logger.info("Filling data in Details section");

    const details = (await this.getContractData()).details;

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

    await this.takeScreenshot("Details Section Filled");
    logger.info("Data filled in Details section");
  }

  // Select the contract type from the dropdown
  async selectContractType(selectOptionText: string) {
    logger.info(`Selecting Contract Type: ${selectOptionText}`);
    await this.selectOptionById(
      detailsLocator.contractTypeId,
      selectOptionText
    );
    logger.info(`Selected Contract Type: ${selectOptionText}`);
  }

  // Select the contract stage from the dropdown
  async selectContractStage(selectOptionText: string) {
    logger.info(`Selecting Contract Stage: ${selectOptionText}`);
    await this.selectOptionById(
      detailsLocator.contractStageId,
      selectOptionText
    );
    logger.info(`Selected Contract Stage: ${selectOptionText}`);
  }

  // Select the licensor from the dropdown
  async selectLicensor(selectOptionText: string) {
    logger.info(`Selecting Licensor: ${selectOptionText}`);
    await this.selectOptionById(detailsLocator.licensorId, selectOptionText);
    logger.info(`Selected Licensor: ${selectOptionText}`);
  }

  // Select the licensee from the dropdown
  async selectLicensee(selectOptionText: string) {
    logger.info(`Selecting Licensee: ${selectOptionText}`);
    await this.selectOptionById(detailsLocator.licenseeId, selectOptionText);
    logger.info(`Selected Licensee: ${selectOptionText}`);
  }

  // Select the agent from the dropdown
  async selectAgent(selectOptionText: string) {
    logger.info(`Selecting Agent: ${selectOptionText}`);
    try {
      const dropdownLocator = this.page.locator(detailsLocator.agentDropdown);
      await dropdownLocator.waitFor();
      if (await dropdownLocator.isVisible()) {
        const optionLocator = dropdownLocator.locator(detailsLocator.agentId);
        const optionCount = await optionLocator.count();
        logger.info(`Agent options available: ${optionCount}`);
        if (optionCount > 0) {
          await optionLocator.selectOption({ label: selectOptionText });
          logger.info(`Selected Agent: ${selectOptionText}`);
        } else {
          logger.warn(`Agent option "${selectOptionText}" not found`);
        }
      } else {
        logger.warn("Agent dropdown is not visible");
      }
    } catch (error: any) {
      logger.error(`Error selecting agent: ${error.message}`);
      throw new Error(`Error selecting agent: ${error.message}`);
    }
  }

  // Select the contract currency from the dropdown
  async selectContractCurrency(selectOptionText: string) {
    logger.info(`Selecting Contract Currency: ${selectOptionText}`);
    await this.selectOptionById(
      detailsLocator.contractCurrencyId,
      selectOptionText
    );
    logger.info(`Selected Contract Currency: ${selectOptionText}`);
  }

  // Select the exchange service from the dropdown
  async selectExchangeService(selectOptionText: string) {
    logger.info(`Selecting Exchange Service: ${selectOptionText}`);
    await this.selectOptionById(
      detailsLocator.exchangeServiceId,
      selectOptionText
    );
    logger.info(`Selected Exchange Service: ${selectOptionText}`);
  }

  // Enter the contract number
  async enterContractNo() {
    logger.info("Entering Contract Number");
    const contractNo = await this.generateRandomContractNumber();
    await this.fillInputField(detailsLocator.contractNoId, contractNo);
    logger.info(`Entered Contract Number: ${contractNo}`);
  }

  // Enter the alternate contract ID
  async enterAlternateContractID(alternateContractIdText: string) {
    logger.info(`Entering Alternate Contract ID: ${alternateContractIdText}`);
    await this.fillInputField(
      detailsLocator.alternateContractId,
      alternateContractIdText
    );
    logger.info(`Entered Alternate Contract ID: ${alternateContractIdText}`);
  }

  // Enter the deal memo expiration date
  async dealMemoExpirationDate(date: string) {
    logger.info(`Entering Deal Memo Expiration Date: ${date}`);
    await this.enterDateUsingPress(detailsLocator.dealMemoExpDateId, date);
    await this.clickElement(detailsLocator.alternateContractId); // To close any date pickers
    logger.info(`Entered Deal Memo Expiration Date: ${date}`);
  }

  // Enter the contract start date
  async enterStartDate(startDateText: string) {
    logger.info(`Entering Start Date: ${startDateText}`);
    await this.enterDateUsingPress(detailsLocator.startDateId, startDateText);
    await this.clickElement(detailsLocator.alternateContractId);
    logger.info(`Entered Start Date: ${startDateText}`);
  }

  // Enter the contract end date
  async enterEndDate(endDateText: string) {
    logger.info(`Entering End Date: ${endDateText}`);
    await this.enterDateUsingPress(detailsLocator.endDateId, endDateText);
    await this.clickElement(detailsLocator.alternateContractId);
    logger.info(`Entered End Date: ${endDateText}`);
  }

  // Enter the sell-off days
  async enterSellOffDays(sellOffDaysText: string) {
    logger.info(`Entering Sell-Off Days: ${sellOffDaysText}`);
    await this.fillInputField(detailsLocator.sellOffDaysId, sellOffDaysText);
    logger.info(`Entered Sell-Off Days: ${sellOffDaysText}`);
  }
}
