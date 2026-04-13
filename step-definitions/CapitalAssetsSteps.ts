import { Then, When } from '@cucumber/cucumber';
import { CapitalAssetsPage } from '../pages/CapitalAssetsPage';

let capitalAssetsPage: CapitalAssetsPage;

function getCapitalAssetsPage(page: any): CapitalAssetsPage {
  return capitalAssetsPage ?? (capitalAssetsPage = new CapitalAssetsPage(page));
}

When('User navigates to the Capital Assets page from System Admin menu', async function () {
  capitalAssetsPage = getCapitalAssetsPage(this.page);
  await capitalAssetsPage.navigateToCapitalAssetsPage();
});

Then('Capital Assets page should load successfully', async function () {
  capitalAssetsPage = getCapitalAssetsPage(this.page);
  await capitalAssetsPage.verifyCapitalAssetsPageLoaded();
});

When('User clicks Add New Machine on Capital Assets page', async function () {
  capitalAssetsPage = getCapitalAssetsPage(this.page);
  await capitalAssetsPage.clickAddNewMachine();
});

Then('Machine Detail page should load successfully from Capital Assets', async function () {
  capitalAssetsPage = getCapitalAssetsPage(this.page);
  await capitalAssetsPage.verifyMachineDetailPageLoaded();
});
