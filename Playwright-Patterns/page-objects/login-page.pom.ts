import { Locator, Page, expect } from 'playwright/test';
import { BasePage } from './basePage.pom';


export class LoginPage extends BasePage {

    public readonly signInButtonLocator: Locator;
    public readonly emailLocator: Locator;
    public readonly passwordLocator: Locator;
    public readonly loginButtonLocator: Locator;
    public readonly linkNavBarLocator: Locator;

    constructor(page: Page) {
        super(page);
        this.signInButtonLocator = page.getByRole('link', { name: 'Sign in' });
        this.emailLocator = page.getByRole('textbox', { name: 'Email address *' });
        this.passwordLocator = page.getByRole('textbox', { name: 'Password *' });
        this.loginButtonLocator = page.getByRole('button', { name: 'Login' });
        this.linkNavBarLocator = page.getByRole('button', { name: 'Jane Doe' });
    }

    async signInApplication(email, password){
        await this.navigateToHomePage('https://practicesoftwaretesting.com/');
        await this.signInButtonLocator.click();
        await this.emailLocator.fill(email);
        await this.passwordLocator.fill(password);
        await this.loginButtonLocator.click();
        await expect(this.linkNavBarLocator).toBeVisible();
    }
};