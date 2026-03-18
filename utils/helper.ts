import dotenv from "dotenv";
import { Locator, Page } from 'playwright';
dotenv.config();

export const env = {
  baseUrl: process.env.BASE_URL,
  username: process.env.TEST_USERNAME,
  password: process.env.TEST_PASSWORD,
  headless: process.env.HEADLESS === "true"
};

export async function waitForElement(page: Page, selectorOrLocator: string | Locator) {
  if (typeof selectorOrLocator === 'string') {
    await page.waitForSelector(selectorOrLocator, { state: 'visible', timeout: 5000 });
    return;
  }

  await selectorOrLocator.waitFor({ state: 'visible', timeout: 5000 });
}

export async function waitForPageLoad(page: Page) {
  await page.waitForLoadState('domcontentloaded');
  await page.waitForLoadState('load');
  await page.waitForLoadState('networkidle');
}
