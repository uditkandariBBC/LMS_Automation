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
  selectManufacturerFromDropdown(manufacturer: string): Promise<void>;
  getStatus(): Promise<string>;
  verifyStats(status: string): Promise<boolean>;
  selectMAReceived(): Promise<void>;
  unselectMAReceived(): Promise<void>;
  fillMAReceivedDate(date: string): Promise<void>;
  fillNotes(note: string): Promise<void>;
}
