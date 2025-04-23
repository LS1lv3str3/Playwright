import { Locator, Page } from 'playwright/test';
import { BasePage } from './basePage.pom';


export class ProductPage extends BasePage {

    readonly buttonIncreaseQuantityLocator: Locator;
    readonly buttonDecreaseQuantityLocator: Locator;
    readonly buttonAddToCartLocator: Locator;
    readonly buttonAddToWishListLocator: Locator;
    

    constructor(page) {
        super(page);

        this.buttonIncreaseQuantityLocator = page.getByRole('button', { name: 'Increase quantity' });
        this.buttonDecreaseQuantityLocator = page.getByRole('button', { name: 'Decrease quantity' });
        this.buttonAddToCartLocator = page.getByRole('button', { name: 'Add to cart' });
        this.buttonAddToWishListLocator = page.getByRole('button', { name: 'Add to favourites' });

    }

    async increaseQuantity() {
        await this.buttonIncreaseQuantityLocator.click();
    }

    async decreaseQuantity() {
        await this.buttonDecreaseQuantityLocator.click();
    }

    async addToCart() {
        await this.buttonAddToCartLocator.click();
    }

    async addToWishList() {
        await this.buttonAddToWishListLocator.click();
    }
};