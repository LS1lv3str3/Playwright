import { it } from 'node:test';
import { expect, test } from 'playwright/test';

test.describe('Home Page', async () => {

    test.beforeEach(async ({ page }) => {
        //? Go to the home page of pratice software testing
        await page.goto('https://practicesoftwaretesting.com/');
    
    });

    test('Check page title', async ({ page }) => {
        //? Check the title of the page
        await expect(page).toHaveTitle('Practice Software Testing - Toolshop - v5.0');
    
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