import { it } from 'node:test';
import { expect, test } from 'playwright/test';

test.describe('Home Page with no auth', async () => {

    test.beforeEach(async ({ page }) => {
        //? Go to the home page of pratice software testing
        await page.goto('https://practicesoftwaretesting.com/');
    
    });

    test('Check page title', async ({ page }) => {
        //? Check the title of the page
        await expect(page).toHaveTitle('Practice Software Testing - Toolshop - v5.0');
    
    });

    test('Visual Test no Auth', async ({ page }) => {
        //? Wait for the page to load
        await page.waitForLoadState('networkidle');


        //? Check the screenshot of the page
        //? I can use the method toHaveScreenshot to check if the screenshot is the same as the one in the folder
        await expect(page).toHaveScreenshot('home-no-auth.png',{
            //? I can use the option mask to put one mask in the element that I want to hide
            mask: [page.getByTitle('Practice Software Testing - Toolshop')],
            maskColor: 'green', // I can change the color of the mask (default is pink)
        });
    });

    test('Sign In Test', async ({ page }) => {
        //? Check Sign in button is displayed
        await page.getByTestId('nav-sign-in').isVisible();   
    
    });

    test('Test for check how many items ar displayed in Home Page', async ({ page }) => {
        //? Chck te count of items displayed
        // Search how to items are displayed
        const itemsGrid = page.locator('.col-md-9');

        // Have to check how many expected items are displayed - The HTML element is a link so I search by role 'link'
        await expect(itemsGrid.getByRole('link')).toHaveCount(9);

        // It go to count all items and check if the count is 9
        expect(await itemsGrid.getByRole('link').count()).toBe(9);
    });

    //? CHALLENGE - Search for Thor Hammer and check result

    test('Test search funcionality', async ({ page }) => {
        // Search dor the input field and fill with 'Thor Hammer'
        await page.getByTestId('search-query').fill('Thor Hammer');
    
        // Click on the search button
        await page.getByTestId('search-submit').click();
    
        // Check the title of the displayed page
        await expect(await page.getByTestId('search-caption')).toHaveText('Searched for: Thor Hammer');
    
        // Check how many expected items are displayed - The items are display the same way to home page, is a link so I search by role 'link' and the ecpected count is 1
        const itemsGrid = page.locator('.col-md-9');

        await expect(itemsGrid.getByRole('link')).toHaveCount(1);
    
        // It go to count all items and check if the count is 1
        expect (await itemsGrid.getByRole('link').count()).toBe(1);
    
        // Check the title of the displayed product
        await expect (await page.getByTestId('product-name')).toHaveText('Thor Hammer');
    });

});

test.describe('Customer 01 Account Page', async () => {

    //? This test is going to use the session state created in the auth.setup.ts file
    test.use({storageState: '.auth/costomer01.json'});

    //? Before each test, go to the home page with the customer 01 session
    test.beforeEach(async ({ page }) => {
        await page.goto('https://practicesoftwaretesting.com/');
    })

    //? Visual test with customer 01 logged in
    test('Visual Test with customer 01 logged in', async ({ page }) => {
        //? Wait for the page to load
        await page.waitForLoadState('networkidle');

        //? Check the screenshot of the page
        //? I can use the method toHaveScreenshot to check if the screenshot is the same as the one in the folder
        await expect(page).toHaveScreenshot('home-customer01-auth.png');
    });
    //? Test to check if the customer 01 is logged in - I can check if the customer is logged in by checking if the sign in button is not displayed or if the nav-menu has the name of the customer in this case I use double check because I want to check if he is login and if is right account.

    test('check if the customer 01 is sign in', async ({ page }) => {
        await expect(page.getByTestId('nav-sign-in')).not.toBeVisible();
        await expect(page.getByTestId('nav-menu')).toContainText('Jane Doe');
    });
});