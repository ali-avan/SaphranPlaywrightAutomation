import { expect, Page } from '@playwright/test';
import { assertNoBrowserErrors, waitForElement, waitForPageLoad } from '../utils/helper';

export class CapitalAssetsPage {
  constructor(private page: Page) {}

  systemAdminMenu = () =>
    this.page.locator('#kt_app_header_menu').getByText('System Admin', { exact: true });
  capitalAssetsLink = () => this.page.getByRole('link', { name: 'Capital Assets' });
  capitalAssetManagementHeading = () =>
    this.page.getByRole('heading', { name: 'CAPITAL ASSET MANAGEMENT' });
  addNewMachineButton = () => this.page.getByRole('button', { name: 'Add New Machine' });
  manageMachineHeading = () => this.page.getByRole('heading', { name: 'Manage Machine' });

  private async verifyNoVisibleApplicationErrors() {
    await expect(this.page.locator('body')).not.toContainText(
      /Server Error|Application Error|Runtime Error|Exception Details|HTTP Error/i
    );
    await assertNoBrowserErrors(this.page);
  }

  async navigateToCapitalAssetsPage() {
    await this.systemAdminMenu().click();
    await waitForElement(this.page, this.capitalAssetsLink());
    await this.capitalAssetsLink().click();
    await waitForPageLoad(this.page);
  }

  async verifyCapitalAssetsPageLoaded() {
    await waitForElement(this.page, this.capitalAssetManagementHeading());
    await expect(this.page).toHaveTitle(/Capital Asset/i);
    await expect(this.capitalAssetManagementHeading()).toBeVisible();
    await expect(this.addNewMachineButton()).toBeVisible();
    await this.verifyNoVisibleApplicationErrors();
  }

  async clickAddNewMachine() {
    await waitForElement(this.page, this.addNewMachineButton());
    await this.addNewMachineButton().click();
    await waitForPageLoad(this.page);
  }

  async verifyMachineDetailPageLoaded() {
    await waitForElement(this.page, this.manageMachineHeading());
    await expect(this.page).toHaveURL(/MachineDetail/i);
    await expect(this.manageMachineHeading()).toBeVisible();
    await this.verifyNoVisibleApplicationErrors();
  }
}
