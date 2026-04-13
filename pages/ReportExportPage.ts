import { expect, Page } from '@playwright/test';
import { waitForElement, waitForPageLoad } from '../utils/helper';

export class ReportExportPage {
  constructor(private page: Page) {}

  reportingMenu = () =>
    this.page.locator('#kt_app_header_menu').getByText('Reporting', { exact: true });
  reportExportLink = () => this.page.getByRole('link', { name: 'Report Export' });
  exportedReportsHeading = () =>
    this.page.getByRole('heading', { name: 'Exported Reports' });
  reportInfoText = () =>
    this.page.getByText('Reports will display here for 3 days from date of export');

  private async verifyNoVisibleApplicationErrors() {
    await expect(this.page.locator('body')).not.toContainText(
      /Server Error|Application Error|Runtime Error|Exception Details|HTTP Error/i
    );
  }

  async navigateToReportExportPage() {
    await this.reportingMenu().click();
    await waitForElement(this.page, this.reportExportLink());
    await this.reportExportLink().click();
    await waitForPageLoad(this.page);
  }

  async verifyReportExportPageLoaded() {
    await waitForElement(this.page, this.exportedReportsHeading());
    await expect(this.page).toHaveTitle(/Exported Reports/i);
    await expect(this.exportedReportsHeading()).toBeVisible();
    await expect(this.reportInfoText()).toBeVisible();
    await this.verifyNoVisibleApplicationErrors();
  }
}
