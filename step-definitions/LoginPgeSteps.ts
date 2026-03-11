import { Then } from '@cucumber/cucumber';
import fs from 'fs';
import path from 'path';
import { LoginPage } from '../pages/LoginPage';
import { UserAdminData } from '../pages/UserAdminPage';

let loginPage: LoginPage;

const userAdminData = JSON.parse(
  fs.readFileSync( path.join(__dirname, '../test-data/UserAdmin.json'),'utf-8')
) as UserAdminData;

Then('Login with the disabled user', async function () {
  loginPage = new LoginPage(this.page);
  await loginPage.login(userAdminData.userName, userAdminData.password);
});

Then('Verify user should not be able to login', async function () {
  await loginPage.verifyDisabledUserCannotLogin();
});
