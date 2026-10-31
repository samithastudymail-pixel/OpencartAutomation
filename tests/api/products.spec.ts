import { test, expect } from '@playwright/test';
import { Routes } from '../../api/endpoints/routes';
import { RandomDataUtil } from '../../utils/dataGenerator';
import dotenv from 'dotenv';

dotenv.config();

test.describe('Products API Tests', () => {
    const BASE_URL = Routes.BASE_URL;

    test('Get All Products @master @sanity @api', async ({ request }) => {
        const response = await request.get(`${BASE_URL}${Routes.GET_ALL_PRODUCTS}`);

        expect(response.status()).toBe(200);

        const responseBody = await response.json();
        expect(Array.isArray(responseBody)).toBeTruthy();
        expect(responseBody.length).toBeGreaterThan(0);

        const product = responseBody[0];
        expect(product).toHaveProperty('id');
        expect(product).toHaveProperty('title');
        expect(product).toHaveProperty('price');
        expect(product).toHaveProperty('category');
        expect(product).toHaveProperty('image');
    });

    test('Get Product by ID @master @sanity @api', async ({ request }) => {
        const productId = Number(process.env.PRODUCT_ID) || 1;
        const url = Routes.GET_PRODUCT_BY_ID.replace('{id}', String(productId));

        const response = await request.get(`${BASE_URL}${url}`);

        expect(response.status()).toBe(200);

        const responseBody = await response.json();
        expect(responseBody.id).toBe(productId);
        expect(responseBody).toHaveProperty('title');
        expect(responseBody).toHaveProperty('price');
        expect(responseBody).toHaveProperty('category');
        expect(responseBody).toHaveProperty('description');
        expect(responseBody).toHaveProperty('image');
    });

    test('Get Products with Limit @master @sanity @api', async ({ request }) => {
        const limit = Number(process.env.LIMIT) || 3;
        const url = Routes.GET_PRODUCTS_WITH_LIMIT.replace('{limit}', String(limit));

        const response = await request.get(`${BASE_URL}${url}`);

        expect(response.status()).toBe(200);

        const responseBody = await response.json();
        expect(Array.isArray(responseBody)).toBeTruthy();
        expect(responseBody.length).toBe(limit);
    });

    test('Sort Products – Ascending @master @sanity @api', async ({ request }) => {
        const url = Routes.GET_PRODUCTS_SORTED.replace('{order}', 'asc');

        const response = await request.get(`${BASE_URL}${url}`);

        expect(response.status()).toBe(200);

        const responseBody = await response.json();
        expect(Array.isArray(responseBody)).toBeTruthy();

        const ids = responseBody.map((p: any) => p.id);
        for (let i = 0; i < ids.length - 1; i++) {
            expect(ids[i] <= ids[i + 1]).toBeTruthy();
        }
    });

    test('Sort Products – Descending @master @sanity @api', async ({ request }) => {
        const url = Routes.GET_PRODUCTS_SORTED.replace('{order}', 'desc');

        const response = await request.get(`${BASE_URL}${url}`);

        expect(response.status()).toBe(200);

        const responseBody = await response.json();
        expect(Array.isArray(responseBody)).toBeTruthy();

        const ids = responseBody.map((p: any) => p.id);
        for (let i = 0; i < ids.length - 1; i++) {
            expect(ids[i] >= ids[i + 1]).toBeTruthy();
        }
    });

    test('Get All Product Categories @master @sanity @api', async ({ request }) => {
        const response = await request.get(`${BASE_URL}${Routes.GET_ALL_CATEGORIES}`);

        expect(response.status()).toBe(200);

        const responseBody = await response.json();
        expect(Array.isArray(responseBody)).toBeTruthy();
        expect(responseBody.length).toBeGreaterThan(0);
    });

    test('Get Products by Category @master @sanity @api', async ({ request }) => {
        const category = 'electronics';
        const url = Routes.GET_PRODUCTS_BY_CATEGORY.replace('{category}', category);

        const response = await request.get(`${BASE_URL}${url}`);

        expect(response.status()).toBe(200);

        const responseBody = await response.json();
        expect(Array.isArray(responseBody)).toBeTruthy();
        expect(responseBody.length).toBeGreaterThan(0);

        for (const product of responseBody) {
            expect(product.category).toBe(category);
        }
    });

    test('Product CRUD – Create @master @regression @api', async ({ request }) => {
        const payload = RandomDataUtil.generateProductPayload();
        const response = await request.post(`${BASE_URL}${Routes.CREATE_PRODUCT}`, { data: payload });

        expect(response.status()).toBe(201);

        const responseBody = await response.json();
        expect(responseBody.id).toBeTruthy();
        expect(responseBody.title).toBe(payload.title);
        expect(responseBody.price).toBe(payload.price);
    });

    test('Product CRUD – Update @master @regression @api', async ({ request }) => {
        const productId = Number(process.env.PRODUCT_ID) || 1;
        const payload = RandomDataUtil.generateUpdatedProductPayload();
        const url = Routes.UPDATE_PRODUCT.replace('{id}', String(productId));

        const response = await request.put(`${BASE_URL}${url}`, { data: payload });

        expect(response.status()).toBe(200);

        const responseBody = await response.json();
        expect(responseBody.id).toBe(productId);
        expect(responseBody.title).toBe(payload.title);
    });

    test('Product CRUD – Delete @master @regression @api', async ({ request }) => {
        const productId = Number(process.env.PRODUCT_ID) || 1;
        const url = Routes.DELETE_PRODUCT.replace('{id}', String(productId));

        const response = await request.delete(`${BASE_URL}${url}`);

        expect(response.status()).toBe(200);
    });
});
