class InventoryPage {
    constructor(page) {
        this.page = page;
        this.inventoryList = '.inventory_list';
        this.logoutButton = '#logout_sidebar_link';
        this.burgerMenuButton = '#react-burger-menu-btn';
        this.addToCartButton = '.inventory_item:nth-of-type(1) .btn_inventory';
        this.cartBadge = '.shopping_cart_badge';
        this.cartLink = '.shopping_cart_link';
    }

    async isInventoryVisible() {
        return await this.page.locator(this.inventoryList).isVisible();
    }

    async addItemToCart() {
        await this.page.click(this.addToCartButton);
    }

    async viewCart() {
        await this.page.click(this.cartLink);
    }

    async getCartItemCount() {
        return await this.page.textContent(this.cartBadge);
    }

    async logout() {
        await this.page.click(this.burgerMenuButton);
        await this.page.click(this.logoutButton);
    }
}

module.exports = InventoryPage;