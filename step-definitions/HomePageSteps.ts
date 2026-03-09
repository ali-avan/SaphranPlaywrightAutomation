import { Given } from '@cucumber/cucumber';
import { HomePage } from '../pages/HomePage';

Given('User is to be redirected to the homepage screen', async function () {
  const homePage = new HomePage(this.page);

  await homePage.verifyHomePageLoaded();
});