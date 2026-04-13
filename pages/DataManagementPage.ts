import { expect, Page } from '@playwright/test';
import { env, waitForElement, waitForPageLoad } from '../utils/helper';

const DATA_ELEMENT_NAMES = [
  'Industry (for Our Programs)',
  'Assembly Plant (for Our Programs)',
  'Manufacturer (for Our Programs)',
  'Model Name (for Our Programs)',
  'Platform Code (for Our Programs)',
  'Program Code (for Our Programs)',
  'Component Name',
  'Application',
  'Commercial Group',
  'Competitor',
  'Manufacturing Plants',
  'Market Analysis',
  'Product',
  'Reason for Loss',
  'Unit of Measure',
  'Vendor'
] as const;

export class DataManagementPage {
  constructor(private page: Page) {}

  systemAdminMenu = () =>
    this.page.locator('#kt_app_header_menu').getByText('System Admin', { exact: true });
  dataManagementLink = () => this.page.getByRole('link', { name: 'Data Management' });
  dataManagementHeading = () => this.page.getByRole('heading', { name: 'Data Management' });
  dataManagementSearch = () => this.page.getByRole('textbox', { name: 'Search' });
  searchInputOnDataViewPage = () => this.page.getByRole('textbox', { name: 'Search' });
  dataElementLink = (name: string) => this.page.getByRole('link', { name, exact: true });

  private async verifyNoVisibleApplicationErrors() {
    await expect(this.page.locator('body')).not.toContainText(
      /Server Error|Application Error|Runtime Error|Exception Details|HTTP Error/i
    );
  }

  private async waitForLightPageLoad() {
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForLoadState('load');
  }

  async navigateToDataManagementPage() {
    await this.systemAdminMenu().click();
    await waitForElement(this.page, this.dataManagementLink());
    await this.dataManagementLink().click();
    await waitForPageLoad(this.page);
  }

  async verifyDataManagementPageLoaded() {
    await waitForElement(this.page, this.dataManagementHeading());
    await expect(this.page).toHaveTitle(/Data Management/i);
    await expect(this.dataManagementHeading()).toBeVisible();
    await expect(this.dataManagementSearch()).toBeVisible();
    await this.verifyNoVisibleApplicationErrors();
  }

  async openAndVerifyAllDataElementPages() {
    for (const name of DATA_ELEMENT_NAMES) {
      await this.page.goto(`${env.baseUrl!}/mvc/NewDataManagement`, {
        waitUntil: 'domcontentloaded',
        timeout: 60_000
      });
      await this.waitForLightPageLoad();
      await waitForElement(this.page, this.dataElementLink(name));
      await this.dataElementLink(name).click();
      await this.waitForLightPageLoad();

      await waitForElement(this.page, this.searchInputOnDataViewPage());
      await expect(this.page).toHaveURL(/DataView/i);
      await expect(this.searchInputOnDataViewPage()).toBeVisible();
      await this.verifyNoVisibleApplicationErrors();
    }
  }
}
