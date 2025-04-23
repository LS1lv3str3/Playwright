import { test as base } from 'playwright/test';
import { ProfilePage, HomePage, ProductPage } from '../page-objects/index.ts';


type PagesModel = {
    profilePage: ProfilePage;
    homePage: HomePage;
    productPage: ProductPage;

}

export const test = base.extend<PagesModel>({

    profilePage: async ({page}, use) => {
        await use(new ProfilePage(page));
    },

    homePage: async ({page}, use) => {
        const homePage = new HomePage(page);

        //? Wait for the home page to load
        await use(homePage);
    },

    productPage: async ({page}, use) => {
        await use(new ProductPage(page));
    }

});

export {expect} from '@playwright/test';