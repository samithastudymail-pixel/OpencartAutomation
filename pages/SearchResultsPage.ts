import { Page, Locator } from '@playwright/test';

export class SearchResultsPage {
    private readonly page: Page;

    // Locators
    private readonly lblPageHeading: Locator;
    private readonly productLinks: Locator;

    constructor(page: Page) {
        this.page = page;

        // Initialize locators
        this.lblPageHeading = page.locator('#content h1');
        this.productLinks = page.locator('.product-thumb h4 a');
    }

    /**
     * Verify search results page is displayed
     */
    async isSearchResultsPageExists(): Promise<boolean> {
        try {
            const heading = await this.lblPageHeading.textContent();
            return heading?.toLowerCase().includes('search') || false;
        } catch (error) {
            console.log(`Error checking Search Results page: ${error}`);
            return false;
        }
    }

    /**
     * Open product by name
     */
    async openProduct(productName: string): Promise<void> {
        const product = this.productLinks.filter({ hasText: productName }).first();
        await product.click();
    }

    /**
     * Check if product exists in results
     */
    async isProductInResults(productName: string): Promise<boolean> {
        try {
            const product = this.productLinks.filter({ hasText: productName }).first();
            return await product.isVisible({ timeout: 5000 });
        } catch (error) {
            console.log(`Error checking product in results: ${error}`);
            return false;
        }
    }
}
