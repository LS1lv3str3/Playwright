import { expect, test } from 'playwright/test';

test.describe('Buy Workflow Test - UI', async () => {
    
    //? Login in the system - I use the session state created in the auth.setup.ts file
    test.use({storageState: '.auth/costomer01.json'});

    test('Go Home from Nav-Bar', async ({ page }) => {
        // Go to Account Page
        await page.goto('https://practicesoftwaretesting.com/account');
        //? Clink on Home Link in navBar
        await page.getByTestId('nav-home').click();

        //Check how many items are displayed in Home Page
        const itemsGrid = page.locator('.col-md-9');
        //Have to check how many expected items are displayed - The HTML element is a link so I search by role 'link'
        await expect(itemsGrid.getByRole('link')).toHaveCount(9);
        //It go to count all items and check if the count is 9
        await expect(await itemsGrid.getByRole('link').count()).toBe(9);
    });

    test('Select one product from home page', async ({ page }) => {

        //? Select the Bolt Cutters item in the list
        const itemElement = page.locator('a');
        await itemElement.ge;
        //await page.getByAltText('Bolt Cutters').click();

        // Check if the page item is displayed
        await expect(page.getByTestId('product-name')).toHaveText('Bolt Cutters');

        //? Add 3 quantity of the item to the cart, check if the cart icon is visible and back the home page
        for (let i = 0; i < 2; i++) {
            await page.getByTestId('increase-quatity').click();
        }

        // Check if the cart icon is visible
        await expect(page.getByTestId('nav-cart')).toBeVisible();

        // Check the quantity of the item in the cart
        await expect(page.getByTestId('cart-quantity')).toHaveText('3');
    });
        

    //? Select the checkbox "Drill" in Power Tools category and select the range of price from 1 to 56

    // Check the results and go to the page product of the item filtered

    //? Add 2 quantity of the item to the cart and go to the cart Page

    //? Check if the cart page is displayed and check if the item is displayed in the cart

    // Check the quantity of the item in the cart
    // Check the total price of the cart

    //? Click on the proced checkout button

    //?To do Login in the system (Check if the login was successfull by checking from this sentence "Hello Jane Doe, you are already logged in. You can proceed to checkout.")
    //Proceed to checkout

    //? In Billing Address page, fill the State and Your Postcode but before checking the title of the page and the address, city and country are displayed
    //Proceed to checkout

    //? In Payment Method page, check the title of the page and the dropdown list of payment methods are displayed and choose the payment method "Buy Now Pay Later"
    //Check the dropdown list of your monthly installments is displayed and select the option "3 months"
    //Proceed to checkout

    //? Check if the Box "Payment was successful" is displayed and click on the button "Cofirm"

    //! MOST HAVE - Try to get the order number and check if the order is displayed in the Invoices page



});