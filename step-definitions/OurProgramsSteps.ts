import { Then, When } from '@cucumber/cucumber';
import { env } from '../utils/helper';
import { OurProgramsPage } from '../pages/OurProgramsPage';

let ourProgramsPage: OurProgramsPage;

function getOurProgramsPage(page: any) {
  return ourProgramsPage ?? (ourProgramsPage = new OurProgramsPage(page));
}

When('User navigates to the Our Programs page', async function () {
  ourProgramsPage = getOurProgramsPage(this.page);
  await ourProgramsPage.navigateToOurProgramsPage();
});

Then('Our Programs page should load successfully', async function () {
  ourProgramsPage = getOurProgramsPage(this.page);
  await ourProgramsPage.verifyOurProgramsPageLoaded();
});

When('User clicks the Industries button on Our Programs page', async function () {
  ourProgramsPage = getOurProgramsPage(this.page);
  await ourProgramsPage.clickIndustriesButton();
});

Then('Industries page should load successfully', async function () {
  ourProgramsPage = getOurProgramsPage(this.page);
  await ourProgramsPage.verifyIndustriesPageLoaded();
});

When('User clicks the Attributes button on Our Programs page', async function () {
  ourProgramsPage = getOurProgramsPage(this.page);
  await ourProgramsPage.clickAttributesButton();
});

Then('Our Program Attributes page should load successfully', async function () {
  ourProgramsPage = getOurProgramsPage(this.page);
  await ourProgramsPage.verifyAttributesPageLoaded();
});

When('User returns to the Our Programs page', async function () {
  ourProgramsPage = getOurProgramsPage(this.page);
  await this.page.goto(`${env.baseUrl!}/MVC/OurPrograms/OurPrograms`, {
    waitUntil: 'domcontentloaded',
    timeout: 60_000
  });
});

When('User clicks the Add New button on Our Programs page', async function () {
  ourProgramsPage = getOurProgramsPage(this.page);
  await ourProgramsPage.clickAddNewButton();
});

Then('Program Detail page should load successfully', async function () {
  ourProgramsPage = getOurProgramsPage(this.page);
  await ourProgramsPage.verifyProgramDetailPageLoaded();
});
