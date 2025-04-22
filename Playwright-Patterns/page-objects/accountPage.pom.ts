import { Locator, Page } from 'playwright/test';
import { BasePage } from './basePage.pom';


export class AccountPage extends BasePage {

    readonly linkToHomePageLocator: Locator;

    constructor(page) {
        super(page);
        this.linkToHomePageLocator = page.getByRole('link', { name: 'Home' });
    }

    async goToHomePage() {
        await this.linkToHomePageLocator.click();
    }
};