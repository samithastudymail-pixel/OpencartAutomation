/**
 * Test Case: Add Product to Cart
 *
 * Tags: @master @sanity @regression @web
 *
 * Steps:
 * 1) Navigate to application
 * 2) Search for product
 * 3) Open product details page
 * 4) Add product to cart
 * 5) Verify success message
 * 6) Open shopping cart and verify product and quantity
 */
import { test, expect } from '../../fixtures/pageFixtures';
import { Helper } from '../../utils/helper';

test('Add Product to Cart @master @sanity @regression @web', async ({ homePage, searchResultsPage, productPage, shoppingCartPage }) => {
    const { productName, productQuantity } = Helper.getProductDetails();

    await test.step('1) Search for product', async () => {
        await homePage.searchProduct(productName);
    });

    await test.step('2) Open product details page', async () => {
        const isProductInResults = await searchResultsPage.isProductInResults(productName);
        expect(isProductInResults).toBeTruthy();
        await searchResultsPage.openProduct(productName);
    });

    await test.step('3) Verify product details and add to cart', async () => {
        const isProductPage = await productPage.isProductPageExists();
        expect(isProductPage).toBeTruthy();
        await productPage.addToCart(productQuantity);
    });

    await test.step('4) Verify success message', async () => {
        const successMsg = await productPage.getSuccessMessage();
        expect(successMsg.length).toBeGreaterThan(0);
    });

    await test.step('5) Open shopping cart and verify product and quantity', async () => {
        await homePage.clickShoppingCart();
        const isCartPage = await shoppingCartPage.isShoppingCartPageExists();
        expect(isCartPage).toBeTruthy();
        const productInCart = await shoppingCartPage.getProductNameInCart();
        expect(productInCart).toContain(productName);
        const qtyInCart = await shoppingCartPage.getQuantityInCart();
        expect(qtyInCart).toBe(productQuantity);
    });

    console.log('✅ Add Product to Cart completed successfully!');
});
