import { Page } from "@playwright/test";
import { CommonPage } from "../../../Util/CommonPage";
import { CommonScenario } from "../../../Util/Common_Library";
import { termsPageLocator } from "./ContractTermsPageLocators";
import logger from "../../../Util/logger";
import { ValidationException } from "../../../Exceptions/CustomExceptions";

export class TermsPage extends CommonPage {
  constructor(public page: Page, readonly scenario: CommonScenario) {
    super(page, scenario);
  }

  async validateContractTermsPageLoaded(
    contractNumber: string
  ): Promise<boolean> {
    logger.info(
      `Validating contract terms page loaded for contract number: ${contractNumber}`
    );

    // Use CommonPage's waitForElementToBeVisible to ensure consistent error handling
    await this.waitForElementToBeVisible(
      termsPageLocator.headingWithContractNumber
    );
    const headingText = await this.getElementText(
      termsPageLocator.headingWithContractNumber
    );
    logger.info(`Contract Terms page heading text: ${headingText}`);

    const isValid = headingText.includes(contractNumber.toUpperCase());
    if (!isValid) {
      throw new ValidationException(
        `Contract number "${contractNumber}" not found in heading.`
      );
    }
    return isValid;
  }

  async editInContractWizard(contract: string) {
    logger.info(`Editing in contract wizard for contract: ${contract}`);
    const isLoaded = await this.validateContractTermsPageLoaded(contract);
    logger.info(`Contract terms page loaded: ${isLoaded}`);

    // Use clickElement from CommonPage directly for consistent behavior
    await this.clickElement(termsPageLocator.selectAction, "Select Action");
    await this.clickElement(termsPageLocator.editContract, "Edit Contract");
    logger.info("Clicked on 'Edit in Contract Wizard'");
  }
}
