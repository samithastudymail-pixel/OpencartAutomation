import { test, expect } from '@playwright/test';
import { Routes } from '../../api/endpoints/routes';
import { RandomDataUtil } from '../../utils/dataGenerator';
import dotenv from 'dotenv';

dotenv.config();

test.describe('End-to-End API Workflows', () => {
    const BASE_URL = Routes.BASE_URL;

    test('Product CRUD Workflow @master @regression @api @end-to-end', async ({ request }) => {
        // 1. Create a product
        const createPayload = RandomDataUtil.generateProductPayload();
        const createResponse = await request.post(`${BASE_URL}${Routes.CREATE_PRODUCT}`, { data: createPayload });
        expect(createResponse.status()).toBe(201);

        const createdProduct = await createResponse.json();
        const productId = createdProduct.id;
        expect(productId).toBeTruthy();

        // 2. Update the same product
        const updatePayload = RandomDataUtil.generateUpdatedProductPayload();
        const updateUrl = Routes.UPDATE_PRODUCT.replace('{id}', String(productId));
        const updateResponse = await request.put(`${BASE_URL}${updateUrl}`, { data: updatePayload });
        expect(updateResponse.status()).toBe(200);

        const updatedProduct = await updateResponse.json();
        expect(updatedProduct.title).toBe(updatePayload.title);

        // 3. Delete the same product
        const deleteUrl = Routes.DELETE_PRODUCT.replace('{id}', String(productId));
        const deleteResponse = await request.delete(`${BASE_URL}${deleteUrl}`);
        expect(deleteResponse.status()).toBe(200);
    });

    test('User CRUD Workflow @master @regression @api @end-to-end', async ({ request }) => {
        // 1. Create a user
        const createPayload = RandomDataUtil.generateUserPayload();
        const createResponse = await request.post(`${BASE_URL}${Routes.CREATE_USER}`, { data: createPayload });
        expect(createResponse.status()).toBe(201);

        const createdUser = await createResponse.json();
        const userId = createdUser.id;
        expect(userId).toBeTruthy();

        // 2. Update the same user
        const updatePayload = RandomDataUtil.generateUserUpdatePayload();
        const updateUrl = Routes.UPDATE_USER.replace('{id}', String(userId));
        const updateResponse = await request.put(`${BASE_URL}${updateUrl}`, { data: updatePayload });
        expect(updateResponse.status()).toBe(200);

        const updatedUser = await updateResponse.json();
        expect(updatedUser.email).toBe(updatePayload.email);

        // 3. Delete the same user
        const deleteUrl = Routes.DELETE_USER.replace('{id}', String(userId));
        const deleteResponse = await request.delete(`${BASE_URL}${deleteUrl}`);
        expect(deleteResponse.status()).toBe(200);
    });

    test('Cart CRUD Workflow @master @regression @api @end-to-end', async ({ request }) => {
        const userId = Number(process.env.USER_ID) || 1;

        // 1. Create a cart
        const createPayload = RandomDataUtil.generateCartPayload(userId);
        const createResponse = await request.post(`${BASE_URL}${Routes.CREATE_CART}`, { data: createPayload });
        expect(createResponse.status()).toBe(201);

        const createdCart = await createResponse.json();
        const cartId = createdCart.id;
        expect(cartId).toBeTruthy();
        expect(createdCart.userId).toBe(userId);
        expect(Array.isArray(createdCart.products)).toBeTruthy();

        // 2. Update the same cart
        const updatePayload = RandomDataUtil.generateUpdatedCartPayload(userId);
        updatePayload.products[0].quantity = 3;
        const updateUrl = Routes.UPDATE_CART.replace('{id}', String(cartId));
        const updateResponse = await request.put(`${BASE_URL}${updateUrl}`, { data: updatePayload });
        expect(updateResponse.status()).toBe(200);

        const updatedCart = await updateResponse.json();
        expect(updatedCart).toBeTruthy();

        // 3. Delete the same cart
        const deleteUrl = Routes.DELETE_CART.replace('{id}', String(cartId));
        const deleteResponse = await request.delete(`${BASE_URL}${deleteUrl}`);
        expect(deleteResponse.status()).toBe(200);
    });
});
