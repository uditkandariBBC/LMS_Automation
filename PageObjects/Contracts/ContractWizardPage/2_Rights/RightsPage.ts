import { Logger, Page } from "@playwright/test";
import { CommonScenario } from "../../../../Util/Common_Library";
import { Contract, ContractWizardPage } from "../NewContractWizard";

export class RightsPage extends ContractWizardPage {
  constructor(public page: Page, readonly scenario: CommonScenario) {
    super(page, scenario);
  }
}
