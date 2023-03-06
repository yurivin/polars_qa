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

describe('Prediction pool', function () {

	describe('user is able to use prediction pool to swap tokens', function () {

		let master, modal;

		let currentPrice, minReceived, balance, balanceAfter, changedBalance, balanceTo, changedBalanceTo,
			newTknBalance, newTknBalanceTo;

		let newMinReceived, newChangedBalanceFrom, newChangedBalanceTo, balanceTpolFrom, balanceBlackTo,
			minReceivedBlack;

		let tpolChangedBalanceFrom, blackChangedBalanceTo, minReceivedTpol, blackFromBalance, tpolToBalance,
			changedBlackFromBalance;

		let changedTpolToBalance, blackFromBalanceAfter, tpolToBalanceAfter, minReceivedWhite, whiteToBalance,
			changedWhiteToBalance, whiteToBalanceAfter;

		let whiteFromBalance, blackToBalance, whiteFromBalanceAfter, blackToBalanceAfter, newMinReceivedBlack;

		let changedWhiteFromBalance, changedBlackToBalance, newWhiteFromBalanceAfter, newBlackToBalanceAfter;


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

		// it('should import account', async function () {
		// 	await metaMaskPage.clickOnAccountMenu();
		// 	await metaMaskPage.clickImportAccount();
		// 	await metaMaskPage.fillPrivateKey(adminData.adminPrivateKey);
		// 	await metaMaskPage.finishImportAccount();
		// });

		// it('should change to first account', async function () {
		// 	await metaMaskPage.clickOnAccountMenu();
		// 	await metaMaskPage.changeAccount('Account 1');
		// });

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

		///// Exchange from tPOL to WHITE

		it('should get current price', async function () {
			await commonHelper.waitUntilElementVisible(predictionPage.currentPriceWhite);
			await predictionPage.getCurrentPrice().then(function (value) {
				let allText = value;
				let sec = allText.split(': ')[1];
				currentPrice = sec.split(' ')[0];
				console.log(currentPrice);
			});
		});

		it('should check white price in blank even info popup and current price', async function () {
			await expect(predictionPage.blankPredictionPriceWhite.getText()).toContain(currentPrice);
		});

		it('should get balance from', async function () {
			await browser.sleep(2000);
			await predictionPage.getBalanceFrom().then(async function (value) {
				let test = value.split(': ')[1];
				balance = test.replace('    ', '');
				console.log('BALANCE:', balance);
			});
		});

		it('should get balance to', async function () {
			await browser.sleep(2000);
			await predictionPage.getBalanceTo().then(async function (value) {
				let test = value.split(': ')[1];
				balanceTo = test.replace('     ', '');
				console.log('BALANCE TO:', balanceTo);

			});
		});

		it('should get min received', async function () {
			await predictionPage.fillTokenInput('1');
			await predictionPage.getMinReceived().then(async function (value) {
				let test = value.split(' W')[0];
				minReceived = test.replace('          ', '');
				console.log('MIN_RECEIVED:', minReceived);
			});
		});

		it('should swap tPol to WHITE', async function () {
			await predictionPage.clickSwap();
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

		it('should get balance from after transaction', async function () {
			await browser.sleep(2000);
			changedBalance = (+balance - 1).toString();
			console.log('CHANGED:', changedBalance);
		});

		it('should get balance to after transaction', async function () {
			await browser.sleep(2000);
			changedBalanceTo = (+balanceTo + +minReceived).toString().slice(0, 7);
			console.log('CHANGED BALANCE TO: ', changedBalanceTo);
		});

		it('should check balance from after transaction', function () {
			expect(predictionPage.getBalanceFrom()).toContain(changedBalance);
		});

		it('should check balance to after transaction', function () {
			expect(predictionPage.getBalanceTo()).toContain(changedBalanceTo.slice(0, 8));
		});

		///// Exchange from WHITE to tPOL

		it('should click the button to change tokens', async function () {
			await predictionPage.clickChangeTokens();
		});

		it('check name of first token', function () {
			expect(predictionPage.getNameFirstTkn()).toContain('WHITE');
		});

		it('check name of second token', function () {
			expect(predictionPage.getNameSecondTkn()).toContain('tPOL');
		});

		it('should get first balance after tokens were changed', async function () {
			await browser.sleep(2000);
			await predictionPage.getBalanceFrom().then(async function (value) {
				let test = value.split(': ')[1];
				newTknBalance = test.replace('    ', '');
				console.log('NEW TKN BALANCE:', newTknBalance);
			});
		});

		it('should get second balance after tokens were changed', async function () {
			await browser.sleep(2000);
			await predictionPage.getBalanceTo().then(async function (value) {
				let test = value.split(': ')[1];
				newTknBalanceTo = test.replace('    ', '');
				console.log('NEW TKN BALANCE TO: ', newTknBalanceTo);

			});
		});

		it('should check if the first balance is correct', function () {
			expect(changedBalanceTo.slice(0, 7)).toEqual(newTknBalance.slice(0, 7));
		});

		it('should check if the second balance is correct', function () {
			expect(changedBalance.slice(0, 7)).toEqual(newTknBalanceTo.slice(0, 7));
		});

		it('should fill the input : 1', async function () {
			await predictionPage.fillTokenInput(1);
		});

		it('should get new min received', async function () {
			await predictionPage.getMinReceived().then(function (value) {
				let test = value.replace('          ', '');
				newMinReceived = test.split(' t')[0];
				console.log('NEW MIN RECEIVED: ', newMinReceived);
			});
		});

		it('should predict balance to after exchange ', async function () {
			newChangedBalanceFrom = (+newTknBalance - 1).toString();
			console.log('PREDICTED NEW CHANGED BALANCE FROM: ', newChangedBalanceFrom);
		});

		it('should predict balance to after exchange ', async function () {
			newChangedBalanceTo = (+newTknBalanceTo + (+newMinReceived)).toString();
			console.log('PREDICTED NEW CHANGED BALANCE TO: ', newChangedBalanceTo);
		});

		it('should swap WHITE to tPol', async function () {
			await predictionPage.clickSwap();
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

		it('should check new balance from after transaction', function () {
			expect(predictionPage.getBalanceFrom()).toContain(newChangedBalanceFrom.slice(0, 6));
		});

		it('should check new balance to after transaction', function () {
			expect(predictionPage.getBalanceTo()).toContain(newChangedBalanceTo.slice(0, 6));
		});

		///// Exchange from tPOL to BLACK

		it('should click at menu with name of tkns at from', async function () {
			await predictionPage.clickTknMenuFrom();
		});

		it('should choose tPOL from menu', async function () {
			await predictionPage.chooseTpol();
		});

		it('should check if tpol is set', function () {
			expect(predictionPage.getNameFirstTkn()).toContain('tPOL');
		});

		it('should click at menu with name of tkns at to', async function () {
			await predictionPage.clickTknMenuTo();
		});

		it('should choose BLACK from menu', async function () {
			await predictionPage.chooseBlack();
		});

		it('should check if BLACK is set', function () {
			expect(predictionPage.getNameSecondTkn()).toContain('BLACK');
		});

		it('should get balance tPOL (from)', async function () {
			await browser.sleep(2000);
			await predictionPage.getBalanceFrom().then(async function (value) {
				let test = value.split(': ')[1];
				console.log(test);
				balanceTpolFrom = test.replace('    ', '');
				console.log('BALANCE tPOL FROM:', balanceTpolFrom);
			});
		});

		it('should get balance BLACK to', async function () {
			await browser.sleep(2000);
			await predictionPage.getBalanceTo().then(async function (value) {
				let test = value.split(': ')[1];
				console.log(test);
				balanceBlackTo = test.replace('     ', '');
				console.log('BALANCE BLACK TO:', balanceBlackTo);

			});
		});

		it('should get min received BLACK', async function () {
			await predictionPage.fillTokenInput('1');
			await predictionPage.getMinReceived().then(async function (value) {
				let test = value.split(' B')[0];
				minReceivedBlack = test.replace('          ', '');
				console.log('MIN_RECEIVED BLACK:', minReceivedBlack);
			});
		});

		it('should predict tPOL balance to after exchange ', async function () {
			tpolChangedBalanceFrom = (+balanceTpolFrom - 1).toString();
			console.log('PREDICTED tPOL CHANGED BALANCE FROM: ', tpolChangedBalanceFrom);
		});

		it('should predict balance to after exchange ', async function () {
			blackChangedBalanceTo = (+balanceBlackTo + (+minReceivedBlack)).toString();
			console.log('PREDICTED BLACK CHANGED BALANCE TO: ', blackChangedBalanceTo);
		});

		it('should click button swap', async function () {
			await predictionPage.clickSwap();
			browser.sleep(1000);
			browser.driver.switchTo().window(modal);
			browser.sleep(2000);
			browser.refresh();
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

		it('should check tPOL balance from after transaction', function () {
			expect(predictionPage.getBalanceFrom()).toContain(tpolChangedBalanceFrom.slice(0, 6));
		});

		it('should check BLACK balance to after transaction', function () {
			expect(predictionPage.getBalanceTo()).toContain(blackChangedBalanceTo.slice(0, 6));
		});

		///// Exchange from BLACK to tPOL

		it('should click at menu from', async function () {
			await commonHelper.waitUntilElementVisible(predictionPage.tknMenuFrom);
			await predictionPage.clickTknMenuFrom();
		});

		it('should set black at from', async function () {
			await commonHelper.waitUntilElementVisible(predictionPage.tknBlackAtMenu);
			await predictionPage.chooseBlack();
		});
		it('should click at menu to', async function () {
			await commonHelper.waitUntilElementVisible(predictionPage.tknMenuTo);
			await predictionPage.clickTknMenuTo();
		});

		it('should set tPOL at to', async function () {
			await commonHelper.waitUntilElementVisible(predictionPage.tknTpolAtMenu);
			await predictionPage.chooseTpol();
		});

		it('should check if from is BLACK', function () {
			expect(predictionPage.getNameFirstTkn()).toContain('BLACK');
		});

		it('should check if to is tPOL', function () {
			expect(predictionPage.getNameSecondTkn()).toContain('tPOL');
		});

		it('should get black from balance', async function () {
			await predictionPage.getBalanceFrom().then(async function (value) {
				blackFromBalance = value.split(': ')[1];
			})
		});

		it('should get tPOL to balance', async function () {
			await predictionPage.getBalanceTo().then(async function (value) {
				tpolToBalance = value.split(': ')[1];
			})
		});

		it('should feel input with 1', async function () {
			await predictionPage.fillTokenInput(1);
		});

		it('should get MainReceived', async function () {
			await predictionPage.getMinReceived().then(async function (value) {
				let test = value.split(' t')[0];
				minReceivedTpol = test.replace('          ', '');
				console.log('MINRECEIVED TPOL: ', minReceivedTpol);
			});
		});

		it('should predict changed BLACK from balance', function () {
			changedBlackFromBalance = (+blackFromBalance - 1).toString();
			console.log('CHANGED BLACK FROM BALANCE: ', changedBlackFromBalance);
		});

		it('should predict changed tPOL to balance', function () {
			changedTpolToBalance = (+tpolToBalance + (+minReceivedTpol)).toString();
			console.log('CHANGED tPOL TO BALANCE: ', changedTpolToBalance);
		});

		it('should click button swap', async function () {
			await predictionPage.clickSwap();
			await browser.sleep(2000);
			await browser.driver.switchTo().window(modal);
			await browser.sleep(2000);
			await browser.refresh();
		});

		it('should confirm transaction at metamask', async function check(done) {
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

		it('should check if transaction is done', async function () {
			await metaMaskPage.clickConfirmTransaction();
			await browser.driver.switchTo().window(master);
			await homePage.clickClosePopUp();
			await commonHelper.waitUntilElementVisible(homePage.successTransactionMsg);
		});

		it('should get new BLACK from balance after transaction', async function () {
			await predictionPage.getBalanceFrom().then(async function (value) {
				blackFromBalanceAfter = value.split(': ')[1];
			})
		});

		it('should get new tPOL to balance after transaction', async function () {
			await predictionPage.getBalanceTo().then(async function (value) {
				tpolToBalanceAfter = value.split(': ')[1];
			})
		});

		it('should check BLACK from balance after transaction', function () {
			expect(blackFromBalanceAfter).toContain(changedBlackFromBalance.slice(0, 7));
		});

		it('should check tPOL to balance after transaction', function () {
			expect(tpolToBalanceAfter).toContain(changedTpolToBalance.slice(0, 7));
		});
//////////


		///// Exchange from BLACK to WHITE

		it('should click at menu from', async function () {
			await commonHelper.waitUntilElementVisible(predictionPage.tknMenuFrom);
			await predictionPage.clickTknMenuFrom();
		});

		it('should set black at from', async function () {
			await commonHelper.waitUntilElementVisible(predictionPage.tknBlackAtMenu);
			await predictionPage.chooseBlack();
		});
		it('should click at menu to', async function () {
			await commonHelper.waitUntilElementVisible(predictionPage.tknMenuTo);
			await predictionPage.clickTknMenuTo();
		});

		it('should set WHITE at to', async function () {
			await commonHelper.waitUntilElementVisible(predictionPage.tknWhiteAtMenu);
			await predictionPage.chooseWhite();
		});

		it('should check if from is BLACK', function () {
			expect(predictionPage.getNameFirstTkn()).toContain('BLACK');
		});

		it('should check if to is WHITE', function () {
			expect(predictionPage.getNameSecondTkn()).toContain('WHITE');
		});

		it('should get black from balance', async function () {
			await predictionPage.getBalanceFrom().then(async function (value) {
				blackFromBalance = value.split(': ')[1];
			})
		});

		it('should get WHITE to balance', async function () {
			await predictionPage.getBalanceTo().then(async function (value) {
				whiteToBalance = value.split(': ')[1];
			})
		});

		it('should feel input with 1', async function () {
			await predictionPage.fillTokenInput(1);
		});

		it('should get MainReceived', async function () {
			await predictionPage.getMinReceived().then(async function (value) {
				let test = value.split(' W')[0];
				minReceivedWhite = test.replace('          ', '');
				console.log('MINRECEIVED WHITE: ', minReceivedWhite);
			});
		});

		it('should predict changed BLACK from balance', function () {
			changedBlackFromBalance = (+blackFromBalance - 1).toString();
			console.log('CHANGED BLACK FROM BALANCE: ', changedBlackFromBalance);
		});

		it('should predict changed WHITE to balance', function () {
			changedWhiteToBalance = (+whiteToBalance + (+minReceivedWhite)).toString();
			console.log('CHANGED WHITE TO BALANCE: ', changedWhiteToBalance);
		});

		it('should click button swap', async function () {
			await predictionPage.clickSwap();
			await browser.sleep(2000);
			await browser.driver.switchTo().window(modal);
			await browser.sleep(2000);
			await browser.refresh();
		});

		it('should confirm transaction at metamask', async function check(done) {
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

		it('should check if transaction is done', async function () {
			await metaMaskPage.clickConfirmTransaction();
			await browser.driver.switchTo().window(master);
			await homePage.clickClosePopUp();
			await commonHelper.waitUntilElementVisible(homePage.successTransactionMsg);
		});

		it('should get new WHITE to balance after transaction', async function () {
			await predictionPage.getBalanceTo().then(async function (value) {
				whiteToBalanceAfter = value.split(': ')[1];
			})
		});

		it('should get new BLACK from balance after transaction', async function () {
			await predictionPage.getBalanceFrom().then(async function (value) {
				blackFromBalanceAfter = value.split(': ')[1];
			})
		});

		it('should check BLACK from balance after transaction', function () {
			expect(blackFromBalanceAfter).toContain(changedBlackFromBalance.slice(0, 7));
		});

		it('should check WHITE to balance after transaction', function () {
			expect(whiteToBalanceAfter).toContain(changedWhiteToBalance.slice(0, 7));
		});

		///// Exchange from WHITE to BLACK

		it('should click the button to change tokens', async function () {
			await predictionPage.clickChangeTokens();
		});

		it('should check if from is WHITE ', function () {
			expect(predictionPage.getNameFirstTkn()).toContain('WHITE');
		});

		it('should check if to is BLACK', function () {
			expect(predictionPage.getNameSecondTkn()).toContain('BLACK');
		});

		it('should get WHITE from balance', async function () {
			await predictionPage.getBalanceFrom().then(async function (value) {
				whiteFromBalance = value.split(': ')[1];
			})
		});

		it('should get black to balance', async function () {
			await predictionPage.getBalanceTo().then(async function (value) {
				blackToBalance = value.split(': ')[1];
			})
		});

		it('should feel input with 1', async function () {
			await predictionPage.fillTokenInput(1);
		});

		it('should get MinReceived', async function () {
			await predictionPage.getMinReceived().then(async function (value) {
				let test = value.split(' B')[0];
				newMinReceivedBlack = test.replace('          ', '');
				console.log('MINRECEIVED BLACK: ', newMinReceivedBlack);
			});
		});

		it('should predict changed WHITE from balance', function () {
			changedWhiteFromBalance = (+whiteFromBalance - 1).toString();
			console.log('CHANGED WHITE FROM BALANCE: ', changedWhiteFromBalance);
		});

		it('should predict changed BLACK to balance', function () {
			changedBlackToBalance = (+blackToBalance + (+newMinReceivedBlack)).toString();
			console.log('CHANGED BLACK TO BALANCE: ', changedBlackToBalance);
		});

		it('should click button swap', async function () {
			await predictionPage.clickSwap();
			await browser.sleep(2000);
			await browser.driver.switchTo().window(modal);
			await browser.sleep(2000);
			await browser.refresh();
		});

		it('should confirm transaction at metamask', async function check(done) {
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

		it('should check if transaction is done', async function () {
			await metaMaskPage.clickConfirmTransaction();
			await browser.driver.switchTo().window(master);
			await homePage.clickClosePopUp();
			await commonHelper.waitUntilElementVisible(homePage.successTransactionMsg);
		});

		it('should get new WHITE from balance after transaction', async function () {
			await predictionPage.getBalanceFrom().then(async function (value) {
				newWhiteFromBalanceAfter = value.split(': ')[1];
			})
		});

		it('should get new BLACK to balance after transaction', async function () {
			await predictionPage.getBalanceTo().then(async function (value) {
				newBlackToBalanceAfter = value.split(': ')[1];
			})
		});

		it('should check WHITE from balance after transaction', function () {
			expect(newWhiteFromBalanceAfter).toContain(changedWhiteFromBalance.slice(0, 7));
		});

		it('should check BLACK to balance after transaction', function () {
			expect(newBlackToBalanceAfter).toContain(changedBlackToBalance.slice(0, 7));
		});

	});
});




