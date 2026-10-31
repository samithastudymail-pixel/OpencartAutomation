/**
 * Test Case: User Registration Flow
 *
 * Tags: @master @sanity @regression @web
 *
 * Steps:
 * 1) Navigate to the application
 * 2) Navigate to My Account → Register
 * 3) Verify registration page is displayed
 * 4) Generate unique customer email
 * 5) Enter valid registration details
 * 6) Accept Privacy Policy
 * 7) Submit registration form
 * 8) Verify registration success
 * 9) Verify confirmation message
 */
import { test, expect } from '../../fixtures/pageFixtures';
import { RandomDataUtil } from '../../utils/dataGenerator';

test('User Registration Flow @master @sanity @regression @web', async ({ homePage, registerPage, accountSuccessPage }) => {
    const firstName = RandomDataUtil.getFirstName();
    const lastName = RandomDataUtil.getLastName();
    const email = RandomDataUtil.getEmail();
    const telephone = RandomDataUtil.getPhoneNumber();
    const password = RandomDataUtil.getPassword(10);

    await test.step('1) Navigate to Register page', async () => {
        await homePage.clickRegister();
    });

    await test.step('2) Verify registration page is displayed', async () => {
        const isRegisterPage = await registerPage.isRegisterPageExists();
        expect(isRegisterPage).toBeTruthy();
    });

    await test.step('3) Fill registration form and submit', async () => {
        await registerPage.registerCustomer(firstName, lastName, email, telephone, password);
    });

    await test.step('4) Verify registration succeeds and confirmation message', async () => {
        const isSuccessPage = await accountSuccessPage.isAccountCreatedPageExists();
        expect(isSuccessPage).toBeTruthy();
        const successMsg = await accountSuccessPage.getSuccessMessage();
        expect(successMsg).toContain('Your Account Has Been Created!');
    });

    console.log('✅ User Registration Flow completed successfully!');
});
