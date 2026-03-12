import { Then, When } from '@cucumber/cucumber';
import fs from 'fs';
import path from 'path';
import { AddPartData, AddPartPage } from '../pages/AddPartPage';

let addPartPage: AddPartPage;

const addPartData = JSON.parse(
  fs.readFileSync(
    path.join(__dirname, '../test-data/AddPart.json'),
    'utf-8'
  )
) as AddPartData;

When('User navigates to the Add Part page', async function () {
  addPartPage = new AddPartPage(this.page);
  await addPartPage.navigateToAddPartPage();
});

When('User fills the General Information section for Add Part', async function () {
  await addPartPage.fillGeneralInformation(addPartData);
});

Then('Add Part General Information should contain the entered values', async function () {
  await addPartPage.verifyGeneralInformation(addPartData);
});
