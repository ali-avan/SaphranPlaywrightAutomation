import { Then, When } from '@cucumber/cucumber';
import { DataManagementPage } from '../pages/DataManagementPage';

let dataManagementPage: DataManagementPage;

function getDataManagementPage(page: any): DataManagementPage {
  return dataManagementPage ?? (dataManagementPage = new DataManagementPage(page));
}

When('User navigates to the Data Management page from System Admin menu', async function () {
  dataManagementPage = getDataManagementPage(this.page);
  await dataManagementPage.navigateToDataManagementPage();
});

Then('Data Management page should load successfully', async function () {
  dataManagementPage = getDataManagementPage(this.page);
  await dataManagementPage.verifyDataManagementPageLoaded();
});

When('User opens all data element pages from Data Management', { timeout: 180_000 }, async function () {
  // dataManagementPage = getDataManagementPage(this.page);
  // await dataManagementPage.openAndVerifyAllDataElementPages();
});
