import { Page, Locator } from "@playwright/test";

export class ShoppingCart {
    readonly page: Page;

    readonly cards: Locator;
    readonly addToCartButton: Locator;
    readonly toast: Locator;
    readonly alert: Locator;
    readonly cartButton: Locator;

    readonly quantityInput: Locator;
    readonly removeButton: Locator;

    readonly proceedToCheckout1: Locator;
    readonly proceedToCheckout2: Locator;
    readonly proceedToCheckout3: Locator;

    readonly signinTab: Locator;

    readonly stateInput: Locator;
    readonly postalCodeInput: Locator;

    readonly paymentDropdown: Locator;
    readonly confirmButton: Locator;

    readonly paymentSuccessMessage: Locator;
    readonly orderConfirmation: Locator;

    constructor(page: Page) {
        this.page = page;

        this.cards = page.locator(".card");
        this.addToCartButton = page.locator("#btn-add-to-cart");
        this.toast = page.locator("#toast-container");
        this.alert = page.getByRole("alert");
        this.cartButton = page.locator('[aria-label="cart"]');

        this.quantityInput = page.locator('[data-test="product-quantity"]');
        this.removeButton = page.locator('[data-icon="xmark"]');

        this.proceedToCheckout1 = page.locator('[data-test="proceed-1"]');
        this.proceedToCheckout2 = page.locator('[data-test="proceed-2"]');
        this.proceedToCheckout3 = page.locator('[data-test="proceed-3"]');

        this.signinTab = page.locator("#signin-tab");

        this.stateInput = page.locator("#state");
        this.postalCodeInput = page.locator("#postal_code");

        this.paymentDropdown = page.locator("#payment-method");
        this.confirmButton = page.getByText("Confirm");

        this.paymentSuccessMessage = page.locator('[data-test="payment-success-message"]');
        this.orderConfirmation = page.locator("#order-confirmation");
    }
}