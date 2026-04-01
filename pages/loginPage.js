/// <reference types="cypress" />

class LoginPage {
  login(email, password) {
    cy.get("#email").type(email);
    cy.get("#password").type(password);
    cy.get('[data-test="login-submit"]').click();
  }
}

export default new LoginPage();
