class CartPage {
    constructor(page) {
        this.page = page;
        this.cartItemsSelector = '.cart_list .cart_item';
        this.removeItemButton = '.cart_item .btn_secondary';
        this.checkoutButton = '#checkout';
        this.cartLink = '.shopping_cart_link';
    }

    async getCartItems() {
        return await this.page.$$(this.cartItemsSelector);
    }

    async removeItem() {
        await this.page.click(this.removeItemButton);
    }

    async proceedToCheckout() {
        await this.page.click(this.checkoutButton);
    }

    async isCheckoutDisabled() {
        return await this.page.isDisabled(this.checkoutButton);
    }
}

module.exports = CartPage;