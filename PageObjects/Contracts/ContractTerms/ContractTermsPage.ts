import { Page } from "@playwright/test";
import { CommonPage } from "../../../Util/CommonPage";
import { CommonScenario } from "../../../Util/Common_Library";
import { termsPageLocator } from "./ContractTermsPageLocators";

export class TermsPage extends CommonPage {
  constructor(public page: Page, readonly scenario: CommonScenario) {
    super(page, scenario);
  }

  async validateContractTermsPageLoaded(
    contractNumber: string
  ): Promise<boolean> {
    const termsPageHeading = await this.page
      .locator(termsPageLocator.headingWithContractNumber)
      .innerText();
    this.page.waitForSelector(termsPageHeading);
    console.log(termsPageHeading);

    return true;
  }

  async editInContractWizard(contract: string) {
    console.log(await this.validateContractTermsPageLoaded(contract));
  }
}
