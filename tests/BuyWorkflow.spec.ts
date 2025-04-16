import { expect, test } from 'playwright/test';

test.describe('Buy Workflow Test - UI', async () => {

    let page;
    
    //? Login in the system - I use the session state created in the auth.setup.ts file
    test.use({storageState: '.auth/costomer01.json'});

    test.beforeAll(async ({ browser }) => {
        const context = await browser.newContext();
        page = await context.newPage();

        await page.goto('https://practicesoftwaretesting.com/');


    });

    test.beforeEach(async ({ }) => {

        if (!page.url().includes('/checkout')) {
            //? Clink on Home Link in navBar
            await page.getByTestId('nav-home').click();
        }
    });

    test('Go Home from Nav-Bar', async ({  }) => {
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

    test('Select filtered products from serch and category', async ({ }) => {

        //? Select the Bolt Cutters item in the list
        await page.getByAltText('Bolt Cutters').click();

        // Check if the page item is displayed
        await expect(page.getByTestId('product-name')).toHaveText('Bolt Cutters');

        //? Add 3 quantity of the item to the cart, check if the cart icon is visible and back the home page
        for (let i = 0; i < 2; i++) {
            await page.getByTestId('increase-quantity').click();
        }
        await page.getByTestId('add-to-cart').click();

        // Check if the cart icon is visible
        expect(await page.getByTestId('nav-cart')).toBeVisible();

        // Check the quantity of the item in the cart
        await expect(page.getByTestId('cart-quantity')).toHaveText('3');

        //? Clink on Home Link in navBar
        await page.getByTestId('nav-home').click();
        
        //? Select the checkbox "Drill" in Power Tools category and search for the product "Cordless Drill 24V"
        await page.getByText('Drill').check();
        await page.getByAltText('Cordless Drill 24V').click();
    
        //? Add 2 quantity of the item to the cart by input field
        await page.getByTestId('quantity').clear().then(() => {
            page.getByTestId('quantity').fill('2');
        });
    
        await page.getByTestId('add-to-cart').click();

        // Check the quantity of the item in the cart
        await expect(page.getByTestId('cart-quantity')).toHaveText('5');

    });


    test('Cart page test', async ({  }) => {
        
        //? Check if the cart page is displayed and check if the item is displayed in the cart
        await page.getByTestId('nav-cart').click();
        await expect(page.getByTestId('proceed-1')).toBeVisible();

        // Check the quantity of the item in the cart
        const products = [
            {'name': 'Bolt Cutters','quantity': 3, 'price': 48.41},
            {'name': 'Cordless Drill 24V', 'quantity': 2, 'price': 66.54}
        ];
        
        // Cicle trought the products and check if the product is displayed in the cart
        for (const product of products) {

            // Colect the entire row of the table with the product name
            const productRow = page.locator(`tr:has-text("${product.name}")`);

            // Check all the elements of the product row
            await expect(productRow.getByTestId('product-title')).toHaveText(product.name);
            await expect(productRow.getByTestId('product-quantity')).toHaveValue(product.quantity.toString());
            await expect(productRow.getByTestId('product-price')).toHaveText("$" + `${product.price}`);
            await expect(productRow.getByTestId('line-price')).toHaveText("$" + `${product.price * product.quantity}`)
            
        }
            
        //? Click on the proced checkout button
        await page.getByTestId('proceed-1').click();

        await page.waitForTimeout(1000);
        
    });

    test('Check if the login was done', async ({ }) => {
        //? Check if the proceed to checkout button is displayed - The expected result is the button is displayed because we used the session state created in the auth.setup.ts file
        await expect(page.getByTestId('proceed-2')).toBeVisible(); 

        //? Proceed to checkout
        await page.getByTestId('proceed-2').click();
    });

    test('Biling Address Page test', async ({ }) => {

        // Check the information previous filled in the Billing Address page
        await expect(await page.getByTestId('street')).toHaveValue('Test street 98');
        await expect(await page.getByTestId('city')).toHaveValue('Vienna');
        await expect(await page.getByTestId('country')).toHaveValue('Austria');

        //? Fill the State and Your Postcode (Informantion is not provide by user)
        await page.getByTestId('state').fill('Vienna');
        await page.getByTestId('postal_code').fill('1010');

        // Proceed to checkout
        await page.getByTestId('proceed-3').click();    
    });

    test('Payment Page Test', async ({ }) => {

        //? Check i the dropdown list of payment methods is visible
        await expect(page.getByTestId('payment-method')).toBeVisible();

        //? Choose the payment method "Buy Now Pay Later"
        await expect(await page.getByTestId('payment-method')).toBeVisible();
        await page.getByTestId('payment-method').selectOption('Buy Now Pay Later');

        //? Choose Installment Payment
        await page.getByTestId('monthly_installments').selectOption('6 Monthly Installments');

        //? Complete the payment and check if the payment successful message is displayed
        await page.getByTestId('finish').click();
        await expect(page.getByTestId('payment-success-message')).toBeVisible();
    
    });
});