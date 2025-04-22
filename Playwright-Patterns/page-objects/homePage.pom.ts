import { Locator, Page } from 'playwright/test';
import { BasePage } from './basePage.pom';


export class HomePage extends BasePage {

    readonly linkToBoltCuttersProductPageLocator: Locator;
    readonly linkToCordlessDrillProductPageLocator: Locator;
    readonly textboxSearchLocator: Locator;
    readonly buttonSearchLocator: Locator;
    readonly checkboxFilterByDrillLocator: Locator;

    constructor(page) {
        super(page);

        this.linkToBoltCuttersProductPageLocator = page.getByRole('link', { name: 'Bolt Cutters Bolt Cutters $48.41' });
        this.linkToCordlessDrillProductPageLocator = page.getByRole('link', { name: ' Cordless Drill 24V $66.54' });
        this.textboxSearchLocator = page.getByRole('textbox', { name: 'Search' });
        this.buttonSearchLocator = page.getByRole('button', { name: 'Search' });
        this.checkboxFilterByDrillLocator = page.getByRole('checkbox', { name: 'Drill' });

    }

    async navigateToProductPage(productName) {
        switch (productName) {
            case 'Bolt Cutters Bolt Cutters $48.41':
                await this.linkToBoltCuttersProductPageLocator.click();
                break;

            case ' Cordless Drill 24V $66.54':
                await this.linkToCordlessDrillProductPageLocator.click();
                break;
        
            default:
                break;
        }
    }

    async searchProduct(productName) {
        await this.textboxSearchLocator.fill(productName);
        await this.buttonSearchLocator.click();
    }

    async filterByDrill() {
        await this.checkboxFilterByDrillLocator.click();
    }
};