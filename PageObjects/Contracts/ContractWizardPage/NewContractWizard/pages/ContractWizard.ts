import { Page } from "@playwright/test";
import { CommonPage } from "../../../../../Util/CommonPage";
import { CommonScenario } from "../../../../../Util/Common_Library";
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

  async getContractData(): Promise<Contract> { 
    const contractData: Contract = await this.scenario.readJsonFile(
      "ContractData.json"
    );
    return contractData;
  }

  /**
   * Checks the heading text of the contract wizard page.
   *
   * This method logs the process of checking the heading text, retrieves the text content
   * of the heading element, and returns it. If the heading element is not found or its text
   * content is empty, an `ElementNotFoundException` is thrown. If any other error occurs
   * during the process, an `ActionFailedException` is thrown.
   *
   * @returns {Promise<string>} The text content of the heading element.
   *
   * @throws {ElementNotFoundException} If the heading element is not found or its text content is empty.
   * @throws {ActionFailedException} If any other error occurs during the process.
   */
  async checkHeadingText() {
    try {
      logger.info("Checking heading text");
      const headingText = await this.page
        .locator(cwLocator.contractWizardHeading)
        .textContent();

      if (!headingText) {
        throw new ElementNotFoundException(
          "Heading element not found or text content is empty."
        );
      }

      logger.info(`Heading text: ${headingText}`);
      return headingText;
    } catch (error) {
      logger.error(`Error checking heading text: ${error.message}`);
      throw new ActionFailedException("Failed to check heading text.");
    }
  }

  /**
   * Navigates to a specified section within the Contract Wizard.
   *
   * @param section - The name of the section to navigate to. Valid sections include:
   * - "details"
   * - "rights"
   * - "definitions"
   * - "samples"
   * - "agent"
   * - "payments"
   * - "royalty"
   * - "tiers"
   * - "overrides"
   * - "reporting"
   * - "contacts"
   * - "misc"
   * - "finish"
   *
   * @throws {ValidationException} If the specified section is not defined in the navigation map.
   * @throws {ActionFailedException} If navigation to the specified section fails.
   */
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
      throw new ValidationException(
        `Navigation section "${section}" is not defined.`
      );
    }

    try {
      logger.info(`Navigating to ${section} section.`);
      await this.clickElement(navigationMap[normalizedSection], section);
    } catch (error) {
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
