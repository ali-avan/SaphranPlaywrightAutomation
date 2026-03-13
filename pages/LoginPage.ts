import { Page, expect } from '@playwright/test';
import { env, waitForElement, waitForPageLoad } from '../utils/helper';

export class LoginPage {
  constructor(private page: Page) {}

  userNameInput = () => '#UserName';
  passwordInput = () => '#Password';
  signInButton = () => 'button';
  disabledUserMessage = () =>this.page.getByText('This Login name is not active, Please contact your System Administrator*',{ exact: true });

  async LaunchUrl() {
    await this.page.goto(env.baseUrl!);
    await waitForPageLoad(this.page);
  }

  async login(userName: string, password: string) {
    await waitForElement(this.page, this.userNameInput());
    await this.page.fill(this.userNameInput(), userName);

    await waitForElement(this.page, this.passwordInput());
    await this.page.fill(this.passwordInput(), password);

    await waitForElement(this.page, this.signInButton());
    await this.page.click(this.signInButton());
    await waitForPageLoad(this.page);
  }

  async verifyDisabledUserCannotLogin() {
    await waitForElement(this.page, this.disabledUserMessage());
    await expect(this.disabledUserMessage()).toBeVisible();
  }
}
