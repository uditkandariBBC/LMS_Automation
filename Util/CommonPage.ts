import { test, expect, Page } from "@playwright/test";
import { CommonScenario } from "./Common_Library";
import * as fs from "fs";
import logger from "../Util/logger";
import {
  ActionFailedException,
  TimeoutException,
  SelectorNotFoundException,
} from "../Exceptions/CustomExceptions";

export class CommonPage {
  private dataMap = new Map();
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

  //Method to wait for page to load
  async waitForPageToLoad() {
    await this.retryAction(async () => {
      try {
        logger.info("Waiting for the page to load.");
        await this.page.waitForLoadState("domcontentloaded");
        logger.info("Page loaded successfully.");
      } catch (error) {
        logger.error(`Failed to load page: ${error.message}`);
        throw error;
      }
    });
  }

  //Method to wait for element to be visible
  async waitForElementToBeVisible(selector: string, timeout: number = 10000) {
    await this.retryAction(async () => {
      try {
        logger.info(
          `Waiting for element "${selector}" to be visible with timeout ${timeout}ms.`
        );
        const element = await this.page.locator(selector);
        await element.waitFor({ timeout });
        logger.info(`Element "${selector}" is visible.`);
      } catch (error) {
        logger.error(
          `Timeout while waiting for element "${selector}" to be visible.`
        );
        throw new TimeoutException(
          `Element "${selector}" did not become visible within ${timeout}ms.`
        );
      }
    });
  }

  // //Method to wait for element to be hidden
  // async waitForElementToBeHidden(selector: string, timeout: number = 5000) {
  //   await this.page.waitForSelector(selector, {
  //     state: "hidden",
  //     timeout,
  //   });
  // }
  // //Method to click the element
  // async clickElement(selector: string, actionDescription?: string) {
  //   try {
  //     const description = actionDescription || `element "${selector}"`;
  //     logger.info(`Attempting to click on ${description}.`);
  //     await this.waitForElementToBeVisible(selector);
  //     await this.page.locator(selector).click();
  //     logger.info(`Clicked on ${description} successfully.`);
  //   } catch (error) {
  //     const description = actionDescription || `element "${selector}"`;
  //     logger.error(`Error while clicking on ${description}: ${error.message}`);
  //     throw new ActionFailedException(`Failed to click on ${description}.`);
  //   }
  // }

  async clickElement(selector: string, actionDescription?: string) {
    const description = actionDescription || `element "${selector}"`;

    await this.retryAction(async () => {
      try {
        logger.info(`Attempting to click on ${description}.`);
        await this.waitForElementToBeVisible(selector);
        await this.page.locator(selector).click();
        logger.info(`Clicked on ${description} successfully.`);
      } catch (error) {
        logger.error(
          `Error while clicking on ${description}: ${error.message}`
        );
        throw error; // Re-throw error to trigger retry
      }
    });
  }

  async enterDateUsingPress(selector: string, date: string) {
    // Focus on the input element
    await this.page.focus(selector);

    // Clear existing content (if any)
    await this.page.keyboard.press("Control+A");
    await this.page.keyboard.press("Backspace");

    // Enter the date using individual key presses
    for (const char of date) {
      if (char === "/") {
        await this.page.keyboard.press("Slash");
      } else {
        await this.page.keyboard.press(char);
      }
    }
  }

  async fillInputField(selector: string, value: string) {
    await this.retryAction(async () => {
      try {
        logger.info(`Filling input field "${selector}" with value "${value}".`);
        await this.page.locator(selector).fill(value);
        logger.info(`Filled input field "${selector}" successfully.`);
      } catch (error) {
        logger.error(
          `Error while filling input field "${selector}": ${error.message}`
        );
        throw new ActionFailedException(
          `Failed to fill input field "${selector}".`
        );
      }
    });
  }

  async getElementText(selector: string): Promise<string> {
    try {
      const text = await this.page.locator(selector).textContent();
      if (text === null) {
        throw new SelectorNotFoundException(
          `Element with selector "${selector}" does not have any text content.`
        );
      }
      return text;
    } catch (error) {
      logger.error(
        `Error while getting text from element "${selector}": ${error.message}`
      );
      throw new ActionFailedException(
        `Failed to get text from element "${selector}".`
      );
    }
  }

