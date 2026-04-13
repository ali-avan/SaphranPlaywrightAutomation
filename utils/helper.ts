import dotenv from "dotenv";
import { Locator, Page } from 'playwright';
import { expect } from '@playwright/test';
dotenv.config();

const ELEMENT_WAIT_TIMEOUT = 15_000;
const PAGE_LOAD_TIMEOUT = 60_000;

const DEFAULT_HOST = 'https://secureapps0.saphran.com';
const targetEnv = process.env.TARGET_ENV ?? process.env.APP_ENV ?? 'qbasedemotestbeta';

type EnvConfig = {
  username: string;
  password: string;
};

const envConfigs: Record<string, EnvConfig> = {
  qbasedemotestbeta: {
    username: process.env.QBASEDEMOTESTBETA_USERNAME ?? process.env.TEST_USERNAME ?? '',
    password: process.env.QBASEDEMOTESTBETA_PASSWORD ?? process.env.TEST_PASSWORD ?? ''
  },
  ItwMetalsNewRegressionTest: {
    username: process.env.ITWMETALSNEWREGRESSIONTEST_USERNAME ?? '',
    password: process.env.ITWMETALSNEWREGRESSIONTEST_PASSWORD ?? ''
  }
};

const selectedEnvConfig = envConfigs[targetEnv];

if (!selectedEnvConfig) {
  throw new Error(
    `Unsupported TARGET_ENV "${targetEnv}". Supported values: ${Object.keys(envConfigs).join(', ')}`
  );
}

export const env = {
  targetEnv,
  baseUrl: `${process.env.BASE_HOST ?? DEFAULT_HOST}/${targetEnv}`,
  username: selectedEnvConfig.username,
  password: selectedEnvConfig.password,
  headless: process.env.HEADLESS === "true"
};

const trackedBrowserErrors = new WeakMap<Page, string[]>();
const ignoredBrowserErrorPatterns = [
  /Failed to load resource: the server responded with a status of 404.*favicon\.ico/i,
  /Failed to load resource: the server responded with a status of 404 \(\)/i,
  /Failed to load resource: net::ERR_HTTP2_PROTOCOL_ERROR/i,
  /violates the following Content Security Policy directive/i,
  /Loading the script .*knockout/i,
  /Loading the stylesheet .*flatpickr/i,
  /Loading the script .*flatpickr/i,
  /Loading the stylesheet .*bootstrap-switch/i,
  /Loading the script .*bootstrap-switch/i,
  /\$\(.*\)\.bootstrapSwitch is not a function/i
];

function isIgnorableBrowserError(message: string) {
  return ignoredBrowserErrorPatterns.some((pattern) => pattern.test(message));
}

export function startTrackingBrowserErrors(page: Page) {
  trackedBrowserErrors.set(page, []);

  page.on('console', (msg) => {
    if (msg.type() !== 'error') {
      return;
    }

    const message = msg.text();
    if (isIgnorableBrowserError(message)) {
      return;
    }

    const errors = trackedBrowserErrors.get(page) ?? [];
    errors.push(message);
    trackedBrowserErrors.set(page, errors);
  });

  page.on('pageerror', (error) => {
    const message = error.message;
    if (isIgnorableBrowserError(message)) {
      return;
    }

    const errors = trackedBrowserErrors.get(page) ?? [];
    errors.push(message);
    trackedBrowserErrors.set(page, errors);
  });
}

export async function assertNoBrowserErrors(page: Page) {
  await expect(
    trackedBrowserErrors.get(page) ?? [],
    `Unexpected browser errors: ${(trackedBrowserErrors.get(page) ?? []).join(' | ')}`
  ).toEqual([]);
}

export async function waitForElement(page: Page, selectorOrLocator: string | Locator) {
  if (typeof selectorOrLocator === 'string') {
    await page.waitForSelector(selectorOrLocator, {
      state: 'visible',
      timeout: ELEMENT_WAIT_TIMEOUT
    });
    return;
  }

  await selectorOrLocator.waitFor({
    state: 'visible',
    timeout: ELEMENT_WAIT_TIMEOUT
  });
}

export async function waitForPageLoad(page: Page) {
  page.setDefaultNavigationTimeout(PAGE_LOAD_TIMEOUT);
  await page.waitForLoadState('domcontentloaded');
  await page.waitForLoadState('load');
  await page.waitForLoadState('networkidle', { timeout: PAGE_LOAD_TIMEOUT });
}
