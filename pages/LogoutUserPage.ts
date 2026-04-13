import { expect, Page } from '@playwright/test';
import { waitForElement, waitForPageLoad } from '../utils/helper';

export class LogoutUserPage {
  constructor(private page: Page) {}

  systemAdminMenu = () =>
    this.page.locator('#kt_app_header_menu').getByText('System Admin', { exact: true });
  logoutUserLink = () => this.page.getByRole('link', { name: 'Logout User' });
  logoutUserHeading = () => this.page.getByRole('heading', { name: 'Logout User' });
  logoutAllUsersButton = () => this.page.getByText('Logout All Users', { exact: true });

  private async verifyNoVisibleApplicationErrors() {
    await expect(this.page.locator('body')).not.toContainText(
      /Server Error|Application Error|Runtime Error|Exception Details|HTTP Error/i
    );
  }

  async navigateToLogoutUserPage() {
    await this.systemAdminMenu().click();
    await waitForElement(this.page, this.logoutUserLink());
    await this.logoutUserLink().click();
    await waitForPageLoad(this.page);
  }

  async verifyLogoutUserPageLoaded() {
    await waitForElement(this.page, this.logoutUserHeading());
    await expect(this.page).toHaveURL(/logoutuser/i);
    await expect(this.logoutUserHeading()).toBeVisible();
    await expect(this.logoutAllUsersButton()).toBeVisible();
    await this.verifyNoVisibleApplicationErrors();
  }
}
