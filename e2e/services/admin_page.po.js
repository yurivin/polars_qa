var commonHelper = require('./../services/helpers/common.helper');

var AdminPage = function () {

//Elements//


    this.bigAcceptBtn = $('.card-admin .big');

    this.eventBase = $('[href="/admin/assets/event-bases"]');

    this.polarEvents = $('[href="/admin/assets/events-polars"]');

    this.polarEventsEnded = $('[href="/admin/assets/events-polars/ended"]');

    this.polarEventsCurrent = $('[href="/admin/assets/events-polars/current"]');

    this.polarEventsFuture =  $('[href="/admin/assets/events-polars/events-future"]');

    this.eventBaseFuture = $('[href="/admin/assets/event-bases/future"]');

    this.eventBaseAddEvent = $('[href="/admin/assets/event-bases/past"]');

    this.eventBaseCustomEvent = $('[href="/admin/assets/event-bases/custom"]');

    this.polarEventsDraft = $('[href="/admin/assets/events-polars/events-future/draft"]');

    this.coinMenu = $$('.card-admin .mb-3').get(0);

    this.coinOther = element(by.xpath('(//*[@class = "card-admin"]//*[@class = "items"])//*[contains(.,"Other")]'));

    this.coinList = $$('.card-admin .mb-3').get(1);

    this.sol = element(by.xpath('//*[@class = "items"]//*[contains(.,"SOL")]'));

    this.currentDate = $('.vdatetime-calendar .vdatetime-calendar__month__day--selected');

    this.confirmBtnTime = $('.vdatetime-popup__actions__button--confirm');

    this.successEventAddedMessage = element(by.cssContainingText('.iziToast-body','Event was added'));

    this.successMatchAddedMessage = element(by.cssContainingText('.iziToast-texts p','Match was added'));

    this.successMatchResultAddedMessage = element(by.cssContainingText('.iziToast-body','Match result added'));

    this.makePredictionBtn = $('.button.button--color');

    this.amountInput = $('.amount-input .amount-input__input');

    this.teamName = element(by.cssContainingText('.team-selector__team','WHITE'));

    this.makePredictionBigBtn = $('.button--color.button--block.button--big');

    this.transactionSubmited = element(by.cssContainingText('.content__text','Transaction Submitted'));

    this.eventStarted = element(by.cssContainingText('.iziToast-texts', 'Event was started'));

    this.closeBtn = element(by.cssContainingText('.big','Close'));

    this.confirmBtn = element(by.cssContainingText('.big','CONFIRM'));

    this.contract = element(by.cssContainingText('.big-btn', 'add event to contract'));

    this.inContract = $('[href="/admin/assets/events-polars/events-future/incontract"]');

    this.orederBet = $('.table .token-amount');

    this.betTeam = element(by.cssContainingText('.table .bet', 'WHITE'))

    this.whiteWin = element(by.xpath('//*[@class = "small-btn-result"][contains(.,"WHITE")and contains(.,"BTC UP")]'));

    this.imgTrophy = element(by.xpath('//td[contains(.,"8:56 PM - 11:56 PM") and contains(.,"24 April")]//..//*[@class = "event-teams__team event-teams__team--white"]/img'));

    this.side = element(by.xpath('//td[contains(.,"8:56 PM - 11:56 PM") and contains(.,"24 April")]//..//*[@class = "bet justify-content-center bet--white"]'));

    this.orderAmount = element(by.xpath('(//td[contains(.,"8:56 PM - 11:56 PM") and contains(.,"24 April")]//..//*[@class = "token-amount justify-content-center"])[0]'));

    this.orderDiff = element(by.xpath('(//td[contains(.,"8:56 PM - 11:56 PM") and contains(.,"24 April")]//..//*[@class = "token-amount justify-content-center"])[1]'));

    this.eventUpdate = element(by.cssContainingText('.iziToast-message', 'Event was update'));

    this.eventFinished = element(by.cssContainingText('.badge', 'Finished'));

    this.ordersClaim = element(by.cssContainingText('.claim-table__button', 'Claim'));

    this.close = $('.modal-layout__container .modal-layout__exit');

    this.okBtn = $('.vdatetime-popup__actions__button--confirm');

    this.timeStart =$('input[placeholder = "Time Start"]');

    this.timeStartSuit =$('input[placeholder = "Start Time"]');

    this.timeEnd =$('input[placeholder = "Time End"]');

    this.timeEndSuit =$('input[placeholder = "End Time"]');

    this.amountInputBalance = $('.make-prediction-modal .amount-input__balance');

    this.eventDateMakePrediction = $('.modal-layout .event-date__time');

    this.eventTimeMakePrediction = $('.modal-layout .event-date__date');

    this.orderMade = element(by.cssContainingText('.badge', 'Order made'));

    this.adminTab = $('[href="/admin"]');

    this.loader = $('.loader [alt="Loading"]');

    this.loadingCotracts = element(by.cssContainingText('.switch-network-body', 'Loading Contracts...'));

    this.time = $$('.card-admin .event-type__time').first();

    this.date = $$('.card-admin .event-type__date').first();

    //Functions//



    this.getOrderMade = async function () {
        await commonHelper.waitUntilElementVisible(this.orderMade);
        return this.orderMade.getText();
    };

    this.getBetTeam = async function () {
        await commonHelper.waitUntilElementVisible(this.betTeam);
        return this.betTeam.getText();
    };

    this.getOrderAmount = async function () {
        await commonHelper.waitUntilElementVisible(this.orderAmount);
        return this.orderAmount.getText();
    };

    this.getOrderDiff = async function () {
        await commonHelper.waitUntilElementVisible(this.orderDiff);
        return this.orderDiff.getText();
    };

    this.getOrderBet = async function () {
        await commonHelper.waitUntilElementVisible(this.orederBet);
        return this.orederBet.getText();
    };

    this.getSide = async function () {
        await commonHelper.waitUntilElementVisible(this.side);
        return this.side.getText();
    };

    this.clickInContract = async function () {
        await commonHelper.waitUntilElementVisible(this.inContract);
        await this.inContract.click();
    };

    this.clickOrdersClaim = async function () {
        await commonHelper.scrollToElement(this.ordersClaim);
        await commonHelper.waitUntilElementVisible(this.ordersClaim);
        await this.ordersClaim.click();
        await browser.sleep(2000);
    };

    this.clickClose = async function () {
        await commonHelper.waitUntilElementVisible(this.close);
        await this.close.click();
    };

    this.clickWhiteWin = async function () {
        await commonHelper.waitUntilElementVisible(this.whiteWin);
        await this.whiteWin.click();
    };

    this.clickConfirmBtn = async function () {
        await commonHelper.waitUntilElementVisible(this.confirmBtn);
        await this.confirmBtn.click();
    };

    this.clickContract = async function () {
        await browser.sleep(5000);
        await commonHelper.waitUntilElementVisible(this.contract);
        await this.contract.click();
    };

    this.clickPolarEventsFuture = async function () {
        await commonHelper.waitUntilElementVisible(this.polarEventsFuture);
        await this.polarEventsFuture.click();
    };

    this.clickPolarEvents = async function () {
        await commonHelper.waitUntilElementVisible(this.polarEvents);
        await this.polarEvents.click();
    };

    this.clickCloseBtn = async function () {
        await commonHelper.waitUntilElementVisible(this.closeBtn);
        await this.closeBtn.click();
    };

    this.selectTeamName = async function () {
        await commonHelper.waitUntilElementVisible(this.teamName);
        await this.teamName.click();
    };
    //
    // this.clickMakePredictionBigBtn = async function () {
    //     await commonHelper.waitUntilElementVisible(this.makePredictionBigBtn);
    //     await this.makePredictionBigBtn.click();
   // };

    this.fillAmountInput = async function (value) {
        await commonHelper.waitUntilElementVisible(this.amountInput);
        await this.amountInput.clear();
        await this.amountInput.sendKeys(value);
    };

    this.clickDetails = async function(futureStartTime) {
        let details = element(by.xpath(`//*[@class = "card-admin"][contains(.,"${futureStartTime}")]//*[@class = "add-event-list-btn"]`));
        await commonHelper.waitUntilElementVisible(details);
        await details.click();
    };

    this.clickStart = async function(futureStartTime) {
        let start = element(by.xpath(`//*[@class = "card-admin"][contains(.,"${futureStartTime}")]//*[@class = "small-btn"][contains(.,"START")]`));
        await browser.sleep(2000);
        await commonHelper.waitUntilElementVisible(start);
        await browser.sleep(2000);
        await start.click();
    };

    this.clickStartSuit = async function() {
        let start = element(by.xpath(`//*[@class = "card-admin"]//*[@class = "small-btn"][contains(.,"START")]`));
        await browser.sleep(2000);
        await commonHelper.waitUntilElementVisible(start);
        await browser.sleep(2000);
        await start.click();
    };

    this.clickEnd = async function(futureStartTime) {
        let end = element(by.xpath(`//*[@class = "card-admin"][contains(.,"${futureStartTime}")]//*[@class = "small-btn"][contains(.,"END")]`));
        await browser.sleep(2000);
        await commonHelper.waitUntilElementVisible(end);
        await browser.sleep(2000);
        await end.click();
    };

    this.loginPasswordInput = async function (input,value) {
        let el = $(`input[placeholder = '${input}']`);
        await commonHelper.waitUntilElementVisible(el);
        await el.clear();
        await el.sendKeys(value);
    };

    this.customEventInput = async function (input, value) {
        let el = $(`input[placeholder ='${input}']`);
        await commonHelper.waitUntilElementVisible(el);
        await el.clear();
        await el.sendKeys(value);
    };

    this.clickDateInput = async function() {
        await commonHelper.waitUntilElementVisible(this.timeStart);
        await this.timeStart.click();
        await commonHelper.waitUntilElementVisible(this.currentDate);
        await this.okBtn.click();
    };

    this.clickDateInputSuit = async function() {
        await commonHelper.waitUntilElementVisible(this.timeStartSuit);
        await this.timeStartSuit.click();
        await commonHelper.waitUntilElementVisible(this.currentDate);
        await this.okBtn.click();
    };

    this.clickDateEndInput = async function() {
        await commonHelper.waitUntilElementVisible(this.timeEnd);
        await this.timeEnd.click();
        await commonHelper.waitUntilElementVisible(this.currentDate);
        await this.okBtn.click();
    };

    this.clickDateEndInputSuit = async function() {
        await commonHelper.waitUntilElementVisible(this.timeEndSuit);
        await this.timeEndSuit.click();
        await commonHelper.waitUntilElementVisible(this.currentDate);
        await this.okBtn.click();
    };

    this.fillDateInput = async function (hours, minutes) {
        let startHoursTab = element(by.cssContainingText('.vdatetime-time-picker__list--hours .vdatetime-time-picker__item', hours));
        let startMinutesTab = element(by.cssContainingText('.vdatetime-time-picker__list--minutes .vdatetime-time-picker__item', minutes));

        await commonHelper.waitUntilElementVisible(startHoursTab);
        await commonHelper.scrollToElement(startHoursTab);
        await startHoursTab.click();
        await commonHelper.waitUntilElementVisible(startMinutesTab);
        await commonHelper.scrollToElement(startMinutesTab);
        await startMinutesTab.click();
        await this.confirmBtnTime.click();
    };

    this.endDateInput = async function (hours, minutes) {
        let endHoursTab = element(by.cssContainingText('.vdatetime-time-picker__list--hours .vdatetime-time-picker__item',hours));
        let endMinutesTab = element(by.cssContainingText('.vdatetime-time-picker__list--minutes .vdatetime-time-picker__item',minutes));

        await commonHelper.waitUntilElementVisible(endHoursTab);
        await commonHelper.scrollToElement(endHoursTab);
        await endHoursTab.click();
        await commonHelper.waitUntilElementVisible(endMinutesTab);
        await commonHelper.scrollToElement(endMinutesTab);
        await endMinutesTab.click();
        await this.confirmBtnTime.click();
    };

    this.clickBidAcceptBtn = async function() {
        await commonHelper.waitUntilElementVisible(this.bigAcceptBtn);
        await this.bigAcceptBtn.click();
    };

    this.clickEventBase = async function () {
        await commonHelper.waitUntilElementVisible(this.eventBase);
        await this.eventBase.click();
    };

    this.clickEventBaseCustomEvent = async function () {
        await commonHelper.waitUntilElementVisible(this.eventBaseCustomEvent);
        await this.eventBaseCustomEvent.click();
    };

    this.clickCoinMenu = async function () {
        await commonHelper.waitUntilElementVisible(this.coinMenu);
        await this.coinMenu.click();
    };

    this.clickOther = async function () {
        await commonHelper.waitUntilElementVisible(this.coinOther);
        await this.coinOther.click();
    };

    this.clickEventBaseFuture= async function () {
        await commonHelper.waitUntilElementVisible(this.eventBaseFuture);
        await this.eventBaseFuture.click();
    };

    this.selectBothPlatforms = async function (first, second) {
        this.firstPlatform = element(by.xpath(`//span[contains(.,"${first}")]`));
        this.secondPlatform = element(by.xpath(`//span[contains(.,"${second}")]`));

        await commonHelper.scrollToElement(this.firstPlatform);
        await commonHelper.waitUntilElementVisible(this.firstPlatform);
        await this.firstPlatform.click();

        await commonHelper.scrollToElement(this.secondPlatform);
        await commonHelper.waitUntilElementVisible(this.secondPlatform);
        await this.secondPlatform.click();
    };

    this.selectPolPlatform = async function (first, second) {
        this.firstPlatform = element(by.xpath(`//span[contains(.,"${first}")]`));
        this.secondPlatform = element(by.xpath(`//span[contains(.,"${second}")]`));

        await commonHelper.scrollToElement(this.firstPlatform);
        await commonHelper.waitUntilElementVisible(this.firstPlatform);
        await this.firstPlatform.click();
    };

    this.clickCryptoList = async function () {
        await commonHelper.waitUntilElementVisible(this.coinList);
        await this.coinList.click();
    };

    this.selectToken = async function (value) {
        let token = element(by.cssContainingText('.items', value));
        await browser.sleep(2000);
        await commonHelper.scrollToElement(token);
        await commonHelper.waitUntilElementVisible(token);
        await token.click();
    };

    this.clickFutureEventTime = async function () {
        await commonHelper.waitUntilElementVisible(this.futureEventTime);
        await this.futureEventTime.click();
    };

    this.setFutureDta = async function (menu, option) {
        await commonHelper.waitUntilElementVisible(menu);
        await menu.click();
        await browser.sleep(2000);
        await commonHelper.waitUntilElementVisible(option);
        await option.click();
    };

    this.clickAdminTab = async function () {
        await commonHelper.waitUntilElementVisible(this.adminTab);
        await this.adminTab.click();
    };

    this.selectResult = async function (team) {
        let el = element(by.cssContainingText('.small-btn-result', team));
        await commonHelper.waitUntilElementVisible(el);
        await el.click();
    };

    this.checkEndDisabled = async function (futureStartTime) {
        let el = element(by.xpath(`//*[@class = "card-admin"][contains(.,"${futureStartTime}")]//*[@class = "small-btn disabled"][contains(.,"END")]`));
        await commonHelper.waitUntilElementVisible(el);
    };

    this.clickDetailsApiEvent = async function() {
        let details = $$('.card-admin .add-event-list-btn').get(0);
        await commonHelper.waitUntilElementVisible(details);
        await details.click();
    };

    this.selectBothPlatformsApiEvent = async function (first, second) {
        this.firstPlatform = element(by.xpath(`(//span[contains(.,"${first}")])[1]`));
        this.secondPlatform = element(by.xpath(`(//span[contains(.,"${second}")])[1]`));

        await commonHelper.scrollToElement(this.firstPlatform);
        await commonHelper.waitUntilElementVisible(this.firstPlatform);
        await this.firstPlatform.click();
        await browser.sleep(3000);
        await commonHelper.scrollToElement(this.secondPlatform);
        await commonHelper.waitUntilElementVisible(this.secondPlatform);
        await this.secondPlatform.click();
    };

    this.selectPlatformsApiEvent = async function (first) {
        this.firstPlatform = element(by.xpath(`(//span[contains(.,"${first}")])[1]`));

        await commonHelper.scrollToElement(this.firstPlatform);
        await commonHelper.waitUntilElementVisible(this.firstPlatform);
        await this.firstPlatform.click();
        await browser.sleep(3000);
    };

    this.priceChangeInput = async function () {
        let el = $$('input[class="input my-select-small"]').get(6);
        await commonHelper.waitUntilElementVisible(el);
        await el.clear();
        await el.sendKeys('5');
    };

    this.addEventToPolars = async function () {
        let el = element(by.cssContainingText('.big-btn', 'add event to polars'));
        await commonHelper.waitUntilElementVisible(el);
        await el.click();
    };

    this.getTimeApi = async function () {
        await commonHelper.waitUntilElementVisible(this.time);
        return this.time.getText();
    };

    this.getDateApi = async function () {
        await commonHelper.waitUntilElementVisible(this.date);
        return this.date.getText();
    };













}

module.exports = AdminPage;


