/// <reference types="Cypress" />

import LandingPage from '../../../support/pageObjects/landingPage';
import AssetPage from '../../../support/pageObjects/assetPage';
import QueriesPage from '../../../support/pageObjects/queriesPage';
import keyring from '@polkadot/ui-keyring';
import promisify from 'cypress-promise';
import ApiService from '../../../support/pageObjects/api_service.js';
import { web3Accounts, web3Enable } from '@polkadot/extension-dapp';
import { formatData } from '../../../support/pageObjects/supportFunctions';


Cypress.on('uncaught:exception', (err, runnable) => {
	return false;
});

describe('Smoke tests: supply asset', function() {

	beforeEach(function() {
		cy.fixture('data.json').then(function(output) {
			this.data = output;
		});
	});

	before(async function() {
		await promisify(web3Enable('minterest-front-end'));
		let allAccounts = await promisify(web3Accounts());
		allAccounts = allAccounts.map(({ address, meta }) => ({
			address,
			meta: { ...meta, name: `${meta.name} (${meta.source})` },
		}));
		keyring.loadAll(
			{ isDevelopment: true },
			allAccounts,
		);
	});


	it(' User makes supply 50000  to pool DOT, enable Collateral  DOT and makes borrow 36000 to pool KSM', function() {
		const landingPage = new LandingPage();
		const assetPage = new AssetPage();

		cy.visit(Cypress.env('url'));
		landingPage.selectUserAccount();
		landingPage.clickDOTAsset();
		assetPage.clickSupplyBtn();
		cy.goToPopUp();
		assetPage.checkValuesBeforeSupply(this.data.defaultBalanceDOT, this.data.defaultBorrowLimit, this.data.defaultBorrowLimitUsed);
		assetPage.enterAmountSupply(this.data.supply_50000);
		assetPage.clickConfirmSupply();
		assetPage.checkSupplyValues(this.data.gasFeeSupplyDOT, this.data.defaultBalanceDOT, this.data.defaultBorrowLimit, this.data.defaultBorrowLimitUsedDuringOperation);
		cy.waitingForTransaction();
		cy.waitingForXpathElement(this.data.selectorEnablCollateral);
		assetPage.checkCollateralBtnStatus(this.data.collateralDisabled);
		assetPage.enableAsCollaterall();
		cy.goToPopUp();
		assetPage.checkGassFeeEnableCollateral(this.data.gasFeeEnableCollateral);
		assetPage.confirmEnableCollaterall();
		assetPage.clickLogo();
		landingPage.clickKSMAsset();
		cy.waitingForXpathElement(this.data.selectorBorrowBtn);
		assetPage.clickBorowBtn();
		cy.goToPopUp();
		assetPage.enterAmountBorrow(this.data.borrow_36000);
		assetPage.clickConfirmBorrow();
		assetPage.checkBorrowValues(this.data.gasFeeBorrowDOT, this.data.supply_50000, this.data.defaultBorrowLimit, this.data.borrow_36000, this.data.defaultBorrowLimitUsed);
		assetPage.checkCollateralBtnStatus(this.data.collateralDisabled);
		cy.waitingForTransaction();
		cy.reload();
		assetPage.clickLogo();
	});


	it.only('User makes supply 50000 to pool KSM, enable Collateral KSM and makes borrow 36000 to pool DOT', async () => {

		const landingPage = new LandingPage();
		const assetPage = new AssetPage();
		const queriesPage = new QueriesPage();

		cy.visit(Cypress.env('url'));
		landingPage.selectUserAccount();
		landingPage.clickKSMAsset();


		let userTotalBalance = await promisify(cy.getUserTotalBalance(Cypress.env('accountEve'), Cypress.env('underlingTokenKSM')));
		let userWalletBalance_API = formatData(userTotalBalance.free);
		cy.log(`userTotalBalance-${userWalletBalance_API}`);

		let userTotalSupply = await promisify(cy.getUserTotalSupply(Cypress.env('accountEve'), Cypress.env('underlingTokenKSM')));
		let userSupply_API = formatData(userTotalSupply.amount);
		cy.log(`userTotalSupply-${userSupply_API}`);

		let userTotalBorrow = await promisify(cy.getUserTotalBorrow(Cypress.env('accountEve'), Cypress.env('underlingTokenKSM')));
		let userBorrow_API = formatData(userTotalBorrow.amount);
		cy.log(`userTotalBorrow-${userBorrow_API}`);


		let collateralFactor = parseFloat(Cypress.env('collateralFactor'));
		let price = parseFloat(Cypress.env('price'));
		let borrowLimit = (userSupply_API * price * collateralFactor) - (userBorrow_API * price);
		let totalCollateral = userSupply_API * price * collateralFactor;
		let borrowLimitUsed = (userBorrow_API * price / totalCollateral) * 100;
		borrowLimitUsed = borrowLimitUsed.toFixed(2);

		cy.log(borrowLimit);
		cy.log(borrowLimitUsed);

		let newSupply = 50000;
		let borrowLimitAfterOperation = ((userSupply_API + newSupply) * price * collateralFactor) - (userBorrow_API * price);
		let totalCollateralAfterOperation = (userSupply_API + newSupply) * price * collateralFactor;
		let borrowLimitUsedAfterOperation = (userBorrow_API * price / totalCollateralAfterOperation) * 100;
		borrowLimitUsedAfterOperation = borrowLimitUsedAfterOperation.toFixed(2);

		cy.log(borrowLimitAfterOperation);
		cy.log(borrowLimitUsedAfterOperation);


		// assetPage.clickSupplyBtn();
		// cy.goToPopUp();
		// cy.wait(1000);
		// assetPage.enterAmountSupply(this.data.supplyDOT_50000);
		// cy.wait(1000);
		// assetPage.checkEstimatedGasFee(this.data.gasFeeSupplyDOT);
		// assetPage.checkWalletBalance(ucurrentBalanceDOT);
		// assetPage.checkBorrowLimit(borrowLimitDOT);
		// assetPage.checkBorrowLimit(borrowLimitDOTAfterOperation);
		// assetPage.checkBorrowLimitUsed(borrowLimitUsedDOT);
		// assetPage.checkBorrowLimitUsed(borrowLimitUsedDOTAfterOperation);


		///Extrinsic

		const { api } = ApiService;
		depositUnderlying({ UnderlyingAsset: 'KSM' }, '50000000000000000000000', '5HGjWAeFDfFCWPsjFQdVV2Msvz2XtMktvgocEZcCj68kUMaw');

		async function depositUnderlying(underlyingAssetId, convertedAmount, account) {
			const currentUser = keyring.getPair(account);
			if (currentUser.isLocked) {
				const injector = await promisify(web3FromAddress(currentUser));
				await promisify(api.tx.minterestProtocol
					.depositUnderlying(underlyingAssetId, convertedAmount)
					.signAndSend(currentUser, { signer: injector.signer }));
			} else {
				await promisify(api.tx.minterestProtocol
					.depositUnderlying(underlyingAssetId, convertedAmount)
					.signAndSend(currentUser));
			}
		}
	});

	///callateralEnable
	// await API.tx.minterestProtocol
	// 	.enableIsCollateral(castedCurrencyId)
	// 	.signAndSend()

//collateralDisable
// 	await API.tx.minterestProtocol
// 		.disableIsCollateral(castedCurrencyId)
// 		.signAndSend()



///borrow
// 	await API.tx.minterestProtocol
// 		.borrow(castedCurrencyId, convertedAmount)
// 		.signAndSend()

//withdrawAll
// 	await API.tx.minterestProtocol
// 		.redeem(castedCurrencyId)
// 		.signAndSend()


//withdrawPartUnderling
// 	await API.tx.minterestProtocol
// 		.redeemUnderlying(castedCurrencyId, convertedAmount)
// 		.signAndSend()


//withdrawPartWrap
// 	await API.tx.minterestProtocol
// 		.redeemWrapped(castedWrappedId, convertedAmount)
// 		.signAndSend()

	//repayAll
	// await API.tx.minterestProtocol
	// 	.repayAll(castedCurrencyId)
	// 	.signAndSend()


	//repayUnderling
	// await API.tx.minterestProtocol
	// 	.repay(castedCurrencyId, convertedAmount)
	// 	.signAndSend()
	//







	//calculation using data from API

	//assetPage.getValuesFromAssetAPI_DOT();
	// 	let totalSuppliedUser =  cy.requestUserTotalSupplied("DOT");
	//  console.log(`1=> ${totalSuppliedUser}`);
	//
	// 	function allValues() {
	//    cy.requestUserTotalSupplied("DOT");
	// }


	// const supply = await cy.requestUserTotalSupplied("DOT")
	//
	// cy.log(`!!! suply!! ${supply}`);

	// let newSupply;
	// let newBorrow;

	// Cypress.Promise.all([cy.requestUserTotalSupplied('DOT'), cy.requestUserTotalBorrowed("DOT")]).spread((a, b) => {
	// 	cy.log(a);
	// 	cy.log(b);
	// })

	// cy.wrap(null).then(() => {
	// 	return Promise.all([
	// 		cy.requestUserTotalSupplied('DOT'),
	// 		cy.requestUserTotalBorrowed("DOT")
	// 	])
	// }).then((...values) => {
	// 	 cy.log(values);
	// })

	// then(([value1, value2]) => {
	// 	// cy.log(values);
	// 	// newSupply = values[0];
	// 	// newBorrow = values[1];
	// 	cy.log(value1);
	// 	cy.log(value2);
	// });

	// cy.requestUserTotalSupplied('DOT').then(supply => {
	// 	newSupply = supply;
	// 	cy.log( `old ${supply}`);
	// }).then(() => {
	// 	console.log(`123 ${newSupply}`);
	// 	cy.log(`123 ${newSupply}`);
	// });


});

