import dotenv from "dotenv";
import { Page } from 'playwright';
dotenv.config();

export const env = {
  baseUrl: process.env.BASE_URL,
  username: process.env.TEST_USERNAME,
  password: process.env.TEST_PASSWORD,
  headless: process.env.HEADLESS === "true"
};

export async function waitForElement(page: Page, selector: string) {
  await page.waitForSelector(selector, { state: 'visible', timeout: 5000 });
}

export async function waitForPageLoad(page: Page) {
  await page.waitForLoadState('domcontentloaded');
  await page.waitForLoadState('load');
  await page.waitForLoadState('networkidle');
}
