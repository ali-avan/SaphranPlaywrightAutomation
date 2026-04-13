import { Then, When } from '@cucumber/cucumber';
import { LoginLogPage } from '../pages/LoginLogPage';

let loginLogPage: LoginLogPage;

function getLoginLogPage(page: any): LoginLogPage {
  return loginLogPage ?? (loginLogPage = new LoginLogPage(page));
}

When('User navigates to the Login Log page from System Admin menu', async function () {
  loginLogPage = getLoginLogPage(this.page);
  await loginLogPage.navigateToLoginLogPage();
});

Then('Login Log page should load successfully', async function () {
  loginLogPage = getLoginLogPage(this.page);
  await loginLogPage.verifyLoginLogPageLoaded();
});
