var pageObject = require('../../services/pages').container.PageObject;
var homePage = pageObject.getHomePage();
var metaMaskPage = pageObject.getMetaMaskPage();

var config_data = require("./../../config.data.json")
var commonHelper = require('./../../services/helpers/common.helper');
var Web3 = require('web3');

const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");

var qa = config_data.projects.qa;
var passwords = config_data.projects.qa.params;
var fields = config_data.networkSetupFields;
var networks = config_data.networks;
var adminData = config_data.projects.qa.params;

describe('metamask', function () {

	describe('setting up metamask and networks', function () {

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
			await browser.sleep(3000);
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

		it('should click on account menu and go to settings', async function () {
			await metaMaskPage.clickOnAccountMenu();
			await metaMaskPage.clickSettings();
		});

		it('should add BSC Mainnet', async function () {
			await metaMaskPage.clickNetworkTab();
			await metaMaskPage.clickAddNetwork();
			await metaMaskPage.fillAddNetworkInput(fields.name, networks.bscMain.name);
			await metaMaskPage.fillAddNetworkInput(fields.rpc, networks.bscMain.rpc.first);
			await metaMaskPage.fillAddNetworkInput(fields.id, networks.bscMain.chainId);
			await metaMaskPage.fillAddNetworkInput(fields.symbol, networks.bscMain.symbol);
			await metaMaskPage.fillAddNetworkInput(fields.explorer, networks.bscMain.blockExplorer);
			await metaMaskPage.clickSaveNetwork();
		});

		it('should click on account menu and go to settings', async function () {
			await metaMaskPage.clickOnAccountMenu();
			await metaMaskPage.clickSettings();
		});

		it('should add Heko Testnet', async function () {
			await metaMaskPage.clickNetworkTab();
			await metaMaskPage.clickAddNetwork();
			await metaMaskPage.fillAddNetworkInput(fields.name, networks.hekoTest.name);
			await metaMaskPage.fillAddNetworkInput(fields.rpc, networks.hekoTest.rpc.first);
			await metaMaskPage.fillAddNetworkInput(fields.id, networks.hekoTest.chainId);
			await metaMaskPage.fillAddNetworkInput(fields.symbol, networks.hekoTest.symbol);
			await metaMaskPage.fillAddNetworkInput(fields.explorer, networks.hekoTest.blockExplorer);
			await metaMaskPage.clickSaveNetwork();
		});

		it('should click on account menu and go to settings', async function () {
			await metaMaskPage.clickOnAccountMenu();
			await metaMaskPage.clickSettings();
		});

		it('should add Heko Mainnet', async function () {
			await metaMaskPage.clickNetworkTab();
			await metaMaskPage.clickAddNetwork();
			await metaMaskPage.fillAddNetworkInput(fields.name, networks.hekoMain.name);
			await metaMaskPage.fillAddNetworkInput(fields.rpc, networks.hekoMain.rpc.first);
			await metaMaskPage.fillAddNetworkInput(fields.id, networks.hekoMain.chainId);
			await metaMaskPage.fillAddNetworkInput(fields.symbol, networks.hekoMain.symbol);
			await metaMaskPage.fillAddNetworkInput(fields.explorer, networks.hekoMain.blockExplorer);
			await metaMaskPage.clickSaveNetwork();
		});

		it('should import account', async function () {
			await metaMaskPage.clickOnAccountMenu();
			await metaMaskPage.clickImportAccount();
			await metaMaskPage.fillPrivateKey(adminData.adminPrivateKey);
			await metaMaskPage.finishImportAccount();
		});

		it('should change to first account', async function () {
			await metaMaskPage.clickOnAccountMenu();
			await metaMaskPage.changeAccount('Account 1');
		});

		it('should select needed network', async function () {
			await metaMaskPage.clickNetworkDropdown();
			await metaMaskPage.selectNetwork(networks.bscTest.name);
		});

		it('should open polars', async function () {
			await commonHelper.switchToNextTab();
			await browser.get(qa.baseUrl);
		});

		it('should accept the cookies', async function () {
			await homePage.clickAcceptCookies();
		});

		it('should connect the wallet', async function () {
			await homePage.clickConnectWallet();
		});


	});
});

