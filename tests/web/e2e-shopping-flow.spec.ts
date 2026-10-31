/**
 * Test Case: End-to-End Shopping Flow
 *
 * Tags: @master @sanity @regression @end-to-end @web
 *
 * Steps:
 * 1) Register a new customer
 * 2) Logout
 * 3) Login again with newly created credentials
 * 4) Search for product
 * 5) Add product to cart
 * 6) Verify cart details
 */
import { test, expect } from '../../fixtures/pageFixtures';
import { RandomDataUtil } from '../../utils/dataGenerator';
import { Helper } from '../../utils/helper';

test('End-to-End Shopping Flow @master @sanity @regression @end-to-end @web', async ({ 
    homePage, 
    registerPage, 
    accountSuccessPage, 
    myAccountPage, 
    loginPage, 
    logoutPage,
    searchResultsPage,
    productPage,
    shoppingCartPage
}) => {
    const firstName = RandomDataUtil.getFirstName();
    const lastName = RandomDataUtil.getLastName();
    const email = RandomDataUtil.getEmail();
    const telephone = RandomDataUtil.getPhoneNumber();
    const password = RandomDataUtil.getPassword(10);
    const { productName, productQuantity } = Helper.getProductDetails();

    await test.step('1) Register a new customer', async () => {
        await homePage.clickRegister();
        const isRegisterPage = await registerPage.isRegisterPageExists();
        expect(isRegisterPage).toBeTruthy();
        await registerPage.registerCustomer(firstName, lastName, email, telephone, password);
        const isSuccessPage = await accountSuccessPage.isAccountCreatedPageExists();
        expect(isSuccessPage).toBeTruthy();
    });

    await test.step('2) Logout', async () => {
        // Navigate to logout via My Account
        await homePage.clickMyAccount();
        await myAccountPage.clickLogout();
        const isLogoutPage = await logoutPage.isLogoutPageExists();
        expect(isLogoutPage).toBeTruthy();
        await logoutPage.clickContinue();
    });

    await test.step('3) Login again with newly created credentials', async () => {
        await homePage.clickLogin();
        await loginPage.login(email, password);
        const isMyAccountPage = await myAccountPage.isMyAccountPageExists();
        expect(isMyAccountPage).toBeTruthy();
    });

    await test.step('4) Search for product and open product page', async () => {
        await homePage.searchProduct(productName);
        const isProductInResults = await searchResultsPage.isProductInResults(productName);
        expect(isProductInResults).toBeTruthy();
        await searchResultsPage.openProduct(productName);
        const isProductPage = await productPage.isProductPageExists();
        expect(isProductPage).toBeTruthy();
    });

    await test.step('5) Add product to cart', async () => {
        await productPage.addToCart(productQuantity);
        const successMsg = await productPage.getSuccessMessage();
        expect(successMsg.length).toBeGreaterThan(0);
    });

    await test.step('6) Verify cart details', async () => {
        await homePage.clickShoppingCart();
        const isCartPage = await shoppingCartPage.isShoppingCartPageExists();
        expect(isCartPage).toBeTruthy();
        const productInCart = await shoppingCartPage.getProductNameInCart();
        expect(productInCart).toContain(productName);
        const qtyInCart = await shoppingCartPage.getQuantityInCart();
        expect(qtyInCart).toBe(productQuantity);
        const unitPrice = await shoppingCartPage.getUnitPrice();
        expect(unitPrice.length).toBeGreaterThan(0);
        const total = await shoppingCartPage.getTotal();
        expect(total.length).toBeGreaterThan(0);
    });

    console.log('✅ End-to-End Shopping Flow completed successfully!');
});
