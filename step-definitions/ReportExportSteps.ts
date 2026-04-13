import { Then, When } from '@cucumber/cucumber';
import { ReportExportPage } from '../pages/ReportExportPage';

let reportExportPage: ReportExportPage;

function getReportExportPage(page: any): ReportExportPage {
  return reportExportPage ?? (reportExportPage = new ReportExportPage(page));
}

When('User navigates to the Report Export page from Reporting menu', async function () {
  reportExportPage = getReportExportPage(this.page);
  await reportExportPage.navigateToReportExportPage();
});

Then('Report Export page should load successfully', async function () {
  reportExportPage = getReportExportPage(this.page);
  await reportExportPage.verifyReportExportPageLoaded();
});
