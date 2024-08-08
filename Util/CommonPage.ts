import { test, expect, Page } from "@playwright/test";
import { CommonScenario } from "./Common_Library";
import * as fs from "fs";

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
    await this.page.waitForLoadState("domcontentloaded");
  }

  //Method to wait for element to be visible
  async waitForElementToBeVisible(selector: string, timeout: number = 10000) {
    const element = await this.page.locator(selector);
    await element.waitFor();
  }

  async myMethod(selector: string) {
    const element = await this.page.locator(selector);
    if (element) {
      const styleAttribute = await element.getAttribute("style");
      if (styleAttribute === "") {
        await element.click();
      }
    }
  }

  //Method to wait for element to be hidden
  async waitForElementToBeHidden(selector: string, timeout: number = 5000) {
    await this.page.waitForSelector(selector, {
      state: "hidden",
      timeout,
    });
  }
  //Method to click the element
  async clickElement(selector: string) {
    await this.waitForElementToBeVisible(selector);
    await this.page.locator(selector).click();
  }

  async fillInputField(selector: string, value: string) {
    await this.page.locator(selector).fill(value);
  }

  async getElementText(selector: string): Promise<string> {
    const text = await this.page.locator(selector).textContent();
    if (text === null) {
      throw new Error(
        `Element with selector "${selector}" does not have any text content.`
      );
    }
    return text;
  }
  async isElementVisible(selector: string): Promise<boolean> {
    return await this.page.locator(selector).isVisible();
  }
  async isElementEnabled(selector: string): Promise<boolean> {
    return await this.page.locator(selector).isEnabled();
  }
  async hoverOverElement(selector: string) {
    await this.page.locator(selector).hover();
  }
  async isCheckboxChecked(selector: string): Promise<boolean> {
    return await this.page.locator(selector).isChecked();
  }
  async checkCheckbox(selector: string) {
    const checkbox = await this.page.locator(selector);
    await checkbox.waitFor({ state: "visible" });
    if (!(await checkbox.isChecked())) {
      await checkbox.check();
    }
  }

  async uncheckCheckbox(selector: string) {
    const checkbox = this.page.locator(selector);
    if (await checkbox.isChecked()) {
      await checkbox.uncheck();
    }
  }

  async selectDropdownOption(selectId: string, selectOptionText: string) {
    const element = await this.page.locator(`#${selectId}`);
    await element.waitFor();
    await element.selectOption({ label: `${selectOptionText}` });
  }

  async generateRandomContractNumber(): Promise<string> {
    const max = 2000;
    const min = 1000;
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    return `MD${randomNumber}`;
  }
}
