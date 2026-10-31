import { Page, Locator } from '@playwright/test';

export class HomePage {
    private readonly page: Page;

    // Locators
    private readonly lnkMyAccount: Locator;
    private readonly lnkRegister: Locator;
    private readonly lnkLogin: Locator;
    private readonly lnkLogout: Locator;
    private readonly txtSearch: Locator;
    private readonly btnSearch: Locator;
    private readonly lnkShoppingCart: Locator;

    constructor(page: Page) {
        this.page = page;

        // Initialize locators
        this.lnkMyAccount = page.locator('a[title="My Account"]').first();
        this.lnkRegister = page.getByRole('link', { name: 'Register' });
        this.lnkLogin = page.getByRole('link', { name: 'Login' });
        this.lnkLogout = page.getByRole('link', { name: 'Logout' });
        this.txtSearch = page.locator('input[name="search"]').first();
        this.btnSearch = page.locator('button[class*="btn-default"]').filter({ has: page.locator('i.fa-search') }).first();
        this.lnkShoppingCart = page.locator('a[title="Shopping Cart"]').first();
    }

    /**
     * Click My Account dropdown/link
     */
    async clickMyAccount(): Promise<void> {
        await this.lnkMyAccount.click();
    }

    /**
     * Click Register link
     */
    async clickRegister(): Promise<void> {
        await this.clickMyAccount();
        await this.lnkRegister.click();
    }

    /**
     * Click Login link
     */
    async clickLogin(): Promise<void> {
        await this.clickMyAccount();
        await this.lnkLogin.click();
    }

    /**
     * Perform product search
     */
    async searchProduct(productName: string): Promise<void> {
        await this.txtSearch.fill(productName);
        await this.btnSearch.click();
    }

    /**
     * Click Shopping Cart
     */
    async clickShoppingCart(): Promise<void> {
        await this.lnkShoppingCart.click();
    }

    /**
     * Check if authenticated options are available
     */
    async isMyAccountDropdownVisible(): Promise<boolean> {
        try {
            return await this.lnkMyAccount.isVisible();
        } catch (error) {
            console.log(`Error checking My Account: ${error}`);
            return false;
        }
    }
}
