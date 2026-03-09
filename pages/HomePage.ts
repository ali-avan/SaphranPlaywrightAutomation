import { Page, expect } from '@playwright/test';

export class HomePage {
  constructor(private page: Page) {}

  // Locator
  homePageHeading = () =>
    this.page.getByRole('heading', { name: 'Home Page' });

  // Function to verify homepage loaded
  async verifyHomePageLoaded() {
    await expect(this.homePageHeading()).toBeVisible();
  }
}