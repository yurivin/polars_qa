/// <reference types="Cypress" />

import LandingPage from '../../../support/pageObjects/landingPage';
import AssetPage from '../../../support/pageObjects/assetPage';
import ApiService from '../../../support/pageObjects/api_service.js';
import { formatBalance } from '@polkadot/util';
import { formatData } from '../../../support/pageObjects/supportFunctions';
Cypress.on('uncaught:exception', (err, runnable) => {
	return false;
});

describe('Smoke tests: supply asset', function() {

	beforeEach(function() {
		cy.fixture('data').then(function(output) {
			this.data = output;
		});
		cy.fixture('savedData').then(function(outp) {
			this.savedData = outp;
		});
	});

	it('Precondition: User makes supply, enable Collateral and makes borrow ', function() {
		const landingPage = new LandingPage();
		const assetPage = new AssetPage();

		cy.visit(Cypress.env('url'));
		landingPage.selectUserAccount();
		landingPage.clickDOTAsset();
		assetPage.clickSuplyBtn();
		cy.goToPopUp();
		assetPage.enterAmountSupply(this.data.supplyDOT_50000);
		assetPage.clickConfirmSupply();
		cy.wait(5000);
		cy.waitingForXpathElement(this.data.selectorEnablCollateral);
		assetPage.checkCollateralBtnStatus(this.data.collateralDisabled);
		assetPage.enableAsCollaterall();
		assetPage.checkCollateralBtnStatus(this.data.collateralEnabled);
		assetPage.confirmEnableCollaterall();
		cy.waitingForXpathElement(this.data.selectorBorrowBtn);
		assetPage.clickBorowBtn();
		cy.goToPopUp();
		assetPage.enterAmountBorrow(this.data.borrowDOT_36000);
		assetPage.clickConfirmBorrow();
		assetPage.clickLogo();
	})

	it('User gets values from assetPageUI and API', function() {
		const landingPage = new LandingPage();
		const assetPage = new AssetPage();

		cy.visit(Cypress.env('url'));
		landingPage.selectUserAccount();
		landingPage.clickDOTAsset();
		assetPage.getValuesFromAssetUI_DOT();
		cy.readFile('cypress/fixtures/savedData.json').then(({currentBalanceDOT, totalSuppliedDOT,totalBorrowedDOT}) => {
			landingPage.checkUserWalletDOT(currentBalanceDOT);
			// landingPage.checkUserSuppliedDOT(totalSuppliedDOT);
			// landingPage.checkUserBorrowedDOT(totalBorrowedDOT);
		})
		//assetPage.getValuesFromAssetAPI_DOT();
	})

	it('User makes supply DOT and checks "borrowLimit" and "borrowLimitUsed" values ', function() {
		const landingPage = new LandingPage();
		const assetPage = new AssetPage();

		cy.visit(Cypress.env('url'));
		landingPage.selectUserAccount();
		landingPage.clickDOTAsset();

		cy.readFile('cypress/fixtures/savedData.json').then(({totalBorrowedDOT, totalSuppliedDOT,currentBalanceDOT}) => {
			let balanceWalletDOT = parseFloat(currentBalanceDOT);
			let valueSuppliedDOT = parseFloat(totalSuppliedDOT);
			let valueBorrowedDOT = parseFloat(totalBorrowedDOT);
			let collateralFactorDOT = parseFloat(Cypress.env('collateralFactor'));
			let priceDOT = parseFloat(Cypress.env('priceDOT'));
			let borrowLimitDOT = (valueSuppliedDOT * priceDOT * collateralFactorDOT) - (valueBorrowedDOT * priceDOT);
			let totalCollateralDOT = valueSuppliedDOT * priceDOT * collateralFactorDOT;
			let borrowLimitUsedDOT = (valueBorrowedDOT* priceDOT / totalCollateralDOT) * 100;
			borrowLimitUsedDOT = borrowLimitUsedDOT.toFixed(2);

			assetPage.clickSuplyBtn();
			cy.goToPopUp();
			cy.wait(1000);
			assetPage.enterAmountSupply(this.data.supplyDOT_50000);
			cy.wait(3000);
			assetPage.checkEstimatedGasFee(this.data.gasFeeSupplyDOT);
			let balanceWalletCurr = balanceWalletDOT.toString().replace('.', ',');
			assetPage.checkWalletBalance(`${balanceWalletCurr}`);
			assetPage.checkBorrowLimit(`${borrowLimitDOT}`);
			assetPage.checkBorrowLimitUsed(`${borrowLimitUsedDOT}`);
			assetPage.clickConfirmSupply();
			cy.wait(6000);
		})

	});

});