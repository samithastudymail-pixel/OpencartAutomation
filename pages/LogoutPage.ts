import { Page, Locator } from '@playwright/test';
import { HomePage } from './HomePage';

export class LogoutPage {
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
     * Verify logout page is displayed
     */
    async isLogoutPageExists(): Promise<boolean> {
        try {
            const heading = await this.lblPageHeading.textContent();
            return heading?.toLowerCase().includes('account logout') || heading?.toLowerCase().includes('logout') || false;
        } catch (error) {
            console.log(`Error checking Logout page: ${error}`);
            return false;
        }
    }

    /**
     * Click Continue button
     */
    async clickContinue(): Promise<HomePage> {
        await this.btnContinue.click();
        return new HomePage(this.page);
    }
}
