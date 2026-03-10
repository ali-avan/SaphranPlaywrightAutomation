import { Page, expect } from '@playwright/test';
import { env, waitForPageLoad } from '../utils/helper';

export type UserAdminData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  userName: string;
};

export class UserAdminPage {
  constructor(private page: Page) {}

  systemAdminMenu = () => this.page.getByText('System Admin');
  userAdminLink = () => this.page.getByRole('link', { name: 'User Admin' });
  userAdministrationHeading = () =>
    this.page.getByRole('heading', { name: 'User Administration' });
  newUserButton = () => this.page.getByRole('button', { name: 'New User' });
  saveButton = () => this.page.locator('(//input[@value="Save"])[2]');
  generalInformationHeading = () =>
    this.page.getByRole('heading', { name: 'General Information' });
  firstNameInput = () =>
    this.page.locator('#NewUserGeneralInfo input[name="txtFirstName"]');
  lastNameInput = () =>
    this.page.locator('#NewUserGeneralInfo input[name="txtLastName"]');
  emailInput = () =>
    this.page.locator('#NewUserGeneralInfo input[name="txtEmail"]');
  passwordInput = () =>
    this.page.locator('#NewUserGeneralInfo input[name="txtPassword"]');
  userNameInput = () =>
    this.page.locator('#NewUserGeneralInfo input[name="txtUserName"]');
  disabledStatusRadio = () =>
    this.page.locator('//div[@id="NewUserGeneralInfo"]//input[@value="DISABLED"]');
  successToastMessage = () => this.page.locator('div.toastr-message');
  userSearchInput = () => this.page.getByRole('textbox', { name: 'Search' });
  userAdminPage = () =>  this.page.getByRole('link', { name: /User Administration/i })
  disabledStatusRadioEdit = () =>
    this.page.locator('//div[@id="UserGeneralInfo"]//input[@value="DISABLED"]');
  saveAlBtn = () => this.page.locator("//input[@value='Save All']")

  async openHomePage() {
    await this.page.goto(`${env.baseUrl!}/MVC/Home`);
    await waitForPageLoad(this.page);
  }

  async navigateToUserAdministration() {
    await this.systemAdminMenu().click();
    await this.userAdminLink().waitFor({ state: 'visible', timeout: 10000 });
    await this.userAdminLink().click();
    await waitForPageLoad(this.page);
    await this.verifyUserAdministrationPageLoaded();
  }

  async verifyUserAdministrationPageLoaded() {
    await this.userAdministrationHeading().waitFor({ state: 'visible', timeout: 10000});
    await expect(this.userAdministrationHeading()).toBeVisible();
  }

  async clickNewUser() {
    await this.newUserButton().waitFor({ state: 'visible', timeout: 10000 });
    await this.newUserButton().click();
    // await this.generalInformationHeading().waitFor({state: 'visible',timeout: 10000});
    await expect(this.saveButton()).toBeVisible();
  }

  async fillMandatoryUserDetails(userData: UserAdminData) {
    await this.firstNameInput().fill(userData.firstName);
    await this.lastNameInput().fill(userData.lastName);
    await this.emailInput().fill(userData.email);
    await this.passwordInput().fill(userData.password);
    await this.userNameInput().evaluate((element) => element.removeAttribute('readonly'));
    await this.userNameInput().fill(userData.userName);
    await this.page.waitForTimeout(5000);
  }

  async setUserStatusDisabled() {
    await this.disabledStatusRadio().click();
    await expect(this.disabledStatusRadio()).toBeChecked();
    await this.page.waitForTimeout(5000);
  }

  async clickSave() {
    await this.saveButton().waitFor({ state: 'visible', timeout: 10000 });
    await this.saveButton().click();
     await this.page.waitForTimeout(5000);
  }

  async verifyUserCreatedSuccessfully() {
    await this.successToastMessage().waitFor({state: 'visible',timeout: 10000});
    await expect(this.successToastMessage()).toHaveText('User has been created.');
  }

  async searchWithCreatedUserName(userName: string) {
    await this.userSearchInput().waitFor({ state: 'visible', timeout: 10000 });
    await this.userSearchInput().fill(userName);
    await this.userSearchInput().press('Enter');
    await this.page
      .getByRole('row')
      .filter({ hasText: userName })
      .first()
      .waitFor({ state: 'visible', timeout: 10000 });
       await this.page.waitForTimeout(5000);
  }

  async clickEditIconUnderActionsColumn(userName: string) {
    const userRow = this.page
      .getByRole('row')
      .filter({ hasText: userName })
      .first();

    await userRow.waitFor({ state: 'visible', timeout: 10000 });
    await userRow.getByRole('button', { name: 'View/Edit User Info' }).click();
     await this.page.waitForTimeout(5000);
  }

  async clickUserdmin() {
    await this.userAdminPage().waitFor({ state: 'visible', timeout: 10000 });
    await this.userAdminPage().click();
     await this.page.waitForTimeout(5000);
  }

  async setUserStatusDisabledOnEditPage() {
    await this.disabledStatusRadioEdit().click();
    await expect(this.disabledStatusRadioEdit()).toBeChecked();
    await this.page.waitForTimeout(5000);
  }

  async clickSaveAllButon() {
    await this.saveAlBtn().waitFor({ state: 'visible', timeout: 10000 });
    await this.saveAlBtn().click();
     await this.page.waitForTimeout(5000);
  }
}
