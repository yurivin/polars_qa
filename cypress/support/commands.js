
Cypress.Commands.add("goToPopUp", () => {
    const stub = cy.stub();
    return cy.on('window:alert', stub);
});

Cypress.Commands.add("waitingForElement", (selector) => {
    return cy.get(selector,{timeout:60000})
      .should('exist')
      .should('be.visible')
})

Cypress.Commands.add("waitingForXpathElement", (selector) => {
    return cy.xpath(selector, {timeout:60000})
      .should('exist')
      .should('be.visible')
});