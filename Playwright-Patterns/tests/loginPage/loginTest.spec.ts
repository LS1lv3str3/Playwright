import {test} from '../../fixtures/login.fixture.ts';


test('Login Test with customer 01 credencials', async ({loginPage}) => {
    
    //? Cutomer auth credencials
    await loginPage.signInApplication('customer@practicesoftwaretesting.com', 'welcome01');
})  