import { Page, expect } from '@playwright/test';

export class HomePage {
  constructor(private page: Page) {}

  // Locator
  homePageHeading = () =>
    this.page.getByRole('heading', { name: 'Home Page' });

  // Function to verify homepage loaded
  async verifyHomePageLoaded() {
    await this.homePageHeading().waitFor({ state: 'visible', timeout: 10000 });
    await expect(this.homePageHeading()).toBeVisible();
  }
}
