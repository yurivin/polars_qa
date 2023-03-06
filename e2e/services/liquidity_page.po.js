var commonHelper = require('./../services/helpers/common.helper');

var LiquidityPage = function () {

//Elements//

    this.arrowDropdown = $('.menu__navigation-vector .menu-vector');

    this.arrowLevSuit = $$('.menu__navigation-vector .menu-vector').get(1);

    this.liquidityTab = element(by.cssContainingText('.menu-earn-pages .line-earn span', 'Liquidity'));

    this.levLiquidityTab = $$('.menu-earn-pages .line-earn span').get(1);

    this.input = $('input.token__input');

    this.btnAdd = element(by.cssContainingText('.big', 'ADD'));

    this.btnRemove = element(by.cssContainingText('.big', 'REMOVE'));

    this.removeTab = element(by.cssContainingText('.links', 'Remove'));

    this.tokenMax = element(by.cssContainingText('.token__max', 'MAX'));


    //Functions//

    this.clickArrowLev = async function () {
        await commonHelper.waitUntilElementVisible(this.arrowLevSuit);
        await this.arrowLevSuit.click();
    };

    this.clickArrow = async function () {
        await commonHelper.waitUntilElementVisible(this.arrowDropdown);
        await this.arrowDropdown.click();
    };

    this.clickLiquidity = async function () {
        await commonHelper.waitUntilElementVisible(this.liquidityTab);
        await this.liquidityTab.click();
    };

    this.clickLevLiquidity = async function () {
        await commonHelper.waitUntilElementVisible(this.levLiquidityTab);
        await this.levLiquidityTab.click();
    };

    this.inputAdd = async function (value) {
        await commonHelper.waitUntilElementVisible(this.input);
        await this.input.clear();
        await this.input.sendKeys(value);
    };

    this.clickMaxBtn = async function () {
        await commonHelper.waitUntilElementVisible(this.tokenMax);
        await this.tokenMax.click();
    };

    this.clickAdd = async function () {
        await commonHelper.waitUntilElementVisible(this.btnAdd);
        await this.btnAdd.click();
    };

    this.clickRemove = async function () {
        await commonHelper.waitUntilElementVisible(this.btnRemove);
        await this.btnRemove.click();
    };

    this.clickRemoveTab = async function () {
        await commonHelper.waitUntilElementVisible(this.removeTab);
        await this.removeTab.click();
    };




}

module.exports = LiquidityPage;


