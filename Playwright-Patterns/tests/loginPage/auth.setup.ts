import {test as setup, expect} from '@playwright/test';
import {LoginPage} from '../../page-objects/login-page.pom';

setup('Create customer 01 auth', async ({page, context}) =>{

    //? Cutomer auth credencials
    const email = 'customer@practicesoftwaretesting.com';
    const password = 'welcome01';

    //Path for the file with all session browser information
    const customer01AuthFile = '.auth/costomer01.json';

    //? Login Aplication from POM LoginPage
    page.goto('https://practicesoftwaretesting.com');
    const loginPage = new LoginPage(page);
    loginPage.signInApplication(email, password);

    //? Check if the login was successfull - I can che i the login was successfull by check nav-menu has the name of the customer or if the sign in link is not displayed
    await expect(page.getByTestId('nav-menu')).toHaveText('Jane Doe');

    //? Save the session - This is the session state, I will can use it in the future to login
    await context.storageState({path: customer01AuthFile});
})  