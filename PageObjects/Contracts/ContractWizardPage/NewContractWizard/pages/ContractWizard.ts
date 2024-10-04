// PageObjects/Contracts/ContractWizardPage/NewContractWizard/pages/ContractWizard.ts

import { Page } from "@playwright/test";
import { CommonPage } from "../../../../../Util/CommonPage";
import { CommonScenario } from "../../../../../Util/CommonScenario";
import { contractWizardLocators as cwLocator } from "../locators/NewContractWizardLocators";
import logger from "../../../../../Util/logger";
import {
  ActionFailedException,
  ElementNotFoundException,
  ValidationException,
} from "../../../../../Exceptions/CustomExceptions";

export class ContractWizardPage extends CommonPage {
  constructor(public page: Page, readonly scenario: CommonScenario) {
    super(page, scenario);
  }

  // Get contract data from JSON file
  async getContractData(): Promise<Contract> {
    logger.info("Getting contract data from JSON file");
    const contractData: Contract = await this.scenario.readJsonFile(
      "ContractData.json"
    );
    logger.info("Contract data retrieved successfully");
    return contractData;
  }

  // Check the heading text of the contract wizard page
  async checkHeadingText(): Promise<string> {
    try {
      logger.info("Checking heading text");
      const headingLocator = this.page.locator(cwLocator.contractWizardHeading);
      await headingLocator.waitFor({ state: "visible", timeout: 5000 });
      const headingText = await headingLocator.textContent();

      if (!headingText) {
        throw new ElementNotFoundException(
          "Heading element not found or text content is empty."
        );
      }

      logger.info(`Heading text: ${headingText}`);
      return headingText;
    } catch (error: any) {
      logger.error(`Error checking heading text: ${error.message}`);
      throw new ActionFailedException("Failed to check heading text.");
    }
  }

  // Navigate to a specified section within the Contract Wizard
  async navigateTo(section: string) {
    const navigationMap: { [key: string]: string } = {
      details: cwLocator.navigation.details,
      rights: cwLocator.navigation.rights,
      definitions: cwLocator.navigation.definitions,
      samples: cwLocator.navigation.samples,
      agent: cwLocator.navigation.agent,
      payments: cwLocator.navigation.payments,
      royalty: cwLocator.navigation.royalty,
      tiers: cwLocator.navigation.tiers,
      overrides: cwLocator.navigation.overrides,
      reporting: cwLocator.navigation.reporting,
      contacts: cwLocator.navigation.contacts,
      misc: cwLocator.navigation.misc,
      finish: cwLocator.navigation.finish,
    };

    const normalizedSection = section.toLowerCase();

    if (!navigationMap[normalizedSection]) {
      logger.error(`Navigation section "${section}" is not defined.`);
      throw new ValidationException(
        `Navigation section "${section}" is not defined.`
      );
    }

    try {
      logger.info(`Navigating to "${section}" section.`);
      await this.clickElement(
        navigationMap[normalizedSection],
        `Navigate to ${section} section`
      );
      logger.info(`Successfully navigated to "${section}" section.`);
    } catch (error: any) {
      logger.error(
        `Failed to navigate to section "${section}": ${error.message}`
      );
      throw new ActionFailedException(
        `Failed to navigate to "${section}" section.`
      );
    }
  }
}

// Interface for a Contract
export interface Contract {
  details: {
    contractType: string;
    contractStages: string;
    contractNo: string;
    autogenerateContractNo: boolean;
    alternateContractID: string;
    licensor: string;
    licensee: string;
    primaryAgent: string;
    memoExpirationDate: string;
    startDate: string;
    endDate: string;
    sellOffDays: string;
    contractCurrency: string;
    exchangeService: string;
  };
  rights: {
    contractRights: string;
    contractRightsDetails: string;
  };
}
