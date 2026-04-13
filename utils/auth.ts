import { BrowserContext, Page } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import { env } from './helper';

const STORAGE_FILE = path.join(__dirname, `../storage/session-${env.targetEnv}.json`);

export async function saveAuthSession(page: Page) {
  const storage = await page.context().storageState();
  fs.writeFileSync(STORAGE_FILE, JSON.stringify(storage, null, 2));
  console.log('Auth session saved ✅');
}

export async function loadAuthSession(context: BrowserContext) {
  if (fs.existsSync(STORAGE_FILE)) {
    await context.addInitScript(async () => {
      const storage = JSON.parse(fs.readFileSync(STORAGE_FILE, 'utf-8'));
      return storage;
    });
    await context.storageState({ path: STORAGE_FILE });
    console.log('Auth session loaded ✅');
  } else {
    console.log('No auth session found, login required.');
  }
}
