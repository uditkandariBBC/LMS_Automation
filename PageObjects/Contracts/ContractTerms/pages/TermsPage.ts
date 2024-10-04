// PageObjects/Contracts/ContractTerms/pages/ContractTermsPage.ts

import { Page } from "@playwright/test";
import { CommonPage } from "../../../../Util/CommonPage";
import { CommonScenario } from "../../../../Util/CommonScenario";
import { termsPageLocator } from "../locators/ContractTermsPageLocators";
import logger from "../../../../Util/logger";
import { ValidationException } from "../../../../Exceptions/CustomExceptions";

export class TermsPage extends CommonPage {
  constructor(public page: Page, readonly scenario: CommonScenario) {
    super(page, scenario);
  }

  // Validate that the Contract Terms page is loaded for a specific contract number
  async validateContractTermsPageLoaded(
    contractNumber: string
  ): Promise<boolean> {
    logger.info(
      `Validating Contract Terms page loaded for contract number: ${contractNumber}`
    );

    // Wait for the heading element containing the contract number to be visible
    await this.waitForElementToBeVisible(
      termsPageLocator.headingWithContractNumber
    );

    // Get the text of the heading element
    const headingText = await this.getElementText(
      termsPageLocator.headingWithContractNumber
    );
    logger.info(`Contract Terms page heading text: ${headingText}`);

    // Check if the heading text includes the contract number (case-insensitive)
    const isValid = headingText
      .toUpperCase()
      .includes(contractNumber.toUpperCase());
    if (!isValid) {
      logger.error(`Contract number "${contractNumber}" not found in heading.`);
      throw new ValidationException(
        `Contract number "${contractNumber}" not found in heading.`
      );
    }

    logger.info(
      `Contract number "${contractNumber}" successfully validated in heading.`
    );
    return isValid;
  }

  // Edit the contract in the Contract Wizard
  async editInContractWizard(contractNumber: string) {
    logger.info(
      `Editing contract in Contract Wizard for contract: ${contractNumber}`
    );

    // Validate that the Contract Terms page is loaded for the given contract number
    await this.validateContractTermsPageLoaded(contractNumber);

    // Click on 'Select Action' dropdown
    await this.clickElement(termsPageLocator.selectAction, "Select Action");

    // Click on 'Edit Contract' option
    await this.clickElement(termsPageLocator.editContract, "Edit Contract");

    logger.info("Clicked on 'Edit in Contract Wizard'");
  }
}