// it('spreads resolved values', () => {
// 	return Cypress.Promise.all([
// 		cy.requestUserTotalSupplied('DOT'),
// 		cy.requestUserTotalBorrowed("DOT")
// 	]).spread((a, b) => {
// 		cy.log(a)
// 		cy.log(b)
// 	})
// })

// 	cy.requestUserTotalBorrowed("DOT").then(borrow => {
// 		borrow1 = borrow;
// 		cy.log(borrow1);
// 	})
// })


// cy.readFile('cypress/fixtures/temp/Values/basic.json').then(({ userWalletBalanceDOT_API, userSuppliedDOT_API, userBorrowedDOT_API, }) => {
//
// 	let uSuppliedDOT_API = parseFloat(userSuppliedDOT_API);
// 	let uBorrowedDOT_API = parseFloat(userBorrowedDOT_API);
//   let uCurrentBalanceDOT = parseFloat(userWalletBalanceDOT_API);
//
// 	let collateralFactorDOT = parseFloat(Cypress.env('collateralFactor'));
// 	let priceDOT = parseFloat(Cypress.env('priceDOT'));
// 	let borrowLimitDOT = (uSuppliedDOT_API * priceDOT * collateralFactorDOT) - (uBorrowedDOT_API * priceDOT);
// 	let totalCollateralDOT = uSuppliedDOT_API * priceDOT * collateralFactorDOT;
// 	let borrowLimitUsedDOT = (uBorrowedDOT_API * priceDOT / totalCollateralDOT) * 100;
// 	borrowLimitUsedDOT = borrowLimitUsedDOT.toFixed(2);
//
// 	cy.log(borrowLimitDOT);
// 	cy.log(borrowLimitUsedDOT);
// 	cy.log(userWalletBalanceDOT_API);
//
// 	assetPage.checkValuesBeforeSupply();
// 	assetPage.clickSuplyBtn();
// 	cy.goToPopUp();
// 	cy.wait(1000);
// 	assetPage.enterAmountSupply(this.data.supplyDOT_50000);
// 	cy.wait(3000);
// 	assetPage.checkEstimatedGasFee(this.data.gasFeeSupplyDOT);
// 	// assetPage.checkWalletBalance(uCurrentBalanceDOT);
// 	// assetPage.checkBorrowLimit(borrowLimitDOT);
// 	// assetPage.checkBorrowLimit(borrowLimitDOTAfterOperation);
// 	// assetPage.checkBorrowLimitUsed(borrowLimitUsedDOT);
// 	// assetPage.checkBorrowLimitUsed(borrowLimitUsedDOTAfterOperation);
// 	assetPage.clickConfirmSupply();
// 	cy.wait(6000);
//
// });
//
// });



