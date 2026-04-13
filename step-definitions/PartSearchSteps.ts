import { Then, When } from '@cucumber/cucumber';
import fs from 'fs';
import path from 'path';
import { PartSearchData, PartSearchPage } from '../pages/PartSearchPage';

let partSearchPage: PartSearchPage;

function getPartSearchPage(page: any): PartSearchPage {
  return partSearchPage ?? (partSearchPage = new PartSearchPage(page));
}

const addPartTestData = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../test-data/AddPart.json'), 'utf-8')
) as {
  partSearch: PartSearchData;
};

const partSearchData = addPartTestData.partSearch as PartSearchData;

When('User navigates to the Part Search page', async function () {
  partSearchPage = getPartSearchPage(this.page);
  await partSearchPage.navigateToPartSearchPage();
});

Then('Part Search page should load successfully', async function () {
  partSearchPage = getPartSearchPage(this.page);
  await partSearchPage.verifyPartSearchPageLoaded();
});

When('User selects Active in Search Within section on Part Search page', async function () {
  partSearchPage = getPartSearchPage(this.page);
  await partSearchPage.selectActiveSearchWithin();
});

When('User selects Ford in Customer Search dropdown on Part Search page', async function () {
  partSearchPage = getPartSearchPage(this.page);
  await partSearchPage.selectCustomer(partSearchData.customerName);
});

When('User clicks Search button on Part Search page', async function () {
  partSearchPage = getPartSearchPage(this.page);
  await partSearchPage.clickSearchButton();
});

Then('Part Search results should load successfully', async function () {
  partSearchPage = getPartSearchPage(this.page);
  await partSearchPage.verifySearchResultsLoaded(partSearchData);
});
