import { test, expect } from "@playwright/test";
import { ProductBrowsing } from "../../pages/productBrowsing";

test.describe("Product Browsing and Search Functionalities", () => {
    let productPage: ProductBrowsing;

    test.beforeEach(async ({ page }) => {
        productPage = new ProductBrowsing(page);
        await page.goto("/");
    });

    // TC-023, 024 
    test("Search for products by keyword", async () => {
        const keyword = "Pliers";

        await productPage.searchProduct(keyword);
        let container = await productPage.results.all();
        for (let result of container) {
            await expect(productPage.getProductTitle(result)).toContainText(keyword);
        }
    });

    // TC-025
    test("Filter products by category", async () => {
        const label = "Screwdriver";

        await productPage.filterByLabel(label);
        let container = await productPage.filterResults.all();
        for (let result of container) {
            await expect(productPage.getProductTitle(result)).toContainText(label);
        }
    });

    // TC-026
    test("Filter products by multiple categories", async () => {
        test.setTimeout(60000);
        const labels = ["Screwdriver", "Drill"];

        for (const label of labels) {
            await productPage.filterByLabel(label);
        }
        let container = await productPage.filterResults.all();
        for (let result of container) {
            await expect(productPage.getProductTitle(result)).toContainText(new RegExp(labels.join("|")));
        }

    });

    // TC-027
    test("Filter products by brand", async ({ page }) => {
        test.setTimeout(60000);
        const brand = "ForgeFlex Tools";

        await productPage.filterByLabel(brand);
        const items = await productPage.filterResults.all();

        for (let result of items) {
            await productPage.getProductTitle(result).click();
            await expect(page.getByLabel('brand')).toHaveText(brand);
            await page.goBack();
            await productPage.filterByLabel(brand);
        }
    });

    // TC-029
    test("Sort products by price (Low → High)", async () => {
        test.setTimeout(60000);
        await productPage.sortDropdown.selectOption("Price (Low - High)");
        await productPage.sortResults.first().waitFor();

        const prices = await productPage.getPrices(productPage.sortResults);
        for (let i = 1; i < prices.length; i++) {
            expect(prices[i]).toBeGreaterThanOrEqual(prices[i - 1]);
        }
    });

    // TC-028
    test.fixme("Filter products by price range", async () => {
        const low = 50;
        const high = 150;

        await productPage.setPriceRange(low, high);

        const prices = await productPage.getPrices(productPage.priceRangeResult);

        for (const price of prices) {
            expect(price).toBeGreaterThanOrEqual(low);
            expect(price).toBeLessThanOrEqual(high);
        }
    });
});