var commonHelper = require('./../services/helpers/common.helper');

var StackingPage = function () {

//Elements//

    this.earnMenu = element(by.cssContainingText('.menu__navigation-item.menu__navigation-vector', 'Earn'));

    this.stakingPage = $('.menu-earn-pages .line-earn');

    this.addTpolTab = element(by.cssContainingText('.trade-top .col.links ', 'Add tPOL'));

    this.addTab = element(by.cssContainingText('.card-content .col.links ', 'Add'));

    this.updateLockTab = element(by.cssContainingText('.card-content .col.links ', 'Update Lock'));

    this.yourTpolInStaking = $$('.card-body-content .card__info-value').get(2);

    this.tokenInput = $$('.token__input-wrapper input').get(0);

    this.addTpolBtn =$('.card-content .big');

    this.stakingBalance = $('.token .token__balance');

    this.stakingPeriod = $('.date-picker .vdp-datepicker');

    this.currentData = $('.cell.day.selected');

    this.updateLockBtn = $('.card-content .big');

//Functions//

    this.clickEarnMenu = async function () {
        await commonHelper.waitUntilElementVisible(this.earnMenu);
        await this.earnMenu.click();
    };

    this.clickStakingPage = async function () {
        await commonHelper.waitUntilElementVisible(this.stakingPage);
        await this.stakingPage.click();

    };

    this.clickAddTpolTab = async function() {
        await commonHelper.waitUntilElementVisible(this.addTpolTab);
        await this.addTpolTab.click();
    };

    this.clickAddTab = async function() {
        await commonHelper.waitUntilElementVisible(this.addTab);
        await this.addTab.click();
    };

    this.getYourTpolInStaking = function() {
        return this.yourTpolInStaking.getText();
    };

    this.getStakingBalance = function() {
        return this.stakingBalance.getText();
    };


    this.clickAddBtn = async function() {
        await commonHelper.waitUntilElementVisible(this.addTpolBtn);
        await this.addTpolBtn.click();
    };

    this.fillTokenInput = async function (value) {
        await commonHelper.waitUntilElementVisible(this.tokenInput);
        await this.tokenInput.clear();
        await this.tokenInput.sendKeys(value);
    };

    this.clickUpdateLockTab = async function() {
        await commonHelper.waitUntilElementVisible(this.updateLockTab);
        await this.updateLockTab.click();
    };

    this.clickDate = async function() {
        await commonHelper.waitUntilElementVisible(this.stakingPeriod);
        await this.stakingPeriod.click();
    };

    this.getStakingDate = async function() {
        await commonHelper.waitUntilElementVisible(this.currentData);
        return this.currentData.getText();
    };

    this.clickNewDate = async function(nextDate){
        let el = element(by.xpath(`//*[@class= "cell day"][contains(.,"${nextDate}")]`));
        await commonHelper.waitUntilElementVisible(el);
        await el.click();
    };

    this.clickUpdateBtn = async function() {
        await commonHelper.waitUntilElementVisible(this.updateLockBtn);
        await this.updateLockBtn.click();
    };


}
module.exports = StackingPage;
