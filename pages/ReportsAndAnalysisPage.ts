import { expect, Page } from '@playwright/test';
import { waitForElement, waitForPageLoad } from '../utils/helper';

export class ReportsAndAnalysisPage {
  constructor(private page: Page) {}

  reportingMenu = () =>
    this.page.locator('#kt_app_header_menu').getByText('Reporting', { exact: true });
  reportsAndAnalysisLink = () =>
    this.page.getByRole('link', { name: 'Reports & Analysis' });
  reportsAndAnalysisHeading = () =>
    this.page.getByRole('heading', { name: 'Reports and Analysis' });
  newQueryLink = () => this.page.getByRole('link', { name: 'New Query' });
  filtersHeading = () => this.page.getByRole('heading', { name: 'Filters' });

  private async verifyNoVisibleApplicationErrors() {
    await expect(this.page.locator('body')).not.toContainText(
      /Server Error|Application Error|Runtime Error|Exception Details|HTTP Error/i
    );
  }

  async navigateToReportsAndAnalysisPage() {
    await this.reportingMenu().click();
    await waitForElement(this.page, this.reportsAndAnalysisLink());
    await this.reportsAndAnalysisLink().click();
    await waitForPageLoad(this.page);
  }

  async verifyReportsAndAnalysisPageLoaded() {
    await waitForElement(this.page, this.reportsAndAnalysisHeading());
    await expect(this.page).toHaveTitle(/Report Wizard/i);
    await expect(this.reportsAndAnalysisHeading()).toBeVisible();
    await this.verifyNoVisibleApplicationErrors();
  }

  async clickNewQuery() {
    await waitForElement(this.page, this.newQueryLink());
    await this.newQueryLink().click();
    await waitForPageLoad(this.page);
  }

  async verifyNewQueryLoaded() {
    await waitForElement(this.page, this.reportsAndAnalysisHeading());
    await waitForElement(this.page, this.filtersHeading());
    await expect(this.page).toHaveURL(/RptAnalysis/i);
    await expect(this.reportsAndAnalysisHeading()).toBeVisible();
    await expect(this.filtersHeading()).toBeVisible();
    await this.verifyNoVisibleApplicationErrors();
  }
}
