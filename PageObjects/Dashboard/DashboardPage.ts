import { expect, Page } from "@playwright/test";
import { testData } from "../../TestData/testData";
import { locators } from "./DashboardPageLocators";
import { CommonPage } from "../../Util/CommonPage";
import { CommonScenario } from "../../Util/Common_Library";
import { navLocator } from "./NavBarLocators";

export class DashboardPage extends CommonPage {
  constructor(public page: Page, readonly scenario: CommonScenario) {
    super(page, scenario);
  }

  //Verify home page title
  async verifyDashboardPageTitle() {
    await this.waitForDashboardVisibility();
    const pageTitle = await this.page.title();
    await expect(pageTitle).toBe("Dashboard | MediaBox Royalty Management");
  }
  async waitForDashboardVisibility() {
    await this.waitForElementToBeVisible(locators.gridDashboard);
  }

  // change language to English(UK)
  async changeLanguageToEnglishUK() {
    await this.waitForDashboardVisibility();
    await this.page.click(navLocator.topNav.languageToggle);
    await this.page.click(navLocator.topNav.languageOption.englishUK);
    await expect(
      this.page.locator(navLocator.topNav.displayedLanguage)
    ).toHaveText("English (United Kingdom)");
  }

  async navigateToContractPage() {
    await this.waitForDashboardVisibility();
    await this.page.click(navLocator.sideNavLocator.contracts);
    console.log("Navigating to contract page...");
  }
}
