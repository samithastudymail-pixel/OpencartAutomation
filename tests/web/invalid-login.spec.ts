/**
 * Test Case: Invalid Login Flow
 *
 * Tags: @master @sanity @regression @web
 *
 * Steps:
 * 1) Navigate to application
 * 2) Navigate to My Account → Login
 * 3) Enter invalid credentials
 * 4) Submit login form
 * 5) Verify authentication fails with warning message
 */
import { test, expect } from '../../fixtures/pageFixtures';

test('Invalid Login Flow @master @sanity @regression @web', async ({ homePage, loginPage }) => {
    await test.step('1) Navigate to Login page', async () => {
        await homePage.clickLogin();
    });

    await test.step('2) Enter invalid credentials and submit', async () => {
        await loginPage.login('abcxyz@xyz.com', 'abcxyx');
    });

    await test.step('3) Verify login failure with warning message', async () => {
        const warningMsg = await loginPage.getWarningMessage();
        expect(warningMsg).toContain('Warning: No match for E-Mail Address and/or Password.');
    });

    console.log('✅ Invalid Login Flow completed successfully!');
});
