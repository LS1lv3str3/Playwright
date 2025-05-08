// global-setup.ts
import { chromium, FullConfig, expect } from '@playwright/test';
import {LoginPage} from '../page-objects/loginPage.pom.ts';

async function globalSetup(config: FullConfig) {
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    const loginPage = new LoginPage(page);

    //? Cutomer auth credencials
    const email = 'customer@practicesoftwaretesting.com';
    const password = 'welcome01';
    //Path for the file with all session browser information
    const customer01AuthFile = '.auth/costomer01.json';

    await loginPage.goToHomePageFromUrl('https://practicesoftwaretesting.com/auth/login/');
    await loginPage.signInApplication(email, password);
    
    //? Save the session - This is the session state, I will can use it in the future to login
    await context.storageState({path: customer01AuthFile});
    await browser.close();
}

export default globalSetup;