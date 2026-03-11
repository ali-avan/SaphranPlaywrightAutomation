import { Given, Then, When } from '@cucumber/cucumber';
import fs from 'fs';
import path from 'path';
import { LoginPage } from '../pages/LoginPage';
import { UserAdminData, UserAdminPage } from '../pages/UserAdminPage';

let userAdminPage: UserAdminPage;
let loginPage: LoginPage;

const userAdminData = JSON.parse(
  fs.readFileSync(
    path.join(__dirname, '../test-data/UserAdmin.json'),
    'utf-8'
  )
) as UserAdminData;

Given('User navigates to the User Administration page', async function () {
  userAdminPage = new UserAdminPage(this.page);
  // await userAdminPage.openHomePage();
  await userAdminPage.navigateToUserAdministration();
});

When('User clicks on the New User button', async function () {
  await userAdminPage.clickNewUser();
});

When('User fills all mandatory User Administration fields', async function () {
  await userAdminPage.fillMandatoryUserDetails(userAdminData);
});

Then('User sets the user status as disabled', async function () {
  await userAdminPage.setUserStatusDisabled();
});

Then('User clicks on the Save button', async function () {
  await userAdminPage.clickSave();
});

Then('User verifies the success message for user creation', async function () {
  await userAdminPage.verifyUserCreatedSuccessfully();
});

When('User searches with the created username', async function () {
  await userAdminPage.searchWithCreatedUserName(userAdminData.userName);
});

When('User clicks on the edit icon under actions column', async function () {
  await userAdminPage.clickEditIconUnderActionsColumn(userAdminData.userName);
});

Then('User navigates back the User Administration page', async function () {
  await userAdminPage.clickUserdmin();
});

Then('User sets the status as disabled on Edit user details page', async function () {
  await userAdminPage.setUserStatusDisabledOnEditPage();
});

Then('User clicks on save all button', async function () {
  await userAdminPage.clickSaveAllButon();
});

Then('User navigates to the Login page', async function () {
  loginPage = new LoginPage(this.page);
  await userAdminPage.NavigatesToLogin();
});
