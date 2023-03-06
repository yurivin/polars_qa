var pageObject = require('../../services/pages').container.PageObject;
var homePage = pageObject.getHomePage();
var metaMaskPage = pageObject.getMetaMaskPage();
var predictionPage = pageObject.getPredictionPage();
var stackingPage = pageObject.getStackingPage();

var config_data = require("./../../config.data.json")
var commonHelper = require('./../../services/helpers/common.helper');
var Web3 = require('web3');

const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");

var qa = config_data.projects.qa;
var passwords = config_data.projects.qa.params;
var fields = config_data.networkSetupFields;
var networks = config_data.networks;
var adminData = config_data.projects.qa.params;

describe('Stacking', function () {

	describe('user is able to create, add, update, remove lock', function () {

		let master, modal;

		let tpolInCirculationValue, tpolInStakingValue, yourTpolInStakingValue, yourPerOfStakingPoolValue,
			averageApyValue, stakingBalanceValue, stakingBalanceValueChanged, yourTpolInStakingValueChanged;

		beforeAll(function () {
			commonHelper.remainOneTab();
			commonHelper.acceptAlert();
			commonHelper.clearAllDataCommon();
		});

		afterAll(async function () {
			await commonHelper.clearAllData();
		});

		it('should open metamask page', async function () {
			await browser.get(config_data.projects.qa.baseUrl);
			await browser.get('chrome-extension://pgalkbghmoeblklmkclojoifddobjcaj/home.html');
			await commonHelper.switchToPreviousWithoutClose();
		});

		it('should configure metamask', async function () {
			await metaMaskPage.clickStart();
			await metaMaskPage.clickImport();
			await metaMaskPage.clickAgree();
		});

		it('should enter secret phrase, password', async function () {
			await metaMaskPage.fillSecretKey(passwords.mmSecretKey);
			await metaMaskPage.fillPassword(passwords.password);
			await metaMaskPage.fillConfirmPass(passwords.password);
		});

		it('should accept terms and finish', async function () {
			await metaMaskPage.clickTerms();
			await metaMaskPage.clickSubmit();
			await metaMaskPage.clickFinish();
		});

		it('should enable test networks', async function () {
			await metaMaskPage.clickNetworkDropdown();
			await metaMaskPage.clickShowTest();
			await metaMaskPage.switchTestNet();
		});

		it('should change language', async function () {
			await metaMaskPage.clickGeneralTab();
			await metaMaskPage.selectLanguage('English');
			await browser.refresh();
		});

		it('should open network tab', async function () {
			await metaMaskPage.clickNetworkTab();
		});

		it('should add BSC Testnet', async function () {
			await metaMaskPage.clickAddNetwork();
			await metaMaskPage.fillAddNetworkInput(fields.name, networks.bscTest.name);
			await metaMaskPage.fillAddNetworkInput(fields.rpc, networks.bscTest.rpc.first);
			await metaMaskPage.fillAddNetworkInput(fields.id, networks.bscTest.chainId);
			await metaMaskPage.fillAddNetworkInput(fields.symbol, networks.bscTest.symbol);
			await metaMaskPage.fillAddNetworkInput(fields.explorer, networks.bscTest.blockExplorer);
			await metaMaskPage.clickSaveNetwork();
			await browser.sleep(2000);
		});

		it('should select needed network', async function () {
			await metaMaskPage.clickNetworkDropdown();
			await metaMaskPage.selectNetwork(networks.bscTest.name);
		});

		it('should open polars', async function () {
			await browser.get(qa.baseUrl);
		});

		it('should connect the wallet', async function () {
			await homePage.clickAcceptCookies();
			await homePage.clickConnectWallet();
			await homePage.selectMetamask();
		});

		it('should connect at metamask and see successfully connected message', async function () {
			await browser.getAllWindowHandles().then(function (result) {
				master = result[0];
				modal = result[1];
				console.log(result);
				browser.sleep(2000);
			});

			await browser.driver.switchTo().window(modal);
			await browser.refresh();
			await metaMaskPage.connectOneWallet();

			await browser.driver.switchTo().window(master);
			await commonHelper.waitUntilElementVisible(homePage.successWalletConnectMsg);
		});

		//// New Lock

		it('should click at earn menu', async function() {
			await(predictionPage.clickEarnMenu());
		});

		it('should click staking', async function () {
			await(predictionPage.clickStakingPage());
		});

		it('should click Add tPOL buton', async function () {
			await(predictionPage.clickAddTpolTab());
		});

		it('should click Mew Lock button', async function () {
			await(predictionPage.clickNewLockTab());
		});

		it('should get tPOL in circulation',async function () {
			await(predictionPage.getTpolInCirculation()).then (async function (value) {
				let test = value.replace('                      ','');
				tpolInCirculationValue = test.replace('                    ','');
				console.log(tpolInCirculationValue);

			});
		});

		it('should get tPOL in Staking',async function () {
			await(predictionPage.getTpolInStaking()).then (async function (value) {
				let test = value.replace('                    ','');
				tpolInStakingValue = test.replace('                  ','');
				console.log(tpolInStakingValue);
			});
		});

		it('should get Your tPOL in Staking',async function () {
			await(predictionPage.getYourTpolInStaking()).then (async function (value) {
				let test = value.replace('                    ','');
				yourTpolInStakingValue = test.replace('                  ','');
				console.log(yourTpolInStakingValue);
			});
		});

		it('should get Your % of Staking Pool', async function () {
			await(predictionPage.getYourPerOfStakingPool()).then (async function (value) {
				let test = value.replace('                    ','');
				yourPerOfStakingPoolValue = test.split('%')[0];
				console.log(yourPerOfStakingPoolValue);
			});
		});

		it('should get Average APY', async function () {
			await(predictionPage.getAverageApy()).then (async function (value) {
				averageApyValue = value.split('%')[0];
				console.log(averageApyValue);
			});
		});

		it('should get balance', async function () {
			await(predictionPage.getStakingBalance()).then (async function (value) {
				let test = value.replace('    ','');
				stakingBalanceValue = test.split(': ')[1];
				console.log(stakingBalanceValue);
			});
		});

		it('should fill input with 1', async function() {
			await (predictionPage.fillTokenInput (1));
		});

		it('should press new lock button', async function() {
			await predictionPage.clickNewLockBtn();
			await browser.sleep(1000);
			await browser.driver.switchTo().window(modal);
			await browser.sleep(2000);
			await browser.refresh();
		});

		it('should confirm transaction in metamask', async function check(done) {
			await metaMaskPage.btnConfirmTransaction.isPresent().then(function (result) {
				if (result) {
					done();
				} else {
					browser.refresh();
					browser.sleep(2000);
					check(done);
				}
			})
		});

		it('should check transaction is done', async function () {
			await metaMaskPage.clickConfirmTransaction();
			await browser.driver.switchTo().window(master);
			await homePage.clickClosePopUp();
			await commonHelper.waitUntilElementVisible(homePage.successTransactionMsg);
		});


		it('should get changed balance', async function() {
			await browser.sleep(2000);
			await(predictionPage.getStakingBalance()).then(async function (value) {
				let test = value.replace('    ','');
				stakingBalanceValueChanged = test.split(': ')[1];
				console.log(stakingBalanceValueChanged);
			});
		});

		it('check that changed balance is correct', async function() {
			expect(stakingBalanceValueChanged).toContain((+stakingBalanceValue-1).toString());
		});

		it('should get changed your tPOL in staking', async function() {
			await(predictionPage.getYourTpolInStaking()).then(async function(value) {
				let test = value.replace('                    ','');
				yourTpolInStakingValueChanged = test.replace('                  ','');
				console.log(yourTpolInStakingValueChanged);
			} );
		})

		it('should check that Your tPOL in Staking increased at 1', async function() {
			expect(yourTpolInStakingValueChanged).toEqual((yourTpolInStakingValue+1).toString());
		});

	});

	describe('user is able to add tPOl to lock', function() {

		let master, modal;

		let yourTpolInStakingValue, stakingBalanceValue, stakingBalanceValueChanged, yourTpolInStakingValueChanged;

		beforeAll(function () {
			commonHelper.remainOneTab();
			commonHelper.acceptAlert();
			commonHelper.clearAllDataCommon();
		});

		afterAll(async function () {
			await commonHelper.clearAllData();
		});

		it('should open metamask page', async function () {
			await browser.get(config_data.projects.qa.baseUrl);
			await browser.get('chrome-extension://pgalkbghmoeblklmkclojoifddobjcaj/home.html');
			await commonHelper.switchToPreviousWithoutClose();
		});

		it('should configure metamask', async function () {
			await metaMaskPage.clickStart();
			await metaMaskPage.clickImport();
			await metaMaskPage.clickAgree();
		});

		it('should enter secret phrase, password', async function () {
			await metaMaskPage.fillSecretKey(passwords.mmSecretKey);
			await metaMaskPage.fillPassword(passwords.password);
			await metaMaskPage.fillConfirmPass(passwords.password);
		});

		it('should accept terms and finish', async function () {
			await metaMaskPage.clickTerms();
			await metaMaskPage.clickSubmit();
			await metaMaskPage.clickFinish();
		});

		it('should enable test networks', async function () {
			await metaMaskPage.clickNetworkDropdown();
			await metaMaskPage.clickShowTest();
			await metaMaskPage.switchTestNet();
		});

		it('should change language', async function () {
			await metaMaskPage.clickGeneralTab();
			await metaMaskPage.selectLanguage('English');
			await browser.refresh();
		});

		it('should open network tab', async function () {
			await metaMaskPage.clickNetworkTab();
		});

		it('should add BSC Testnet', async function () {
			await metaMaskPage.clickAddNetwork();
			await metaMaskPage.fillAddNetworkInput(fields.name, networks.bscTest.name);
			await metaMaskPage.fillAddNetworkInput(fields.rpc, networks.bscTest.rpc.first);
			await metaMaskPage.fillAddNetworkInput(fields.id, networks.bscTest.chainId);
			await metaMaskPage.fillAddNetworkInput(fields.symbol, networks.bscTest.symbol);
			await metaMaskPage.fillAddNetworkInput(fields.explorer, networks.bscTest.blockExplorer);
			await metaMaskPage.clickSaveNetwork();
			await browser.sleep(2000);
		});

		it('should select needed network', async function () {
			await metaMaskPage.clickNetworkDropdown();
			await metaMaskPage.selectNetwork(networks.bscTest.name);
		});

		it('should open polars', async function () {
			await browser.get(qa.baseUrl);
		});

		it('should connect the wallet', async function () {
			await homePage.clickAcceptCookies();
			await homePage.clickConnectWallet();
			await homePage.selectMetamask();
		});

		it('should connect at metamask and see successfully connected message', async function () {
			await browser.getAllWindowHandles().then(function (result) {
				master = result[0];
				modal = result[1];
				console.log(result);
				browser.sleep(2000);
			});

			await browser.driver.switchTo().window(modal);
			await browser.refresh();
			await metaMaskPage.connectOneWallet();

			await browser.driver.switchTo().window(master);
			await commonHelper.waitUntilElementVisible(homePage.successWalletConnectMsg);
		});

		//Add tPOL

		it('should click at earn menu', async function() {
			await stackingPage.clickEarnMenu();
		});

		it('should click staking', async function () {
			await stackingPage.clickStakingPage();
		});

		it('should click Add tPOL buton', async function () {
			await stackingPage.clickAddTpolTab();
		});

		it('should click Add button', async function () {
			await stackingPage.clickAddTab();
		});

		it('should get Your tPOL in Staking',async function () {
			await(stackingPage.getYourTpolInStaking()).then (async function (value) {
				let test = value.replace('                    ','');
				yourTpolInStakingValue = test.replace('                  ','');
				console.log(yourTpolInStakingValue);
			});
		});

		it('should get balance', async function () {
			await(stackingPage.getStakingBalance()).then (async function (value) {
				let test = value.replace('    ','');
				stakingBalanceValue = test.split(': ')[1];
				console.log(stakingBalanceValue);
			});
		});

		it('should fill input with 1', async function() {
			await (stackingPage.fillTokenInput (1));
		});

		it('should press Add button', async function() {
			await stackingPage.clickAddBtn();
			await browser.sleep(1000);
			await browser.driver.switchTo().window(modal);
			await browser.sleep(2000);
			await browser.refresh();
		});

		it('should confirm transaction in metamask', async function check(done) {
			await metaMaskPage.btnConfirmTransaction.isPresent().then(function (result) {
				if (result) {
					done();
				} else {
					browser.refresh();
					browser.sleep(2000);
					check(done);
				}
			})
		});

		it('should check transaction is done', async function () {
			await metaMaskPage.clickConfirmTransaction();
			await browser.driver.switchTo().window(master);
			await homePage.clickClosePopUp();
			await commonHelper.waitUntilElementVisible(homePage.successTransactionMsg);
		});


		it('should get changed balance', async function() {
			await browser.sleep(2000);
			await(stackingPage.getStakingBalsnce()).then(async function (value) {
				let test = value.replace('    ','');
				stakingBalanceValueChanged = test.split(': ')[1];
				console.log(stakingBalanceValueChanged);
			});
		});

		it('check that changed balance is correct', async function() {
			expect(stakingBalanceValueChanged).toContain((+stakingBalanceValue-1).toString());
		});

		it('should get changed your tPOL in staking', async function() {
			await(stackingPage.getYourTpolInStaking()).then(async function(value) {
				let test = value.replace('                    ','');
				yourTpolInStakingValueChanged = test.replace('                  ','');
				console.log(yourTpolInStakingValueChanged);
			} );
		});

		it('should check that Your tPOL in Staking increased at 1', async function() {
			expect(yourTpolInStakingValueChanged).toEqual((yourTpolInStakingValue+1).toString());
		});


		describe('user is able to update lock', function() {

			let master, modal;

			beforeAll(function () {
				commonHelper.remainOneTab();
				commonHelper.acceptAlert();
				commonHelper.clearAllDataCommon();
			});

			afterAll(async function () {
				await commonHelper.clearAllData();
			});

			it('should open metamask page', async function () {
				await browser.get(config_data.projects.qa.baseUrl);
				await browser.get('chrome-extension://pgalkbghmoeblklmkclojoifddobjcaj/home.html');
				await commonHelper.switchToPreviousWithoutClose();
			});

			it('should configure metamask', async function () {
				await metaMaskPage.clickStart();
				await metaMaskPage.clickImport();
				await metaMaskPage.clickAgree();
			});

			it('should enter secret phrase, password', async function () {
				await metaMaskPage.fillSecretKey(passwords.mmSecretKey);
				await metaMaskPage.fillPassword(passwords.password);
				await metaMaskPage.fillConfirmPass(passwords.password);
			});

			it('should accept terms and finish', async function () {
				await metaMaskPage.clickTerms();
				await metaMaskPage.clickSubmit();
				await metaMaskPage.clickFinish();
			});

			it('should enable test networks', async function () {
				await metaMaskPage.clickNetworkDropdown();
				await metaMaskPage.clickShowTest();
				await metaMaskPage.switchTestNet();
			});

			it('should change language', async function () {
				await metaMaskPage.clickGeneralTab();
				await metaMaskPage.selectLanguage('English');
				await browser.refresh();
			});

			it('should open network tab', async function () {
				await metaMaskPage.clickNetworkTab();
			});

			it('should add BSC Testnet', async function () {
				await metaMaskPage.clickAddNetwork();
				await metaMaskPage.fillAddNetworkInput(fields.name, networks.bscTest.name);
				await metaMaskPage.fillAddNetworkInput(fields.rpc, networks.bscTest.rpc.first);
				await metaMaskPage.fillAddNetworkInput(fields.id, networks.bscTest.chainId);
				await metaMaskPage.fillAddNetworkInput(fields.symbol, networks.bscTest.symbol);
				await metaMaskPage.fillAddNetworkInput(fields.explorer, networks.bscTest.blockExplorer);
				await metaMaskPage.clickSaveNetwork();
				await browser.sleep(2000);
			});

			it('should select needed network', async function () {
				await metaMaskPage.clickNetworkDropdown();
				await metaMaskPage.selectNetwork(networks.bscTest.name);
			});

			it('should open polars', async function () {
				await browser.get(qa.baseUrl);
			});

			it('should connect the wallet', async function () {
				await homePage.clickAcceptCookies();
				await homePage.clickConnectWallet();
				await homePage.selectMetamask();
			});

			it('should connect at metamask and see successfully connected message', async function () {
				await browser.getAllWindowHandles().then(function (result) {
					master = result[0];
					modal = result[1];
					console.log(result);
					browser.sleep(2000);
				});

				await browser.driver.switchTo().window(modal);
				await browser.refresh();
				await metaMaskPage.connectOneWallet();

				await browser.driver.switchTo().window(master);
				await commonHelper.waitUntilElementVisible(homePage.successWalletConnectMsg);
			});

			//Update lock

			it('should click at earn menu', async function() {
				await(predictionPage.clickEarnMenu());
			});

			it('should click staking', async function () {
				await(predictionPage.clickStakingPage());
			});

			it('should click add tPOL button', async function () {
				await(predictionPage.clickAddTpolTab());
			});

			it('should click update Lock tab ', async function () {
				await stackingPage.clickUpdateLockTab();
			});

			it('should click date field', async function () {
				await stackingPage.clickDate();
			});

			it('should get current date and choose new date', async function () {
				await stackingPage.getStakingDate().then(async function (value) {
					console.log('Current date: ', value);
					let nextDate = +value + 1;
					await stackingPage.clickNewDate(nextDate);
				});
			});

			it('should click update lock btn', async function () {
				await stackingPage.clickUpdateBtn();
				await browser.sleep(1000);
				await browser.driver.switchTo().window(modal);
				await browser.sleep(2000);
				await browser.refresh();
			});

			it('should confirm transaction in metamask', async function check(done) {
				await metaMaskPage.btnConfirmTransaction.isPresent().then(function (result) {
					if (result) {
						done();
					} else {
						browser.refresh();
						browser.sleep(2000);
						check(done);
					}
				})
			});

			it('should check transaction is done', async function () {
				await metaMaskPage.clickConfirmTransaction();
				await browser.driver.switchTo().window(master);
				await commonHelper.waitUntilElementVisible(homePage.successTransactionMsg);
			});

			it('should get changed date',async function() {
				await stackingPage.getStakingDate().then(function(value){
					console.log("Changed date: ",value);
				});
			});
		});

	});



});



