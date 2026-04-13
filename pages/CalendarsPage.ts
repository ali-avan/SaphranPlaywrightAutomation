import { expect, Page } from '@playwright/test';
import { assertNoBrowserErrors, waitForElement, waitForPageLoad } from '../utils/helper';

export class CalendarsPage {
  constructor(private page: Page) {}

  systemAdminMenu = () =>
    this.page.locator('#kt_app_header_menu').getByText('System Admin', { exact: true });
  calendarsLink = () => this.page.getByRole('link', { name: 'Calendars' });
  fiscalCalendarHeading = () => this.page.getByRole('heading', { name: 'Fiscal Calendar' });

  private async verifyNoVisibleApplicationErrors() {
    await expect(this.page.locator('body')).not.toContainText(
      /Server Error|Application Error|Runtime Error|Exception Details|HTTP Error/i
    );
    await assertNoBrowserErrors(this.page);
  }

  async navigateToCalendarsPage() {
    await this.systemAdminMenu().click();
    await waitForElement(this.page, this.calendarsLink());
    await this.calendarsLink().click();
    await waitForPageLoad(this.page);
  }

  async verifyCalendarsPageLoaded() {
    await waitForElement(this.page, this.fiscalCalendarHeading());
    await expect(this.page).toHaveTitle(/Fiscal Calendar/i);
    await expect(this.fiscalCalendarHeading()).toBeVisible();
    await this.verifyNoVisibleApplicationErrors();
  }
}
