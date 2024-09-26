import {
  expect,
  Page,
  _baseTest,
  Browser,
  BrowserContext,
  chromium,
} from "@playwright/test";
import { testData } from "../../TestData/testData";
import { CommonPage } from "../../Util/CommonPage";
import { CommonScenario } from "../../Util/Common_Library";
import { logInLocators } from "./LoginPageLocators";
import logger from "../../Util/logger";

export class LoginPage extends CommonPage {
  constructor(public page: Page, readonly scenario: CommonScenario) {
    super(page, scenario);
  }

  //Login to RM-512
  async navigateToRM() {
    logger.info("Navigating to RM-512 login page");
    await this.page.goto(testData.rm_512);
    await this.page.waitForLoadState("domcontentloaded");
  }

  async performLogin() {
    // Go to RM-512 login page
    this.navigateToRM();
    //Enter credentials and Log in to RM-512
    logger.info("Performing login");
    await this.fillUsername(testData.username);
    await this.fillPassword(testData.password);
    await this.agreeToTermsOfService();
    await this.submitLoginForm();
    logger.info("Login performed successfully");
  }
  async validateLogin() {
    //Wait to load home page
    logger.info("Validating login");

    const loggedInUser = this.page.locator(logInLocators.homepageUserName);
    const loggedInUserName = await loggedInUser.textContent();

    // Assert if user is logged in successfully
    await expect(loggedInUser).toBeVisible();
    logger.info(`${loggedInUserName} logged in successfully`);
  }

  async fillUsername(username: string) {
    logger.info(`Filling in username: ${username}`);
    await this.fillInputField(logInLocators.usernameInput, username);
  }

  async fillPassword(password: string) {
    logger.info("Filling in password");
    await this.fillInputField(logInLocators.userPasswordInput, password);
  }

  async agreeToTermsOfService() {
    logger.info("Agreeing to terms of service");
    await this.checkCheckbox(logInLocators.agreeTermsCheckbox);
  }

  async submitLoginForm() {
    logger.info("Submitting login form");
    await this.clickElement(logInLocators.submitButton);
  }
}
