import { Then, When } from '@cucumber/cucumber';
import { CurrencyPage } from '../pages/CurrencyPage';

let currencyPage: CurrencyPage;

function getCurrencyPage(page: any): CurrencyPage {
  return currencyPage ?? (currencyPage = new CurrencyPage(page));
}

When('User navigates to the Currency page from System Admin menu', async function () {
  currencyPage = getCurrencyPage(this.page);
  await currencyPage.navigateToCurrencyPage();
});

Then('Currency page should load successfully', async function () {
  currencyPage = getCurrencyPage(this.page);
  await currencyPage.verifyCurrencyPageLoaded();
});
