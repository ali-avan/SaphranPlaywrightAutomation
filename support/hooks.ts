import {
  After,
  AfterAll,
  AfterStep,
  Before,
  BeforeAll,
  Status,
  setDefaultTimeout
} from '@cucumber/cucumber';
import { chromium, Browser, BrowserContext, Page } from 'playwright';
import fs from 'fs';
import path from 'path';
import { env, startTrackingBrowserErrors, waitForPageLoad } from '../utils/helper';
import { saveAuthSession } from '../utils/auth';
import { LoginPage } from '../pages/LoginPage';

setDefaultTimeout(60_000);

let browser: Browser;
let context: BrowserContext;
let page: Page;

const STORAGE_FILE = path.join(__dirname, `../storage/session-${env.targetEnv}.json`);
const HOME_PATH = '/MVC/Home';

BeforeAll(async function () {
  browser = await chromium.launch({ headless: env.headless ?? false });
});

async function createPage(storageState?: string) {
  context = await browser.newContext({ storageState });
  page = await context.newPage();
  startTrackingBrowserErrors(page);
  page.setDefaultTimeout(15_000);
  page.setDefaultNavigationTimeout(60_000);
}

async function loginAndSaveSession() {
  console.log('Performing fresh login...');
  const loginPage = new LoginPage(page);
  await loginPage.LaunchUrl();
  await loginPage.login(env.username!, env.password!);
  await saveAuthSession(page);
  console.log('Login done and session saved.');
}

async function isOnLoginPage() {
  return await page.locator('#UserName').isVisible().catch(() => false);
}

async function hasReachedHomePage() {
  return await page.getByRole('heading', { name: 'Home Page' }).isVisible().catch(() => false);
}

Before(async function () {
  const storageState = fs.existsSync(STORAGE_FILE) ? STORAGE_FILE : undefined;
  await createPage(storageState);

  if (!storageState) {
    console.log('No session found.');
    await loginAndSaveSession();
  } else {
    console.log('Session found, opening home page with saved login state...');

    try {
      const response = await page.goto(`${env.baseUrl!}${HOME_PATH}`, {
        waitUntil: 'domcontentloaded',
        timeout: 60_000
      });

      if (!response?.ok()) {
        throw new Error(
          `Home page returned HTTP ${response?.status() ?? 'unknown'} with saved session`
        );
      }

      await waitForPageLoad(page);

      // A saved session can still return HTTP 200 and silently redirect to the login page.
      if (await isOnLoginPage()) {
        throw new Error('Saved session redirected to login page');
      }

      if (!(await hasReachedHomePage())) {
        throw new Error('Saved session did not land on the Home Page');
      }
    } catch (error) {
      console.log(
        `Saved session failed: ${error instanceof Error ? error.message : String(error)}`
      );

      if (fs.existsSync(STORAGE_FILE)) {
        fs.unlinkSync(STORAGE_FILE);
      }

      await page.close();
      await context.close();
      await createPage();
      await loginAndSaveSession();
    }
  }

  (this as any).page = page;
});

AfterStep(async function ({ result }) {
  if (result?.status !== Status.FAILED || !page) {
    return;
  }

  const screenshot = await page.screenshot({
    fullPage: true,
    type: 'png'
  });

  await this.attach(screenshot, 'image/png');
});

After(async function () {
  if (page && !page.isClosed()) {
    await page.close();
  }

  await context.close();
});

AfterAll(async function () {
  await browser.close();
});
