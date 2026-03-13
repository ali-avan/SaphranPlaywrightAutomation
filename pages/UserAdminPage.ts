import { Page, expect } from '@playwright/test';
import { env, waitForElement, waitForPageLoad } from '../utils/helper';
import { LoginPage } from './LoginPage';

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
  userRow = (userName: string) =>
    this.page.getByRole('row').filter({ hasText: userName }).first();
  editUserInfoButton = (userName: string) =>
    this.userRow(userName).getByRole('button', { name: 'View/Edit User Info' });
  disabledStatusRadioEdit = () =>
    this.page.locator('//div[@id="UserGeneralInfo"]//input[@value="DISABLED"]');
  saveAlBtn = () => this.page.locator("//input[@value='Save All']")

  async openHomePage() {
    await this.page.goto(`${env.baseUrl!}/MVC/Home`);
    await waitForPageLoad(this.page);
  }

  async navigateToUserAdministration() {
    await this.systemAdminMenu().click();
    await waitForElement(this.page, this.userAdminLink());
    await this.userAdminLink().click();
    await waitForPageLoad(this.page);
    await this.verifyUserAdministrationPageLoaded();
  }

  async verifyUserAdministrationPageLoaded() {
    await waitForElement(this.page, this.userAdministrationHeading());
    await expect(this.userAdministrationHeading()).toBeVisible();
  }

  async clickNewUser() {
    await waitForElement(this.page, this.newUserButton());
    await this.newUserButton().click();
     await waitForElement(this.page, this.saveButton());
    await expect(this.saveButton()).toBeVisible();
  }

  async fillMandatoryUserDetails(userData: UserAdminData) {
    await waitForElement(this.page, this.firstNameInput());
    await this.firstNameInput().fill(userData.firstName);
    await this.lastNameInput().fill(userData.lastName);
    await this.emailInput().fill(userData.email);
    await this.passwordInput().fill(userData.password);
    await this.userNameInput().evaluate((element) => element.removeAttribute('readonly'));
    await this.userNameInput().fill(userData.userName);
    // await this.page.waitForTimeout(3000);
  }

  async setUserStatusDisabled() {
    await this.disabledStatusRadio().click();
    await expect(this.disabledStatusRadio()).toBeChecked();
    // await this.page.waitForTimeout(3000);
  }

  async clickSave() {
    await waitForElement(this.page, this.saveButton());
    await this.saveButton().click();
    //  await this.page.waitForTimeout(3000);
  }

  async verifyUserCreatedSuccessfully() {
    await waitForElement(this.page, this.successToastMessage());
    await expect(this.successToastMessage()).toHaveText('User has been created.');
  }

  async searchWithCreatedUserName(userName: string) {
    await waitForElement(this.page, this.userSearchInput());
    await this.userSearchInput().fill(userName);
    await this.userSearchInput().press('Enter');
    await waitForElement(this.page, this.userRow(userName));
    // await this.page.waitForTimeout(2000);
  }

  async clickEditIconUnderActionsColumn(userName: string) {
    const userRow = this.userRow(userName);
    await waitForElement(this.page, userRow);
    await this.editUserInfoButton(userName).click();
    //  await this.page.waitForTimeout(2000);
  }

  async clickUserdmin() {
    await waitForElement(this.page, this.userAdminPage());
    await this.userAdminPage().click();
    //  await this.page.waitForTimeout(2000);
  }

  async setUserStatusDisabledOnEditPage() {
    await this.disabledStatusRadioEdit().click();
    await expect(this.disabledStatusRadioEdit()).toBeChecked();
    // await this.page.waitForTimeout(2000);
  }

  async clickSaveAllButon() {
    await waitForElement(this.page, this.saveAlBtn());
    await this.saveAlBtn().click();
    //  await this.page.waitForTimeout(2000);
  }

  async NavigatesToLogin() {
    const loginPage = new LoginPage(this.page);
    await loginPage.LaunchUrl();
  }
}
