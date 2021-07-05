
class QueriesPage {

	checkUserSuppliedKSM(data) {

	requestUserSupplied(data);

		function requestUserSuppliedDOT(data) {
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
					'params': ["5HGjWAeFDfFCWPsjFQdVV2Msvz2XtMktvgocEZcCj68kUMaw", {"UnderlyingAsset": "DOT"}]
				}
			}).then(response => {
				expect(response).property('status').to.equal(200);
				expect(response).property('body');
				expect(response).property('headers');
				return new Cypress.Promise((resolve, reject) => {
					let totalSupplied = JSON.stringify(response.body.result.amount)
					resolve(totalSupplied);
					let decimals = 18;
				  let total = `${totalSupplied.slice(0,	totalSupplied.length - decimals)}.${totalSupplied.slice(totalSupplied.length - decimals)}`
					expect(total).to.contain(data);
				})
			})

		}
	}

	checkUserBorrowedKSM(data){


		requestUserBorrowedDOT(data);

		function requestUserBorrowedDOT(data) {
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
					'params': ["5HGjWAeFDfFCWPsjFQdVV2Msvz2XtMktvgocEZcCj68kUMaw", { "UnderlyingAsset": "DOT" }]
				}
			}).then(response => {
				expect(response).property('status').to.equal(200);
				expect(response).property('body');
				expect(response).property('headers');
				return new Cypress.Promise((resolve, reject) => {
					let totalBorrowed = JSON.stringify(response.body.result.amount)
					resolve(totalBorrowed);
					let decimals = 18;
					let total = `${totalBorrowed.slice(0, totalBorrowed.length - decimals)}.${totalBorrowed.slice(totalBorrowed.length - decimals)}`
					expect(total).to.contain(data);
				})
			})
		}




	}



}

export default QueriesPage;