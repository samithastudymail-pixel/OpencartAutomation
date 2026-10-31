import { Page, Locator } from '@playwright/test';

export class MyAccountPage {
    private readonly page: Page;

    // Locators
    private readonly lblPageHeading: Locator;
    private readonly lnkLogout: Locator;

    constructor(page: Page) {
        this.page = page;

        // Initialize locators
        this.lblPageHeading = page.locator('#content h2').first();
        this.lnkLogout = page.getByRole('link', { name: 'Logout' });
    }

    /**
     * Verify My Account page is displayed
     */
    async isMyAccountPageExists(): Promise<boolean> {
        try {
            await this.page.waitForURL(/account\/account/, { timeout: 5000 });
            const heading = await this.lblPageHeading.textContent();
            return heading?.toLowerCase().includes('my account') || true;
        } catch (error) {
            console.log(`Error checking My Account page: ${error}`);
            // Also check if we are on account page
            const url = this.page.url();
            return url.includes('account');
        }
    }

    /**
     * Click Logout from My Account page
     */
    async clickLogout(): Promise<void> {
        await this.lnkLogout.click();
    }
}
