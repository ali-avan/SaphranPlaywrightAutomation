import { expect, Page } from '@playwright/test';
import { waitForElement, waitForPageLoad } from '../utils/helper';

export class ReportManagementPage {
  constructor(private page: Page) {}

  reportingMenu = () =>
    this.page.locator('#kt_app_header_menu').getByText('Reporting', { exact: true });
  reportManagementLink = () =>
    this.page.getByRole('link', { name: 'Report Management' });
  reportManagementHeading = () =>
    this.page.getByRole('heading', { name: 'Report Management' });
  selectButton = () => this.page.getByRole('button', { name: 'Select' });

  private async verifyNoVisibleApplicationErrors() {
    await expect(this.page.locator('body')).not.toContainText(
      /Server Error|Application Error|Runtime Error|Exception Details|HTTP Error/i
    );
  }

  async navigateToReportManagementPage() {
    await this.reportingMenu().click();
    await waitForElement(this.page, this.reportManagementLink());
    await this.reportManagementLink().click();
    await waitForPageLoad(this.page);
  }

  async verifyReportManagementPageLoaded() {
    await waitForElement(this.page, this.reportManagementHeading());
    await expect(this.page).toHaveTitle(/Report Management/i);
    await expect(this.reportManagementHeading()).toBeVisible();
    await expect(this.selectButton()).toBeVisible();
    await this.verifyNoVisibleApplicationErrors();
  }
}
