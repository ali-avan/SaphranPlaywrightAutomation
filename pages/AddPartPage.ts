import { expect, Locator, Page } from '@playwright/test';
import { waitForPageLoad } from '../utils/helper';

export type AddPartData = {
  projectNameNumber: string;
  partName: string;
  internalPartNumber: string;
  reasonForChange: string;
  accountManager: string;
  businessStatus: string;
  originatingPartNumber: string;
  customer: string;
  partProductionType: string;
  customerPartNumber: string;
  drawingNumber: string;
  drawingVersion: string;
  internalQuoteId: string;
};

export type AddPartVolumeData = {
  assignBy: string;
  viewBy: string;
  searchText: string;
  salesParent: string;
  programSelection: {
    programPlatform: string;
    plantName: string;
    partsPer: string;
    NamePlate: string;
  };
};

export type AddPartOurAttributesData = {
  sellingDivision: string;
  internalPlant: string;
};

export type AddPartUnitPriceContractDetailsData = {
  copyPrice: string;
};

export type AddPartClassificationInformationData = {
  techClassTier1: string;
  productClassTier1: string;
};

export let addPartOpportunityId = '';

function removeAllSpaces(value: string) {
  return value.replace(/\s+/g, '');
}

function formatActualValue(containerText: string, label: string) {
  return containerText
    .replace(label, '')
    .replace(/Required!/g, '')
    .replace(/\*/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

export class AddPartPage {
  constructor(private page: Page) {}

  partManagementMenu = () => this.page.getByText('Part Management');
  addPartLink = () => this.page.getByRole('link', { name: 'Add Part' });
  projectNameNumberInput = () =>
    this.page.locator('#ctl00_SaphranPage_project_nm_project_nm_TextBox');
  partNameInput = () =>  this.page.locator('#ctl00_SaphranPage_part_nm');
  internalPartNumberInput = () =>
    this.page.locator('#ctl00_SaphranPage_internal_part_number_internal_part_number_TextBox');
  reasonForChangeSelect = () =>
    this.page.locator('#ctl00_SaphranPage_quote_type');
  accountManagerInput = () =>
    this.page.locator('#ctl00_SaphranPage_configspec_3_configspec_3_TextBox');
  businessStatusSelect = () =>
    this.page.locator('#ctl00_SaphranPage_forecast_booked_status_id');
  originatingPartNumberValue = () =>
    this.page.locator('#ctl00_SaphranPage_original_int_part_nr');
  customerInput = () =>
    this.page.locator('#ctl00_SaphranPage_customer_customer_TextBox');
  partProductionTypeSelect = () =>
    this.page.locator('#ctl00_SaphranPage_production_id');
  customerPartNumberInput = () =>
    this.page.getByRole('textbox', { name: 'Customer Part Number *' });
  drawingNumberInput = () =>
    this.page.getByRole('textbox', { name: 'Drawing Number' });
  drawingVersionInput = () =>
    this.page.getByRole('textbox', { name: 'Drawing Version' });
  internalQuoteIdInput = () =>
    this.page.getByRole('textbox', { name: 'Internal Quote ID' });
  generalInformationSaveButton = () =>
    this.page.locator('[name="ctl00$SaphranPage$ctl202"]');
  generalInformationSectionTitle = () =>
    this.page.locator('#ctl00_SaphranPage_pnlSec2_Title');
  editVolumesButton = () =>
    this.page.getByRole('button', { name: 'Edit Volumes' });
  assignBySelect = () => this.page.getByLabel('Assign By:');
  viewBySelect = () => this.page.getByLabel('View By:');
  volumesSearchTextInput = () =>
    this.page.getByRole('textbox', { name: 'Search Text:' });
  salesParentList = () =>
    this.page.getByLabel('Sales Parent : Badge Nameplate');
  addSelectionButton = () =>
    this.page.getByRole('button', { name: 'Add Selection' });
  closeVolumesButton = () =>
    this.page.getByRole('button', { name: 'Close' });
  ourAttributesSection = () =>
    this.page.locator('#ctl00_SaphranPage_pnlSec3_Title')
  sellingDivisionSelect = () =>
    this.page.locator('#ctl00_SaphranPage_corpdivision');
  unitPriceContractDetailsSection = () =>
    this.page.locator('#ctl00_SaphranPage_pnlSec8_Title')
  copyPriceInput = () =>
    this.page.locator('#ctl00_SaphranPage_ucPriceEntryTable_txtCopyValue');
  selectRowCheckbox = () =>
    this.page.locator('#ctl00_SaphranPage_ucPriceEntryTable_lvPrices_ckCopyAll');
  classificationInformationSection = () =>
    this.page.locator('#ctl00_SaphranPage_pnlSec6_Title')
  techClassTier1Select = () =>
    this.page.locator('#ctl00_SaphranPage_ucTechnologyClass_techTier1_Select');
  productClassTier1Select = () =>
    this.page.locator('#ctl00_SaphranPage_ucProductClass_prodTier1_Select');
  updateFcButton = () =>
    this.page.locator('#ctl00_SaphranPage_btnNextWorkflow');
  opportunityIdValue = () =>
    this.page
      .locator('td', { hasText: 'Opportunity ID:' })
      .locator('xpath=following-sibling::td[1]');
  generalInformationField = (label: string) =>
    this.page.locator(
      `xpath=//div[@id="ctl00_SaphranPage_pnlSec2"]//*[normalize-space()="${label}"]/parent::*`
    );
  ourAttributesField = (label: string) =>
    this.page.locator(
      `xpath=//div[@id="ctl00_SaphranPage_pnlSec3"]//*[normalize-space()="${label}"]/parent::*`
    );
  classificationInformationField = (label: string) =>
    this.page.locator(
      `xpath=//div[@id="ctl00_SaphranPage_pnlSec6"]//*[normalize-space()="${label}"]/parent::*`
    );
  savedTechClassTier1Value = () =>
    this.page.locator('xpath=//div[@id="ctl00_SaphranPage_ucTechnologyClass_Tier1"]/span');
  savedProductClassTier1Value = () =>
    this.page.locator('xpath=//div[@id="ctl00_SaphranPage_ucProductClass_Tier1"]/span');
  savedProgramPlatformValue = () =>
    this.page.locator('#ctl00_SaphranPage_gvProgramInfo_ctl02_lblProgram');
  savedProgramNamePlateValue = () =>
    this.page.locator('#ctl00_SaphranPage_gvProgramInfo_ctl02_lblModel');
  savedProgramPlantNameValue = () =>
    this.page.locator('#ctl00_SaphranPage_gvProgramInfo_ctl02_lblPlant');

  async navigateToAddPartPage() {
    await this.partManagementMenu().click();
    await this.addPartLink().waitFor({ state: 'visible', timeout: 10000 });
    await this.addPartLink().click();
     await waitForPageLoad(this.page);
    await expect(this.partNameInput()).toBeVisible();
  }

  async selectAutocomplete(input: Locator, value: string) {
    await input.waitFor({ state: 'visible', timeout: 10000 });
    await input.click();
    await input.fill('');
    await input.type(value, { delay: 50 });
    await this.page.waitForTimeout(1000);
    await this.page.keyboard.press('ArrowDown');
    await this.page.keyboard.press('Enter');
    await this.page.waitForTimeout(1000);
  }

  async fillGeneralInformation(data: AddPartData) {
    await this.projectNameNumberInput().fill(data.projectNameNumber);
    await this.partNameInput().fill(data.partName);
    await this.internalPartNumberInput().fill(data.internalPartNumber);
    await this.reasonForChangeSelect().selectOption({ label: data.reasonForChange });
    // await this.selectAutocomplete(
    //   this.accountManagerInput(),
    //   data.accountManager
    // );
    await this.businessStatusSelect().selectOption({ label: data.businessStatus });

    await this.selectAutocomplete(this.customerInput(),data.customer);
    await this.partProductionTypeSelect().selectOption({label: data.partProductionType });
    await this.customerPartNumberInput().fill(data.customerPartNumber);
    await this.drawingNumberInput().fill(data.drawingNumber);
    await this.drawingVersionInput().fill(data.drawingVersion);
    await this.internalQuoteIdInput().fill(data.internalQuoteId);
    await this.page.waitForTimeout(6000);
  }

  async clickGeneralInformationSaveButton() {
    await this.generalInformationSaveButton().click();
    await waitForPageLoad(this.page);
    await this.page.waitForTimeout(2000);
  }

  async verifyUserLandsOnAddPartPageSuccessfully() {
    await expect(this.generalInformationSectionTitle()).toBeVisible();
  }

  async clickEditVolumesButton() {
    await this.editVolumesButton().click();
    await waitForPageLoad(this.page);
    addPartOpportunityId = (
      (await this.opportunityIdValue().textContent()) ?? ''
    ).trim();
    console.log(`Captured Opportunity ID: ${addPartOpportunityId}`);
    await this.page.waitForTimeout(2000);
  }

  async configureVolumesAssignment(data: AddPartVolumeData) {
    await this.assignBySelect().selectOption({ label: data.assignBy });
    await this.viewBySelect().selectOption({ label: data.viewBy });
    await this.volumesSearchTextInput().fill(data.searchText);
    await this.volumesSearchTextInput().press('Enter');
    await this.salesParentList().selectOption({ label: data.salesParent });
    await waitForPageLoad(this.page);
    await this.page.waitForTimeout(2000);
  }

  volumeProgramRow(programPlatform: string, plantName: string) {
    return this.page
      .getByRole('row')
      .filter({ hasText: programPlatform })
      .filter({ hasText: plantName })
      .last();
  }
  volumeProgramRowCheckbox = (programPlatform: string, plantName: string) =>
    this.volumeProgramRow(programPlatform, plantName).locator(
      'input[type="checkbox"]'
    );
  volumeProgramRowPartsPerInput = (programPlatform: string, plantName: string) =>
    this.volumeProgramRow(programPlatform, plantName).locator(
      'input[name$="$txtPartsPer"]'
    );

  async selectVolumeProgramAndFillPartsPer(data: AddPartVolumeData) {
    await this.volumeProgramRowCheckbox(
      data.programSelection.programPlatform,
      data.programSelection.plantName
    ).check();
    await this.volumeProgramRowPartsPerInput(
      data.programSelection.programPlatform,
      data.programSelection.plantName
    ).fill(data.programSelection.partsPer);
      await this.page.waitForTimeout(2000);
  }

  async clickAddSelectionButton() {
    await this.addSelectionButton().click();
    await waitForPageLoad(this.page);
    await this.page.waitForTimeout(2000);
  }

  async clickCloseVolumesButton() {
    await this.closeVolumesButton().click();
    await waitForPageLoad(this.page);
    await this.page.waitForTimeout(2000);
  }
  

  async selectSellingDivision(sellingDivision: string) {
    await this.ourAttributesSection().scrollIntoViewIfNeeded();
    await this.sellingDivisionSelect().selectOption({ label: sellingDivision });
  }

  async enterCopyPrice(copyPrice: string) {
    await this.unitPriceContractDetailsSection().scrollIntoViewIfNeeded();
    await this.copyPriceInput().fill(copyPrice);
    await this.page.waitForTimeout(2000);
  }

  async clickSelectRowCheckbox() {
    await this.unitPriceContractDetailsSection().scrollIntoViewIfNeeded();
    await this.selectRowCheckbox().check();
    await this.page.waitForTimeout(2000);
  }

  async selectClassificationInformation(
    data: AddPartClassificationInformationData
  ) {
    await this.classificationInformationSection().scrollIntoViewIfNeeded();
    await this.techClassTier1Select().selectOption({
      label: data.techClassTier1
    });
    await this.productClassTier1Select().selectOption({
      label: data.productClassTier1
    });
  }

  async clickUpdateFcButton() {
    await this.updateFcButton().scrollIntoViewIfNeeded();
    this.page.once('dialog', async (dialog) => {
      await dialog.accept();
    });
    await this.updateFcButton().click();
    await waitForPageLoad(this.page);
    await this.page.waitForTimeout(2000);
  }

  async verifyGeneralInformation(data: AddPartData) {
    await this.page.waitForTimeout(20000);
    const fields = [
      ['Part Name', data.partName],
      ['Internal Part Number', data.internalPartNumber],
      ['Reason For Change', data.reasonForChange],
      ['Customer', data.customer],
      ['Business Status', data.businessStatus],
      ['Part Production Type', data.partProductionType],
      ['Customer Part Number', data.customerPartNumber],
      ['Drawing Number', data.drawingNumber],
      ['Drawing Version', data.drawingVersion],
      ['Internal Quote ID', data.internalQuoteId]
    ] as const;

    for (const [label, expected] of fields) {
      const actualRaw = (
        (await this.generalInformationField(label).textContent()) ?? ''
      ).trim();
      const actual = formatActualValue(actualRaw, label);
      console.log(
        `expected: ${expected} | actual: ${actual}`
      );
      await expect(this.generalInformationField(label)).toContainText(expected);
    }
  }

  async verifyProgramAssignments(data: AddPartVolumeData) {
    const actualProgramPlatform = (
      (await this.savedProgramPlatformValue().textContent()) ?? ''
    ).trim();
    const actualNamePlate = (
      (await this.savedProgramNamePlateValue().textContent()) ?? ''
    ).trim();
    const actualPlantName = (
      (await this.savedProgramPlantNameValue().textContent()) ?? ''
    ).trim();

    console.log(
      `expected: ${data.programSelection.programPlatform} | actual: ${actualProgramPlatform}`
    );
    console.log(
      `expected: ${data.programSelection.NamePlate} | actual: ${actualNamePlate}`
    );
    console.log(
      `expected: ${data.programSelection.plantName} | actual: ${actualPlantName}`
    );

    expect(removeAllSpaces(actualProgramPlatform)).toBe(
      removeAllSpaces(data.programSelection.programPlatform)
    );
    expect(removeAllSpaces(actualNamePlate)).toBe(
      removeAllSpaces(data.programSelection.NamePlate)
    );
    expect(removeAllSpaces(actualPlantName)).toBe(
      removeAllSpaces(data.programSelection.plantName)
    );
  }

  async verifyOurAttributes(data: AddPartOurAttributesData) {
    const fields = [
      ['Selling Division', data.sellingDivision],
      ['Internal Plant', data.internalPlant]
    ] as const;

    for (const [label, expected] of fields) {
      const actualRaw = ((await this.ourAttributesField(label).textContent()) ?? '').trim();
      const actual = formatActualValue(actualRaw, label);
      console.log(
        `expected: ${expected} | actual: ${actual}`
      );
      await expect(this.ourAttributesField(label)).toContainText(expected);
    }
  }

  async verifyClassificationInformation(
    data: AddPartClassificationInformationData
  ) {
    const actualTechClassTier1 = (
      (await this.savedTechClassTier1Value().textContent()) ?? ''
    ).trim();
    const actualProductClassTier1 = (
      (await this.savedProductClassTier1Value().textContent()) ?? ''
    ).trim();

    console.log(
      `expected: ${data.techClassTier1} | actual: ${actualTechClassTier1}`
    );
    console.log(
      `expected: ${data.productClassTier1} | actual: ${actualProductClassTier1}`
    );

    await expect(this.savedTechClassTier1Value()).toContainText(
      data.techClassTier1
    );
    await expect(this.savedProductClassTier1Value()).toContainText(
      data.productClassTier1
    );
  }
}
