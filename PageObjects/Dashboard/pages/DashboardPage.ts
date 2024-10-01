import { expect, Page } from "@playwright/test";
import { testData } from "../../../TestData/testData";
import { locators } from "./../locators/DashboardPageLocators";
import { CommonPage } from "../../../Util/CommonPage";
import { CommonScenario } from "../../../Util/Common_Library";
import { navLocator } from "./../locators/NavBarLocators";
import logger from "../../../Util/logger";

export class DashboardPage extends CommonPage {
  constructor(public page: Page, readonly scenario: CommonScenario) {
    super(page, scenario);
  }

  //Verify home page title
  async verifyDashboardPageTitle() {
    logger.info("Verifying dashboard page title");
    await this.waitForDashboardVisibility();
    const pageTitle = await this.page.title();
    logger.info(`Page title: ${pageTitle}`);
    await expect(pageTitle).toBe("Dashboard | MediaBox Royalty Management");
  }
  async waitForDashboardVisibility() {
    logger.info("Waiting for dashboard visibility");
    await this.waitForElementToBeVisible(locators.gridDashboard);
  }

  // change language to English(UK)
  async changeLanguageToEnglishUK() {
    logger.info("Changing language to English (UK)");
    await this.waitForDashboardVisibility();
    await this.page.click(navLocator.topNav.languageToggle);
    await this.page.click(navLocator.topNav.languageOption.englishUK);
    await expect(
      this.page.locator(navLocator.topNav.displayedLanguage)
    ).toHaveText("English (United Kingdom)");
    logger.info("Language changed to English (UK)");
  }

  async navigateToContractPage() {
    logger.info("Navigating to contract page");
    await this.waitForDashboardVisibility();
    await this.page.click(navLocator.sideNavLocator.contracts);
    logger.info("Navigated to contract page");
  }
}
