import { expect, Page } from '@playwright/test';
import { waitForElement, waitForPageLoad } from '../utils/helper';

export class OfficeToolsTrustPage {
  constructor(private page: Page) {}

  systemAdminMenu = () =>
    this.page.locator('#kt_app_header_menu').getByText('System Admin', { exact: true });
  officeToolsTrustLink = () => this.page.getByRole('link', { name: 'Office Tools Trust' });
  officeToolsTrustHeading = () =>
    this.page.getByRole('heading', { name: 'Office Tools Trust' });
  configureLink = () => this.page.getByRole('link', { name: 'Configure' });

  private async verifyNoVisibleApplicationErrors() {
    await expect(this.page.locator('body')).not.toContainText(
      /Server Error|Application Error|Runtime Error|Exception Details|HTTP Error/i
    );
  }

  async navigateToOfficeToolsTrustPage() {
    await this.systemAdminMenu().click();
    await waitForElement(this.page, this.officeToolsTrustLink());
    await this.officeToolsTrustLink().click();
    await waitForPageLoad(this.page);
  }

  async verifyOfficeToolsTrustPageLoaded() {
    await waitForElement(this.page, this.officeToolsTrustHeading());
    await expect(this.page).toHaveURL(/OfficeToolsTrust/i);
    await expect(this.officeToolsTrustHeading()).toBeVisible();
    await expect(this.configureLink()).toBeVisible();
    await this.verifyNoVisibleApplicationErrors();
  }
}
