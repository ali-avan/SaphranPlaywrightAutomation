import { expect, Page } from '@playwright/test';
import { env, waitForElement, waitForPageLoad } from '../utils/helper';

export class CustomerAdminPage {
  constructor(private page: Page) {}

  systemAdminMenu = () =>
    this.page.locator('#kt_app_header_menu').getByText('System Admin', { exact: true });
  customerAdminLink = () => this.page.getByRole('link', { name: 'Customer Admin' });
  customerAdminHeading = () => this.page.getByRole('heading', { name: 'Customer Admin' }).first();
  firstCustomerLink = () => this.page.locator('table tbody a').first();
  newCustomerLink = () => this.page.getByRole('link', { name: 'New Customer' });
  detailBreadcrumb = () => this.page.locator('li').filter({ hasText: /^Detail$/ }).first();
  generalInformationTab = () => this.page.getByRole('link', { name: 'General Information' });
  customerNameInput = () => this.page.locator('input').nth(2);

  private async verifyNoVisibleApplicationErrors() {
    await expect(this.page.locator('body')).not.toContainText(
      /Server Error|Application Error|Runtime Error|Exception Details|HTTP Error/i
    );
  }

  async navigateToCustomerAdminPage() {
    await this.systemAdminMenu().click();
    await waitForElement(this.page, this.customerAdminLink());
    await this.customerAdminLink().click();
    await waitForPageLoad(this.page);
  }

  async verifyCustomerAdminPageLoaded() {
    await waitForElement(this.page, this.customerAdminHeading());
    await expect(this.page).toHaveURL(/CustomerAdmin\/CustomerAdmin/i);
    await expect(this.customerAdminHeading()).toBeVisible();
    await this.verifyNoVisibleApplicationErrors();
  }

  async openExistingCustomerRecord() {
    await waitForElement(this.page, this.firstCustomerLink());
    await this.firstCustomerLink().click();
    await waitForPageLoad(this.page);
  }

  async verifyCustomerDetailPageLoaded() {
    await waitForElement(this.page, this.detailBreadcrumb());
    await waitForElement(this.page, this.generalInformationTab());
    await waitForElement(this.page, this.customerNameInput());
    await expect(this.page).toHaveURL(/NewCustomerEntryGeneral/i);
    await expect(this.detailBreadcrumb()).toBeVisible();
    await expect(this.generalInformationTab()).toBeVisible();
    await expect(this.customerNameInput()).toBeVisible();
    await this.verifyNoVisibleApplicationErrors();
  }

  async returnToCustomerAdminPage() {
    await this.page.goto(`${env.baseUrl!}/MVC/CustomerAdmin/CustomerAdmin`, {
      waitUntil: 'domcontentloaded',
      timeout: 60_000
    });
    await waitForPageLoad(this.page);
  }

  async clickNewCustomer() {
    await waitForElement(this.page, this.newCustomerLink());
    await this.newCustomerLink().click();
    await waitForPageLoad(this.page);
  }
}
