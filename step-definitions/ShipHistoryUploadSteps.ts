import { Then, When } from '@cucumber/cucumber';
import { ShipHistoryUploadPage } from '../pages/ShipHistoryUploadPage';

let shipHistoryUploadPage: ShipHistoryUploadPage;

function getShipHistoryUploadPage(page: any): ShipHistoryUploadPage {
  return shipHistoryUploadPage ?? (shipHistoryUploadPage = new ShipHistoryUploadPage(page));
}

When('User navigates to the Ship History Upload page from System Admin menu', async function () {
  shipHistoryUploadPage = getShipHistoryUploadPage(this.page);
  await shipHistoryUploadPage.navigateToShipHistoryUploadPage();
});

Then('Ship History Upload page should load successfully', async function () {
  shipHistoryUploadPage = getShipHistoryUploadPage(this.page);
  await shipHistoryUploadPage.verifyShipHistoryUploadPageLoaded();
});

When('User opens the first in-process alignment job from Ship History Upload page', async function () {
  shipHistoryUploadPage = getShipHistoryUploadPage(this.page);
  await shipHistoryUploadPage.openFirstInProcessAlignmentJob();
});

Then('Ship History In-Process Alignment page should load successfully', async function () {
  shipHistoryUploadPage = getShipHistoryUploadPage(this.page);
  await shipHistoryUploadPage.verifyInProcessAlignmentPageLoaded();
});

When('User opens the Alias Check page from Ship History In-Process Alignment page', async function () {
  shipHistoryUploadPage = getShipHistoryUploadPage(this.page);
  await shipHistoryUploadPage.openAliasCheckPage();
});

Then('Ship History Alias Check page should load successfully', async function () {
  shipHistoryUploadPage = getShipHistoryUploadPage(this.page);
  await shipHistoryUploadPage.verifyAliasCheckPageLoaded();
});

When('User navigates back to the Ship History In-Process Alignment page', async function () {
  shipHistoryUploadPage = getShipHistoryUploadPage(this.page);
  await shipHistoryUploadPage.navigateBackToInProcessPage();
});

When('User opens the Suggestions page from Ship History In-Process Alignment page', async function () {
  shipHistoryUploadPage = getShipHistoryUploadPage(this.page);
  await shipHistoryUploadPage.openSuggestionsPage();
});

Then('Ship History Suggestions page should load successfully', async function () {
  shipHistoryUploadPage = getShipHistoryUploadPage(this.page);
  await shipHistoryUploadPage.verifySuggestionsPageLoaded();
});
