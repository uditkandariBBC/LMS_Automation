const popupRoot = `//div[@id='ManufacturerEditModal']`;
const manufacturerPopup = `//div[@id="ManufacturerListModal"]`;

export const ManufacturerPopupLocator = {
  closeManufacturerPopup: `${manufacturerPopup}//button[@id="ManufacturerListCancel"]`,
  loadingSpinner: `${popupRoot}//`,
  addManufacturer: `${manufacturerPopup}//a[contains(text(),'Add')]`,
  history: `${manufacturerPopup}//a[contains(text(),'History')]`,
  editManufacturer: `${manufacturerPopup}//`,
  deleteManufacturer: `${manufacturerPopup}//`,
  searchManufacturer: `${manufacturerPopup}//label[contains(text(),'Search')]//input`,
  contractNo: `${popupRoot}//h4[text() = 'Contract Number MD00085']`,
  manufacturerDropdown: `${popupRoot}//a[@class="select2-choice"]`,
  manufacturerDropdownSearch: `//input[@id="s2id_autogen2_search"]`,
  manufacturerDropdownResult: `(//div[@role='option'])[1]`,
  manufacturerSelected: `${popupRoot}//a[@class="select2-choice"]//span`,
  status: `${popupRoot}//label[@class="mfgStatusTypeName"]`,
  maReceived: `${popupRoot}//input[@id="MAReceived"]`,
  maReceivedDate: `${popupRoot}//input[@id="MAReceivedDate"]`,
  notesTextbox: `${popupRoot}//textarea[@id="Notes"]`,
  saveButton: `${popupRoot}//button[@id="ManufacturerEditSave"]`,
  cancelButton: `${popupRoot}//button[@id="ManufacturerEditCancel"]`,
  selectedManufacturerNameListLocator: `//table[@id="ManufacturerListTable"]//tbody//tr//td[1]`,
};
