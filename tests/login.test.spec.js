const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');
const InventoryPage = require('../pages/InventoryPage');
const CartPage = require('../pages/CartPage');
const CheckoutPage = require('../pages/CheckoutPage');

// Configuration for credentials and URLs
const validUsername = 'standard_user';
const validPassword = 'secret_sauce';
const invalidUsername = 'invalid_user';
const invalidPassword = 'invalid_pass';
const loginUrl = 'https://www.saucedemo.com';

test.describe('All Tests', () => {
    let loginPage;
    let inventoryPage;
    let cartPage;
    let checkoutPage;

    // Helper method for logging in
    const login = async (page, username, password) => {
        await loginPage.goto();
        await loginPage.login(username, password);
    };

    // Helper method to add an item to the cart
    const addItemToCart = async (page) => {
        const addToCartButton = page.locator('.inventory_item:nth-of-type(1) .btn_inventory');
        await addToCartButton.click();
        const cartBadge = page.locator('.shopping_cart_badge');
        await expect(cartBadge).toHaveText('1');
    };

    // Helper method to fill in checkout details
    const fillCheckoutDetails = async (page, firstName, lastName, postalCode) => {
        await page.locator('#first-name').fill(firstName);
        await page.locator('#last-name').fill(lastName);
        await page.locator('#postal-code').fill(postalCode);
    };

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        inventoryPage = new InventoryPage(page);
        cartPage = new CartPage(page);
        checkoutPage = new CheckoutPage(page);
    });

    test('TC-1 Login with valid credentials', async ({ page }) => {
        await login(page, validUsername, validPassword);
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
        await expect(inventoryPage.isInventoryVisible()).toBeTruthy();
    });

    test('TC-2 Login with incorrect password', async ({ page }) => {
        await login(page, validUsername, invalidPassword);
        const errorMessage = page.locator('[data-test="error"]');
        await expect(errorMessage).toContainText('Epic sadface: Username and password do not match any user in this service');
    });

    test('TC-3 Login with unregistered username', async ({ page }) => {
        await login(page, invalidUsername, validPassword);
        const errorMessage = page.locator('[data-test="error"]');
        await expect(errorMessage).toContainText('Epic sadface: Username and password do not match any user in this service');
    });

    test('TC-4 Login without credentials', async ({ page }) => {
        await login(page, '', '');
        const errorMessage = page.locator('[data-test="error"]');
        await expect(errorMessage).toContainText('Epic sadface: Username is required');
    });

    test('TC-5 Logout after login', async ({ page }) => {
        await login(page, validUsername, validPassword);
        await inventoryPage.logout();
        await expect(page).toHaveURL(loginUrl);
    });

    test('TC-6 Add product to cart from inventory page', async ({ page }) => {
        await login(page, validUsername, validPassword);
        await addItemToCart(page);
        await inventoryPage.viewCart();
        const cartItems = cartPage.locator('.cart_item');
        await expect(cartItems).not.toHaveLength(0);
    });

    test('TC-7 Add product to cart from product details page', async ({ page }) => {
        await login(page, validUsername, validPassword);
        await page.goto('https://www.saucedemo.com/inventory-item.html?id=4');
        const addToCartButton = page.locator('.btn_inventory');
        await addToCartButton.click();
        const cartBadge = page.locator('.shopping_cart_badge');
        await expect(cartBadge).toHaveText('1');
        await page.locator('.shopping_cart_link').click();
        const cartItem = page.locator('.cart_list .cart_item');
        await expect(cartItem).toBeVisible();
    });

    test('TC-8 Remove product from cart from inventory page', async ({ page }) => {
        await login(page, validUsername, validPassword);
        await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
        await page.locator('[data-test="shopping-cart-link"]').click();
        await page.locator('[data-test="item-4-title-link"]').click();
        await page.locator('[data-test="back-to-products"]').click();
        const removeButton = page.locator('[data-test="remove-sauce-labs-backpack"]');
        await removeButton.click();
        const cartBadge = page.locator('.shopping_cart_badge');
        await expect(cartBadge).not.toBeVisible();
    });

    test('TC-9 Remove product from cart from cart page', async ({ page }) => {
        await login(page, validUsername, validPassword);
        await addItemToCart(page);
        await page.locator('.shopping_cart_link').click();
        const removeButton = page.locator('.cart_item .btn_secondary');
        await removeButton.click();
        const cartItem = page.locator('.cart_list .cart_item');
        await expect(cartItem).not.toBeVisible();
    });

    test('TC-10 Checkout with products in the cart', async ({ page }) => {
        await login(page, validUsername, validPassword);
        await addItemToCart(page);
        await page.locator('.shopping_cart_link').click();
        await page.locator('#checkout').click();
        await fillCheckoutDetails(page, 'John', 'Doe', '12345');
        await page.locator('#continue').click();
        await page.locator('#finish').click();
        const completeHeader = page.locator('.complete-header');
        await expect(completeHeader).toHaveText('THANK YOU FOR YOUR ORDER!');
    });

    test('TC-11 Cannot proceed to checkout with an empty cart', async ({ page }) => {
        await login(page, validUsername, validPassword);
        await page.locator('.shopping_cart_link').click();
        const cartList = page.locator('.cart_list');
        await expect(cartList).toBeEmpty();
        const checkoutButton = page.locator('#checkout');
        await expect(checkoutButton).toBeDisabled();
    });
});