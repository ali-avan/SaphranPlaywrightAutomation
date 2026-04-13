import { expect, Page } from '@playwright/test';
import { waitForElement, waitForPageLoad } from '../utils/helper';

export class LoginLogPage {
  constructor(private page: Page) {}

  systemAdminMenu = () =>
    this.page.locator('#kt_app_header_menu').getByText('System Admin', { exact: true });
  loginLogLink = () => this.page.getByRole('link', { name: 'Login Log' });
  loginHistoryHeading = () => this.page.getByRole('heading', { name: 'Login History' });
  historyTable = () => this.page.locator('table').first();

  private async verifyNoVisibleApplicationErrors() {
    await expect(this.page.locator('body')).not.toContainText(
      /Server Error|Application Error|Runtime Error|Exception Details|HTTP Error/i
    );
  }

  async navigateToLoginLogPage() {
    await this.systemAdminMenu().click();
    await waitForElement(this.page, this.loginLogLink());
    await this.loginLogLink().click();
    await waitForPageLoad(this.page);
  }

  async verifyLoginLogPageLoaded() {
    await waitForElement(this.page, this.loginHistoryHeading());
    await expect(this.page).toHaveURL(/displaylogwithscroll/i);
    await expect(this.loginHistoryHeading()).toBeVisible();
    await expect(this.historyTable()).toBeVisible();
    await this.verifyNoVisibleApplicationErrors();
  }
}
