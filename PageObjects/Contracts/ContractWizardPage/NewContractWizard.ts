import { Page } from "@playwright/test";
import { CommonPage } from "../../../Util/CommonPage";
import { CommonScenario } from "../../../Util/Common_Library";
import { contractWizardLocators as cwLocator } from "./NewContractWizardLocators";

export class ContractWizardPage extends CommonPage {
  constructor(public page: Page, readonly scenario: CommonScenario) {
    super(page, scenario);
  }

  async checkHeadingText() {
    const headingText = await this.page
      .locator(cwLocator.contractWizardHeading)
      .textContent();
    console.log(headingText);
  }

  async clickDetails() {
    this.clickElement(cwLocator.navigation.details);
  }

  async clickRights() {
    this.clickElement(cwLocator.navigation.rights);
  }

  async clickDefinitions() {
    await this.clickElement(cwLocator.navigation.definitions);
  }

  async clickSamples() {
    await this.clickElement(cwLocator.navigation.samples);
  }

  async clickAgent() {
    await this.clickElement(cwLocator.navigation.agent);
  }

  async clickPayments() {
    await this.clickElement(cwLocator.navigation.payments);
  }

  async clickRoyalty() {
    await this.clickElement(cwLocator.navigation.royalty);
  }

  async clickTiers() {
    await this.clickElement(cwLocator.navigation.tiers);
  }

  async clickOverrides() {
    await this.clickElement(cwLocator.navigation.overrides);
  }

  async clickReporting() {
    await this.clickElement(cwLocator.navigation.reporting);
  }

  async clickContacts() {
    await this.clickElement(cwLocator.navigation.contacts);
  }

  async clickMisc() {
    await this.clickElement(cwLocator.navigation.misc);
  }

  async clickFinish() {
    await this.clickElement(cwLocator.navigation.finish);
  }

  // Verify Contract Wizard Page Title
  //Verify new Contract Wizard url
  //Verify contract Wizard Progress Bar
  //Verify Contract Wizard Navigation links
}

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
