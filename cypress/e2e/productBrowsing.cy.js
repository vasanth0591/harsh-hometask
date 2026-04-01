import productBrowsing from "../../pages/productBrowsing";

describe("Browser items", () => {
  it("check for all out of stock items", async () => {
    cy.visit("/");
    cy.wrap(await productBrowsing.goToNextPage()).should("equal", "4");
  });

  it("Applying multiple filtures", () => {
    cy.visit("/");
    cy.get(":nth-child(2) > ul > fieldset > :nth-child(5) > label")
      .click()
      .invoke("text")
      .then((filter1) => {
        cy.get(":nth-child(2) > ul > fieldset > :nth-child(7) > label")
          .click()
          .invoke("text")
          .then((filter2) => {
            cy.wait(2000);
            cy.get('[data-test="filter_completed"]').should("exist");
            cy.get(".card").then((cards) => {
              cy.wrap(cards).each((card) => {
                cy.wrap(card)
                  .invoke("text")
                  .should(
                    "match",
                    new RegExp(`${filter1.trim()}|${filter2.trim()}`, "i"),
                  );
              });
            });
          });
      });
  })
});
