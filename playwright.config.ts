import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  use: {
    browserName: 'chromium',
    headless: false, // set true if you want headless
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    baseURL: 'https://www.saucedemo.com'
  },
  projects: [
    {
      name: 'Desktop Chromium',
      use: { ...devices['Desktop Chrome'] }
    },
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] }
    }
  ],
  reporter: [['list']] // Allure reporting can be added if needed
});
