import { Page } from "@playwright/test";
import { CommonPage } from "../../../Util/CommonPage";
import { CommonScenario } from "../../../Util/Common_Library";
import { termsPageLocator } from "./ContractTermsPageLocators";
import logger from "../../../Util/logger";

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
    const headingLocator = this.page.locator(
      termsPageLocator.headingWithContractNumber
    );
    await headingLocator.waitFor({ state: "visible" });
    const headingText = await headingLocator.innerText();
    console.log(headingText);
    return headingText.includes(contractNumber.toUpperCase());

    // const termsPageHeading = await this.page
    //   .locator(termsPageLocator.headingWithContractNumber)
    //   .innerText();
    // // this.page.waitForSelector(termsPageHeading);
    // logger.info(`Terms page heading: ${termsPageHeading}`);
    // return termsPageHeading.includes(contractNumber);
  }

  async editInContractWizard(contract: string) {
    logger.info(`Editing in contract wizard for contract: ${contract}`);
    const isLoaded = await this.validateContractTermsPageLoaded(contract);
    logger.info(`Contract terms page loaded: ${isLoaded}`);
    await this.clickElement(termsPageLocator.selectAction);
    await this.clickElement(termsPageLocator.editContract);
    logger.info("Clicked on 'Edit in Contract Wizard'");
  }
}
