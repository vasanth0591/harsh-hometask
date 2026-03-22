import { test, expect } from "@playwright/test";
import { ProductDetails } from "../../pages/ProductDetails";

test.describe("@loggedIn Product Details and Reviews Functionalities", () => {
    let productPage: ProductDetails;

    test.beforeEach(async ({ page }) => {
        productPage = new ProductDetails(page);

        await page.goto("/account");
        await productPage.homeButton.click();
        await productPage.page.waitForLoadState("networkidle");
        await productPage.items.first().click();

        const itemName = await productPage.productName.innerText();
        await productPage.addToFavourites();
    });

    // TC-020
    test("Add product to favourites", async () => {
        await expect(productPage.toast).toBeVisible();
    });

    // TC-022
    test("Check Product is added to favourites list or not", async () => {
        await expect(productPage.toast).toBeVisible();

        const itemName = await productPage.productName.innerText();

        await productPage.dropdown.click();
        await productPage.page.waitForLoadState("networkidle");
        await productPage.selectFavorite.click();
        await productPage.items.waitFor();

        const allItems = await productPage.items.all();
        let found = false;

        for (const item of allItems) {
            const title = await item.locator(productPage.cardTitle).innerText();
            if (title === itemName) {
                found = true;
                break;
            }
        }

        expect(found).toBeTruthy();
    });

    // TC-021
    test("Remove product from favourites", async () => {
        await expect(productPage.toast).toBeVisible();

        await productPage.dropdown.click();
        await productPage.page.waitForLoadState("networkidle");
        await productPage.selectFavorite.click();
        await productPage.page.waitForLoadState("networkidle");
        await productPage.items.waitFor();

        const cards = productPage.items;

        if (!(await cards.first().isVisible())) {
            console.error("Favourite List is Empty");
            return;
        }

        const itemName = await cards.first().locator(productPage.cardTitle).innerText();

        await cards.first().locator(productPage.deleteButton).click();
        await productPage.page.waitForTimeout(5000);

        const allItems = await cards.all();

        if (!(await cards.first().isVisible())) {
            console.error("Favourite List is Empty");
            return;
        }

        console.log(allItems);

        for (const item of allItems) {
            await expect(item.locator(productPage.cardTitle)).not.toHaveText(itemName);
        }
    });
});