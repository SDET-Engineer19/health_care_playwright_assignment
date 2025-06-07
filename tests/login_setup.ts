import { test as setup, expect } from '@playwright/test';
import LoginPage from '../pageObjects/LoginPage';
import { STORAGE_STATE_PATH } from '../playwright.config';
/**
 * This setup file performs a login using the multi-tab flow and saves the authentication state
 * to be reused by other tests.
 * This prevents repetitive logins for each test run.
 */
setup('authenticate', async ({ page }) => {

  const loginPage = new LoginPage(page);
  await loginPage.navigateToOkrxApplication();
  await page.context().storageState({ path: STORAGE_STATE_PATH });

});
