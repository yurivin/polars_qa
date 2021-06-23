import ApiService from './api_service';
import { formatData } from './supportFunctions';

class AssetPage {

	clickSuplyBtn() {
		return cy.xpath('.//button[contains(text(), "Supply")]').click();
	}

	enterAmountSupply(data){
		return cy.get('input[placeholder="Enter the amount"]').type(data);
	}

	checkEstimatedGasFee(data){
		cy.get('div.block-fee > div.value > span').then((elem) => {
			const value = elem.text();
			return expect(value).to.contain(data);
		});
	}

	checkWalletBalance(data){
		cy.xpath('.//div[2]/form/div[2]/div[2]/div[2]/span').then((elem) => {
			const value = elem.text();
			return expect(value).to.contain(data);
		});
	}

	checkBorrowLimit(data){
		cy.get('div:nth-child(3) > div.value > span').then((elem) => {
			const value = elem.text();
			return expect(value).to.contain(data);
		});
	}

	checkBorrowLimitUsed(data){
		cy.get('div:nth-child(4) > div.value > span').then((elem) => {
			const value = elem.text();
			return expect(value).to.contain(data);
		});
	}

	clickConfirmSupply(){
		return cy.xpath('.//button[contains(text(), "Confirm")]' ).click();
	}

	checkCollateralBtnStatus(data){
		cy.get('div.header-actions > div:nth-child(2) > button').then((elem) => {
			const value = elem.text();
			return expect(value).to.contain(data);
		});
	}

	enableAsCollaterall(){
		return cy.xpath('//*[@id="root"]/div/div[2]/div[2]/div[2]/button', {timeout:60000}).click();
	}

	confirmEnableCollaterall(){
		return cy.xpath('.//div[3]/div/div/div[2]/div/div[2]/button[1]', {timeout:60000}).click();
	}

	clickBorowBtn(){
		return cy.xpath('//*[@id="root"]/div/div[2]/div[3]/div[3]/div[2]/div[3]/div[2]/button', {timeout:60000}).click();
	}

	enterAmountBorrow(data){
		return cy.get('input[name="borrowAmount"]').type(data);
	}

	clickConfirmBorrow(){
		return cy.get('form > div.actions > button:nth-child(1)').click();
	}

	clickLogo(){
		return cy.get('div:nth-child(1) > div > div.logo > div > a').click();
	}

	getValuesFromAssetUI_DOT(){
		let balance;
		let valueSupplied;
		let valueBorrowed;

		cy.get('div:nth-child(1) > div.block-body > div:nth-child(1) > div.value > span').then((elem) => {
			let value = elem.text();
			balance = value.replace(',', '.');
		});

		cy.get(' div:nth-child(1) > div.block-body > div:nth-child(2) > div.value > span').then((elem) => {
			let value = elem.text();
			valueSupplied = value.replace(',', '.');
		});

		cy.get('div:nth-child(3) >div.block-body > div:nth-child(1) > div.value > span').then((elem) => {
			let value = elem.text();
			valueBorrowed = value.replace(',', '.');
			cy.writeFile('cypress/fixtures/savedData.json', {
				totalBorrowedDOT: valueBorrowed,
				totalSuppliedDOT: valueSupplied,
				currentBalanceDOT: balance
			});
		});
	}

	getValuesFromAssetAPI_DOT(){
		const { api } = ApiService;
		let userWalletBalanceDOT_API;
		let userSuppliedDOT_API;
		let userBorrowedDOT_API;

		api.query.tokens.accounts("5HGjWAeFDfFCWPsjFQdVV2Msvz2XtMktvgocEZcCj68kUMaw",{UnderlyingAsset: 'DOT'}).then((obj) =>{
			userWalletBalanceDOT_API = formatData(obj.free);
			console.log(`userWalletBalanceDOT_API- ${userWalletBalanceDOT_API}`);
		});

		// cy.writeFile('cypress/fixtures/savedData.json', {
		// 	totalBorrowedDOT_API: userWalletBalanceDOT_API
		// });


		// api.rpc.controller.getUserUnderlyingBalancePerAsset("5HGjWAeFDfFCWPsjFQdVV2Msvz2XtMktvgocEZcCj68kUMaw",{UnderlyingAsset: 'DOT'}).then((obj) =>{
		// 	userSuppliedDOT = formatData(obj.free);
		// 	console.log(userSuppliedDOT);
		// })
		//
		// api.rpc.controller.getUserBorrowPerAsset("5HGjWAeFDfFCWPsjFQdVV2Msvz2XtMktvgocEZcCj68kUMaw",{UnderlyingAsset: 'DOT'}).then((obj) =>{
		// 	userBorrowedDOT = formatData(obj.free);
		// 	console.log(userBorrowedDOT);
		// })

		// cy.writeFile('cypress/fixtures/savedData.json', {
		// totalBorrowedDOT: this.savedData.totalBorrowedDOT,
		// totalSuppliedDOT: this.savedData.totalSuppliedDOT,
		// currentBalanceDOT: this.savedData.currentBalanceDOT,
		// totalBorrowedDOT_API: userWalletBalanceDOT_API,
		// totalSuppliedDOT_API: userSuppliedDOT_API,
		// userBorrowedDOT_API:userBorrowedDOT_API
	  // });

	}



}
export default AssetPage;