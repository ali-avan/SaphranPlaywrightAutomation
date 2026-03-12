import { expect, Page } from '@playwright/test';
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

export class AddPartPage {
  constructor(private page: Page) {}

  partManagementMenu = () => this.page.getByText('Part Management');
  addPartLink = () => this.page.getByRole('link', { name: 'Add Part' });
  projectNameNumberInput = () =>
    this.page.locator('#ctl00_SaphranPage_project_nm_project_nm_TextBox');
  partNameInput = () => this.page.getByRole('textbox', { name: 'Part Name *' });
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

  async navigateToAddPartPage() {
    await this.partManagementMenu().click();
    await this.addPartLink().waitFor({ state: 'visible', timeout: 10000 });
    await this.addPartLink().click();
    // await waitForPageLoad(this.page);
    await expect(this.partNameInput()).toBeVisible();
  }

  async selectAutocomplete(inputSelector: string, value: string) {
    const input = this.page.locator(inputSelector);
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
    await this.selectAutocomplete(
      '#ctl00_SaphranPage_configspec_3_configspec_3_TextBox',
      data.accountManager
    );
    await this.businessStatusSelect().selectOption({ label: data.businessStatus });

    await this.selectAutocomplete(
      '#ctl00_SaphranPage_customer_customer_TextBox',
      data.customer
    );
    await this.partProductionTypeSelect().selectOption({
      label: data.partProductionType
    });
    await this.customerPartNumberInput().fill(data.customerPartNumber);
    await this.drawingNumberInput().fill(data.drawingNumber);
    await this.drawingVersionInput().fill(data.drawingVersion);
    await this.internalQuoteIdInput().fill(data.internalQuoteId);
  }

  async verifyGeneralInformation(data: AddPartData) {
    await expect(this.projectNameNumberInput()).toHaveValue(data.projectNameNumber);
    await expect(this.partNameInput()).toHaveValue(data.partName);
    await expect(this.internalPartNumberInput()).toHaveValue(data.internalPartNumber);
    await expect(this.reasonForChangeSelect()).toHaveValue('1');
    await expect(this.accountManagerInput()).toHaveValue(data.accountManager);
    await expect(this.businessStatusSelect()).toHaveValue('1');
    await expect(this.customerInput()).toHaveValue(data.customer);
    await expect(this.partProductionTypeSelect()).toHaveValue('1');
    await expect(this.customerPartNumberInput()).toHaveValue(
      data.customerPartNumber
    );
    await expect(this.drawingNumberInput()).toHaveValue(data.drawingNumber);
    await expect(this.drawingVersionInput()).toHaveValue(data.drawingVersion);
    await expect(this.internalQuoteIdInput()).toHaveValue(data.internalQuoteId);
  }
}
