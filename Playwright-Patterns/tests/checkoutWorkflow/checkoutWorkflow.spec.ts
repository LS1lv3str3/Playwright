
import { expect, test } from '../../fixtures/checkoutWorkflow.fixture.ts';

test.describe('Checkout Workflow Test', async () => {

    //? Add a product to the cart from the home page
    test('Add a product to the cart from the home page', async ({ homePage, productPage }) => {

        //? Go to the home page
        await homePage.goToHomePageFromUrl('https://practicesoftwaretesting.com');

        //? Go to the product page
        await homePage.navigateToProductPage('Bolt Cutters Bolt Cutters $48.41');

        //? Increase the quantity of the product to 3
        for (let i = 0; i < 2; i++) {
            await productPage.increaseQuantity();
        }

        //? Add the product to the cart
        await productPage.addToCart();
        await expect(homePage.alertMessageLocator).toBeVisible();
        await productPage.goToHomePageFromNavBar();

        await homePage.filterByDrill();
        await homePage.navigateToProductPage(' Cordless Drill 24V $66.54');

        //? Add 2 quantity of the item to the cart by input field
        for (let i = 0; i < 2; i++) {
            await productPage.increaseQuantity();
        }
        await productPage.addToCart();
        await expect(homePage.alertMessageLocator).toBeVisible();
        await homePage.linkCartLocator.click();
    });
});