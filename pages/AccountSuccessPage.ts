import { Page, Locator } from '@playwright/test';

export class AccountSuccessPage {
    private readonly page: Page;

    // Locators
    private readonly lblPageHeading: Locator;
    private readonly btnContinue: Locator;

    constructor(page: Page) {
        this.page = page;

        // Initialize locators
        this.lblPageHeading = page.locator('#content h1');
        this.btnContinue = page.locator('.buttons .pull-right a.btn.btn-primary');
    }

    /**
     * Verify account created page is displayed
     */
    async isAccountCreatedPageExists(): Promise<boolean> {
        try {
            await this.page.waitForURL(/success/, { timeout: 5000 });
            const heading = await this.lblPageHeading.textContent();
            return heading?.includes('Your Account Has Been Created') || heading?.toLowerCase().includes('created') || false;
        } catch (error) {
            console.log(`Error checking Account Success page: ${error}`);
            return false;
        }
    }

    /**
     * Get success message
     */
    async getSuccessMessage(): Promise<string> {
        try {
            const heading = await this.lblPageHeading.textContent();
            return heading?.trim() || '';
        } catch (error) {
            console.log(`Error getting success message: ${error}`);
            return '';
        }
    }
}