  async isElementVisible(selector: string): Promise<boolean> {
    try {
      return await this.page.locator(selector).isVisible();
    } catch (error) {
      logger.error(
        `Error while checking visibility of element "${selector}": ${error.message}`
      );
      throw new ActionFailedException(
        `Failed to check visibility of element "${selector}".`
      );
    }
  }

  async isElementEnabled(selector: string): Promise<boolean> {
    try {
      return await this.page.locator(selector).isEnabled();
    } catch (error) {
      logger.error(
        `Error while checking if element "${selector}" is enabled: ${error.message}`
      );
      throw new ActionFailedException(
        `Failed to check if element "${selector}" is enabled.`
      );
    }
  }

  async hoverOverElement(selector: string) {
    await this.retryAction(async () => {
      try {
        logger.info(`Hovering over element "${selector}".`);
        await this.page.locator(selector).hover();
        logger.info(`Hovered over element "${selector}" successfully.`);
      } catch (error) {
        logger.error(
          `Error while hovering over element "${selector}": ${error.message}`
        );
        throw new ActionFailedException(
          `Failed to hover over element "${selector}".`
        );
      }
    });
  }

  async isCheckboxChecked(selector: string): Promise<boolean> {
    try {
      return await this.page.locator(selector).isChecked();
    } catch (error) {
      logger.error(
        `Error while checking if checkbox "${selector}" is checked: ${error.message}`
      );
      throw new ActionFailedException(
        `Failed to check if checkbox "${selector}" is checked.`
      );
    }
  }

  async checkCheckbox(selector: string) {
    await this.retryAction(async () => {
      try {
        const checkbox = await this.page.locator(selector);
        await checkbox.waitFor({ state: "visible" });
        if (!(await checkbox.isChecked())) {
          await checkbox.check();
          logger.info(`Checkbox "${selector}" checked successfully.`);
        }
      } catch (error) {
        logger.error(
          `Error while checking checkbox "${selector}": ${error.message}`
        );
        throw new ActionFailedException(
          `Failed to check checkbox "${selector}".`
        );
      }
    });
  }

  async uncheckCheckbox(selector: string) {
    await this.retryAction(async () => {
      try {
        const checkbox = this.page.locator(selector);
        if (await checkbox.isChecked()) {
          await checkbox.uncheck();
          logger.info(`Checkbox "${selector}" unchecked successfully.`);
        }
      } catch (error) {
        logger.error(
          `Error while unchecking checkbox "${selector}": ${error.message}`
        );
        throw new ActionFailedException(
          `Failed to uncheck checkbox "${selector}".`
        );
      }
    });
  }

  async selectOptionById(
    selectId: string,
    selectOptionText: string
  ): Promise<void> {
    await this.retryAction(async () => {
      try {
        const element = await this.page.locator(`#${selectId}`);
        await element.waitFor();
        await element.selectOption({ label: `${selectOptionText}` });
        logger.info(`Option "${selectOptionText}" selected successfully.`);
      } catch (error) {
        logger.error(
          `Error while selecting option from dropdown "${selectId}": ${error.message}`
        );
        throw new ActionFailedException(
          `Failed to select option "${selectOptionText}" from dropdown "${selectId}".`
        );
      }
    });
  }

  async retryAction(
    action: () => Promise<void>,
    retries: number = 3,
    delay: number = 1000
  ) {
    let attempt = 0;

    while (attempt < retries) {
      try {
        await action();
        // If action succeeds, exit the loop
        return;
      } catch (error) {
        logger.error(
          `Action failed on attempt ${attempt + 1}: ${error.message}`
        );

        // If maximum retries reached, throw the error
        if (attempt === retries - 1) {
          throw new ActionFailedException(
            `Action failed after ${retries} attempts.`
          );
        }

        // Increment attempt count and add delay before retry
        attempt++;
        await this.page.waitForTimeout(delay); // Wait for `delay` ms before retrying
      }
    }
  }

  async selectMultipleCheckbox() { 
    
  }

  async generateRandomContractNumber(): Promise<string> {
    const max = 2000;
    const min = 1000;
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    return `MD${randomNumber}`;
  }
}
