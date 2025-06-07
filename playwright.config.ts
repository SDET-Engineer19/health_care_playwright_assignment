import { defineConfig, devices } from '@playwright/test';
import path from 'path';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });
const ENV = process.env.ENV || 'dev';
export const STORAGE_STATE_PATH = path.join(__dirname, 'playwright-auth.json');
const BASE_URLS = {
  dev: 'https://okrx.ca/',
  stage: 'https://okrx.ca/',
  qa: 'https://okrx.ca/'
};
const baseURL = BASE_URLS[ENV as keyof typeof BASE_URLS];

if (!baseURL) {
  console.error(`Invalid environment specified: ${ENV}. Please use one of: ${Object.keys(BASE_URLS).join(', ')}`);
  process.exit(1);
}
/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: baseURL,

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on',
    storageState: STORAGE_STATE_PATH,
  },

  /* Configure projects for major browsers */
  projects: [
     {
      name: 'setup',
      testMatch: /.*\.setup\.ts/, // This project will run only the setup file to save auth state
    },
    {
      name: 'Microsoft Edge', 
      use: { ...devices['Desktop Edge'], channel: 'msedge' },
      dependencies: ['setup'], 
    }

  
    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
