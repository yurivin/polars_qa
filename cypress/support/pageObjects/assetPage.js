import ApiService from './api_service';
import { formatData } from './supportFunctions';

class AssetPage {

	checkValuesBeforeSupply(data1, data2, data3){
		cy.get('div.block-fee > div.value > span').then((elem) => {
			const value = elem.text();
			return expect(value).to.contain('N/A');
		});

		cy.get(' div.form-action-info-block > div:nth-child(2) > div.value > span').then((elem) => {
			const value = elem.text();
			return expect(value).to.contain(data1);
		});

		cy.get('div.form-action-info-block > div:nth-child(3) > div.value > span').then((elem) => {
			const value = elem.text();
			return expect(value).to.contain(data2);
		});

		cy.get('div.form-action-info-block > div:nth-child(4) > div.value > span').then((elem) => {
			const value = elem.text();
			return expect(value).to.contain(data3);
		});

	}

	checkSupplyValues(data1, data2, data3, data4){
		cy.wait(700);
		cy.get(' div.form-action-info-block > div.block-fee > div.value > span', {timeout:3000}).then((elem) => {
			const value = elem.text();
			return expect(value).to.contain(data1);
		});

		cy.get('div.form-action-info-block > div:nth-child(2) > div.value > span').then((elem) => {
			const value = elem.text();
			return expect(value).to.contain(data2);
		});

		cy.get('div.form-action-info-block > div:nth-child(3) > div.value > span').then((elem) => {
			const value = elem.text();
			expect(value).to.contain(data3);

		  // let defaultBalanceDOT = data2;
			// let balance = defaultBalanceDOT.split(" ").shift().split(",").join("");
			// cy.log(balance)
			// let balanceDOT = parseFloat(balance);
			// let borrowLimitUsedAfter = balanceDOT * 0.9;
			// let borrowLimitUI = value.split(',').join("");
			// expect(borrowLimitUI).to.contain(borrowLimitUsedAfter);
		});

		cy.get('div.form-action-info-block > div:nth-child(4) > div.value > span').then((elem) => {
			const value = elem.text();
			return expect(value).to.contain(data4);
		});
	}


	clickSupplyBtn() {
		return cy.xpath('.//button[contains(text(), "Supply")]').click();
	}

	enterAmountSupply(data){
		return cy.get('input[placeholder="Enter the amount"]', {timeout:2000}).type(data);
	}

	checkGassFeeEnableCollateral(data){
		cy.wait(1000);
	cy.get('div > div.form-action-info-block > div > div.value > span', {timeout:3000}).then((elem) => {
			const value = elem.text();
			return expect(value).to.contain(data);
		});
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
			let balance = value.split(',').join("");
			return expect(balance).to.contain(data);
		});
	}

	checkBorrowLimit(data){
		cy.get('div:nth-child(3) > div.value > span').then((elem) => {
			const value = elem.text();
			let borrowLimit = value.split(',').join("");
			return expect(borrowLimit).to.contain(data);
		});
	}

	checkBorrowLimitUsed(data){
		cy.get('div:nth-child(4) > div.value > span').then((elem) => {
			const value = elem.text();
			let borrowLimitUsed = value.split(',').join("");
			return expect(borrowLimitUsed).to.contain(data);
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

	checkBorrowValues(data1, data2, data3, data4, data5){
		cy.wait(700);
		cy.get('div.form-action-info-block > div.block-fee > div.value > span').then((elem) => {
			const value = elem.text();
			return expect(value).to.contain(data1);
		});

		cy.get('div.form-action-info-block > div:nth-child(2) > div.value > span').then((elem) => {
			const value = elem.text();
			let valueDOM = value.split(" ").shift().split(',').join("");
			let supplyValue = parseFloat(data2);
			let borrowLimit = supplyValue * 0.9;
			return expect(valueDOM).to.contain(borrowLimit);
		});

		cy.get('div.form-action-info-block > div:nth-child(3) > div.value > span').then((elem) => {
			const value = elem.text();
			expect(value).to.contain(data3);

			let valueDOM = "0 $ -> 72,000 $".split("->").pop().replace(",", "");
			let valueBorrowed = parseFloat(data4) * 2;
		  valueBorrowed.toString();
			return expect(valueDOM).to.contain(valueBorrowed);
		});

		cy.get('div.form-action-info-block > div:nth-child(4) > div.value > span').then((elem) => {
			const value = elem.text();
		  expect(value).to.contain(data5);
			return expect(value).to.contain('80.00 %');
		});

	}

	clickConfirmBorrow(){
		return cy.get('form > div.actions > button:nth-child(1)').click();
	}

	clickLogo(){
		return cy.get('div:nth-child(1) > div > div.logo > div > a').click();
	}

	getValuesFromAssetUI(){
		let balance;
		let valueSupplied;
		let valueBorrowed;

		cy.get('div:nth-child(1) > div.block-body > div:nth-child(1) > div.value > span').then((elem) => {
			let value = elem.text();
			balance = value.split(',').join("");
		});

		cy.get(' div:nth-child(1) > div.block-body > div:nth-child(2) > div.value > span').then((elem) => {
			let value = elem.text();
			valueSupplied = value.split(',').join("");
		});

		cy.get('div:nth-child(3) >div.block-body > div:nth-child(1) > div.value > span').then((elem) => {
			let value = elem.text();
			valueBorrowed = value.split(',').join("");
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

    // function getUserWalletBalanceDOT(){
		// 	let userWalletBalance =   api.query.tokens.accounts("5HGjWAeFDfFCWPsjFQdVV2Msvz2XtMktvgocEZcCj68kUMaw", { UnderlyingAsset: 'DOT' });
		// 	userWalletBalanceDOT_API = formatData(userWalletBalance.free)
		// 	console.log(`userWalletBalanceDOT_API- ${userWalletBalanceDOT_API}`);
		//   return userWalletBalanceDOT_API
		// }

		//  function getUserTotalSuppliedDOT() {
		// 	let userSuppliedDOT = api.rpc.controller.getUserUnderlyingBalancePerAsset("5HGjWAeFDfFCWPsjFQdVV2Msvz2XtMktvgocEZcCj68kUMaw", { UnderlyingAsset: 'DOT' });
		// 	userSuppliedDOT_API = formatData(userSuppliedDOT.amount);
		// 	console.log(`userSuppliedDOT_API: ${userSuppliedDOT_API}`);
		// }

		//  function getUserTotalBorrowedDOT() {
		// 	let userBorrowedDOT = api.rpc.controller.getUserBorrowPerAsset("5HGjWAeFDfFCWPsjFQdVV2Msvz2XtMktvgocEZcCj68kUMaw", { UnderlyingAsset: 'DOT' });
		// 	userBorrowedDOT_API = formatData(userBorrowedDOT.amount);
		// 	console.log(`userBorrowedDOT_API: ${userBorrowedDOT_API}`);
		// }

		getUserWalletBalanceDOT();
		// getUserTotalSuppliedDOT();
		// getUserTotalBorrowedDOT();




		console.log(`write1:${userWalletBalanceDOT_API}`);
		console.log(`write2: ${userSuppliedDOT_API}`);
		console.log(`write3: ${userBorrowedDOT_API}`);

		cy.writeFile('cypress/fixtures/temp/Values/basic.json', { userWalletBalanceDOT_API, userSuppliedDOT_API, userBorrowedDOT_API});

}









}
export default AssetPage;