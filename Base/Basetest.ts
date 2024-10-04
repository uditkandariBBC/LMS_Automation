// Base/BaseTest.ts

import { test as baseTest, TestInfo } from "@playwright/test";
import { CommonScenario } from "../Util/CommonScenario";
import logger from "../Util/logger";
import { transports } from "winston";
import * as fs from "fs";
import * as path from "path";

import { PageObjectManager } from "./PageObjectManager"; // Adjusted import

// Constants for directory names
const BASE_LOG_DIR = "logs";

/**
 * Sets up the logging directories for the application.
 *
 * @returns {string} The path to the daily log directory.
 *
 * @throws {Error} If there is an issue creating the directories.
 */
function setupLoggingDirectories() {
  try {
    if (!fs.existsSync(BASE_LOG_DIR)) {
      fs.mkdirSync(BASE_LOG_DIR);
    }

    const currentDate = new Date().toISOString().split("T")[0]; // Get current date in YYYY-MM-DD format
    const dailyLogDir = path.join(BASE_LOG_DIR, currentDate);
    if (!fs.existsSync(dailyLogDir)) {
      fs.mkdirSync(dailyLogDir);
    }

    return dailyLogDir;
  } catch (error) {
    console.error("Error setting up logging directories:", error);
    throw error; // Re-throw the error after logging it
  }
}

const dailyLogDir = setupLoggingDirectories();

/**
 * Extends the base Playwright test with additional fixtures for page objects and common scenarios.
 */
const test = baseTest.extend<{
  commonScenarioPage: CommonScenario;
  pageObjectManager: PageObjectManager;
}>({
  commonScenarioPage: async ({ page }, use, testInfo) => {
    const timestamp = new Date()
      .toISOString()
      .replace(/[:.]/g, "-")
      .replace("T", "_")
      .slice(0, 16); // Include date, hours, and minutes
    const logFileName = path.join(
      dailyLogDir,
      `log_${testInfo.title.replace(/[^a-zA-Z0-9]/g, "_")}_${timestamp}.log`
    );
    const fileTransport = new transports.File({ filename: logFileName });
    logger.add(fileTransport);

    await use(new CommonScenario(page, testInfo));

    logger.remove(fileTransport);
  },
  pageObjectManager: async ({ page, commonScenarioPage }, use) => {
    const manager = new PageObjectManager(page, commonScenarioPage);
    await use(manager);
  },
});

// Hooks as fixtures
test.beforeEach(async ({ pageObjectManager }) => {
  logger.info(`Starting test: ${pageObjectManager.loginPage.constructor.name}`);
  logger.debug("Initializing login page for test setup.");
  await pageObjectManager.loginPage.performLogin();
  logger.debug("Login successful and test setup completed.");
});

test.afterEach(async () => {
  logger.info("Finished test");
  logger.debug("Tearing down test context and cleaning up.");
});

// Export default and named export so spec files can use it
export default test;
export const expect = test.expect;
