import { Locator, Page, expect } from 'playwright/test';
import { BasePage } from './basePage.pom';


export class LoginPage extends BasePage {

    readonly signInButtonLocator: Locator;
    readonly emailLocator: Locator;
    readonly passwordLocator: Locator;
    readonly loginButtonLocator: Locator;
    readonly linkNavBarLocator: Locator;

    constructor(page: Page) {
        super(page);
        this.signInButtonLocator = page.getByRole('link', { name: 'Sign in' });
        this.emailLocator = page.getByRole('textbox', { name: 'Email address *' });
        this.passwordLocator = page.getByRole('textbox', { name: 'Password *' });
        this.loginButtonLocator = page.getByRole('button', { name: 'Login' });
        this.linkNavBarLocator = page.getByRole('button', { name: 'Jane Doe' });
    }

    async signInApplication(email, password){
        await this.goToHomePageFromUrl('https://practicesoftwaretesting.com/');
        await this.signInButtonLocator.click();
        await this.emailLocator.fill(email);
        await this.passwordLocator.fill(password);
        await this.loginButtonLocator.click();
        await expect(this.linkNavBarLocator).toBeVisible();
    }


};