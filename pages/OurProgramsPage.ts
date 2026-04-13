import { expect, Page } from '@playwright/test';
import { assertNoBrowserErrors, waitForElement, waitForPageLoad } from '../utils/helper';

export class OurProgramsPage {
  constructor(private page: Page) {}

  forecastMenu = () => this.page.getByText('Forecast', { exact: true });
  ourProgramsLink = () => this.page.getByRole('link', { name: 'Our Programs' });
  ourProgramsHeading = () => this.page.getByRole('heading', { name: 'Our Programs' });
  industriesButton = () => this.page.getByRole('button', { name: /Industries/i });
  attributesButton = () => this.page.getByRole('button', { name: /Attributes/i });
  addNewButton = () => this.page.getByRole('button', { name: /Add New/i });
  ourProgramAttributesLabel = () => this.page.getByText('Our Program Attributes', { exact: true });
  programDetailHeading = () => this.page.getByRole('heading', { name: 'Program Detail' });
  dataManagementBreadcrumb = () => this.page.getByRole('link', { name: 'Data Management' });

  private async verifyNoVisibleApplicationErrors() {
    await expect(this.page.locator('body')).not.toContainText(
      /Server Error|Application Error|Runtime Error|Exception Details|HTTP Error/i
    );
    await assertNoBrowserErrors(this.page);
  }

  async navigateToOurProgramsPage() {
    await this.forecastMenu().click();
    await waitForElement(this.page, this.ourProgramsLink());
    await this.ourProgramsLink().click();
    await waitForPageLoad(this.page);
  }

  async verifyOurProgramsPageLoaded() {
    await waitForElement(this.page, this.ourProgramsHeading());
    await expect(this.page).toHaveTitle(/Our Programs/i);
    await expect(this.ourProgramsHeading()).toBeVisible();
    await this.verifyNoVisibleApplicationErrors();
  }

  async clickIndustriesButton() {
    await waitForElement(this.page, this.industriesButton());
    await this.industriesButton().click();
    await waitForPageLoad(this.page);
  }

  async verifyIndustriesPageLoaded() {
    await waitForElement(this.page, this.dataManagementBreadcrumb());
    await expect(this.page).toHaveURL(/ID=Industry/i);
    await expect(this.dataManagementBreadcrumb()).toBeVisible();
    await this.verifyNoVisibleApplicationErrors();
  }

  async clickAttributesButton() {
    await waitForElement(this.page, this.attributesButton());
    await this.attributesButton().click();
    await waitForPageLoad(this.page);
  }

  async verifyAttributesPageLoaded() {
    await waitForElement(this.page, this.ourProgramAttributesLabel());
    await expect(this.page).toHaveURL(/OurProgramAttributes/i);
    await expect(this.ourProgramAttributesLabel()).toBeVisible();
    await this.verifyNoVisibleApplicationErrors();
  }

  async clickAddNewButton() {
    await waitForElement(this.page, this.addNewButton());
    await this.addNewButton().click();
    await waitForPageLoad(this.page);
  }

  async verifyProgramDetailPageLoaded() {
    await waitForElement(this.page, this.programDetailHeading());
    await expect(this.page).toHaveTitle(/Program Detail/i);
    await expect(this.programDetailHeading()).toBeVisible();
    await this.verifyNoVisibleApplicationErrors();
  }
}
