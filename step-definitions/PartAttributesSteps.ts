import { Then, When } from '@cucumber/cucumber';
import { PartAttributesPage } from '../pages/PartAttributesPage';

let partAttributesPage: PartAttributesPage;

function getPartAttributesPage(page: any): PartAttributesPage {
  return partAttributesPage ?? (partAttributesPage = new PartAttributesPage(page));
}

When('User navigates to the Part Attributes page from System Admin menu', async function () {
  partAttributesPage = getPartAttributesPage(this.page);
  await partAttributesPage.navigateToPartAttributesPage();
});

Then('Part Attributes page should load successfully', async function () {
  partAttributesPage = getPartAttributesPage(this.page);
  await partAttributesPage.verifyPartAttributesPageLoaded();
});
