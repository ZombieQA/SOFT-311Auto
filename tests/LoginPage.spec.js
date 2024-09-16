// LoginPage.js
export class LoginPage {
    constructor(page) {
        this.page = page;
        this.usernameInput = page.locator('#user-name');
        this.passwordInput = page.locator('#password');
        this.loginButton = page.locator('#login-button');
    }

    async navigate() {
        await this.page.goto("https://www.saucedemo.com");
    }

    async login(username, password) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    async getErrorMessage() {
        return this.page.locator('.error-message-container').innerText();
    }
}
ProductPage.js

javascript
Copy code
// ProductPage.js
export class ProductPage {
    constructor(page) {
        this.page = page;
        this.cartButton = page.locator('.shopping_cart_link');
        this.addToCartButton = page.locator('.btn_inventory');
        this.removeFromCartButton = page.locator('.btn_secondary');
        this.cartItems = page.locator('.cart_item');
    }

    async addToCart(productIndex = 0) {
        await this.page.locator(`.inventory_item:nth-of-type(${productIndex + 1}) .btn_inventory`).click();
    }

    async removeFromCart(productIndex = 0) {
        await this.page.locator(`.cart_item:nth-of-type(${productIndex + 1}) .btn_secondary`).click();
    }

    async goToCart() {
        await this.cartButton.click();
    }
}