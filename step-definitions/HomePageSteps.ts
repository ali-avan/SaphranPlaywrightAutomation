import { Given,Then } from '@cucumber/cucumber';
import { HomePage } from '../pages/HomePage';

let homePage: HomePage;

Given('User is to be redirected to the homepage screen', async function () {
  homePage = new HomePage(this.page);
  await homePage.verifyHomePageLoaded();
});

// Then('some other step', async function () {
//     await homePage.verifyHomePageLoaded();
//   });