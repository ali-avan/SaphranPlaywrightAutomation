import { Then, When } from '@cucumber/cucumber';
import { ReportsAndAnalysisPage } from '../pages/ReportsAndAnalysisPage';

let reportsAndAnalysisPage: ReportsAndAnalysisPage;

function getReportsAndAnalysisPage(page: any): ReportsAndAnalysisPage {
  return reportsAndAnalysisPage ?? (reportsAndAnalysisPage = new ReportsAndAnalysisPage(page));
}

When('User navigates to the Reports and Analysis page from Reporting menu', async function () {
  reportsAndAnalysisPage = getReportsAndAnalysisPage(this.page);
  await reportsAndAnalysisPage.navigateToReportsAndAnalysisPage();
});

Then('Reports and Analysis reporting page should load successfully', async function () {
  reportsAndAnalysisPage = getReportsAndAnalysisPage(this.page);
  await reportsAndAnalysisPage.verifyReportsAndAnalysisPageLoaded();
});

When('User clicks New Query on Reports and Analysis page', async function () {
  reportsAndAnalysisPage = getReportsAndAnalysisPage(this.page);
  await reportsAndAnalysisPage.clickNewQuery();
});

Then('New Query should load successfully on Reports and Analysis page', async function () {
  reportsAndAnalysisPage = getReportsAndAnalysisPage(this.page);
  await reportsAndAnalysisPage.verifyNewQueryLoaded();
});
