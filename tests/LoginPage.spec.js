import {test, expect} from '@playwright/test';

test('LoginPage', async ({page}) => {

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


});