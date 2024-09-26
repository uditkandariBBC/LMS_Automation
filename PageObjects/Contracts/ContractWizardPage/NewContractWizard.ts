import { Page } from "@playwright/test";
import { CommonPage } from "../../../Util/CommonPage";
import { CommonScenario } from "../../../Util/Common_Library";
import { contractWizardLocators as cwLocator } from "./NewContractWizardLocators";
import logger from "../../../Util/logger";

export class ContractWizardPage extends CommonPage {
  constructor(public page: Page, readonly scenario: CommonScenario) {
    super(page, scenario);
  }

  async checkHeadingText() {
    logger.info("Checking heading text");
    const headingText = await this.page
      .locator(cwLocator.contractWizardHeading)
      .textContent();
    logger.info(`Heading text: ${headingText}`);
  }

  async clickDetails() {
    logger.info("Clicking 'Details' navigation link");
    this.clickElement(cwLocator.navigation.details);
  }

  async clickRights() {
    logger.info("Clicking 'Rights' navigation link");
    this.clickElement(cwLocator.navigation.rights);
  }

  async clickDefinitions() {
    logger.info("Clicking 'Definitions' navigation link");
    await this.clickElement(cwLocator.navigation.definitions);
  }

  async clickSamples() {
    logger.info("Clicking 'Samples' navigation link");
    await this.clickElement(cwLocator.navigation.samples);
  }

  async clickAgent() {
    logger.info("Clicking 'Agent' navigation link");
    await this.clickElement(cwLocator.navigation.agent);
  }

  async clickPayments() {
    logger.info("Clicking 'Payments' navigation link");
    await this.clickElement(cwLocator.navigation.payments);
  }

  async clickRoyalty() {
    logger.info("Clicking 'Royalty' navigation link");
    await this.clickElement(cwLocator.navigation.royalty);
  }

  async clickTiers() {
    logger.info("Clicking 'Tiers' navigation link");
    await this.clickElement(cwLocator.navigation.tiers);
  }

  async clickOverrides() {
    logger.info("Clicking 'Overrides' navigation link");
    await this.clickElement(cwLocator.navigation.overrides);
  }

  async clickReporting() {
    logger.info("Clicking 'Reporting' navigation link");
    await this.clickElement(cwLocator.navigation.reporting);
  }

  async clickContacts() {
    logger.info("Clicking 'Contacts' navigation link");
    await this.clickElement(cwLocator.navigation.contacts);
  }

  async clickMisc() {
    logger.info("Clicking 'Misc' navigation link");
    await this.clickElement(cwLocator.navigation.misc);
  }

  async clickFinish() {
    logger.info("Clicking 'Finish' navigation link");
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
