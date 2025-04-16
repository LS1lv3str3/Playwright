import {test as setup, expect} from '@playwright/test';

setup('Create customer 01 auth', async ({page, context}) =>{

    //? Cutomer auth credencials
    const email = 'customer@practicesoftwaretesting.com';
    const password = 'welcome01';
    //Path for the file with all session browser information
    const customer01AuthFile = '.auth/costomer01.json';

    //? Go to Login page - I can access directly to the login page with URL or I can use the baseURL from the config file and click on the sign in button
    await page.goto('https://practicesoftwaretesting.com/auth/login/');

    //? Fill email
    await page.getByTestId('email').fill(email);

    //? Fill password
    await page.getByTestId('password').fill(password);

    //? Click on the login button
    await page.getByTestId('login-submit').click();

    //? Check if the login was successfull - I can che i the login was successfull by check nav-menu has the name of the customer or if the sign in link is not displayed
    await expect(page.getByTestId('nav-menu')).toHaveText('Jane Doe');

    //? Save the session - This is the session state, I will can use it in the future to login
    await context.storageState({path: customer01AuthFile});
})