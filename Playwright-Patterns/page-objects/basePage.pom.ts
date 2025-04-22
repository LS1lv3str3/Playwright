import { Locator, Page } from "@playwright/test";

export class BasePage {
    readonly page : Page;
    readonly linkToHomePageLocator: Locator;


    constructor(page: Page) {
        this.page = page;
        this.linkToHomePageLocator = this.page.getByRole('link', { name: 'Home' });
    }

    async goToHomePageFromUrl(url : string) {
        await this.page.goto(url);
    }

    async goToHomePageFromNavBar() {
        await this.page.getByRole('link', { name: 'Home' }).waitFor({ state: 'visible' });
        await this.page.getByRole('link', { name: 'Home' }).click();
    }
}