import { Given, Then, When } from '@cucumber/cucumber';
import fs from 'fs';
import path from 'path';
import {
  AddPartHomePageInProcessSectionData,
  HomePage
} from '../pages/HomePage';

let homePage: HomePage;

const addPartTestData = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../test-data/AddPart.json'), 'utf-8')
) as {
  homePageInProcessSection: AddPartHomePageInProcessSectionData;
};

const addPartHomePageInProcessSectionData =
  addPartTestData.homePageInProcessSection as AddPartHomePageInProcessSectionData;

Given('User is to be redirected to the homepage screen', async function () {
  homePage = new HomePage(this.page);
  await homePage.verifyHomePageLoaded();
});

When(
  'User searches the saved Opportunity ID in In-Process and Recently Completed Parts section',
  async function () {
    homePage = new HomePage(this.page);
    await homePage.searchSavedOpportunityIdInInProcessSection();
  }
);

When(
  'User opens the part page from the saved Opportunity ID search result',
  async function () {
    homePage = new HomePage(this.page);
    await homePage.openPartPageFromSavedOpportunityIdSearchResult();
  }
);

Then(
  'In-Process and Recently Completed Parts section should show the saved Opportunity ID part as Active',
  async function () {
    homePage = new HomePage(this.page);
    await homePage.verifySavedOpportunityIdQuoteStatusInInProcessSection(
      addPartHomePageInProcessSectionData
    );
  }
);

// Then('some other step', async function () {
//     await homePage.verifyHomePageLoaded();
//   });
