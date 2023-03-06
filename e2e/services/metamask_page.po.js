var commonHelper = require('./../services/helpers/common.helper');

var MetaMaskPage = function () {

    //Elements//

    this.btnStart = $('#app-content .first-time-flow__button');

    this.btnImport = $$('.first-time-flow__button').get(0);

    this.btnAgree = $('[data-testid="page-container-footer-next"]');

    this.secretKeyInput = $$('input[type="password"]').get(0);

    this.passwordInput = $$('input[type="password"]').get(1);

    this.confirmPasswordInput = $$('input[type="password"]').get(2);

    this.btnTerms = $('.first-time-flow__terms');

    this.btnSubmit = $('[type="submit"]');

    this.btnFinish = $('[role="button"]');

    this.networksDropdown = $('.network-display');

    this.showTestNetwrk = element(by.cssContainingText('a', 'Show/hide'));

    this.testNetwrkSwitch = $$('[data-testid="advanced-setting-show-testnet-conversion"] .toggle-button--off div').get(7);

    this.generalTab = $$('.tab-bar__tab .tab-bar__tab__content__title').get(0);

    this.languageDropdown = $$('.settings-page__content-item-col select').get(1);

    this.networkTab = element(by.cssContainingText('.tab-bar__tab__content div', 'Networks'));

    this.btnAddNewNetwork = element(by.cssContainingText('button', 'Add a network'));

    this.btnSaveNetwork = element(by.cssContainingText('button', 'Save'));

    this.accountMenu = $('.account-menu__icon');

    this.settingsTab = element(by.cssContainingText('.account-menu__item div', 'Settings'));

    this.importAccountTab = element(by.cssContainingText('.account-menu__item div', 'Import Account'));

    this.privateKeyInput = $('input#private-key-box');

    this.btnImportAccount = element(by.cssContainingText('button', 'Import'));

    this.enableSecAccount = $$('[type="checkbox"]').get(2);

    this.nextBtn = element(by.cssContainingText('button', 'Next'));

    this.connectBtn = element(by.cssContainingText('button', 'Connect'));

    this.btnConfirmTransaction = element(by.cssContainingText('button', 'Confirm'));

    //Functions//

    this.mMSettings = async function () {
        await browser.executeScript("document.querySelector('extensions-manager').shadowRoot.querySelector('extensions-item-list').shadowRoot.getElementById('pgalkbghmoeblklmkclojoifddobjcaj').shadowRoot.getElementById('detailsButton').click()");
    };

    this.allowIncognito = async function () {
        await browser.executeScript("document.querySelector('extensions-manager').shadowRoot.querySelector('cr-view-manager').querySelector('extensions-detail-view').shadowRoot.querySelector('extensions-toggle-row').shadowRoot.querySelector('cr-toggle').shadowRoot.getElementById('bar').click()");
    };

    this.disableMetaMask = function () {
        browser.executeScript("document.querySelector('extensions-manager').shadowRoot.getElementById('viewManager').querySelector('extensions-detail-view').shadowRoot.getElementById('enableToggle').shadowRoot.getElementById('bar').click()");
    };

    this.clickStart = async function () {
        await commonHelper.waitUntilElementVisible(this.btnStart);
        await this.btnStart.click();
    };

    this.clickImport = async function () {
        await commonHelper.waitUntilElementVisible(this.btnImport);
        await this.btnImport.click();
    };

    this.clickAgree = async function () {
        await commonHelper.waitUntilElementVisible(this.btnAgree);
        await this.btnAgree.click();
    };

    this.fillSecretKey = async function (secretKey) {
        await commonHelper.waitUntilElementVisible(this.secretKeyInput);
        await this.secretKeyInput.clear();
        await this.secretKeyInput.sendKeys(secretKey);
    };

    this.fillPassword = async function (password) {
        await commonHelper.waitUntilElementVisible(this.passwordInput);
        await this.passwordInput.clear();
        await this.passwordInput.sendKeys(password);
    };

    this.fillConfirmPass = async function (password) {
        await commonHelper.waitUntilElementVisible(this.confirmPasswordInput);
        await this.confirmPasswordInput.clear();
        await this.confirmPasswordInput.sendKeys(password);
    };

    this.clickTerms = async function () {
        await commonHelper.waitUntilElementVisible(this.btnTerms);
        await this.btnTerms.click();
    };

    this.clickSubmit = async function () {
        await commonHelper.waitUntilElementVisible(this.btnSubmit);
        await this.btnSubmit.click();
    };

    this.clickFinish = async function () {
        await commonHelper.waitUntilElementVisible(this.btnFinish);
        await this.btnFinish.click();
    };

    this.clickNetworkDropdown = async function () {
        await commonHelper.waitUntilElementVisible(this.networksDropdown);
        await this.networksDropdown.click();
    };

    this.clickShowTest = async function () {
        await commonHelper.waitUntilElementVisible(this.showTestNetwrk);
        await this.showTestNetwrk.click();
    };

    this.switchTestNet = async function () {
        await commonHelper.waitUntilElementVisible(this.testNetwrkSwitch);
        await this.testNetwrkSwitch.click();
    };

    this.clickGeneralTab = async function () {
        await commonHelper.waitUntilElementVisible(this.generalTab);
        await this.generalTab.click();
    };

    this.returnEl = function () {
        return this.languageDropdown;
    }

    this.selectLanguage = async function (language) {
        let el = element(by.cssContainingText('option', language));
        await commonHelper.waitUntilElementVisible(this.languageDropdown);
        await this.languageDropdown.click();
        await commonHelper.scrollToElement(el);
        await el.click();
        await this.languageDropdown.click();

    };

    this.clickNetworkTab = async function () {
        await commonHelper.waitUntilElementVisible(this.networkTab);
        await this.networkTab.click();
    };

    this.clickAddNetwork = async function () {
        await commonHelper.waitUntilElementVisible(this.btnAddNewNetwork);
        await this.btnAddNewNetwork.click();
    }

    this.fillAddNetworkInput = async function (name, input) {
        let el = element(by.xpath(`//*[@class='form-field__heading-title'][contains(.,'${name}')]//ancestor::label//input`));
        await commonHelper.waitUntilElementVisible(el);
        await el.clear();
        await el.sendKeys(input);
    };

    this.clickSaveNetwork = async function () {
        await commonHelper.waitUntilElementVisible(this.btnSaveNetwork);
        await this.btnSaveNetwork.click();
    };

    this.clickOnAccountMenu = async function () {
        await commonHelper.waitUntilElementVisible(this.accountMenu);
        await this.accountMenu.click();
        await browser.sleep(2000);
    };

    this.clickSettings = async function () {
        await commonHelper.waitUntilElementVisible(this.settingsTab);
        await this.settingsTab.click();
    };

    this.checkNetworkAdded = async function (name) {
        await commonHelper.waitUntilTextInElement('.home__new-network-notification-message', `“${name}” was successfully added!`);
    };

    this.clickImportAccount = async function () {
        await commonHelper.waitUntilElementVisible(this.importAccountTab);
        await this.importAccountTab.click();
    };

    this.fillPrivateKey = async function (key) {
        await commonHelper.waitUntilElementVisible(this.privateKeyInput);
        await this.privateKeyInput.clear();
        await this.privateKeyInput.sendKeys(key)
    };

    this.finishImportAccount = async function () {
        await commonHelper.waitUntilElementVisible(this.btnImportAccount);
        await this.btnImportAccount.click();
    };

    this.changeAccount = async function (account) {
        let el = element(by.cssContainingText('.account-menu__account div', account))
        await commonHelper.waitUntilElementVisible(el);
        await el.click();
    };

    this.selectNetwork = async function (network) {
        let el = element(by.cssContainingText('.dropdown-menu-item span', network));
        await commonHelper.waitUntilElementVisible(el);
        await el.click();
    };

    this.connectOneWallet = async function () {
        await commonHelper.waitUntilElementVisible(this.nextBtn);
        await commonHelper.moveMouseOver(this.nextBtn);
        await this.nextBtn.click();


        await commonHelper.waitUntilElementVisible(this.connectBtn);
        await commonHelper.moveMouseOver(this.connectBtn);
        await this.connectBtn.click();
    };

    this.connectWallets = async function () {
        await commonHelper.waitUntilElementVisible(this.enableSecAccount);
        await commonHelper.moveMouseOver(this.enableSecAccount);
        await this.enableSecAccount.click();

        await commonHelper.waitUntilElementVisible(this.nextBtn);
        await commonHelper.moveMouseOver(this.nextBtn);
        await this.nextBtn.click();


        await commonHelper.waitUntilElementVisible(this.connectBtn);
        await commonHelper.moveMouseOver(this.connectBtn);
        await this.connectBtn.click();
    };

    this.clickConfirmTransaction = async function () {
        await browser.sleep(5000);
        await commonHelper.waitUntilElementVisible(this.btnConfirmTransaction);
        await this.btnConfirmTransaction.click();
    }

}

module.exports = MetaMaskPage;