import { Page, test as baseTest, TestInfo } from "@playwright/test";
import { LoginPage } from "../PageObjects/LoginPage/LoginPage";
import { DashboardPage } from "../PageObjects/Dashboard/DashboardPage";
import { CommonScenario } from "../Util/Common_Library";
import { CommonPage } from "../Util/CommonPage";
import { ContractPage } from "../PageObjects/Contracts/ContractPage";
import { ContractWizardPage } from "../PageObjects/Contracts/ContractWizardPage/NewContractWizard";
import { DetailsPage } from "../PageObjects/Contracts/ContractWizardPage/1_Details/DetailsPage";
import { TermsPage } from "../PageObjects/Contracts/ContractTerms/ContractTermsPage";
import { RightsPage } from "../PageObjects/Contracts/ContractWizardPage/2_Rights/RightsPage";
import logger from "../Util/logger";
import { transports } from "winston";
import * as fs from "fs";
import * as path from "path";

// Ensure the logs directory exists
const logDir = "logs";
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

// declaring the objects type for autocompletion
interface PageObjects {
  loginPage: LoginPage;
  dashboardPage: DashboardPage;
  commonScenarioPage: CommonScenario;
  commonPage: CommonPage;
  contractPage: ContractPage;
  contractWizardPage: ContractWizardPage;
  detailsPage: DetailsPage;
  termsPage: TermsPage;
  rightsPage: RightsPage;
}
// initializing all the page objects you have in your app and import them as fixture in spec file
const test = baseTest.extend<PageObjects>({
  commonScenarioPage: async ({ page }, use, testInfo) => {
    // Create a unique log file name based on the current timestamp
    const timestamp = new Date()
      .toISOString()
      .replace(/[:.]/g, "-")
      .replace("T", "_")
      .slice(0, 16); // Include date, hours, and minutes
    const logFileName = path.join(
      logDir,
      `log_${testInfo.title.replace(/[^a-zA-Z0-9]/g, "_")}_${timestamp}.log`
    );
    const fileTransport = new transports.File({ filename: logFileName });
    logger.add(fileTransport);

    await use(new CommonScenario(page, testInfo));

    // Remove the logger transport after use
    logger.remove(fileTransport);
  },
  loginPage: async ({ page, commonScenarioPage }, use) => {
    await use(new LoginPage(page, commonScenarioPage));
  },
  dashboardPage: async ({ page, commonScenarioPage }, use) => {
    await use(new DashboardPage(page, commonScenarioPage));
  },
  contractPage: async ({ page, commonScenarioPage }, use) => {
    await use(new ContractPage(page, commonScenarioPage));
  },
  contractWizardPage: async ({ page, commonScenarioPage }, use) => {
    await use(new ContractWizardPage(page, commonScenarioPage));
  },
  detailsPage: async ({ page, commonScenarioPage }, use) => {
    await use(new DetailsPage(page, commonScenarioPage));
  },
  termsPage: async ({ page, commonScenarioPage }, use) => {
    await use(new TermsPage(page, commonScenarioPage));
  },
  rightsPage: async ({ page, commonScenarioPage }, use) => {
    await use(new RightsPage(page, commonScenarioPage));
  },
});

// hooks as fixtures
test.beforeEach(async ({ loginPage }) => {
  logger.info(`Starting test: ${loginPage.constructor.name}`);
  logger.debug("Initializing login page for test setup.");
  await loginPage.performLogin();
  logger.debug("Login successful and test setup completed.");
});

test.afterEach(async ({}) => {
  logger.info("Finished test");
  logger.debug("Tearing down test context and cleaning up.");
});

// export default and name export so spec files can use it
export default test;
export const expect = test.expect;
