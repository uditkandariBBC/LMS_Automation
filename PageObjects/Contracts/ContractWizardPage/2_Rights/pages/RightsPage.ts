import { Logger, Page } from "@playwright/test";
import { CommonScenario } from "../../../../../Util/Common_Library";
import { ContractWizardPage } from "../../NewContractWizard/pages/ContractWizard";

export class RightsPage extends ContractWizardPage {
  constructor(public page: Page, readonly scenario: CommonScenario) {
    super(page, scenario);
  }
}
