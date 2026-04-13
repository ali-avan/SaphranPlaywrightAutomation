import { expect, Page } from '@playwright/test';
import { waitForElement, waitForPageLoad } from '../utils/helper';

export class ProjectsPage {
  constructor(private page: Page) {}

  systemAdminMenu = () =>
    this.page.locator('#kt_app_header_menu').getByText('System Admin', { exact: true });
  projectsLink = () => this.page.getByRole('link', { name: 'Projects' });
  projectsHeading = () => this.page.getByRole('heading', { name: 'Projects' });
  addProjectButton = () => this.page.getByRole('button', { name: 'Add Project' });

  private async verifyNoVisibleApplicationErrors() {
    await expect(this.page.locator('body')).not.toContainText(
      /Server Error|Application Error|Runtime Error|Exception Details|HTTP Error/i
    );
  }

  async navigateToProjectsPage() {
    await this.systemAdminMenu().click();
    await waitForElement(this.page, this.projectsLink());
    await this.projectsLink().click();
    await waitForPageLoad(this.page);
  }

  async verifyProjectsPageLoaded() {
    await waitForElement(this.page, this.projectsHeading());
    await expect(this.page).toHaveURL(/Projects/i);
    await expect(this.projectsHeading()).toBeVisible();
    await expect(this.addProjectButton()).toBeVisible();
    await this.verifyNoVisibleApplicationErrors();
  }
}
