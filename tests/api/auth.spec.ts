import { test, expect } from '@playwright/test';
import { Routes } from '../../api/endpoints/routes';
import { RandomDataUtil } from '../../utils/dataGenerator';
import dotenv from 'dotenv';

dotenv.config();

test.describe('Authentication API Tests', () => {
    const BASE_URL = Routes.BASE_URL;

    test('Successful Login @master @sanity @api', async ({ request }) => {
        const payload = {
            username: process.env.USERNAME || 'mor_2314',
            password: process.env.PASSWORD || '83r5^_'
        };

        const response = await request.post(`${BASE_URL}${Routes.AUTH_LOGIN}`, { data: payload });

        expect(response.status()).toBe(201);

        const responseBody = await response.json();
        expect(responseBody.token).toBeTruthy();
        expect(typeof responseBody.token).toBe('string');
        expect(responseBody.token.length).toBeGreaterThan(0);
    });

    test('Invalid Login @master @sanity @api', async ({ request }) => {
        const payload = {
            username: 'invaliduser',
            password: 'invalidpass'
        };

        const response = await request.post(`${BASE_URL}${Routes.AUTH_LOGIN}`, { data: payload });

        expect(response.status()).toBe(401);

        const responseBody = await response.json();
        expect(responseBody.message).toBe('username or password is incorrect');
    });
});
