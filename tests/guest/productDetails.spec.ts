import { test, expect } from "@playwright/test";
import { ProductDetails } from "../../pages/ProductDetails";

test.describe("Product Details and Reviews Functionalities", () => {
    let productPage: ProductDetails;

    test.beforeEach(async ({ page }) => {
        productPage = new ProductDetails(page);
        await page.goto("/");
    });

    // TC-017
    test("View comprehensive product information", async () => {
        await productPage.page.waitForLoadState("networkidle");
        await productPage.items.first().click();

        await expect(productPage.productName).toBeVisible();
        await expect(productPage.price).toBeVisible();
        await expect(productPage.productImage).toBeVisible();
        await expect(productPage.outOfStockBadge).not.toBeVisible();
        await expect(productPage.co2Badge).toBeVisible();
        await expect(productPage.quantitySelector).toBeVisible();
        await expect(productPage.decreaseQtyButton).toBeEnabled();
        await expect(productPage.increaseQtyButton).toBeEnabled();
    });

    // TC-018
    test("View product in stock status", async () => {
        await productPage.page.waitForLoadState("networkidle");
        await productPage.items.first().click();

        await expect(productPage.outOfStockBadge).not.toBeVisible();
        await expect(productPage.quantitySelector).toBeVisible();
        await expect(productPage.decreaseQtyButton).toBeEnabled();
        await expect(productPage.increaseQtyButton).toBeEnabled();
        await expect(productPage.addToCartButton).toBeEnabled();
    });

    // TC-019
    test("View out of stock product", async () => {
        await productPage.page.waitForLoadState("networkidle");
        await productPage.items.nth(3).click();
        await productPage.page.waitForLoadState("networkidle");

        await expect(productPage.outOfStockBadge).toBeVisible();
        await expect(productPage.decreaseQtyButton).toBeDisabled();
        await expect(productPage.increaseQtyButton).toBeDisabled();
        await expect(productPage.addToCartButton).toBeDisabled();
    });
});