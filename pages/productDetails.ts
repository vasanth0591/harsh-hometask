import { Page, Locator } from "@playwright/test";

export class ProductDetails {
    readonly page: Page;
    readonly productName: Locator;
    readonly productImage: Locator;
    readonly price: Locator;
    readonly co2Badge: Locator;
    readonly description: Locator;
    readonly quantitySelector: Locator;
    readonly addToCartButton: Locator;
    readonly addToFavoritesButton: Locator;
    readonly outOfStockBadge: Locator;
    readonly decreaseQtyButton: Locator;
    readonly increaseQtyButton: Locator;
    readonly toast: Locator;
    readonly items: Locator;
    readonly homeButton: Locator;
    readonly selectFavorite: Locator;
    readonly dropdown: Locator;
    readonly deleteButton: Locator;
    readonly cardTitle: string;

    constructor(page: Page) {
        this.page = page;
        this.productName = page.locator('[data-test="product-name"]');
        this.productImage = page.locator('.figure-img');
        this.price = page.locator('[data-test="unit-price"]');
        this.co2Badge = page.locator('[data-test="co2-rating-badge"]');
        this.description = page.locator('#description');
        this.quantitySelector = page.locator('.quantity');
        this.addToCartButton = page.locator('#btn-add-to-cart');
        this.addToFavoritesButton = page.locator('#btn-add-to-favorites');
        this.outOfStockBadge = page.locator('[data-test="out-of-stock"]');
        this.decreaseQtyButton = page.locator('#btn-decrease-quantity');
        this.increaseQtyButton = page.locator('#btn-increase-quantity');
        this.toast = page.locator("#toast-container");
        this.items = page.locator('.card');
        this.homeButton = page.locator('[data-test="nav-home"]');
        this.selectFavorite = page.locator('[data-test="nav-my-favorites"]');
        this.dropdown = page.locator(".dropdown").nth(1);
        this.deleteButton = page.locator('[data-test="delete"]');
        this.cardTitle = ".card-title";
    }

    async addToFavourites() {
        await this.addToFavoritesButton.click();
    }
}