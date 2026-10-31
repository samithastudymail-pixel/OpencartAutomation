import { test, expect } from '@playwright/test';
import { Routes } from '../../api/endpoints/routes';
import { RandomDataUtil } from '../../utils/dataGenerator';
import dotenv from 'dotenv';

dotenv.config();

test.describe('Carts API Tests', () => {
    const BASE_URL = Routes.BASE_URL;

    test('Get All Carts @master @sanity @api', async ({ request }) => {
        const response = await request.get(`${BASE_URL}${Routes.GET_ALL_CARTS}`);

        expect(response.status()).toBe(200);

        const responseBody = await response.json();
        expect(Array.isArray(responseBody)).toBeTruthy();
        expect(responseBody.length).toBeGreaterThan(0);
        expect(responseBody[0]).toHaveProperty('id');
        expect(responseBody[0]).toHaveProperty('userId');
        expect(responseBody[0]).toHaveProperty('products');
        expect(Array.isArray(responseBody[0].products)).toBeTruthy();
    });

    test('Get Cart by ID @master @sanity @api', async ({ request }) => {
        const cartId = Number(process.env.CART_ID) || 1;
        const url = Routes.GET_CART_BY_ID.replace('{id}', String(cartId));

        const response = await request.get(`${BASE_URL}${url}`);

        expect(response.status()).toBe(200);

        const responseBody = await response.json();
        expect(responseBody.id).toBe(cartId);
        expect(responseBody).toHaveProperty('userId');
        expect(Array.isArray(responseBody.products)).toBeTruthy();
    });

    test('Get Carts by Date Range @master @sanity @api', async ({ request }) => {
        const startDate = process.env.START_DATE || '2019-12-10';
        const endDate = process.env.END_DATE || '2020-10-10';
        const url = Routes.GET_CARTS_BY_DATE_RANGE
            .replace('{startdate}', startDate)
            .replace('{enddate}', endDate);

        const response = await request.get(`${BASE_URL}${url}`);

        expect(response.status()).toBe(200);

        const responseBody = await response.json();
        expect(Array.isArray(responseBody)).toBeTruthy();
    });

    test('Get User Cart @master @sanity @api', async ({ request }) => {
        const userId = Number(process.env.USER_ID) || 1;
        const url = Routes.GET_USER_CART.replace('{userId}', String(userId));

        const response = await request.get(`${BASE_URL}${url}`);

        expect(response.status()).toBe(200);

        const responseBody = await response.json();
        expect(Array.isArray(responseBody)).toBeTruthy();

        for (const cart of responseBody) {
            expect(cart.userId).toBe(userId);
        }
    });

    test('Get Carts with Limit @master @sanity @api', async ({ request }) => {
        const limit = 2;
        const url = Routes.GET_CARTS_WITH_LIMIT.replace('{limit}', String(limit));

        const response = await request.get(`${BASE_URL}${url}`);

        expect(response.status()).toBe(200);

        const responseBody = await response.json();
        expect(Array.isArray(responseBody)).toBeTruthy();
        expect(responseBody.length).toBe(limit);
    });

    test('Sort Carts Ascending @master @sanity @api', async ({ request }) => {
        const url = Routes.GET_CARTS_SORTED.replace('{order}', 'asc');

        const response = await request.get(`${BASE_URL}${url}`);

        expect(response.status()).toBe(200);

        const responseBody = await response.json();
        expect(Array.isArray(responseBody)).toBeTruthy();

        const ids = responseBody.map((c: any) => c.id);
        for (let i = 0; i < ids.length - 1; i++) {
            expect(ids[i] <= ids[i + 1]).toBeTruthy();
        }
    });

    test('Sort Carts Descending @master @sanity @api', async ({ request }) => {
        const url = Routes.GET_CARTS_SORTED.replace('{order}', 'desc');

        const response = await request.get(`${BASE_URL}${url}`);

        expect(response.status()).toBe(200);

        const responseBody = await response.json();
        expect(Array.isArray(responseBody)).toBeTruthy();

        const ids = responseBody.map((c: any) => c.id);
        for (let i = 0; i < ids.length - 1; i++) {
            expect(ids[i] >= ids[i + 1]).toBeTruthy();
        }
    });

    test('Cart CRUD – Create @master @regression @api', async ({ request }) => {
        const userId = Number(process.env.USER_ID) || 1;
        const payload = RandomDataUtil.generateCartPayload(userId);

        const response = await request.post(`${BASE_URL}${Routes.CREATE_CART}`, { data: payload });

        expect(response.status()).toBe(201);

        const responseBody = await response.json();
        expect(responseBody.id).toBeTruthy();
        expect(responseBody.userId).toBe(userId);
        expect(Array.isArray(responseBody.products)).toBeTruthy();
    });

    test('Cart CRUD – Update @master @regression @api', async ({ request }) => {
        const cartId = Number(process.env.CART_ID) || 1;
        const userId = Number(process.env.USER_ID) || 1;
        const payload = RandomDataUtil.generateUpdatedCartPayload(userId);
        payload.products[0].quantity = 5;

        const url = Routes.UPDATE_CART.replace('{id}', String(cartId));

        const response = await request.put(`${BASE_URL}${url}`, { data: payload });

        expect(response.status()).toBe(200);

        const responseBody = await response.json();
        expect(responseBody.id).toBe(cartId);
    });

    test('Cart CRUD – Delete @master @regression @api', async ({ request }) => {
        const cartId = Number(process.env.CART_ID) || 1;
        const url = Routes.DELETE_CART.replace('{id}', String(cartId));

        const response = await request.delete(`${BASE_URL}${url}`);

        expect(response.status()).toBe(200);
    });
});
