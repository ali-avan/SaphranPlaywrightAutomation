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
  await page.waitForSelector(selector, { timeout: 5000 });
}
