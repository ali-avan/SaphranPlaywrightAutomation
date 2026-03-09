// support/hooks.ts
import { BeforeAll, AfterAll, Before, setDefaultTimeout } from '@cucumber/cucumber';
import { chromium, Browser, BrowserContext, Page } from 'playwright';
import fs from 'fs';
import path from 'path';
import { env } from '../utils/helper';
import { saveAuthSession } from '../utils/auth';

setDefaultTimeout(60_000);

let browser: Browser;
let context: BrowserContext;
let page: Page; // single page reused across scenarios

const STORAGE_FILE = path.join(__dirname, '../storage/session.json');

BeforeAll(async function () {
  // Launch browser
  browser = await chromium.launch({ headless: false });

  // Use saved session if exists
  const storageState = fs.existsSync(STORAGE_FILE) ? STORAGE_FILE : undefined;
  context = await browser.newContext({ storageState });

  // Open single page
  page = await context.newPage();

  // Perform login only if no session
  if (!storageState) {
    console.log('No session → performing login...');
    await page.goto(env.baseUrl!);
    //await page.fill('#user-name', env.username!);
    await page.fill('#UserName', env.username!) 
    //await page.fill('#password', env.password!);
    await page.fill('#Password', env.password!);
    //await page.click('#login-button');
    await Promise.all([
      page.waitForLoadState('load'),
      page.click('button'),
    ]);
    await page.waitForLoadState('networkidle');


    // Save session
    await saveAuthSession(page);
    console.log('Login done & session saved ✅');
  } else {
    console.log('Session already exists ✅');
  }

  (this as any).page = page;
});

// Reuse the same page for all scenarios
Before(async function () {
  (this as any).page = page;
});

// Close browser after all scenarios
AfterAll(async function () {
  await context.close();
  await browser.close();
});
