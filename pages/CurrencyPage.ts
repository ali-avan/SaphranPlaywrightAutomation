import { expect, Page } from '@playwright/test';
import { assertNoBrowserErrors, waitForElement, waitForPageLoad } from '../utils/helper';

export class CurrencyPage {
  constructor(private page: Page) {}

  systemAdminMenu = () =>
    this.page.locator('#kt_app_header_menu').getByText('System Admin', { exact: true });
  currencyLink = () => this.page.getByRole('link', { name: 'Currency' });
  currencyHeading = () => this.page.getByRole('heading', { name: 'Currency' });
  saveMatrixButton = () => this.page.getByRole('button', { name: 'SAVE MATRIX' });

  private async verifyNoVisibleApplicationErrors() {
    await expect(this.page.locator('body')).not.toContainText(
      /Server Error|Application Error|Runtime Error|Exception Details|HTTP Error/i
    );
    await assertNoBrowserErrors(this.page);
  }

  async navigateToCurrencyPage() {
    await this.systemAdminMenu().click();
    await waitForElement(this.page, this.currencyLink());
    await this.currencyLink().click();
    await waitForPageLoad(this.page);
  }

  async verifyCurrencyPageLoaded() {
    await waitForElement(this.page, this.currencyHeading());
    await expect(this.page).toHaveTitle(/Currency Admin/i);
    await expect(this.currencyHeading()).toBeVisible();
    await expect(this.saveMatrixButton()).toBeVisible();
    await this.verifyNoVisibleApplicationErrors();
  }
}
