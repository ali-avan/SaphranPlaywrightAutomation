import { chromium, Browser, Page } from 'playwright';

export async function createPage(): Promise<{ browser: Browser; page: Page }> {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  return { browser, page };
}
