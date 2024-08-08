import { test, expect, Page, TestInfo, Locator } from "@playwright/test";
import { promises as fs } from "fs";
import * as path from "path";

export class CommonScenario {
  private myMap = new Map<string, string>();
  constructor(public page: Page, public testinfo: TestInfo) {}

  async takeScreenshot(name: string) {
    this.testinfo.attach(`${this.testinfo.title}_${name} `, {
      contentType: "image/png",
      body: await this.page.screenshot({
        fullPage: true,
      }),
    });
  }

  async hooks() {
    console.log("hook from the scenario page");
  }

  setValue(key: string, value: string) {
    this.myMap.set(key, value);
  }

  getValue(key: string) {
    return this.myMap.get(key);
  }

  public async readJsonFile(fileName: string): Promise<any> {
    const filePath = path.resolve(
      __dirname,
      `../../bbcworldwide-playwright-framework-template-lms/TestData/${fileName}`
    );
    try {
      const data = await fs.readFile(filePath, "utf-8");
      return JSON.parse(data);
    } catch (error) {
      throw new Error(
        `Error reading JSON file '${fileName}': ${error.message}`
      );
    }
  }

  async writeJsonFile(fileName: string, data: any): Promise<void> {
    const filePath = path.resolve(
      __dirname,
      `../../bbcworldwide-playwright-framework-template-lms/TestData/${fileName}`
    );
    try {
      await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");
    } catch (error) {
      throw new Error(
        `Error writing JSON file '${fileName}': ${error.message}`
      );
    }
  }

  //Generate Random Number

  //Wait for Page to be loaded

  //Wait for element to be visible

  //Wait for element to be visible with define time limit

  //Method to wait for the element to be clickable clickable

  //Method for Click on WebElement

  //Method to select check box

  //Enter Data in text box

  //Method for keyword operation

  //Scroll till visibility of element

  //Select from Drop down

  //Method to upload files

  //Method to download files

  //Check Element exist or not
}
