var commonHelper = require('./../services/helpers/common.helper');

var HomePage = function () {

    //Elements//

    this.btnAcceptCookie = $('.btn-success.accept-cookie');

    this.btnConnectWallet = $('.main .connect_wallet');

    this.btnSelectMetamask = $$('.wallets .wallet-layout').get(0);

    this.successWalletConnectMsg = element(by.cssContainingText('.iziToast-texts p', 'Successfully connected to Metamask'));

    this.closePopUp = element(by.cssContainingText('.modal-layout__content div', 'Close'));

    this.successTransactionMsg = element(by.cssContainingText('.iziToast-texts p','Successfull transaction'));

    this.btnNextMetamask = element(by.cssContainingText('button', 'Next'));

    this.btnConnectMetamask = element(by.cssContainingText('button', 'Connect'));


    //Functions//

    this.clickAcceptCookies = async function () {
        await commonHelper.waitUntilElementVisible(this.btnAcceptCookie);
        await this.btnAcceptCookie.click();
    };

    this.clickConnectWallet = async function () {
        await commonHelper.waitUntilElementVisible(this.btnConnectWallet);
        await this.btnConnectWallet.click();
    };

    this.selectMetamask = async function () {
        await commonHelper.waitUntilElementVisible(this.btnSelectMetamask);
        await this.btnSelectMetamask.click();
    };

    this.clickClosePopUp = async function () {
        await commonHelper.waitUntilElementVisible(this.closePopUp);
        await this.closePopUp.click();
    };

    this.clickNextBtn = async function () {
        await commonHelper.waitUntilElementVisible(this.btnNextMetamask);
        await this.btnNextMetamask.click();
    };

    this.clickConnectMetamask = async function () {
        await commonHelper.waitUntilElementVisible(this.btnConnectMetamask);
        await this.btnConnectMetamask.click();
    }

}

module.exports = HomePage;