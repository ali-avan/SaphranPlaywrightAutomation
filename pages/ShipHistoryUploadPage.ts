import { expect, Page } from '@playwright/test';
import { waitForElement, waitForPageLoad } from '../utils/helper';

export class ShipHistoryUploadPage {
  constructor(private page: Page) {}

  systemAdminMenu = () =>
    this.page.locator('#kt_app_header_menu').getByText('System Admin', { exact: true });
  shipHistoryUploadLink = () => this.page.getByRole('link', { name: 'Ship History Upload' });
  shipHistoryUploadHeading = () => this.page.getByRole('heading', { name: 'Ship History Upload' });
  sourceDataStatusHeading = () => this.page.getByRole('heading', { name: 'Source Data Status' });
  inProcessAlignmentJobsHeading = () =>
    this.page.getByRole('heading', { name: 'In-Process Alignment Jobs' });
  firstProcessButton = () =>
    this.page
      .locator('table')
      .nth(1)
      .locator('tbody tr')
      .first()
      .getByRole('button', { name: 'Process' });
  aliasCheckLink = () => this.page.getByRole('link', { name: 'Alias Check' });
  suggestionsLink = () => this.page.getByRole('link', { name: 'Suggestions' });
  aliasManagementHeading = () => this.page.getByRole('heading', { name: 'Alias Management' });
  alignmentSuggestionsHeading = () =>
    this.page.getByRole('heading', { name: 'Alignment Suggestions', exact: true });

  private async verifyNoVisibleApplicationErrors() {
    await expect(this.page.locator('body')).not.toContainText(
      /Server Error|Application Error|Runtime Error|Exception Details|HTTP Error/i
    );
  }

  async navigateToShipHistoryUploadPage() {
    await this.systemAdminMenu().click();
    await waitForElement(this.page, this.shipHistoryUploadLink());
    await this.shipHistoryUploadLink().click();
    await waitForPageLoad(this.page);
  }

  async verifyShipHistoryUploadPageLoaded() {
    await waitForElement(this.page, this.shipHistoryUploadHeading());
    await expect(this.page).toHaveURL(/shiphistory\/shiphistory/i);
    await expect(this.shipHistoryUploadHeading()).toBeVisible();
    await expect(this.sourceDataStatusHeading()).toBeVisible();
    await expect(this.inProcessAlignmentJobsHeading()).toBeVisible();
    await this.verifyNoVisibleApplicationErrors();
  }

  async openFirstInProcessAlignmentJob() {
    await waitForElement(this.page, this.firstProcessButton());
    await this.firstProcessButton().click();
    await waitForPageLoad(this.page);
  }

  async verifyInProcessAlignmentPageLoaded() {
    await expect(this.page).toHaveURL(/Shiphistory\/Inprocess\?alignment_id=/i);
    await expect(this.page.getByText('Ship History In-Process Alignment Job', { exact: true })).toBeVisible();
    await expect(this.page.getByRole('heading', { name: 'Job Information' })).toBeVisible();
    await expect(this.page.getByRole('heading', { name: 'Unique Part Number Alignment' })).toBeVisible();
    await this.verifyNoVisibleApplicationErrors();
  }

  async openAliasCheckPage() {
    await waitForElement(this.page, this.aliasCheckLink());
    await this.aliasCheckLink().click();
    await waitForPageLoad(this.page);
  }

  async verifyAliasCheckPageLoaded() {
    await expect(this.page).toHaveURL(/Shiphistory\/AliasCheck/i);
    await expect(this.page.getByText('Ship History Alias Management', { exact: true })).toBeVisible();
    await expect(this.aliasManagementHeading()).toBeVisible();
    await this.verifyNoVisibleApplicationErrors();
  }

  async navigateBackToInProcessPage() {
    await this.page.goBack();
    await waitForPageLoad(this.page);
  }

  async openSuggestionsPage() {
    await waitForElement(this.page, this.suggestionsLink());
    await this.suggestionsLink().click();
    await waitForPageLoad(this.page);
  }

  async verifySuggestionsPageLoaded() {
    await expect(this.page).toHaveURL(/Shiphistory\/Suggestion/i);
    await expect(this.page.getByText('Ship History Alignment Suggestions', { exact: true })).toBeVisible();
    await expect(this.alignmentSuggestionsHeading()).toBeVisible();
    await expect(
      this.page.getByRole('heading', { name: 'Supplemental Alignment Suggestions' })
    ).toBeVisible();
    await this.verifyNoVisibleApplicationErrors();
  }
}
