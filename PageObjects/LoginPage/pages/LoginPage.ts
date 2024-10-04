// PageObjects/LoginPage/pages/LoginPage.ts

import { expect, Page } from "@playwright/test";
import { testData } from "../../../TestData/testData";
import { CommonPage } from "../../../Util/CommonPage";
import { CommonScenario } from "../../../Util/CommonScenario";
import { logInLocators } from "../locators/LoginPageLocators";
import logger from "../../../Util/logger";
import { ValidationException } from "../../../Exceptions/CustomExceptions";

export class LoginPage extends CommonPage {
  constructor(public page: Page, readonly scenario: CommonScenario) {
    super(page, scenario);
  }

  // Navigate to the login page
  async navigateToRM() {
    logger.info("Navigating to RM-512 login page");
    await this.page.goto(testData.rm_512);
    await this.page.waitForLoadState("domcontentloaded");
  }

  // Perform the login operation
  async performLogin() {
    await this.navigateToRM();
    logger.info("Performing login");
    await this.fillUsername(testData.username);
    await this.fillPassword(testData.password);
    await this.agreeToTermsOfService();
    await this.submitLoginForm();
    logger.info("Login performed successfully");
  }

  // Validate that login was successful
  async validateLogin() {
    logger.info("Validating login");
    try {
      const loggedInUser = this.page.locator(logInLocators.homepageUserName);
      await expect(loggedInUser).toBeVisible({ timeout: 5000 });
      const loggedInUserName = await loggedInUser.textContent();
      logger.info(`${loggedInUserName} logged in successfully`);
    } catch (error: any) {
      logger.error("Login validation failed");
      throw new ValidationException(
        "Login validation failed: " + error.message
      );
    }
  }

  // Fill in the username field
  async fillUsername(username: string) {
    logger.info(`Entering username: ${username}`);
    await this.fillInputField(logInLocators.usernameInput, username);
  }

  // Fill in the password field
  async fillPassword(password: string) {
    logger.info("Entering password");
    await this.fillInputField(logInLocators.userPasswordInput, password);
  }

  // Agree to the terms of service
  async agreeToTermsOfService() {
    logger.info("Agreeing to terms of service");
    await this.checkCheckbox(logInLocators.agreeTermsCheckbox);
  }

  // Submit the login form and validate login
  async submitLoginForm() {
    logger.info("Submitting login form");
    await this.clickElement(logInLocators.submitButton);
    await this.validateLogin();
  }
}
