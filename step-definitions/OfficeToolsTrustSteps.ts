import { Then, When } from '@cucumber/cucumber';
import { OfficeToolsTrustPage } from '../pages/OfficeToolsTrustPage';

let officeToolsTrustPage: OfficeToolsTrustPage;

function getOfficeToolsTrustPage(page: any): OfficeToolsTrustPage {
  return officeToolsTrustPage ?? (officeToolsTrustPage = new OfficeToolsTrustPage(page));
}

When('User navigates to the Office Tools Trust page from System Admin menu', async function () {
  officeToolsTrustPage = getOfficeToolsTrustPage(this.page);
  await officeToolsTrustPage.navigateToOfficeToolsTrustPage();
});

Then('Office Tools Trust page should load successfully', async function () {
  officeToolsTrustPage = getOfficeToolsTrustPage(this.page);
  await officeToolsTrustPage.verifyOfficeToolsTrustPageLoaded();
});
