class ProductBrowsing {
  totalCount = 0;

  countOutOfStock() {
    cy.get('[data-test="product-name"]').should("be.visible");

    cy.get('[data-test="out-of-stock"]').then(($cards) => {
      this.totalCount += $cards.length;
    });
  }

  async goToNextPage() {
    cy.get(":nth-child(7)").then(($li) => {
      const isDisabled = $li.hasClass("disabled");
      cy.log(isDisabled);

      if (!isDisabled) {
        this.countOutOfStock();

        cy.get(":nth-child(7) > .page-link > span").click();
        this.goToNextPage();
      } else {
        this.countOutOfStock();

        cy.log("Total Out of Stock Items: " + this.totalCount);
      }
    });

    return this.totalCount;
  }
}

export default new ProductBrowsing();
