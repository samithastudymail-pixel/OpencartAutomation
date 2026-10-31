/**
 * Test Case: Logout Flow
 *
 * Tags: @master @sanity @regression @web
 *
 * Steps:
 * 1) Navigate to application
 * 2) Login using valid credentials
 * 3) Navigate to logout option
 * 4) Click Logout
 * 5) Verify logout confirmation page
 * 6) Click Continue and verify redirect
 */
import { test, expect } from '../../fixtures/pageFixtures';
import { Helper } from '../../utils/helper';

test('Logout Flow @master @sanity @regression @web', async ({ homePage, loginPage, myAccountPage, logoutPage }) => {
    const { email, password } = Helper.getLoginDetails();

    await test.step('1) Login with valid credentials', async () => {
        await homePage.clickLogin();
        await loginPage.login(email, password);
        const isLoggedIn = await myAccountPage.isMyAccountPageExists();
        expect(isLoggedIn).toBeTruthy();
    });

    await test.step('2) Click Logout', async () => {
        await myAccountPage.clickLogout();
    });

    await test.step('3) Verify logout confirmation page and continue', async () => {
        const isLogoutPage = await logoutPage.isLogoutPageExists();
        expect(isLogoutPage).toBeTruthy();
        await logoutPage.clickContinue();
    });

    console.log('✅ Logout Flow completed successfully!');
});
