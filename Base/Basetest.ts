import { Page, test as baseTest, Logger } from "@playwright/test";
import { LoginPage } from "../PageObjects/LoginPage/LoginPage";
import { DashboardPage } from "../PageObjects/Dashboard/DashboardPage";
import { CommonScenario } from "../Util/Common_Library";
import { CommonPage } from "../Util/CommonPage";
import { ContractPage } from "../PageObjects/Contracts/ContractPage";
import { ContractWizardPage } from "../PageObjects/Contracts/ContractWizardPage/NewContractWizard";
import { DetailsPage } from "../PageObjects/Contracts/ContractWizardPage/1_Details/DetailsPage";
import { TermsPage } from "../PageObjects/Contracts/ContractTerms/ContractTermsPage";

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
}
// initializing all the page objects you have in your app and import them as fixture in spec file
const test = baseTest.extend<PageObjects>({
  commonScenarioPage: async ({ page }, use, testinfo) => {
    await use(new CommonScenario(page, testinfo));
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
});

// hooks as fixtures
// let authenticatedPage: Page;
test.beforeEach(async ({ loginPage }) => {
  await loginPage.performLogin();
});

test.afterEach(async ({}) => {
  // console.log('afterEach tests');
});

// export default and name export so spec files can use it
export default test;
export const expect = test.expect;
