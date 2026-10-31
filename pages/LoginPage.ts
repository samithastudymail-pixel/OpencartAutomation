import { Page, Locator } from '@playwright/test';

export class LoginPage {
    private readonly page: Page;

    // Locators
    private readonly txtEmail: Locator;
    private readonly txtPassword: Locator;
    private readonly btnLogin: Locator;
    private readonly lblPageHeading: Locator;
    private readonly lblWarning: Locator;

    constructor(page: Page) {
        this.page = page;

        // Initialize locators
        this.txtEmail = page.locator('#input-email');
        this.txtPassword = page.locator('#input-password');
        this.btnLogin = page.locator('input[type="submit"][value="Login"]');
        this.lblPageHeading = page.locator('#content h2').first();
        this.lblWarning = page.locator('.alert.alert-danger');
    }

    /**
     * Verify login page is displayed
     */
    async isLoginPageExists(): Promise<boolean> {
        try {
            await this.page.waitForURL(/login/, { timeout: 5000 });
            return true;
        } catch (error) {
            console.log(`Error checking Login page: ${error}`);
            return false;
        }
    }

    /**
     * Perform login
     */
    async login(email: string, password: string): Promise<void> {
        await this.txtEmail.fill(email);
        await this.txtPassword.fill(password);
        await this.btnLogin.click();
    }

    /**
     * Get warning message
     */
    async getWarningMessage(): Promise<string> {
        try {
            await this.lblWarning.waitFor({ timeout: 5000 });
            const text = await this.lblWarning.textContent();
            return text?.trim() || '';
        } catch (error) {
            console.log(`Error getting warning message: ${error}`);
            return '';
        }
    }
}
