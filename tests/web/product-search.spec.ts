/**
 * Test Case: Product Search Flow
 *
 * Tags: @master @sanity @regression @web
 *
 * Steps:
 * 1) Navigate to application
 * 2) Enter product name in search field
 * 3) Submit search
 * 4) Verify search results page
 * 5) Verify expected product appears
 */
import { test, expect } from '../../fixtures/pageFixtures';
import { Helper } from '../../utils/helper';

test('Product Search Flow @master @sanity @regression @web', async ({ homePage, searchResultsPage }) => {
    const { productName } = Helper.getProductDetails();

    await test.step('1) Search for product', async () => {
        await homePage.searchProduct(productName);
    });

    await test.step('2) Verify search results page and product appears', async () => {
        const isSearchResultsPage = await searchResultsPage.isSearchResultsPageExists();
        expect(isSearchResultsPage).toBeTruthy();
        const isProductPresent = await searchResultsPage.isProductInResults(productName);
        expect(isProductPresent).toBeTruthy();
    });

    console.log('✅ Product Search Flow completed successfully!');
});
