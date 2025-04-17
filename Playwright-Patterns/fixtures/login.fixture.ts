import {test as base} from '@playwright/test';
import {LoginPage} from '../page-objects/login-page.pom';

type PagesModel = {
    loginPage: LoginPage;
}

export const test = base.extend<PagesModel>({
    loginPage: async ({page}, use) => {
        await use(new LoginPage(page));
    },
});

export {expect} from '@playwright/test';