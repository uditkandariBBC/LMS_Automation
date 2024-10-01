import { Page, test as baseTest, TestInfo } from "@playwright/test";
import { LoginPage } from "../PageObjects/LoginPage/pages/LoginPage";
import { DashboardPage } from "../PageObjects/Dashboard/pages/DashboardPage";
import { CommonScenario } from "../Util/Common_Library";
import { ContractPage } from "../PageObjects/Contracts/ContractPage/pages/ContractPage";
import { ContractWizardPage } from "../PageObjects/Contracts/ContractWizardPage/NewContractWizard/pages/ContractWizard";
import { DetailsPage } from "../PageObjects/Contracts/ContractWizardPage/1_Details/pages/DetailsPage";
import { TermsPage } from "../PageObjects/Contracts/ContractTerms/pages/ContractTermsPage";
import { RightsPage } from "../PageObjects/Contracts/ContractWizardPage/2_Rights/pages/RightsPage";
import logger from "../Util/logger";
import { transports } from "winston";
import * as fs from "fs";
import * as path from "path";

// Constants for directory names
const BASE_LOG_DIR = "logs";

/**
 * Sets up the logging directories for the application.
 *
 * This function checks if the base logging directory exists. It then creates a
 * subdirectory for the current date in YYYY-MM-DD format. If any of these directories
 * do not exist, they are created.
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
 * A record of page object classes for creating fixtures dynamically.
 *
 * @type {Record<string, new (page: Page, commonScenarioPage: CommonScenario) => any>}
 */
const pageObjectClasses = {
  loginPage: LoginPage,
  dashboardPage: DashboardPage,
  contractPage: ContractPage,
  contractWizardPage: ContractWizardPage,
  detailsPage: DetailsPage,
  termsPage: TermsPage,
  rightsPage: RightsPage,
  // Add other page objects here
};

/**
 * Helper function to create fixtures for each page object.
 *
 * This function iterates over the provided `pageObjectClasses` and dynamically creates
 * fixtures for each one, allowing easy access to these page objects in tests.
 *
 * @param {Record<string, new (page: Page, commonScenarioPage: CommonScenario) => any>} pageObjectClasses - A record of page object class constructors.
 * @returns {Record<string, any>} A record of dynamically created fixtures.
 */
function createPageObjectFixtures(
  pageObjectClasses: Record<
    string,
    new (page: Page, commonScenarioPage: CommonScenario) => any
  >
) {
  const fixtures: Record<string, any> = {};
  for (const [key, PageObjectClass] of Object.entries(pageObjectClasses)) {
    fixtures[key] = async ({ page, commonScenarioPage }, use) => {
      const pageObject = new PageObjectClass(page, commonScenarioPage);
      await use(pageObject);
    };
  }
  return fixtures;
}

/**
 * Interface for type-safe page objects used in fixtures.
 *
 * This interface defines the types for each fixture, ensuring strong typing throughout tests.
 */
interface PageObjects {
  commonScenarioPage: CommonScenario;
  loginPage: LoginPage;
  dashboardPage: DashboardPage;
  contractPage: ContractPage;
  contractWizardPage: ContractWizardPage;
  detailsPage: DetailsPage;
  termsPage: TermsPage;
  rightsPage: RightsPage;
  // Add other page objects here
}

/**
 * Extends the base Playwright test with additional fixtures for page objects and common scenarios.
 *
 * @property {Function} commonScenarioPage - A fixture for setting up a common scenario page.
 * @param {Page} page - The Playwright page object to be used in fixtures.
 * @param {Function} use - A callback to provide the fixture instance to tests.
 * @param {TestInfo} testInfo - Information about the current test execution.
 *
 * @returns {void}
 *
 * The `commonScenarioPage` fixture:
 * - Generates a timestamp for log file naming.
 * - Creates a log file name based on the test title and timestamp.
 * - Adds a file transport to the logger for logging to the generated log file.
 * - Uses the `CommonScenario` class with the provided page and test information.
 * - Removes the file transport from the logger after use.
 *
 * The `createPageObjectFixtures` function is used to create additional page object fixtures.
 */
const test = baseTest.extend<PageObjects>({
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
  ...createPageObjectFixtures(pageObjectClasses),
});

// Hooks as fixtures
test.beforeEach(async ({ loginPage }) => {
  logger.info(`Starting test: ${loginPage.constructor.name}`);
  logger.debug("Initializing login page for test setup.");
  await loginPage.performLogin();
  logger.debug("Login successful and test setup completed.");
});

test.afterEach(async () => {
  logger.info("Finished test");
  logger.debug("Tearing down test context and cleaning up.");
});

// Export default and named export so spec files can use it
export default test;
export const expect = test.expect;
