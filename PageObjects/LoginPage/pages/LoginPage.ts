import {
  expect,
  Page,
  _baseTest,
  Browser,
  BrowserContext,
  chromium,
} from "@playwright/test";
import { testData } from "../../../TestData/testData";
import { CommonPage } from "../../../Util/CommonPage";
import { CommonScenario } from "../../../Util/Common_Library";
import { logInLocators } from "./../locators/LoginPageLocators";
import logger from "../../../Util/logger";
import { ValidationException } from "../../../Exceptions/CustomExceptions";

export class LoginPage extends CommonPage {
  constructor(public page: Page, readonly scenario: CommonScenario) {
    super(page, scenario);
  }

  //Login to RM-512
  /**
   * Navigates to the RM-512 login page.
   *
   * This method logs the navigation action, navigates to the URL specified in the test data for RM-512,
   * and waits for the DOM content to be fully loaded.
   *
   * @returns {Promise<void>} A promise that resolves when the navigation and loading are complete.
   */
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

  /**
   * Validates the login process by checking if the homepage user name is visible.
   *
   * This method waits for the home page to load and then verifies if the user is logged in successfully.
   * It logs the user name if the login is successful, otherwise it throws a `ValidationException`.
   *
   * @throws {ValidationException} If the login validation fails.
   *
   * @example
   * ```typescript
   * await loginPage.validateLogin();
   * ```
   */
  async validateLogin() {
    // Wait to load home page
    logger.info("Validating login");

    try {
      const loggedInUser = this.page.locator(logInLocators.homepageUserName);
      const loggedInUserName = await loggedInUser.textContent();

      // Assert if user is logged in successfully
      await expect(loggedInUser).toBeVisible();
      logger.info(`${loggedInUserName} logged in successfully`);
    } catch (error) {
      logger.error("Login validation failed");
      throw new ValidationException(
        "Login validation failed: " + error.message
      );
    }
  }

  /**
   * Fills in the username input field with the provided username.
   *
   * @param username - The username to be entered into the input field.
   * @returns A promise that resolves when the username has been filled in.
   */
  async fillUsername(username: string) {
    logger.info(`Filling in username: ${username}`);
    await this.fillInputField(logInLocators.usernameInput, username);
  }

  async fillPassword(password: string) {
    logger.info("Filling in password");
    await this.page.locator(logInLocators.userPasswordInput).fill(password);
    // await this.fillInputField(logInLocators.userPasswordInput, password);
  }

  async agreeToTermsOfService() {
    logger.info("Agreeing to terms of service");
    await this.checkCheckbox(logInLocators.agreeTermsCheckbox);
  }

  async submitLoginForm() {
    logger.info("Submitting login form");
    await this.clickElement(logInLocators.submitButton);
    await this.validateLogin();
  }
}
