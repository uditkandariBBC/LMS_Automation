// PageObjects/Dashboard/pages/DashboardPage.ts

import { expect, Page } from "@playwright/test";
import { CommonPage } from "../../../Util/CommonPage";
import { CommonScenario } from "../../../Util/CommonScenario";
import { locators } from "../locators/DashboardPageLocators";
import { navLocator } from "../locators/NavBarLocators";
import logger from "../../../Util/logger";

export class DashboardPage extends CommonPage {
  constructor(public page: Page, readonly scenario: CommonScenario) {
    super(page, scenario);
  }

  // Verify the dashboard page title
  async verifyDashboardPageTitle() {
    logger.info("Verifying dashboard page title");
    await this.waitForDashboardVisibility();
    const pageTitle = await this.page.title();
    logger.info(`Page title: ${pageTitle}`);
    await expect(pageTitle).toBe("Dashboard | MediaBox Royalty Management");
  }

  // Wait for the dashboard to be visible
  async waitForDashboardVisibility() {
    logger.info("Waiting for dashboard visibility");
    await this.waitForElementToBeVisible(locators.gridDashboard);
  }

  // Change language to English (UK)
  async changeLanguageToEnglishUK() {
    logger.info("Changing language to English (UK)");
    await this.waitForDashboardVisibility();
    await this.clickElement(
      navLocator.topNav.languageToggle,
      "Language Toggle"
    );
    await this.clickElement(
      navLocator.topNav.languageOption.englishUK,
      "English (UK) Language Option"
    );

    const displayedLanguage = this.page.locator(
      navLocator.topNav.displayedLanguage
    );
    await expect(displayedLanguage).toHaveText("English (United Kingdom)");
    logger.info("Language changed to English (UK)");
  }

  // Navigate to the contract page
  async navigateToContractPage() {
    logger.info("Navigating to contract page");
    await this.waitForDashboardVisibility();
    await this.clickElement(
      navLocator.sideNavLocator.contracts,
      "Contracts Link"
    );
    logger.info("Navigated to contract page");
  }
}
