import { expect, Page } from '@playwright/test';
import { assertNoBrowserErrors, waitForElement, waitForPageLoad } from '../utils/helper';

export type PartSearchData = {
  customerName: string;
  expectedResultSection: string;
  expectedResultText: string;
};

export class PartSearchPage {
  constructor(private page: Page) {}

  partManagementMenu = () => this.page.getByText('Part Management', { exact: true });
  partSearchLink = () => this.page.getByRole('link', { name: 'Part Search' });
  partSearchHeading = () => this.page.getByRole('heading', { name: 'Part Search' });
  searchWithinSection = () =>
    this.page.locator('div').filter({
      has: this.page.getByRole('heading', { name: 'Search Within' })
    }).first();
  activeSearchWithinCheckbox = () =>
    this.searchWithinSection()
      .locator('tr')
      .filter({
        has: this.page.locator('label.form-label', { hasText: /^Active$/ })
      })
      .locator('input[type="checkbox"]');
  customerSearchHeading = () => this.page.getByRole('heading', { name: 'Customer Search' });
  customerDropdown = () =>
    this.page.locator(
      'select[data-bind*="CustomerOptionSelectedValue"][data-bind*="Customer()"]'
    );
  searchButton = () => this.page.getByRole('button', { name: 'Search', exact: true });
  partMasterHeading = () => this.page.getByRole('heading', { name: 'Part Master' });
  resultHeading = (heading: string) => this.page.getByRole('heading', { name: heading });
  resultsSectionHeading = (heading: string) =>
    this.page.getByRole('heading', { name: heading });
  resultsGrid = () => this.page.locator('table').filter({ has: this.page.getByRole('row') }).last();

  private async verifyNoVisibleApplicationErrors() {
    await expect(this.page.locator('body')).not.toContainText(
      /Server Error|Application Error|Runtime Error|Exception Details|HTTP Error/i
    );
    await assertNoBrowserErrors(this.page);
  }

  async navigateToPartSearchPage() {
    await this.partManagementMenu().click();
    await waitForElement(this.page, this.partSearchLink());
    await this.partSearchLink().click();
    await waitForPageLoad(this.page);
  }

  async verifyPartSearchPageLoaded() {
    await waitForElement(this.page, this.partSearchHeading());
    await expect(this.page).toHaveTitle(/Part Search/i);
    await expect(this.partSearchHeading()).toBeVisible();
    await this.verifyNoVisibleApplicationErrors();
  }

  async selectActiveSearchWithin() {
    await waitForElement(this.page, this.activeSearchWithinCheckbox());
    await this.activeSearchWithinCheckbox().check();
    await expect(this.activeSearchWithinCheckbox()).toBeChecked();
  }

  async selectCustomer(customerName: string) {
    await waitForElement(this.page, this.customerSearchHeading());
    await this.customerDropdown().selectOption({ label: customerName }, { force: true });
    await expect(this.customerDropdown()).toHaveValue(/.+/);
  }

  async clickSearchButton() {
    await waitForElement(this.page, this.searchButton());
    await this.searchButton().click();
    await waitForPageLoad(this.page);
  }

  async verifySearchResultsLoaded(data: PartSearchData) {
    await waitForElement(this.page, this.partMasterHeading());
    await waitForElement(this.page, this.resultsSectionHeading(data.expectedResultSection));
    await expect(this.partMasterHeading()).toBeVisible();
    await expect(this.resultsSectionHeading(data.expectedResultSection)).toBeVisible();
    await expect(this.resultsGrid()).toContainText(data.expectedResultText);
    await this.verifyNoVisibleApplicationErrors();
  }
}
