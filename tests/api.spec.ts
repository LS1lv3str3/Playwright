import { expect, test } from 'playwright/test';

test.describe('API Tests', () => {
    const baseURL = 'https://api.practicesoftwaretesting.com';
    test('GET /products', async ({ request }) => {
        //? Make GET request to the API
        const response = await request.get(baseURL + '/products');

        //? Check if the response is OK
        expect(response.status()).toBe(200);

        //? Create a JSON object from the response
        const body = await response.json();

        //? Analyze the response with Debug tools
        console.log(body);
        /**
         * After analyzing the response, I can see that the response is an array of objects (data).
         * All objects is paginated, so I can use the following code to get the first page of the response.
         * Have total of 50 objects in the response. It's paginated with 9 objects per page and it have 6 total of.
         */

        //? Check if the analysis is correct
        expect(body.data.length).toBe(9);
        expect(body.total).toBe(50);
        expect(body.per_page).toBe(9);
    });

    test('POST /users/login', async ({ request }) => {

        //? Make POST request to the API
        const response = await request.post(baseURL + '/users/login', {
            data: {
                email:'customer@practicesoftwaretesting.com',
                password:'welcome01',
            }
        });
        //? Check if the response is OK
        expect(response.status()).toBe(200);
    });
});