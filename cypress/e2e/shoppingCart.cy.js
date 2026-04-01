import loginPage from "../../pages/loginPage";

describe("cart functionality", () => {
  it("add and remove a item from cart", () => {
    cy.visit("/");
    cy.get('[data-test="product-name"]').should("exist");
    cy.get(".card").first().click();
    cy.get('[data-test="add-to-cart"]').click();
    cy.get("#toast-container")
      .invoke("text")
      .should("match", new RegExp("Product added to shopping cart.", "i"));
    cy.get('[data-test="nav-cart"]').click();
    cy.get('[data-test="product-title"]').invoke("text");
    cy.get(".col-md-1 > .btn").click();
    cy.get("#toast-container")
      .invoke("text")
      .should("match", new RegExp("Product deleted."));
  });

  it("purchase an Item from cart", () => {
    cy.visit("/");
    cy.get('[data-test="product-name"]').should("exist");
    cy.get(".card").first().click();
    cy.get('[data-test="add-to-cart"]').click();
    cy.get("#toast-container")
      .invoke("text")
      .should("match", new RegExp("Product added to shopping cart.", "i"));
    cy.get('[data-test="nav-cart"]').click();
    cy.get('[data-test="proceed-1"]').click();
    loginPage.login("customer3@practicesoftwaretesting.com", "pass123");
    cy.get('[data-test="proceed-2"]').click();

    cy.get('[data-test="state"]').type("abcd");
    cy.get('[data-test="street"]').type("abcd");
    cy.get('[data-test="city"]').type("abcd");
    cy.get('[data-test="country"]').type("abcd");
    cy.get('[data-test="postal_code"]').type("888888");

    cy.get('[data-test="proceed-3"]').should("be.enabled").click();
    cy.get('[data-test="payment-method"]').select("Cash on Delivery");
    cy.get('[data-test="finish"]').should("be.enabled").click();
    cy.get('[data-test="payment-success-message"]')
      .invoke("text")
      .should("match", new RegExp("Payment was successful", "i"));
    cy.get('[data-test="finish"]').should("be.enabled").click();
  });
});
