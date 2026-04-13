import { Then, When } from '@cucumber/cucumber';
import { CustomerAdminPage } from '../pages/CustomerAdminPage';

let customerAdminPage: CustomerAdminPage;

function getCustomerAdminPage(page: any): CustomerAdminPage {
  return customerAdminPage ?? (customerAdminPage = new CustomerAdminPage(page));
}

When('User navigates to the Customer Admin page from System Admin menu', async function () {
  customerAdminPage = getCustomerAdminPage(this.page);
  await customerAdminPage.navigateToCustomerAdminPage();
});

Then('Customer Admin page should load successfully', async function () {
  customerAdminPage = getCustomerAdminPage(this.page);
  await customerAdminPage.verifyCustomerAdminPageLoaded();
});

When('User opens an existing customer record from Customer Admin page', async function () {
  customerAdminPage = getCustomerAdminPage(this.page);
  await customerAdminPage.openExistingCustomerRecord();
});

Then('Customer detail page should load successfully', async function () {
  customerAdminPage = getCustomerAdminPage(this.page);
  await customerAdminPage.verifyCustomerDetailPageLoaded();
});

When('User returns to the Customer Admin page', async function () {
  customerAdminPage = getCustomerAdminPage(this.page);
  await customerAdminPage.returnToCustomerAdminPage();
});

When('User clicks New Customer on Customer Admin page', async function () {
  customerAdminPage = getCustomerAdminPage(this.page);
  await customerAdminPage.clickNewCustomer();
});
