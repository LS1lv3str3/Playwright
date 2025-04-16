import { Locator, Page } from 'playwright/test';


export class LoginPage {

    public readonly signInButtonLocator: Locator;
    public readonly emailLocator: Locator;
    public readonly passwordLocator: Locator;
    public readonly loginButtonLocator: Locator;

    constructor(page: Page) {
        this.signInButtonLocator = page.getByRole('link', { name: 'Sign in' });
        this.emailLocator = page.getByRole('textbox', { name: 'Email address *' });
        this.passwordLocator = page.getByRole('textbox', { name: 'Password *' });
        this.loginButtonLocator = page.getByRole('button', { name: 'Login' });
    }

    async signInApplication(email, password){
        await this.signInButtonLocator.click();
        await this.emailLocator.fill(email);
        await this.passwordLocator.fill(password);
        await this.loginButtonLocator.click();
    }
};