import { expect, Page } from '@playwright/test';
import { waitForElement, waitForPageLoad } from '../utils/helper';

export class PartAttributesPage {
  constructor(private page: Page) {}

  systemAdminMenu = () =>
    this.page.locator('#kt_app_header_menu').getByText('System Admin', { exact: true });
  partAttributesLink = () => this.page.getByRole('link', { name: 'Part Attributes' });
  partAttributesHeading = () => this.page.getByRole('heading', { name: 'Part Attributes' });
  pageSectionsSection = () => this.page.getByText('Page Sections', { exact: true }).first();
  addNewButton = () => this.page.getByText('Add New', { exact: true });

  private async verifyNoVisibleApplicationErrors() {
    await expect(this.page.locator('body')).not.toContainText(
      /Server Error|Application Error|Runtime Error|Exception Details|HTTP Error/i
    );
  }

  async navigateToPartAttributesPage() {
    await this.systemAdminMenu().click();
    await waitForElement(this.page, this.partAttributesLink());
    await this.partAttributesLink().click();
    await waitForPageLoad(this.page);
  }

  async verifyPartAttributesPageLoaded() {
    await waitForElement(this.page, this.partAttributesHeading());
    await expect(this.page).toHaveURL(/SystemAttribute/i);
    await expect(this.partAttributesHeading()).toBeVisible();
    await expect(this.pageSectionsSection()).toBeVisible();
    await expect(this.addNewButton()).toBeVisible();
    await this.verifyNoVisibleApplicationErrors();
  }
}
