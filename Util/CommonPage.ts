import { Page } from "@playwright/test";
import { CommonScenario } from "./CommonScenario";
import logger from "./logger";
import {
  ActionFailedException,
  TimeoutException,
  SelectorNotFoundException,
} from "../Exceptions/CustomExceptions";

export class CommonPage {
  private dataMap = new Map<string, string>();

  constructor(public page: Page, readonly scenario: CommonScenario) {}

  public getValue(key: string) {
    const value = this.scenario.getValue(key);
    return value;
  }

  public setValue(key: string, value: string) {
    this.scenario.setValue(key, value);
  }

  async takeScreenshot(name: string) {
    await this.scenario.takeScreenshot(name);
  }

  // Method to wait for the page to load
  async waitForPageToLoad() {
    try {
      logger.info("Waiting for the page to load.");
      await this.page.waitForLoadState("domcontentloaded");
      logger.info("Page loaded successfully.");
    } catch (error: any) {
      logger.error(`Failed to load page: ${error.message}`);
      throw error;
    }
  }

  // Method to wait for an element to be visible
  async waitForElementToBeVisible(selector: string, timeout: number = 10000) {
    try {
      logger.info(
        `Waiting for element "${selector}" to be visible with timeout ${timeout}ms.`
      );
      const element = this.page.locator(selector);
      await element.waitFor({ timeout });
      logger.info(`Element "${selector}" is visible.`);
    } catch (error: any) {
      logger.error(
        `Timeout while waiting for element "${selector}" to be visible.`
      );
      throw new TimeoutException(
        `Element "${selector}" did not become visible within ${timeout}ms.`
      );
    }
  }

  // Method to click an element
  async clickElement(selector: string, actionDescription?: string) {
    const description = actionDescription || `element "${selector}"`;

    try {
      logger.info(`Attempting to click on ${description}.`);
      await this.waitForElementToBeVisible(selector);
      const element = this.page.locator(selector);
      if ((await element.count()) === 0) {
        throw new SelectorNotFoundException(`Element "${selector}" not found.`);
      }
      await element.click({ timeout: 10000 });
      logger.info(`Clicked on ${description} successfully.`);
    } catch (error: any) {
      logger.error(`Error while clicking on ${description}: ${error.message}`);
      throw error;
    }
  }

  // Method to fill an input field
  async fillInputField(selector: string, value: string) {
    try {
      logger.info(`Filling input field "${selector}" with value "${value}".`);
      await this.page.locator(selector).fill(value);
      logger.info(`Filled input field "${selector}" successfully.`);
    } catch (error: any) {
      logger.error(
        `Error while filling input field "${selector}": ${error.message}`
      );
      throw new ActionFailedException(
        `Failed to fill input field "${selector}".`
      );
    }
  }

  // Method to get text from an element
  async getElementText(selector: string): Promise<string> {
    try {
      const text = await this.page.locator(selector).textContent();
      if (text === null) {
        throw new SelectorNotFoundException(
          `Element with selector "${selector}" does not have any text content.`
        );
      }
      return text;
    } catch (error: any) {
      logger.error(
        `Error while getting text from element "${selector}": ${error.message}`
      );
      throw new ActionFailedException(
        `Failed to get text from element "${selector}".`
      );
    }
  }

  // Method to check if an element is visible
  async isElementVisible(selector: string): Promise<boolean> {
    try {
      return await this.page.locator(selector).isVisible();
    } catch (error: any) {
      logger.error(
        `Error while checking visibility of element "${selector}": ${error.message}`
      );
      throw new ActionFailedException(
        `Failed to check visibility of element "${selector}".`
      );
    }
  }

  // Method to check if an element is enabled
  async isElementEnabled(selector: string): Promise<boolean> {
    try {
      return await this.page.locator(selector).isEnabled();
    } catch (error: any) {
      logger.error(
        `Error while checking if element "${selector}" is enabled: ${error.message}`
      );
      throw new ActionFailedException(
        `Failed to check if element "${selector}" is enabled.`
      );
    }
  }

