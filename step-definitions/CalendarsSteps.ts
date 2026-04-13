import { Then, When } from '@cucumber/cucumber';
import { CalendarsPage } from '../pages/CalendarsPage';

let calendarsPage: CalendarsPage;

function getCalendarsPage(page: any): CalendarsPage {
  return calendarsPage ?? (calendarsPage = new CalendarsPage(page));
}

When('User navigates to the Calendars page from System Admin menu', async function () {
  calendarsPage = getCalendarsPage(this.page);
  await calendarsPage.navigateToCalendarsPage();
});

Then('Calendars page should load successfully', async function () {
  calendarsPage = getCalendarsPage(this.page);
  await calendarsPage.verifyCalendarsPageLoaded();
});
