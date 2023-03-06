var commonHelper = require('./../services/helpers/common.helper');

var PredictionPage = function () {

    //Elements//

    this.tokenInput = $$('.token__input-wrapper input').get(0);

    this.tokenOutput = $$('.token__input-wrapper input').get(1);
//
    this.btnSwap = $('.card .big');

    this.minReserved = $$('.txt.list__text').get(0);

    this.blankPredictionPriceWhite = $('.card-content .now_price_white');

    this.blankPredictionPriceBlack = $('.card-content .now_price_white');

    this.currentPriceWhite = $('.price.col.p-0');

    this.balanceFrom = $$('.token__balance').get(0);

    this.balanceTo = $$('.token__balance').get(1);

    this.arrows = $('.card-content .card-buttons');

    this.tknNameFirst = $$('.token__symbol.txt').get(0);

    this.tknNameSecond = $$('.token__symbol.txt').get(1);

    this.tknMenuFrom = $$('.card-body-content .token__info.token__info--selectable').get(0);

    this.tknMenuTo = $$('.card-body-content .token__info.token__info--selectable').get(1);

    this.tknTpolAtMenu = element(by.cssContainingText('.modal-layout .token','tPOL'));

    this.tknBlackAtMenu = element(by.cssContainingText('.modal-layout .token','BLACK'));

    this.tknWhiteAtMenu = element(by.cssContainingText('.modal-layout .token','WHITE'));

    this.earnMenu = element(by.cssContainingText('.menu__navigation-item.menu__navigation-vector','Earn'));

    this.stakingPage = $('.menu-earn-pages .line-earn');

    this.addTpolTab = element(by.cssContainingText('.trade-top .col.links ','Add tPOL'));

    this.newLockTab = element(by.cssContainingText('.card-content .col.links ','New Lock'));

    this.tpolInCirculation = $$('.card-body-content .card__info-value').get(0);

    this.tpolInStaking = $$('.card-body-content .card__info-value').get(1);

    this.yourTpolInStaking = $$('.card-body-content .card__info-value').get(2);

    this.yourPerOfStakingPool = $$('.card-body-content .card__info-value').get(3);

    this.averageApy = $$('.card-body-content .card__info-value').get(4);

    this.stakingBalsnce = $('.token .token__balance');

    this.newLockBtn =$('.card-content .big');
    //Functions//

    this.fillTokenInput = async function (value) {
        await commonHelper.waitUntilElementVisible(this.tokenInput);
        await this.tokenInput.clear();
        await this.tokenInput.sendKeys(value);
    };

    this.clickSwap = async function () {
        // await commonHelper.scrollToElement(this.btnSwap);
        await commonHelper.waitUntilElementVisible(this.btnSwap);
        await this.btnSwap.click();
    };
//
    this.getCurrentPrice = function () {
        return this.currentPriceWhite.getText();
    };

    this.getMinReceived = function () {
        return this.minReserved.getText();
    };

    this.getBalanceFrom = function () {
        return this.balanceFrom.getText();
    };

    this.getBalanceTo = function () {
        return this.balanceTo.getText();
    };

    this.clickChangeTokens = async function () {
        await commonHelper.waitUntilElementVisible(this.arrows);
        await this.arrows.click();
    };

    this.getNameFirstTkn = function () {
        return this.tknNameFirst.getText();
    };

    this.getNameSecondTkn = function () {
        return this.tknNameSecond.getText();
    };

    this.clickTknMenuFrom = async function () {
        await commonHelper.waitUntilElementVisible(this.tknMenuFrom);
        await this.tknMenuFrom.click();
    }

    this.chooseTpol = async function () {
        await commonHelper.waitUntilElementVisible(this.tknTpolAtMenu);
        await this.tknTpolAtMenu.click();
    }

    this.clickTknMenuTo = async function () {
        await commonHelper.waitUntilElementVisible(this.tknMenuTo);
        await this.tknMenuTo.click();
    }

    this.chooseBlack = async function () {
        await commonHelper.waitUntilElementVisible(this.tknBlackAtMenu);
        await this.tknBlackAtMenu.click();
    }


    this.chooseWhite = async function () {
        await commonHelper.waitUntilElementVisible(this.tknBlackAtMenu);
        await this.tknWhiteAtMenu.click();
    }

    this.clickEarnMenu = async function () {
        await commonHelper.waitUntilElementVisible(this.earnMenu);
        await this.earnMenu.click();
    }

    this.clickStakingPage = async function() {
        await commonHelper.waitUntilElementVisible(this.stakingPage);
        await this.stakingPage.click();
    }
    this.clickAddTpolTab = async function() {
        await commonHelper.waitUntilElementVisible(this.addTpolTab);
        await this.addTpolTab.click();
    }

    this.clickNewLockTab = async function() {
        await commonHelper.waitUntilElementVisible(this.newLockTab);
        await this.newLockTab.click();
    }

    this.getTpolInCirculation = function() {
        return this.tpolInCirculation.getText();
    }

    this.getTpolInStaking = function() {
        return this.tpolInStaking.getText();
    }

    this.getYourTpolInStaking = function() {
        return this.yourTpolInStaking.getText();
    }

    this.getYourPerOfStakingPool = function() {
        return this.yourPerOfStakingPool.getText();
    }

    this.getAverageApy = function() {
        return this.averageApy.getText();
    }

    this.getStakingBalance = function() {
        return this.stakingBalsnce.getText();
    }

    this.clickNewLockBtn = async function() {
        await commonHelper.waitUntilElementVisible(this.newLockBtn);
        await this.newLockBtn.click();
    }

}

module.exports = PredictionPage;