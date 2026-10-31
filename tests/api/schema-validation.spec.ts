import { test, expect } from '@playwright/test';
import { Routes } from '../../api/endpoints/routes';
import { DataProvider } from '../../utils/DataReader';
import Ajv from 'ajv';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const ajv = new Ajv();

test.describe('JSON Schema Validation Tests', () => {
    const BASE_URL = Routes.BASE_URL;

    test('Product Response Schema @master @regression @api', async ({ request }) => {
        const productId = Number(process.env.PRODUCT_ID) || 1;
        const url = Routes.GET_PRODUCT_BY_ID.replace('{id}', String(productId));

        const response = await request.get(`${BASE_URL}${url}`);
        expect(response.status()).toBe(200);

        const responseBody = await response.json();
        const schemaPath = path.join(__dirname, '../../api/schemas/product_api_schema.json');
        const schema = DataProvider.readJson(schemaPath);

        const validate = ajv.compile(schema);
        const isValid = validate(responseBody);

        if (!isValid) {
            console.log('Schema validation errors:', validate.errors);
        }

        expect(isValid).toBeTruthy();
    });

    test('User Response Schema @master @regression @api', async ({ request }) => {
        const userId = Number(process.env.USER_ID) || 1;
        const url = Routes.GET_USER_BY_ID.replace('{id}', String(userId));

        const response = await request.get(`${BASE_URL}${url}`);
        expect(response.status()).toBe(200);

        const responseBody = await response.json();
        const schemaPath = path.join(__dirname, '../../api/schemas/user_api_schema.json');
        const schema = DataProvider.readJson(schemaPath);

        const validate = ajv.compile(schema);
        const isValid = validate(responseBody);

        if (!isValid) {
            console.log('Schema validation errors:', validate.errors);
        }

        expect(isValid).toBeTruthy();
    });

    test('Cart Response Schema @master @regression @api', async ({ request }) => {
        const cartId = Number(process.env.CART_ID) || 1;
        const url = Routes.GET_CART_BY_ID.replace('{id}', String(cartId));

        const response = await request.get(`${BASE_URL}${url}`);
        expect(response.status()).toBe(200);

        const responseBody = await response.json();
        const schemaPath = path.join(__dirname, '../../api/schemas/cart_api_schema.json');
        const schema = DataProvider.readJson(schemaPath);

        const validate = ajv.compile(schema);
        const isValid = validate(responseBody);

        if (!isValid) {
            console.log('Schema validation errors:', validate.errors);
        }

        expect(isValid).toBeTruthy();
    });
});
