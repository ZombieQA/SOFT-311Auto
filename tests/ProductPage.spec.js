import {test, expect} from '@playwright/test';

test('ProductPage', async ({page}) => {

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


});