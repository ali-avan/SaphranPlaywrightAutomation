import { Then, When } from '@cucumber/cucumber';
import { LogoutUserPage } from '../pages/LogoutUserPage';

let logoutUserPage: LogoutUserPage;

function getLogoutUserPage(page: any): LogoutUserPage {
  return logoutUserPage ?? (logoutUserPage = new LogoutUserPage(page));
}

When('User navigates to the Logout User page from System Admin menu', async function () {
  logoutUserPage = getLogoutUserPage(this.page);
  await logoutUserPage.navigateToLogoutUserPage();
});

Then('Logout User page should load successfully', async function () {
  logoutUserPage = getLogoutUserPage(this.page);
  await logoutUserPage.verifyLogoutUserPageLoaded();
});
