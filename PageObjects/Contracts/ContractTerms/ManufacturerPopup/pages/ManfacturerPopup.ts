import { Page } from "@playwright/test";
import { CommonScenario } from "../../../../../Util/CommonScenario";
import logger from "../../../../../Util/logger";
import { CommonPage } from "../../../../../Util/CommonPage";
import { IManufacturerPopup } from "./IManufacturerPopup";
import { ManufacturerPopupLocator } from "../locator/ManufacturerLocator";

export class ManufacturerPopup
  extends CommonPage
  implements IManufacturerPopup
{
  constructor(public page: Page, readonly scenario: CommonScenario) {
    super(page, scenario);
  }

  //Close Manufacturer Popup
  async closeManufacturerPopup(): Promise<void> {
    logger.info("Closing Manufacturer Popup");
    await this.clickElement(ManufacturerPopupLocator.closeManufacturerPopup);
  }

  //Get Manufacturer List
  async getSelectedManufacturerList(): Promise<string[]> {
    logger.info("Getting Selected Manufacturer List");
    await this.page.waitForTimeout(5000);
    const manufacturerElement = await this.page
      .locator(ManufacturerPopupLocator.selectedManufacturerNameListLocator)
      .all();
    const manufacturerList: string[] = [];
    for (let element of manufacturerElement) {
      manufacturerList.push(await element.innerText());
    }
    console.log(manufacturerList);
    return manufacturerList;
  }

  //Check if Manufacturer is already added
  async isManufacturerAlreadyAdded(manufacturer: string): Promise<boolean> {
    logger.info("Checking if Manufacturer is already added");
    const manufacturerList = await this.getSelectedManufacturerList();
    if (manufacturerList.includes(manufacturer)) {
      logger.info("Manufacturer is already added");
      return true;
    } else {
      logger.info("Manufacturer is not added");
      return false;
    }
  }

  //Add Manufacturer
  async addManufacturer(
    contractNo: string,
    ...manufacturers: string[]
  ): Promise<void> {
    // let selectedManufacturerList = await this.getSelectedManufacturerList(); //get selected manufacturer list
    logger.info("Adding Manufacturer");
    for (const manufacturer of manufacturers) {
      await this.page.waitForSelector(ManufacturerPopupLocator.addManufacturer);
      if (!(await this.isManufacturerAlreadyAdded(manufacturer))) {
        await this.clickElement(ManufacturerPopupLocator.addManufacturer); //Click Add
        await this.checkContractNo(contractNo); //Check Contract No
        await this.selectManufacturerFromDropdown(manufacturer);
        await this.page.waitForSelector(ManufacturerPopupLocator.status);
        const status = await this.getStatus();
        if (await this.verifyStats(status)) {
          await this.handleAcceptedStatus();
        } else {
          await this.handleNotAcceptedStatus();
        }
      } else {
        logger.info("Manufacturer is already added");
      }
    }
  }

  //Handle Not Accepted Status
  async handleNotAcceptedStatus(): Promise<void> {
    logger.info("Handling Accepted Status");
    await this.fillNotes("MA Not Received");
    await this.clickElement(ManufacturerPopupLocator.saveButton);
  }

  //Handle Accepted Status
  async handleAcceptedStatus(): Promise<void> {
    logger.info("Handling Accepted Status");
    const isChecked = await this.verifyMAReceivedCheckbox();
    if (!isChecked) {
      logger.info("MA Received Checkbox is not checked. Checking it now.");
      await this.setCheckboxState(ManufacturerPopupLocator.maReceived, true);
    } else {
      logger.info("MA Received Checkbox is already checked.");
    }
    await this.fillMAReceivedDate("01/01/2021");
    await this.fillNotes("MA Received");
    await this.clickElement(ManufacturerPopupLocator.saveButton);
  }

  //Set Checkbox State
  async verifyMAReceivedCheckbox(): Promise<boolean> {
    logger.info("Verifying MA Received Checkbox");
    const isChecked = await this.page
      .locator(ManufacturerPopupLocator.maReceived)
      .isChecked();
    if (isChecked) {
      logger.info("MA Received Checkbox is checked");
      return true;
    } else {
      logger.error("MA Received Checkbox is not checked");
      return false;
    }
  }

  async checkHistory(): Promise<void> {
    throw new Error("Method not implemented.");
  }
  async editManufacturer(): Promise<void> {
    throw new Error("Method not implemented.");
  }
  async deleteManufacturer(): Promise<void> {
    throw new Error("Method not implemented.");
  }
  async searchManufacturer(): Promise<void> {
    throw new Error("Method not implemented.");
  }

  //Check Contract Number in the Popup
  async checkContractNo(contractNo: string): Promise<void> {
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

  //Select Manufacturer from Dropdown
  async selectManufacturerFromDropdown(manufacturer): Promise<void> {
    logger.info("Selecting Manufacturer from Dropdown");
    await this.clickElement(ManufacturerPopupLocator.manufacturerDropdown);
    await this.fillDropdownSearch(manufacturer);
  }

  //Fill Manufacturer Dropdown Search
  async fillDropdownSearch(manufacturer: string) {
    // await this.fillInputField(
    //   ManufacturerPopupLocator.manufacturerDropdownSearch,
    //   manufacturer
    // );
    // await this.verifyResultAndClick(manufacturer);
    await this.enterTextUsingPress(
      ManufacturerPopupLocator.manufacturerDropdownSearch,
      manufacturer
    );

    // await this.clickElement(
    //   ManufacturerPopupLocator.manufacturerDropdownResult
    // );
  }

  // async verifyResultAndClick(manufacturer: string) {
  //   logger.info("Verifying Manufacturer Result and Clicking");
  //   await this.page.locator()
  // }

  //Get Manufacturer Status
  async getStatus(): Promise<string> {
    logger.info("Checking Manufacturer Status");
    const status: string = await this.page
      .locator(ManufacturerPopupLocator.status)
      .innerText();
    return status;
  }

  //Verify Manufacturer Status
  async verifyStats(status: string): Promise<boolean> {
    logger.info("Verifying Manufacturer Status");
    const acceptedStatuses = [
      "Meets minimum standards but improvement required",
      "Acceptable level of compliance",
      "Factory in lower risk territory",
    ];

    const notAcceptedStatuses = [
      "Audit not received",
      "Audit out of date",
      "Does not meet minimum standards",
    ];
    if (acceptedStatuses.includes(status)) {
      logger.info(`Manufacturer Status ${status} is accepted`);
      return true;
    } else if (notAcceptedStatuses.includes(status)) {
      logger.error(`Manufacturer Status ${status} is not accepted`);
      return false;
    } else {
      logger.error("Status is not valid");
      return false;
    }
  }

  //Select MA Received
  async selectMAReceived(): Promise<void> {
    logger.info("Selecting MA Received");
    await this.clickElement(ManufacturerPopupLocator.maReceived);
  }
  async unselectMAReceived(): Promise<void> {
    logger.info("Unselecting MA Received");
    await this.clickElement(ManufacturerPopupLocator.maReceived);
  }
  async fillMAReceivedDate(date: string): Promise<void> {
    logger.info("Filling MA Received Date");
    await this.enterDateUsingPress(
      ManufacturerPopupLocator.maReceivedDate,
      date
    );
  }
  async fillNotes(note: string): Promise<void> {
    logger.info("Filling Notes");
    await this.fillInputField(ManufacturerPopupLocator.notesTextbox, note);
  }
}
