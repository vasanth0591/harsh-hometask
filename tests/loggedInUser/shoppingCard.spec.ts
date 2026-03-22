import { test, expect } from "@playwright/test";
import { ShoppingCart } from "../../pages/shoppingCart";
import { LoginPage } from "../../pages/loginPage";

test.describe("Shopping Cart Functionalities", () => {

    let shoppingPage: ShoppingCart;

    test.beforeEach(async ({ page }) => {
        shoppingPage = new ShoppingCart(page);

        await page.goto("/");
        await expect(shoppingPage.cards.first()).toBeVisible();
        await page.waitForLoadState("networkidle");

        await shoppingPage.cards.first().click();
        await shoppingPage.addToCartButton.click();

        await expect(shoppingPage.alert).toBeVisible();
        await expect(shoppingPage.toast).toHaveText("Product added to shopping cart.");
    });

    test("Add single product to cart, View shopping cart, ", async ({ page }) => {

        await shoppingPage.cartButton.click();

        await shoppingPage.quantityInput.fill("5");
        expect(await shoppingPage.quantityInput.inputValue()).toBe("5");

        await shoppingPage.removeButton.click();
        await expect(shoppingPage.alert).toBeVisible();
    });

    test("Purchase a product", async ({ page }) => {

        await test.step("Proceed to checkout from cart", async () => {
            await shoppingPage.cartButton.click();
            await expect(shoppingPage.proceedToCheckout1).toBeVisible();
            await shoppingPage.proceedToCheckout1.click();
        });

        await test.step("Checkout without login", async () => {
            if (await shoppingPage.signinTab.isVisible()) {
                const loginPage = new LoginPage(page);
                await loginPage.login(
                    process.env.USER_USERNAME!,
                    process.env.USER_PASSWORD!
                );
            }
        });

        await test.step("Checkout with login", async () => {
            await expect(shoppingPage.proceedToCheckout2).toBeVisible();
            await shoppingPage.proceedToCheckout2.click();
        });

        await test.step("Enter invalid shipping address", async () => {
            await expect(shoppingPage.proceedToCheckout3)
                .toHaveAttribute("disabled");
        });

        await test.step("Enter valid shipping address", async () => {
            await shoppingPage.stateInput.fill("dkjhf");
            await shoppingPage.postalCodeInput.fill("dkjhf");

            await page.waitForLoadState("networkidle");

            await expect(shoppingPage.proceedToCheckout3).toBeVisible();
            await shoppingPage.proceedToCheckout3.click();
        });

        await test.step("Select shipping method", async () => {
            await shoppingPage.paymentDropdown.selectOption("Cash on Delivery");

            await expect(shoppingPage.confirmButton).toBeVisible();
            await shoppingPage.confirmButton.click();

            await expect(shoppingPage.paymentSuccessMessage).toBeVisible();
            await expect(shoppingPage.paymentSuccessMessage)
                .toHaveText("Payment was successful");
        });

        await test.step("Confirm payment", async () => {
            await shoppingPage.confirmButton.click();
            await expect(shoppingPage.orderConfirmation).toBeVisible();
        });

        await test.step("Cart should not be visible", async () => {
            await expect(shoppingPage.cartButton).toBeVisible();
        });
    });
});