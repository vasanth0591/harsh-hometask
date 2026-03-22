import { Locator, Page, expect } from "@playwright/test";

export class ProductBrowsing {
    readonly page: Page;
    readonly searchInput: Locator;
    readonly searchButton: Locator;
    readonly results: Locator;
    readonly filterResults: Locator;
    readonly sortDropdown: Locator;
    readonly sortResults: Locator;
    readonly minSlider: Locator;
    readonly maxSlider: Locator;
    readonly priceRangeResult: Locator;


    constructor(page: Page) {
        this.page = page;
        this.searchInput = page.locator("#search-query");
        this.searchButton = page.locator('[data-test="search-submit"]');
        this.results = page.locator(".container[data-test='search_completed'] > a");
        this.filterResults = page.locator(".container[data-test='filter_completed'] > a");
        this.sortDropdown = page.locator('[data-test="sort"]');
        this.sortResults = page.locator(".container[data-test='sorting_completed'] > a");
        this.minSlider = page.locator(".ngx-slider-pointer-min");
        this.maxSlider = page.locator(".ngx-slider-pointer-max");
        this.priceRangeResult = page.locator(".card"); // need to update according to the selector

    }

    async searchProduct(keyword: string) {
        await this.searchInput.fill(keyword);
        await this.searchButton.click();
    }

    async filterByLabel(label: string) {
        await this.page.getByLabel(label).check();
        await this.filterResults.first().waitFor();
    }

    getProductTitle(locator: Locator) {
        return locator.locator(".card-title");
    }

    async getPrices(locator: Locator) {
        const texts = await locator.locator('[data-test="product-price"]').allTextContents();
        return texts.map(t => parseFloat(t.replace("$", "")));
    }

    async setPriceRange(min: number, max: number) {
        // Move min slider
        await this.minSlider.focus();
        for (let i = 0; i < min; i += 5) {
            await this.page.keyboard.press("ArrowRight");
        }

        // Move max slider
        await this.maxSlider.focus();
        for (let i = 200; i > max; i -= 5) {
            await this.page.keyboard.press("ArrowLeft");
        }

        await this.priceRangeResult.first().waitFor();
    }
}