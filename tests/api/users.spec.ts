import { test, expect } from '@playwright/test';
import { Routes } from '../../api/endpoints/routes';
import { RandomDataUtil } from '../../utils/dataGenerator';
import dotenv from 'dotenv';

dotenv.config();

test.describe('Users API Tests', () => {
    const BASE_URL = Routes.BASE_URL;

    test('Get All Users @master @sanity @api', async ({ request }) => {
        const response = await request.get(`${BASE_URL}${Routes.GET_ALL_USERS}`);

        expect(response.status()).toBe(200);

        const responseBody = await response.json();
        expect(Array.isArray(responseBody)).toBeTruthy();
        expect(responseBody.length).toBeGreaterThan(0);
        expect(responseBody[0]).toHaveProperty('id');
        expect(responseBody[0]).toHaveProperty('email');
        expect(responseBody[0]).toHaveProperty('username');
    });

    test('Get User by ID @master @sanity @api', async ({ request }) => {
        const userId = Number(process.env.USER_ID) || 1;
        const url = Routes.GET_USER_BY_ID.replace('{id}', String(userId));

        const response = await request.get(`${BASE_URL}${url}`);

        expect(response.status()).toBe(200);

        const responseBody = await response.json();
        expect(responseBody.id).toBe(userId);
        expect(responseBody).toHaveProperty('email');
        expect(responseBody).toHaveProperty('username');
    });

    test('Get Users with Limit @master @sanity @api', async ({ request }) => {
        const limit = 2;
        const url = Routes.GET_USERS_WITH_LIMIT.replace('{limit}', String(limit));

        const response = await request.get(`${BASE_URL}${url}`);

        expect(response.status()).toBe(200);

        const responseBody = await response.json();
        expect(Array.isArray(responseBody)).toBeTruthy();
        expect(responseBody.length).toBe(limit);
    });

    test('Sort Users Ascending @master @sanity @api', async ({ request }) => {
        const url = Routes.GET_USERS_SORTED.replace('{order}', 'asc');

        const response = await request.get(`${BASE_URL}${url}`);

        expect(response.status()).toBe(200);

        const responseBody = await response.json();
        expect(Array.isArray(responseBody)).toBeTruthy();

        const ids = responseBody.map((u: any) => u.id);
        for (let i = 0; i < ids.length - 1; i++) {
            expect(ids[i] <= ids[i + 1]).toBeTruthy();
        }
    });

    test('Sort Users Descending @master @sanity @api', async ({ request }) => {
        const url = Routes.GET_USERS_SORTED.replace('{order}', 'desc');

        const response = await request.get(`${BASE_URL}${url}`);

        expect(response.status()).toBe(200);

        const responseBody = await response.json();
        expect(Array.isArray(responseBody)).toBeTruthy();

        const ids = responseBody.map((u: any) => u.id);
        for (let i = 0; i < ids.length - 1; i++) {
            expect(ids[i] >= ids[i + 1]).toBeTruthy();
        }
    });

    test('User CRUD – Create @master @regression @api', async ({ request }) => {
        const payload = RandomDataUtil.generateUserPayload();
        const response = await request.post(`${BASE_URL}${Routes.CREATE_USER}`, { data: payload });

        expect(response.status()).toBe(201);

        const responseBody = await response.json();
        expect(responseBody.id).toBeTruthy();
        expect(responseBody.email).toBe(payload.email);
        expect(responseBody.username).toBe(payload.username);
    });

    test('User CRUD – Update @master @regression @api', async ({ request }) => {
        const userId = Number(process.env.USER_ID) || 1;
        const payload = RandomDataUtil.generateUserUpdatePayload();
        const url = Routes.UPDATE_USER.replace('{id}', String(userId));

        const response = await request.put(`${BASE_URL}${url}`, { data: payload });

        expect(response.status()).toBe(200);

        const responseBody = await response.json();
        expect(responseBody.id).toBe(userId);
        expect(responseBody.email).toBe(payload.email);
    });

    test('User CRUD – Delete @master @regression @api', async ({ request }) => {
        const userId = Number(process.env.USER_ID) || 1;
        const url = Routes.DELETE_USER.replace('{id}', String(userId));

        const response = await request.delete(`${BASE_URL}${url}`);

        expect(response.status()).toBe(200);
    });
});
