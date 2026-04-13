import { expect, Page } from '@playwright/test';
import { assertNoBrowserErrors, waitForElement, waitForPageLoad } from '../utils/helper';

export class ForecastManagementPage {
  constructor(private page: Page) {}

  forecastMenu = () => this.page.getByText('Forecast', { exact: true });
  forecastManagementLink = () =>
    this.page.getByRole('link', { name: 'Forecast Management' });
  forecastManagementHeading = () =>
    this.page.getByRole('heading', { name: 'Forecast Management' });
  originalSectionHeading = () =>
    this.page.getByRole('heading', { name: 'Original' });
  originalIhsVehicleLink = () =>
    this.page.locator('a[href*="ForecastMgt?fsource=2"]').first();
  forecastDetailBreadcrumb = () =>
    this.page.locator('li').filter({ hasText: /^Forecast Detail$/ });
  detailsButton = () => this.page.getByText('Details', { exact: true });
  viewForecastBreadcrumb = () =>
    this.page.locator('li').filter({ hasText: /^View Forecast$/ });
  filterButton = () => this.page.getByRole('button', { name: 'Filter' });
  reportsAndAnalysisHeading = () =>
    this.page.getByRole('heading', { name: 'Reports and Analysis' });

  private async verifyNoVisibleApplicationErrors() {
    await expect(this.page.locator('body')).not.toContainText(
      /Server Error|Application Error|Runtime Error|Exception Details|HTTP Error/i
    );
    await assertNoBrowserErrors(this.page);
  }

  async navigateToForecastManagementPage() {
    await this.forecastMenu().click();
    await waitForElement(this.page, this.forecastManagementLink());
    await this.forecastManagementLink().click();
    await waitForPageLoad(this.page);
  }

  async verifyForecastManagementPageLoaded() {
    await waitForElement(this.page, this.forecastManagementHeading());
    await expect(this.page).toHaveTitle(/Forecast Management/i);
    await expect(this.forecastManagementHeading()).toBeVisible();
    await this.verifyNoVisibleApplicationErrors();
  }

  async openOriginalIhsVehicleForecast() {
    await waitForElement(this.page, this.originalSectionHeading());
    await waitForElement(this.page, this.originalIhsVehicleLink());
    await this.originalIhsVehicleLink().click();
    await waitForPageLoad(this.page);
  }

  async verifyForecastDetailPageLoaded() {
    await waitForElement(this.page, this.forecastDetailBreadcrumb());
    await expect(this.page).toHaveTitle(/Forecast Detail/i);
    await expect(this.forecastDetailBreadcrumb()).toBeVisible();
    await this.verifyNoVisibleApplicationErrors();
  }

  async clickDetailsButton() {
    await waitForElement(this.page, this.detailsButton());
    await this.detailsButton().click();
    await waitForPageLoad(this.page);
  }

  async verifyViewForecastPageLoaded() {
    await waitForElement(this.page, this.viewForecastBreadcrumb());
    await expect(this.page).toHaveTitle(/View Forecast/i);
    await expect(this.viewForecastBreadcrumb()).toBeVisible();
    await this.verifyNoVisibleApplicationErrors();
  }

  async clickFilterButton() {
    await waitForElement(this.page, this.filterButton());
    await this.filterButton().click();
    await waitForPageLoad(this.page);
  }

  async verifyReportsAndAnalysisPageLoaded() {
    await waitForElement(this.page, this.reportsAndAnalysisHeading());
    await expect(this.page).toHaveTitle(/Report Wizard/i);
    await expect(this.reportsAndAnalysisHeading()).toBeVisible();
    await this.verifyNoVisibleApplicationErrors();
  }
}
