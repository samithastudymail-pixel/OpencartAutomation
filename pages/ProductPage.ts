import { Page, Locator } from '@playwright/test';

export class ProductPage {
    private readonly page: Page;

    // Locators
    private readonly lblProductName: Locator;
    private readonly txtQuantity: Locator;
    private readonly btnAddToCart: Locator;
    private readonly lblSuccessMessage: Locator;

    constructor(page: Page) {
        this.page = page;

        // Initialize locators
        this.lblProductName = page.locator('#content h1').first();
        this.txtQuantity = page.locator('#input-quantity');
        this.btnAddToCart = page.locator('#button-cart');
        this.lblSuccessMessage = page.locator('.alert.alert-success');
    }

    /**
     * Verify product details are displayed
     */
    async isProductPageExists(): Promise<boolean> {
        try {
            const name = await this.lblProductName.textContent();
            return name ? name.length > 0 : false;
        } catch (error) {
            console.log(`Error checking Product page: ${error}`);
            return false;
        }
    }

    /**
     * Get product name
     */
    async getProductName(): Promise<string> {
        try {
            const name = await this.lblProductName.textContent();
            return name?.trim() || '';
        } catch (error) {
            console.log(`Error getting product name: ${error}`);
            return '';
        }
    }

    /**
     * Add product to cart with quantity
     */
    async addToCart(quantity: string = '1'): Promise<void> {
        await this.txtQuantity.fill(quantity);
        await this.btnAddToCart.click();
    }

    /**
     * Get success message
     */
    async getSuccessMessage(): Promise<string> {
        try {
            await this.lblSuccessMessage.waitFor({ timeout: 5000 });
            const text = await this.lblSuccessMessage.textContent();
            return text?.trim() || '';
        } catch (error) {
            console.log(`Error getting success message: ${error}`);
            return '';
        }
    }
}