  // Method to hover over an element
  async hoverOverElement(selector: string) {
    try {
      logger.info(`Hovering over element "${selector}".`);
      await this.page.locator(selector).hover();
      logger.info(`Hovered over element "${selector}" successfully.`);
    } catch (error: any) {
      logger.error(
        `Error while hovering over element "${selector}": ${error.message}`
      );
      throw new ActionFailedException(
        `Failed to hover over element "${selector}".`
      );
    }
  }

  // Method to check if a checkbox is checked
  async isCheckboxChecked(selector: string): Promise<boolean> {
    logger.info(`Verifying if checkbox "${selector}" is checked`);
    const isChecked = await this.page.locator(selector).isChecked();
    logger.info(
      `Checkbox "${selector}" is ${isChecked ? "checked" : "not checked"}`
    );
    return isChecked;
  }

  // Method to check a checkbox
  async checkCheckbox(selector: string) {
    try {
      const checkbox = this.page.locator(selector);
      await checkbox.waitFor({ state: "visible" });
      if (!(await checkbox.isChecked())) {
        await checkbox.check();
        logger.info(`Checkbox "${selector}" checked successfully.`);
      }
    } catch (error: any) {
      logger.error(
        `Error while checking checkbox "${selector}": ${error.message}`
      );
      throw new ActionFailedException(
        `Failed to check checkbox "${selector}".`
      );
    }
  }

  // Method to uncheck a checkbox
  async uncheckCheckbox(selector: string) {
    try {
      const checkbox = this.page.locator(selector);
      if (await checkbox.isChecked()) {
        await checkbox.uncheck();
        logger.info(`Checkbox "${selector}" unchecked successfully.`);
      }
    } catch (error: any) {
      logger.error(
        `Error while unchecking checkbox "${selector}": ${error.message}`
      );
      throw new ActionFailedException(
        `Failed to uncheck checkbox "${selector}".`
      );
    }
  }

  // Method to select an option from a dropdown by ID
  async selectOptionById(
    selectId: string,
    selectOptionText: string
  ): Promise<void> {
    try {
      const element = this.page.locator(`#${selectId}`);
      await element.waitFor();
      await element.selectOption({ label: selectOptionText });
      logger.info(`Option "${selectOptionText}" selected successfully.`);
    } catch (error: any) {
      logger.error(
        `Error while selecting option from dropdown "${selectId}": ${error.message}`
      );
      throw new ActionFailedException(
        `Failed to select option "${selectOptionText}" from dropdown "${selectId}".`
      );
    }
  }

  // Utility function to set checkbox state (select/unselect)
  async setCheckboxState(
    selector: string,
    shouldBeChecked: boolean
  ): Promise<void> {
    const isChecked = await this.isCheckboxChecked(selector);
    if (isChecked !== shouldBeChecked) {
      logger.info(
        `${shouldBeChecked ? "Checking" : "Unchecking"} checkbox "${selector}"`
      );
      await this.page.locator(selector).setChecked(shouldBeChecked);
    } else {
      logger.info(`Checkbox "${selector}" is already in the desired state.`);
    }
  }

  // Method to generate a random contract number
  async generateRandomContractNumber(): Promise<string> {
    const max = 2000;
    const min = 1000;
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    return `MD${randomNumber}`;
  }

  // Method to enter text using keyboard press
  async enterTextUsingPress(selector: string, text: string) {
    await this.page.focus(selector);
    for (const textChar of text) {
      await this.page.keyboard.press(textChar);
    }
    await this.page.keyboard.press("Enter");
  }

  // Method to enter a date using key presses
  async enterDateUsingPress(selector: string, date: string) {
    await this.page.focus(selector);
    await this.page.keyboard.press("Control+A");
    await this.page.keyboard.press("Backspace");
    for (const char of date) {
      if (char === "/") {
        await this.page.keyboard.press("Slash");
      } else {
        await this.page.keyboard.press(char);
      }
    }
  }

  // Method to wait for loading to finish
  async waitForLoadingToFinish() {
    logger.info("Waiting for loading indicator to disappear");
    await this.page.waitForSelector(".loadinggif", {
      state: "hidden",
      timeout: 10000,
    });
  }
}
