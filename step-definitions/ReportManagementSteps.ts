import { Then, When } from '@cucumber/cucumber';
import { ReportManagementPage } from '../pages/ReportManagementPage';

let reportManagementPage: ReportManagementPage;

function getReportManagementPage(page: any): ReportManagementPage {
  return reportManagementPage ?? (reportManagementPage = new ReportManagementPage(page));
}

When('User navigates to the Report Management page from Reporting menu', async function () {
  reportManagementPage = getReportManagementPage(this.page);
  await reportManagementPage.navigateToReportManagementPage();
});

Then('Report Management page should load successfully', async function () {
  reportManagementPage = getReportManagementPage(this.page);
  await reportManagementPage.verifyReportManagementPageLoaded();
});
