import './commands';
import 'cypress-metamask';

Cypress.Commands.add("goToPopUp", () => {
    const stub = cy.stub();
    return cy.on('window:alert', stub);
});

Cypress.Commands.add("waitingForElement", (selector) => {
    return cy.get(selector,{timeout:90000})
      .should('exist')
      .should('be.visible')
})

Cypress.Commands.add("waitingForXpathElement", (selector) => {
    return cy.xpath(selector, {timeout:90000})
      .should('exist')
      .should('be.visible')
});

Cypress.Commands.add('findElementWithText', (selector, text) => {
    cy.contains('span', text);
});

export function checkIfEleExists(ele){
    return new Promise((resolve,reject)=>{
        /// here if  ele exists or not
        cy.get('body').find( ele ).its('length').then(res=>{
            if(res > 0){
                //// do task that you want to perform
                // cy.get(ele).click().wait(2000);
                cy.log('!!!!!!!!!!!!!!!!!');
                resolve();
            }else{
                reject();
            }
        });
    })
}