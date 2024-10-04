// Util/Common_Library.ts

import { Page, TestInfo } from "@playwright/test";
import { promises as fs } from "fs";
import * as path from "path";

export class CommonScenario {
  private myMap = new Map<string, string>();

  constructor(public page: Page, public testInfo: TestInfo) {}

  async takeScreenshot(name: string) {
    const screenshotName = `${this.testInfo.title}_${name}`;
    const screenshotBuffer = await this.page.screenshot({ fullPage: true });
    await this.testInfo.attach(screenshotName, {
      contentType: "image/png",
      body: screenshotBuffer,
    });
  }

  async hooks() {
    console.log("Hook from the CommonScenario class");
  }

  setValue(key: string, value: string) {
    this.myMap.set(key, value);
  }

  getValue(key: string): string | undefined {
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
}
