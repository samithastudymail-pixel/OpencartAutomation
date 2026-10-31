/**
 * Test Case: Valid Login Flow
 *
 * Tags: @master @sanity @regression @web
 *
 * Steps:
 * 1) Navigate to application
 * 2) Navigate to My Account → Login
 * 3) Verify login page is displayed
 * 4) Enter valid credentials
 * 5) Submit login form
 * 6) Verify successful authentication and My Account page
 */
import { test, expect } from '../../fixtures/pageFixtures';
import { Helper } from '../../utils/helper';

test('Valid Login Flow @master @sanity @regression @web', async ({ homePage, loginPage, myAccountPage }) => {
    const { email, password } = Helper.getLoginDetails();

    await test.step('1) Navigate to Login page', async () => {
        await homePage.clickLogin();
    });

    await test.step('2) Verify login page is displayed', async () => {
        const isLoginPage = await loginPage.isLoginPageExists();
        expect(isLoginPage).toBeTruthy();
    });

    await test.step('3) Login with valid credentials', async () => {
        await loginPage.login(email, password);
    });

    await test.step('4) Verify successful authentication and My Account page', async () => {
        const isMyAccountPage = await myAccountPage.isMyAccountPageExists();
        expect(isMyAccountPage).toBeTruthy();
    });

    console.log('✅ Valid Login Flow completed successfully!');
});
