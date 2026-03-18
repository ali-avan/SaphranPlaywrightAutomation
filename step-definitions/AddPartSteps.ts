import { Then, When } from '@cucumber/cucumber';
import fs from 'fs';
import path from 'path';
import {
  AddPartClassificationInformationData,
  AddPartData,
  AddPartOurAttributesData,
  AddPartPage,
  AddPartUnitPriceContractDetailsData,
  AddPartVolumeData
} from '../pages/AddPartPage';

let addPartPage: AddPartPage;

function getAddPartPage(page: any): AddPartPage {
  return addPartPage ?? (addPartPage = new AddPartPage(page));
}

const addPartTestData = JSON.parse(
  fs.readFileSync(
    path.join(__dirname, '../test-data/AddPart.json'),
    'utf-8'
  )
) as AddPartData & {
  volumesAssignment: AddPartVolumeData;
  ourAttributes: AddPartOurAttributesData;
  unitPriceContractDetails: AddPartUnitPriceContractDetailsData;
  classificationInformation: AddPartClassificationInformationData;
};

const addPartData = addPartTestData as AddPartData;
const addPartVolumeData = addPartTestData.volumesAssignment;
const addPartOurAttributesData =
  addPartTestData.ourAttributes as AddPartOurAttributesData;
const addPartUnitPriceContractDetailsData =
  addPartTestData.unitPriceContractDetails as AddPartUnitPriceContractDetailsData;
const addPartClassificationInformationData =
  addPartTestData.classificationInformation as AddPartClassificationInformationData;

When('User navigates to the Add Part page', async function () {
  addPartPage = new AddPartPage(this.page);
  await addPartPage.navigateToAddPartPage();
});

When('User fills the General Information section for Add Part', async function () {
  addPartPage = getAddPartPage(this.page);
  await addPartPage.fillGeneralInformation(addPartData);
});

When('User clicks the General Information Save button', async function () {
  addPartPage = getAddPartPage(this.page);
  await addPartPage.clickGeneralInformationSaveButton();
});

When('User clicks the Edit Volumes button', async function () {
  addPartPage = getAddPartPage(this.page);
  await addPartPage.clickEditVolumesButton();
});

When('User configures the Volumes assignment filters', async function () {
  addPartPage = getAddPartPage(this.page);
  await addPartPage.configureVolumesAssignment(addPartVolumeData);
});

When('User selects the volume program row and enters Parts Per value', async function () {
  addPartPage = getAddPartPage(this.page);
  await addPartPage.selectVolumeProgramAndFillPartsPer(addPartVolumeData);
});

When('User clicks the Add Selection button', async function () {
  addPartPage = getAddPartPage(this.page);
  await addPartPage.clickAddSelectionButton();
});

When('User clicks the Close button for Volumes section', async function () {
  addPartPage = getAddPartPage(this.page);
  await addPartPage.clickCloseVolumesButton();
});

When('User selects Selling Division in Our Attributes section', async function () {
  addPartPage = getAddPartPage(this.page);
  await addPartPage.selectSellingDivision(addPartOurAttributesData.sellingDivision);
});

When('User enters Copy Price in Unit Price Contract Details section', async function () {
  addPartPage = getAddPartPage(this.page);
  await addPartPage.enterCopyPrice(addPartUnitPriceContractDetailsData.copyPrice);
});

When('User clicks the Select Row checkbox in Unit Price Contract Details section', async function () {
  addPartPage = getAddPartPage(this.page);
  await addPartPage.clickSelectRowCheckbox();
});

When('User selects Tech Class Tier 1 and Product Class Tier 1 in Classification Information section', async function () {
  addPartPage = getAddPartPage(this.page);
  await addPartPage.selectClassificationInformation(
    addPartClassificationInformationData
  );
});

When('User clicks the Update FC button', async function () {
  addPartPage = getAddPartPage(this.page);
  await addPartPage.clickUpdateFcButton();
});

Then('Add Part General Information should contain the entered values', async function () {
  addPartPage = getAddPartPage(this.page);
  await addPartPage.verifyGeneralInformation(addPartData);
});

Then('Add Part Program Assignments should contain the entered values', async function () {
  addPartPage = getAddPartPage(this.page);
  await addPartPage.verifyProgramAssignments(addPartVolumeData);
});

Then('Add Part Our Attributes should contain the entered values', async function () {
  addPartPage = getAddPartPage(this.page);
  await addPartPage.verifyOurAttributes(addPartOurAttributesData);
});

Then('Add Part Classification Information should contain the entered values', async function () {
  addPartPage = getAddPartPage(this.page);
  await addPartPage.verifyClassificationInformation(
    addPartClassificationInformationData
  );
});
