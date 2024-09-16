// login.test.spec.js
import { test, expect } from '@playwright/test';
import { LoginPage } from './LoginPage';
import { ProductPage } from './ProductPage';

// Constants for test cases
const USERNAME = 'standard_user';
const PASSWORD = 'secret_sauce';
const WRONG_PASSWORD = 'wrong_password';
const INVALID_USER = 'invalid_user';

test('TC-1 inicio de sesión valido', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.login(USERNAME, PASSWORD);

    const productPage = new ProductPage(page);
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
});

test('TC-2 Inicio de sesión contraseña incorrecta', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.login(USERNAME, WRONG_PASSWORD);

    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toContain('Username and password do not match any user in this service');
});

test('TC-3 Inicio de sesión Usuario no registrado', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.login(INVALID_USER, PASSWORD);

    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toContain('Username and password do not match any user in this service');
});

test('TC-4 Inicio de sesión campos vacios', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.login('', '');

    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toContain('Username is required');
});

test('TC-5 Cerrar sesión', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.login(USERNAME, PASSWORD);

    const productPage = new ProductPage(page);
    await productPage.goToCart();
    await page.locator('#react-burger-menu-btn').click();
    await page.locator('#logout_sidebar_link').click();

    await expect(page).toHaveURL('https://www.saucedemo.com/');
});

test('TC-6 Añadir Producto al Carrito', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.login(USERNAME, PASSWORD);

    const productPage = new ProductPage(page);
    await productPage.addToCart();

    await productPage.goToCart();
    await expect(productPage.cartItems).toHaveCount(1);
});

test('TC-7 Añadir Producto al Carrito del detalle', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.login(USERNAME, PASSWORD);

    const productPage = new ProductPage(page);
    await productPage.addToCart();

    await productPage.goToCart();
    await expect(productPage.cartItems).toHaveCount(1);
});

test('TC-8 Eliminar Producto del Carrito', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.login(USERNAME, PASSWORD);

    const productPage = new ProductPage(page);
    await productPage.addToCart();
    await productPage.goToCart();
    await productPage.removeFromCart();

    await expect(productPage.cartItems).toHaveCount(0);
});

test('TC-9 Eliminar Producto del Carrito del detalle', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.login(USERNAME, PASSWORD);

    const productPage = new ProductPage(page);
    await productPage.addToCart();
    await productPage.goToCart();
    await productPage.removeFromCart();

    await expect(productPage.cartItems).toHaveCount(0);
});

test('TC-10 Eliminar Producto del Carrito desde Carrito', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.login(USERNAME, PASSWORD);

    const productPage = new ProductPage(page);
    await productPage.addToCart();
    await productPage.goToCart();
    await productPage.removeFromCart();

    await expect(productPage.cartItems).toHaveCount(0);
});

test('TC-11 Proceso de Checkout', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.login(USERNAME, PASSWORD);

    const productPage = new ProductPage(page);
    await productPage.addToCart();
    await productPage.goToCart();
    await page.locator('#checkout').click();

    await page.locator('#first-name').fill('John');
    await page.locator('#last-name').fill('Doe');
    await page.locator('#postal-code').fill('12345');
    await page.locator('#continue').click();

    await expect(page).toHaveURL(/.*checkout-step-two.html/);
});

test('TC-12 Proceso de Checkout sin productos', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.login(USERNAME, PASSWORD);

    await page.locator('#checkout').click();

    const errorMessage = await page.locator('.error-message-container').innerText();
    expect(errorMessage).toContain('Your cart is empty');
});