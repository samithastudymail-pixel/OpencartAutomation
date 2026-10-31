import { Page, Locator } from '@playwright/test';

export class RegisterPage {
    private readonly page: Page;

    // Locators
    private readonly txtFirstName: Locator;
    private readonly txtLastName: Locator;
    private readonly txtEmail: Locator;
    private readonly txtTelephone: Locator;
    private readonly txtPassword: Locator;
    private readonly txtConfirmPassword: Locator;
    private readonly chkAgree: Locator;
    private readonly btnContinue: Locator;
    private readonly lblPageHeading: Locator;

    constructor(page: Page) {
        this.page = page;

        // Initialize locators
        this.txtFirstName = page.locator('#input-firstname');
        this.txtLastName = page.locator('#input-lastname');
        this.txtEmail = page.locator('#input-email');
        this.txtTelephone = page.locator('#input-telephone');
        this.txtPassword = page.locator('#input-password');
        this.txtConfirmPassword = page.locator('#input-confirm');
        this.chkAgree = page.locator('input[name="agree"]');
        this.btnContinue = page.locator('input[type="submit"][value="Continue"]');
        this.lblPageHeading = page.locator('#content h1');
    }

    /**
     * Verify register page is displayed
     */
    async isRegisterPageExists(): Promise<boolean> {
        try {
            await this.page.waitForURL(/register/, { timeout: 5000 });
            const heading = await this.lblPageHeading.textContent();
            return heading?.toLowerCase().includes('register') || false;
        } catch (error) {
            console.log(`Error checking Register page: ${error}`);
            return false;
        }
    }

    /**
     * Register new customer
     */
    async registerCustomer(firstName: string, lastName: string, email: string, telephone: string, password: string): Promise<void> {
        await this.txtFirstName.fill(firstName);
        await this.txtLastName.fill(lastName);
        await this.txtEmail.fill(email);
        await this.txtTelephone.fill(telephone);
        await this.txtPassword.fill(password);
        await this.txtConfirmPassword.fill(password);
        await this.chkAgree.check();
        await this.btnContinue.click();
    }
}
