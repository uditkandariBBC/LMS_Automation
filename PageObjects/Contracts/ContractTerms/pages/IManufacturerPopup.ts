export interface IManufacturerPopup {
  closeManufacturerPopup(): Promise<void>;
  waitForLoadingToFinish(): Promise<void>;
  addManufacturer(
    contractNo: string,
    ...manufacturers: string[]
  ): Promise<void>;
  checkHistory(): Promise<void>;
  editManufacturer(): Promise<void>;
  deleteManufacturer(): Promise<void>;
  searchManufacturer(): Promise<void>;
  checkContractNo(contractNo: string): Promise<void>;
  selectManufacturerFromDropdown(): Promise<void>;
  getStatus(): Promise<string>;
  checkStats(): Promise<void>;
  selectMAReceived(): Promise<void>;
  unselectMAReceived(): Promise<void>;
  fillMAReceivedDate(): Promise<void>;
  fillNotes(): Promise<void>;
}
