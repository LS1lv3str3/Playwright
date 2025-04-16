import { expect, test } from 'playwright/test';

test.describe('Checkout Workflow Test', async () => {
    test.use({ storageState: '.auth/costomer01.json' });
});