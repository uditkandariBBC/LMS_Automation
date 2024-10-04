import { Page } from "@playwright/test";
import { CommonScenario } from "../../../../../Util/Common_Library";
import { ContractWizardPage } from "../../NewContractWizard/pages/ContractWizard";
import logger from "../../../../../Util/logger";

export class RightsPage extends ContractWizardPage {
  constructor(public page: Page, readonly scenario: CommonScenario) {
    super(page, scenario);
  }

  async fillDataInRights() {
    await this.navigateTo("rights");
    const rights = (await this.getContractData()).rights;
  }
}
