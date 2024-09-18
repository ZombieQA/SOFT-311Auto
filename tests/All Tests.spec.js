// login.test.spec.js
const { test, expect } = require('@playwright/test');

// Configuración de usuario
const validUsername = 'standard_user';
const validPassword = 'secret_sauce';
const invalidUsername = 'invalid_user';
const invalidPassword = 'invalid_pass';
const loginUrl = 'https://www.saucedemo.com';

test.describe('All Tests', () => {

    test('TC-1 Login con credenciales válidas', async ({ page }) => {
        await page.goto(loginUrl);
        await page.fill('#user-name', validUsername);
        await page.fill('#password', validPassword);
        await page.click('#login-button');
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
        await expect(page.locator('.inventory_list')).toBeVisible();
    });

    test('TC-2 Login con contraseña incorrecta', async ({ page }) => {
        await page.goto(loginUrl);
        await page.fill('#user-name', validUsername);
        await page.fill('#password', invalidPassword);
        await page.click('#login-button');
        await expect(page.locator('.error-message-container')).toHaveText('Username and password do not match any user in this service');
    });

    test('TC-3 Login con usuario no registrado', async ({ page }) => {
        await page.goto(loginUrl);
        await page.fill('#user-name', invalidUsername);
        await page.fill('#password', validPassword);
        await page.click('#login-button');
        await expect(page.locator('.error-message-container')).toHaveText('Username and password do not match any user in this service');
    });

    test('TC-4 Login sin credenciales', async ({ page }) => {
        await page.goto(loginUrl);
        await page.click('#login-button');
        await expect(page.locator('.error-message-container')).toHaveText('Epic sadface: Username is required');
    });

    test('TC-5 Logout después de iniciar sesión', async ({ page }) => {
        await page.goto(loginUrl);
        await page.fill('#user-name', validUsername);
        await page.fill('#password', validPassword);
        await page.click('#login-button');
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
        await page.click('#react-burger-menu-btn');
        await page.click('#logout_sidebar_link');
        await expect(page).toHaveURL(loginUrl);
    });

    test('TC-6 Añadir producto al carrito desde la página de inventario', async ({ page }) => {
        await page.goto(loginUrl);
        await page.fill('#user-name', validUsername);
        await page.fill('#password', validPassword);
        await page.click('#login-button');
        await page.click('.inventory_item:nth-of-type(1) .btn_inventory');
        await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
        await page.click('.shopping_cart_link');
        await expect(page.locator('.cart_list .cart_item')).toBeVisible();
    });

    test('TC-7 Añadir producto al carrito desde la página de detalles', async ({ page }) => {
        await page.goto(loginUrl);
        await page.fill('#user-name', validUsername);
        await page.fill('#password', validPassword);
        await page.click('#login-button');
        await page.goto('https://www.saucedemo.com/inventory-item.html?id=4');
        await page.click('.btn_inventory');
        await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
        await page.click('.shopping_cart_link');
        await expect(page.locator('.cart_list .cart_item')).toBeVisible();
    });

    test('TC-8 Eliminar producto del carrito desde la página de inventario', async ({ page }) => {
        await page.goto(loginUrl);
        await page.fill('#user-name', validUsername);
        await page.fill('#password', validPassword);
        await page.click('#login-button');
        await page.click('.inventory_item:nth-of-type(1) .btn_inventory');
        await page.click('.inventory_item:nth-of-type(1) .btn_inventory');
        await expect(page.locator('.shopping_cart_badge')).toHaveText('0');
    });

    test('TC-9 Eliminar producto del carrito desde la página del carrito', async ({ page }) => {
        await page.goto(loginUrl);
        await page.fill('#user-name', validUsername);
        await page.fill('#password', validPassword);
        await page.click('#login-button');
        await page.click('.inventory_item:nth-of-type(1) .btn_inventory');
        await page.click('.shopping_cart_link');
        await page.click('.cart_item .btn_secondary');
        await expect(page.locator('.cart_list .cart_item')).not.toBeVisible();
    });

    test('TC-10 Checkout con productos en el carrito', async ({ page }) => {
        await page.goto(loginUrl);
        await page.fill('#user-name', validUsername);
        await page.fill('#password', validPassword);
        await page.click('#login-button');
        await page.click('.inventory_item:nth-of-type(1) .btn_inventory');
        await page.click('.shopping_cart_link');
        await page.click('#checkout');
        await page.fill('#first-name', 'John');
        await page.fill('#last-name', 'Doe');
        await page.fill('#postal-code', '12345');
        await page.click('#continue');
        await page.click('#finish');
        await expect(page.locator('.complete-header')).toHaveText('THANK YOU FOR YOUR ORDER!');
    });

    test('TC-11 No se puede proceder al checkout sin productos en el carrito', async ({ page }) => {
        await page.goto(loginUrl);
        await page.fill('#user-name', validUsername);
        await page.fill('#password', validPassword);
        await page.click('#login-button');
        await page.click('.shopping_cart_link');
        await expect(page.locator('.cart_list')).toBeEmpty();
        await expect(page.locator('#checkout')).toBeDisabled();
    });
});