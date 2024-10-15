import { TermsPage } from "./TermsPage";
import { Page } from "@playwright/test";
import { CommonScenario } from "../../../../Util/CommonScenario";
import logger from "../../../../Util/logger";
import { CommonPage } from "../../../../Util/CommonPage";
import { IManufacturerPopup } from "./IManufacturerPopup";
import { contractPageLocator } from "../../ContractPage/locators/ContractPageLocators";
import { ManufacturerPopupLocator } from "../locators/ManufacturerLocator";

export class ManufacturerPopup
  extends CommonPage
  implements IManufacturerPopup
{
  constructor(public page: Page, readonly scenario: CommonScenario) {
    super(page, scenario);
  }
  async closeManufacturerPopup() {
    logger.info("Closing Manufacturer Popup");
    await this.clickElement(ManufacturerPopupLocator.closeManufacturerPopup);
  }
  async waitForLoadingToFinish() {}
  async addManufacturer(contractNo: string, ...manufacturers: string[]) {
    logger.info("Adding Manufacturer");
    for (const manufacturer of manufacturers) {
      await this.clickAdd();
      await this.checkContractNo(contractNo);
await this.selectManufacturerFromDropdown()
      // await this.clickElement(ManufacturerPopupLocator.manufacturerDropdown);
      await this.fillDropdownSearch(manufacturer);

      // check status
      const status = await this.getStatus();

      
    }
  }

  async fillDropdownSearch(manufacturer: string) { 
    await this.enterTextUsingPress(
      ManufacturerPopupLocator.manufacturerDropdownSearch,
      manufacturer
    );
    await this.clickElement(
      ManufacturerPopupLocator.manufacturerDropdownResult
    );
  }

  async clickAdd() {
    logger.info("Adding Manufacturer");
    await this.clickElement(ManufacturerPopupLocator.addManufacturer);
  }

  async checkHistory() {
    logger.info("Checking Manufacturer History");
    await this.clickElement(ManufacturerPopupLocator.history);
  }
  async editManufacturer() {
    logger.info("Editing Manufacturer");
    await this.clickElement(ManufacturerPopupLocator.editManufacturer);
  }
  async deleteManufacturer() {
    logger.info("Deleting Manufacturer");
    await this.clickElement(ManufacturerPopupLocator.deleteManufacturer);
  }
  async searchManufacturer() {
    logger.info("Searching Manufacturer");
    await this.fillInputField(
      ManufacturerPopupLocator.searchManufacturer,
      "Manufacturer"
    );
  }
  async checkContractNo(contractNo: string) {
    logger.info("Checking Contract Number");
    const contract = await this.page
      .locator(ManufacturerPopupLocator.contractNo)
      .innerText();
    if (contract.toLowerCase().includes(contractNo)) {
      logger.info("Contract Number is present");
    } else {
      logger.error("Contract Number is not present");
    }
  }
  async selectManufacturerFromDropdown() {
    logger.info("Selecting Manufacturer from Dropdown");
    await this.clickElement(ManufacturerPopupLocator.manufacturerDropdown);
  }
  async getStatus() {
    logger.info("Checking Manufacturer Status");
    const status: string = await this.page
      .locator(ManufacturerPopupLocator.status)
      .innerText();
    return status;
  }
  async checkStats() {
    
  }
  async selectMAReceived() {}
  async unselectMAReceived() {}
  async fillMAReceivedDate() {}
  async fillNotes() {}
}
