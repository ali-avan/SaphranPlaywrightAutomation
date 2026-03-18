import { Page, expect } from '@playwright/test';
import { addPartOpportunityId } from './AddPartPage';
import { env, waitForElement, waitForPageLoad } from '../utils/helper';

export type AddPartHomePageInProcessSectionData = {
  quoteStatus: string;
};

export class HomePage {
  constructor(private page: Page) {}

  // Locator
  homePageHeading = () =>
    this.page.getByRole('heading', { name: 'Home Page' });
  inProcessAndRecentlyCompletedPartsHeading = () =>
    this.page.getByRole('heading', {
      name: /In-Process and Recently Completed Parts/i
    });
  inProcessAndRecentlyCompletedPartsSearchInput = () =>
    this.page.locator(
      '(//h3[contains(normalize-space(),"In-Process and Recently Completed Parts")]/ancestor::div[1]/following::input[@placeholder="Search"])[1]'
    );

  // Function to verify homepage loaded
  async verifyHomePageLoaded() {
    await waitForElement(this.page, this.homePageHeading());
    await expect(this.homePageHeading()).toBeVisible();
  }

  async searchSavedOpportunityIdInInProcessSection() {
    await this.inProcessAndRecentlyCompletedPartsHeading().scrollIntoViewIfNeeded();
    await this.inProcessAndRecentlyCompletedPartsSearchInput().fill(
      addPartOpportunityId
    );
    await this.page.waitForTimeout(1500);
  }

  async openPartPageFromSavedOpportunityIdSearchResult() {
    const matchingRow = this.page
      .getByRole('row')
      .filter({ hasText: addPartOpportunityId })
      .first();

    await expect(matchingRow).toBeVisible();
    await matchingRow.getByRole('link').first().click();
    await waitForPageLoad(this.page);
  }

  async verifySavedOpportunityIdQuoteStatusInInProcessSection(
    data: AddPartHomePageInProcessSectionData
  ) {
    const matchingRow = this.page
      .getByRole('row')
      .filter({ hasText: addPartOpportunityId })
      .first();

    await expect(matchingRow).toBeVisible();
    await expect(matchingRow).toContainText(data.quoteStatus);
  }
}
