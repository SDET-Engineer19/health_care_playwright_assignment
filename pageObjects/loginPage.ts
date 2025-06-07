import { Page, Locator, expect } from '@playwright/test';
import process from 'node:process';

export default class LoginPage {
    readonly page: Page;
    readonly loginBtn: Locator;
    readonly usernameInput: Locator;
    readonly continueButton: Locator;
    readonly passwordInput: Locator;
    readonly signButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.loginBtn = page.getByRole('link', { name: 'Login' });
        this.usernameInput = page.locator('input#email.textInput')
        this.continueButton = page.locator('#continue');
        this.passwordInput = page.locator('#password');
        this.signButton = page.locator('#next');
    }


    async navigateToOkrxApplication() {

        const userName = process.env.USERNAME as string;
        const password = process.env.PASSWORD as string;
        await this.page.goto('/', { waitUntil: 'domcontentloaded' });
        const popup_page = this.page.waitForEvent('popup');
        await this.page.locator('#navbarCollapse').getByRole('link', { name: 'Login' }).click();
        const loginPage = await popup_page;
        await loginPage.getByRole('textbox', { name: 'Email Address*' }).click();
        await loginPage.getByRole('textbox', { name: 'Email Address*' }).fill(userName);
        await loginPage.getByRole('button', { name: 'Continue' }).click();
        await loginPage.getByRole('textbox', { name: 'Password' }).click();
        await loginPage.getByRole('textbox', { name: 'Password' }).fill(password);
        
    
      return loginPage;
    }

   
}




