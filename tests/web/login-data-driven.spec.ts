/**
 * Test Case: Login Flow (Data Driven using External File)
 *
 * Tags: @master @sanity @regression @datadriven @web
 *
 * Steps:
 * Load test data from external file and run tests for each row
 */
import { test, expect } from '../../fixtures/pageFixtures';
import { DataProvider } from '../../utils/DataReader';
import path from 'path';

const testDataPath = path.join(__dirname, '../../testdata/opencart_logindata.json');
const loginData = DataProvider.readJson(testDataPath);

for (let i = 0; i < loginData.length; i++) {
    const data = loginData[i];
    test(`Login Data Driven - ${data.testName} ${data.expected} - Row ${i + 1} @master @sanity @regression @datadriven @web`, async ({ homePage, loginPage, myAccountPage }) => {
        await test.step('Navigate to Login page', async () => {
            await homePage.clickLogin();
        });

        await test.step('Enter credentials and submit', async () => {
            const email = data.email === ' ' ? ' ' : data.email;
            const password = data.password === ' ' ? ' ' : data.password;
            await loginPage.login(email.trim(), password.trim());
        });

        await test.step('Validate result based on expected', async () => {
            if (data.expected === 'success') {
                const isMyAccountPage = await myAccountPage.isMyAccountPageExists();
                expect(isMyAccountPage).toBeTruthy();
            } else if (data.expected === 'failure') {
                const warningMsg = await loginPage.getWarningMessage();
                expect(warningMsg).toContain('Warning: No match for E-Mail Address and/or Password.');
            }
        });

        console.log(`✅ Login Data Driven test for ${data.testName} completed successfully!`);
    });
}
