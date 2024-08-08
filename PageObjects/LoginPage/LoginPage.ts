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

export class LoginPage extends CommonPage {
  constructor(public page: Page, readonly scenario: CommonScenario) {
    super(page, scenario);
  }

  //Login to RM-512
  async navigateToRM() {
    await this.page.goto(testData.rm_512);
    await this.page.waitForLoadState("domcontentloaded");
  }

  async performLogin() {
    // Go to RM-512 login page
    this.navigateToRM();
    //Enter credentials and Log in to RM-512
    await this.fillUsername(testData.username);
    await this.fillPassword(testData.password);
    await this.agreeToTermsOfService();
    await this.submitLoginForm();
  }
  async validateLogin() {
    //Wait to load home page
    console.log("Checking if user is logged in");
    const loggedInUser = this.page.locator(logInLocators.homepageUserName);
    const loggedInUserName = await loggedInUser.textContent();

    // Assert if user is logged in successfully
    await expect(loggedInUser).toBeVisible();
    console.log(`${loggedInUserName} Logged in successfully`);
  }

  async fillUsername(username: string) {
    await this.fillInputField(logInLocators.usernameInput, username);
  }

  async fillPassword(password: string) {
    await this.fillInputField(logInLocators.userPasswordInput, password);
  }

  async agreeToTermsOfService() {
    await this.checkCheckbox(logInLocators.agreeTermsCheckbox);
  }

  async submitLoginForm() {
    await this.clickElement(logInLocators.submitButton);
  }
}
