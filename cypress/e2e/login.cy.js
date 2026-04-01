import loginPage from "../../pages/loginPage";

describe("Login functionality", () => {
  it("login with valid credentials", () => {
    cy.visit("/auth/login");
    loginPage.login("customer3@practicesoftwaretesting.com", "pass123");
    cy.url().should("include", "/account");
  });

  it("login with Empty fields", () => {
    cy.visit("/auth/login");
    cy.get('[data-test="login-submit"]').click();
    cy.get("#email-error").should("have.text", "Email is required");
    cy.get("#password-error").should("have.text", "Password is required");
    cy.url().should("include", "/auth/login");
  });

  it("login with valid credentials", () => {
    cy.visit("/auth/login");
    loginPage.login("custome@practicesoftwaretesting.com", "pass123");
    cy.url().should("include", "/auth/login");
    cy.get(".help-block").should("have.text", "Invalid email or password");
  });
});
