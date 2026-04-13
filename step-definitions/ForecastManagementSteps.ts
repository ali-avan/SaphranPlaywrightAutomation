import { Then, When } from '@cucumber/cucumber';
import { ForecastManagementPage } from '../pages/ForecastManagementPage';

let forecastManagementPage: ForecastManagementPage;

function getForecastManagementPage(page: any) {
  return (
    forecastManagementPage ?? (forecastManagementPage = new ForecastManagementPage(page))
  );
}

When('User navigates to the Forecast Management page', async function () {
  forecastManagementPage = getForecastManagementPage(this.page);
  await forecastManagementPage.navigateToForecastManagementPage();
});

Then('Forecast Management page should load successfully', async function () {
  forecastManagementPage = getForecastManagementPage(this.page);
  await forecastManagementPage.verifyForecastManagementPageLoaded();
});

When('User opens IHS Vehicle from the Original list', async function () {
  forecastManagementPage = getForecastManagementPage(this.page);
  await forecastManagementPage.openOriginalIhsVehicleForecast();
});

Then('Forecast Detail page should load successfully', async function () {
  forecastManagementPage = getForecastManagementPage(this.page);
  await forecastManagementPage.verifyForecastDetailPageLoaded();
});

When('User clicks the Details button on Forecast Detail page', async function () {
  forecastManagementPage = getForecastManagementPage(this.page);
  await forecastManagementPage.clickDetailsButton();
});

Then('View Forecast page should load successfully', async function () {
  forecastManagementPage = getForecastManagementPage(this.page);
  await forecastManagementPage.verifyViewForecastPageLoaded();
});

When('User clicks the Filter button on View Forecast page', async function () {
  forecastManagementPage = getForecastManagementPage(this.page);
  await forecastManagementPage.clickFilterButton();
});

Then('Reports and Analysis page should load successfully', async function () {
  forecastManagementPage = getForecastManagementPage(this.page);
  await forecastManagementPage.verifyReportsAndAnalysisPageLoaded();
});
