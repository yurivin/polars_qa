var commonHelper = require('./../services/helpers/common.helper');

var PlatformsPage = function () {

    //Elements//

    this.switchPlatformBtn = $$('.platform .switch-platform').get(0);

    this.closeRpcContainer = $('.rpc-container img');



    //Functions//

    this.clickCloseRpc = async function () {
        await commonHelper.waitUntilElementVisible(this.closeRpcContainer);
        await this.closeRpcContainer.click();
    };

    this.clickSwitchPlatform = async function () {
        await commonHelper.scrollToElement(this.switchPlatformBtn);
        await commonHelper.waitUntilElementVisible(this.switchPlatformBtn);
        await this.switchPlatformBtn.click();
    };

    this.selectPlatform = async function (value) {
        let platform = element(by.xpath(`//*[@class='platform-card__header'][contains(.,'${value}')]//div[@class='small'][contains(.,'Activate')]`));
        await commonHelper.waitUntilElementVisible(platform);
        await platform.click();
        let activatedPlatform = element(by.xpath(`//*[@class='platform-card__header'][contains(.,'${value}')]//div[@class='small disabled'][contains(.,'Activated')]`));
        await commonHelper.waitUntilElementVisible(activatedPlatform);
    };

    this.activateSuit = async function (name) {
        let btn = element(by.xpath(`//*[@class="platform-card__header_item title"][contains(.,'${name}')]//ancestor::div[@class='platform-card__header']//div[@class='small']`));

        await commonHelper.waitUntilElementVisible(btn,'suit is not in the list', );
        await btn.click();
    };

    this.checkSuit = async function (name) {
        await console.log(name)
        return element(by.xpath(`//*[@class="platform-card__header_item title"][contains(.,'${name}')]//ancestor::div[@class='platform-card__header']//div[@class='small']`));
    };

}

module.exports = PlatformsPage;