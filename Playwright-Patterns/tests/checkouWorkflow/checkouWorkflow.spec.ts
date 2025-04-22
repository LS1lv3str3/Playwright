
import { test } from '../../fixtures/checkoutWorkflow.fixture.ts';

test.describe('Checkout Workflow Test', async () => {

    //? Configuration for this test.describe don't close the browser
    test.describe.configure({ mode: 'serial' });

    //? Login in the system - I use the session state created in the auth.setup.ts file
    test.use({storageState: 'Playwright-Patterns/.auth/costomer01.json'}); 

    //? Add a product to the cart from the home page
    test('Add a product to the cart from the home page', async ({ homePage, productPage }) => {

        //? Go to the home page
        await homePage.goToHomePageFromNavBar();

        //? Go to the product page
        await homePage.navigateToProductPage('Bolt Cutters Bolt Cutters $48.41');

        //? Increase the quantity of the product to 3
        for (let i = 0; i < 2; i++) {
            await productPage.increaseQuantity();
        }

        //? Add the product to the cart
        await productPage.addToCart();
        
    });

    test('Add a product to the cart from checkbox filter', async ({ homePage, productPage }) => {

        await homePage.goToHomePageFromNavBar();

        //? Filter the product by checkbox and navigate to the product page
        await homePage.filterByDrill();
        await homePage.navigateToProductPage(' Cordless Drill 24V $66.54');

        //? Increase the quantity of the product to 5
        for (let i = 0; i < 4; i++) {
            await productPage.increaseQuantity();
        }

        //? Add the Product to the favorites
        await productPage.addToWishList();

        //? Add the product to the cart
        await productPage.addToCart();

    });
});