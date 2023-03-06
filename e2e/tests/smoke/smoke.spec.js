var pageObject = require('../../services/pages').container.PageObject;
var homePage = pageObject.getHomePage();
var metaMaskPage = pageObject.getMetaMaskPage();
var predictionPage = pageObject.getPredictionPage();

var config_data = require("./../../config.data.json")
var commonHelper = require('./../../services/helpers/common.helper');
var Web3 = require('web3');

const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");

var qa = config_data.projects.qa;
var passwords = config_data.projects.qa.params;
var fields = config_data.networkSetupFields;
var networks = config_data.networks;
var adminData = config_data.projects.qa.params;

describe('smoke', function () {

	describe('setting up metamask and networks', function () {

		let master, modal;

		beforeAll(function () {
			commonHelper.remainOneTab();
			commonHelper.acceptAlert();
			commonHelper.clearAllData();
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

		it('should add network', async function () {
			await metaMaskPage.clickAddNetwork();
			await metaMaskPage.fillAddNetworkInput(fields.name, networks.polygonTest.name);
			await metaMaskPage.fillAddNetworkInput(fields.rpc, networks.polygonTest.rpc.first);
			await metaMaskPage.fillAddNetworkInput(fields.id, networks.polygonTest.chainId);
			await metaMaskPage.fillAddNetworkInput(fields.symbol, networks.polygonTest.symbol);
			await metaMaskPage.fillAddNetworkInput(fields.explorer, networks.polygonTest.blockExplorer);
			await metaMaskPage.clickSaveNetwork();
			await browser.sleep(2000);
		});

		it('should open polars', async function () {
			await browser.get(qa.baseUrl);
		});

		it('should connect the wallet', async function () {
			await homePage.clickAcceptCookies();
			await homePage.clickConnectWallet();
			await homePage.selectMetamask();
		});

		it('should switch to modal and click next', async function () {
			await browser.getAllWindowHandles().then(function (result) {
				master = result[0];
				modal = result[1];
				console.log(result);
				browser.sleep(2000);
			});

			await browser.driver.switchTo().window(modal);
			await browser.refresh();
			await homePage.clickNextBtn();
			await browser.driver.switchTo().window(master);
			// await browser.refresh();
		});


		it('should connect at metamask and see successfully connected message', async function () {
			await browser.getAllWindowHandles().then(function (result) {

				master = result[0];
				modal = result[1];
				console.log(result);
				browser.sleep(2000);
			});

			await browser.driver.switchTo().window(modal);
			// await browser.refresh();
			await homePage.clickConnectMetamask();

			await browser.driver.switchTo().window(master);
			await commonHelper.waitUntilElementVisible(homePage.successWalletConnectMsg);
		});





		// it('should click on account menu and go to settings', async function () {
		// 	await metaMaskPage.clickOnAccountMenu();
		// 	await metaMaskPage.clickSettings();
		// });

		// it('should add BSC Mainnet', async function () {
		// 	await metaMaskPage.clickNetworkTab();
		// 	await metaMaskPage.clickAddNetwork();
		// 	await metaMaskPage.fillAddNetworkInput(fields.name, networks.bscMain.name);
		// 	await metaMaskPage.fillAddNetworkInput(fields.rpc, networks.bscMain.rpc.first);
		// 	await metaMaskPage.fillAddNetworkInput(fields.id, networks.bscMain.chainId);
		// 	await metaMaskPage.fillAddNetworkInput(fields.symbol, networks.bscMain.symbol);
		// 	await metaMaskPage.fillAddNetworkInput(fields.explorer, networks.bscMain.blockExplorer);
		// 	await metaMaskPage.clickSaveNetwork();
		// });
		//
		// it('should click on account menu and go to settings', async function () {
		// 	await metaMaskPage.clickOnAccountMenu();
		// 	await metaMaskPage.clickSettings();
		// });
		//
		// it('should add Heko Testnet', async function () {
		// 	await metaMaskPage.clickNetworkTab();
		// 	await metaMaskPage.clickAddNetwork();
		// 	await metaMaskPage.fillAddNetworkInput(fields.name, networks.hekoTest.name);
		// 	await metaMaskPage.fillAddNetworkInput(fields.rpc, networks.hekoTest.rpc.first);
		// 	await metaMaskPage.fillAddNetworkInput(fields.id, networks.hekoTest.chainId);
		// 	await metaMaskPage.fillAddNetworkInput(fields.symbol, networks.hekoTest.symbol);
		// 	await metaMaskPage.fillAddNetworkInput(fields.explorer, networks.hekoTest.blockExplorer);
		// 	await metaMaskPage.clickSaveNetwork();
		// });
		//
		// it('should click on account menu and go to settings', async function () {
		// 	await metaMaskPage.clickOnAccountMenu();
		// 	await metaMaskPage.clickSettings();
		// });
		//
		// it('should add Heko Mainnet', async function () {
		// 	await metaMaskPage.clickNetworkTab();
		// 	await metaMaskPage.clickAddNetwork();
		// 	await metaMaskPage.fillAddNetworkInput(fields.name, networks.hekoMain.name);
		// 	await metaMaskPage.fillAddNetworkInput(fields.rpc, networks.hekoMain.rpc.first);
		// 	await metaMaskPage.fillAddNetworkInput(fields.id, networks.hekoMain.chainId);
		// 	await metaMaskPage.fillAddNetworkInput(fields.symbol, networks.hekoMain.symbol);
		// 	await metaMaskPage.fillAddNetworkInput(fields.explorer, networks.hekoMain.blockExplorer);
		// 	await metaMaskPage.clickSaveNetwork();
		// });
		//
		// it('should import account', async function () {
		// 	await metaMaskPage.clickOnAccountMenu();
		// 	await metaMaskPage.clickImportAccount();
		// 	await metaMaskPage.fillPrivateKey(adminData.mmSecretKey);
		// 	await metaMaskPage.finishImportAccount();
		// });
		//
		// it('should change to first account', async function () {
		// 	await metaMaskPage.clickOnAccountMenu();
		// 	await metaMaskPage.changeAccount('Account 1');
		// });
		//
		// it('should select needed network', async function () {
		// 	await metaMaskPage.clickNetworkDropdown();
		// 	await metaMaskPage.selectNetwork(networks.bscTest.name);
		// });

		// it('should swap tPol to WHITE', async function () {
		// 	await predictionPage.fillTokenInput('1');
		// 	await predictionPage.clickSwap();
		// });
		//
		// it('should confirm transaction in metamask', async function () {
		// 	await browser.driver.switchTo().window(modal);
		// 	await browser.sleep(2000);
		// 	await browser.refresh();
		// 	await metaMaskPage.clickConfirmTransaction();
		// });
		//
		// it('should check transaction is done', async function () {
		// 	await browser.driver.switchTo().window(master);
		// 	await homePage.clickClosePopUp();
		// 	await commonHelper.waitUntilElementVisible(homePage.successTransactionMsg);
		// });


	});
});

