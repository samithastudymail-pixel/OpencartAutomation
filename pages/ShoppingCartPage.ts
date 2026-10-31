import { Page, Locator } from '@playwright/test';

export class ShoppingCartPage {
    private readonly page: Page;

    // Locators
    private readonly lblPageHeading: Locator;
    private readonly productName: Locator;
    private readonly txtQuantity: Locator;
    private readonly lblUnitPrice: Locator;
    private readonly lblTotal: Locator;

    constructor(page: Page) {
        this.page = page;

        // Initialize locators
        this.lblPageHeading = page.locator('#content h1');
        this.productName = page.locator('.table.table-bordered tbody tr td.text-left a').first();
        this.txtQuantity = page.locator('input[name*="quantity"]').first();
        this.lblUnitPrice = page.locator('.table.table-bordered tbody tr td.text-right').nth(1);
        this.lblTotal = page.locator('.table.table-bordered tbody tr td.text-right').nth(3);
    }

    /**
     * Verify shopping cart page is displayed
     */
    async isShoppingCartPageExists(): Promise<boolean> {
        try {
            await this.page.waitForURL(/checkout\/cart/, { timeout: 5000 });
            const heading = await this.lblPageHeading.textContent();
            return heading?.toLowerCase().includes('shopping cart') || false;
        } catch (error) {
            console.log(`Error checking Shopping Cart page: ${error}`);
            return false;
        }
    }

    /**
     * Get product name in cart
     */
    async getProductNameInCart(): Promise<string> {
        try {
            const name = await this.productName.textContent();
            return name?.trim() || '';
        } catch (error) {
            console.log(`Error getting product name in cart: ${error}`);
            return '';
        }
    }

    /**
     * Get quantity in cart
     */
    async getQuantityInCart(): Promise<string> {
        try {
            const qty = await this.txtQuantity.inputValue();
            return qty;
        } catch (error) {
            console.log(`Error getting quantity in cart: ${error}`);
            return '';
        }
    }

    /**
     * Get unit price
     */
    async getUnitPrice(): Promise<string> {
        try {
            const price = await this.lblUnitPrice.textContent();
            return price?.trim() || '';
        } catch (error) {
            console.log(`Error getting unit price: ${error}`);
            return '';
        }
    }

    /**
     * Get total
     */
    async getTotal(): Promise<string> {
        try {
            const total = await this.lblTotal.textContent();
            return total?.trim() || '';
        } catch (error) {
            console.log(`Error getting total: ${error}`);
            return '';
        }
    }
}
