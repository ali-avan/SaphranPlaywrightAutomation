import { Page, expect } from '@playwright/test';
import { env, waitForElement, waitForPageLoad } from '../utils/helper';

export class HomePage {
  constructor(private page: Page) {}

  // Locator
  homePageHeading = () =>
    this.page.getByRole('heading', { name: 'Home Page' });

  // Function to verify homepage loaded
  async verifyHomePageLoaded() {
    await waitForElement(this.page, this.homePageHeading());
    await expect(this.homePageHeading()).toBeVisible();
  }
}
