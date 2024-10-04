// Base/PageObjectManager.ts

import { Page } from "@playwright/test";
import { CommonScenario } from "../Util/CommonScenario";
import * as PageObjects from "../PageObjects";

export class PageObjectManager {
  constructor(private page: Page, private commonScenarioPage: CommonScenario) {
    for (const [key, PageObjectClass] of Object.entries(PageObjects)) {
      const instanceName = key.charAt(0).toLowerCase() + key.slice(1);
      this[instanceName] = new PageObjectClass(
        this.page,
        this.commonScenarioPage
      );
    }
  }

  // Dynamic properties for each page object
  [key: string]: any;
}
