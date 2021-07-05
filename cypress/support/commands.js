import ApiService from './pageObjects/api_service';
const { api } = ApiService;

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


Cypress.Commands.add("waitingForTransaction", () => {
    return cy.wait(7000);
});


Cypress.Commands.add("getUserTotalBalance", (account, currencyId) => {
    return api.query.tokens.accounts(account, { UnderlyingAsset: currencyId }).then(response => {
        return response;
    });
});


Cypress.Commands.add("getUserTotalSupply", (account,currencyId) => {
    return api.rpc.controller.getUserUnderlyingBalancePerAsset(account, { UnderlyingAsset: currencyId }).then(response => {
        return response;
    });
});


Cypress.Commands.add("getUserTotalBorrow", (account,currencyId) => {
    return api.rpc.controller.getUserBorrowPerAsset(account, { UnderlyingAsset: currencyId }).then(response => {
        return response;
    });

});



Cypress.Commands.add("requestUserTotalSupplied", (currency) => {

    return cy.request({
        method: 'POST',
        url: 'http://localhost:9933/',
        headers: {
            'Content-Type': 'application/json'
        },
        body: {
            'jsonrpc': '2.0',
            'id': 1,
            'method': 'controller_getUserUnderlyingBalancePerAsset',
            'params': ["5HGjWAeFDfFCWPsjFQdVV2Msvz2XtMktvgocEZcCj68kUMaw", { "UnderlyingAsset": currency }]
        }
    }).then(response => {
        expect(response).property('status').to.equal(200);
        expect(response).property('body');
        expect(response).property('headers');
        return new Cypress.Promise((resolve, reject) => {
            let totalSupplied = JSON.stringify(response.body.result.amount)
            let decimals = 18;
            let total = `${totalSupplied.slice(0, totalSupplied.length - decimals)}.${totalSupplied.slice(totalSupplied.length - decimals)}`;
            resolve(total)
            return total

        });
    });
});

Cypress.Commands.add("requestUserTotalBorrowed", (currency) => {

    return cy.request({
        method: 'POST',
        url: 'http://localhost:9933/',
        headers: {
            'Content-Type': 'application/json'
        },
        body: {
            'jsonrpc': '2.0',
            'id': 1,
            'method': 'controller_getUserBorrowPerAsset',
            'params': ["5HGjWAeFDfFCWPsjFQdVV2Msvz2XtMktvgocEZcCj68kUMaw", { "UnderlyingAsset": currency }]
        }
    }).then(response => {
        expect(response).property('status').to.equal(200);
        expect(response).property('body');
        expect(response).property('headers');
        return new Cypress.Promise((resolve, reject) => {
            let totalBorrowed = JSON.stringify(response.body.result.amount)
            let decimals = 18;
            let total = `${totalBorrowed.slice(0, totalBorrowed.length - decimals)}.${totalBorrowed.slice(totalBorrowed.length - decimals)}`;
            resolve(total);
        })
    })

});