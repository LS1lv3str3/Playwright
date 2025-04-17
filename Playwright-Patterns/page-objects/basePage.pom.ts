import { Page } from "@playwright/test";

export class BasePage {
    public readonly page : Page;

    constructor(page: Page) {
        this.page = page;
    }

    navigateToHomePage(url : string) {
        this.page.goto(url);
    }
}