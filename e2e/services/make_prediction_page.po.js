var commonHelper = require('./../services/helpers/common.helper');

var MakePredictionPage = function () {

    //Elements//

    this.ordersTab = element(by.cssContainingText('.menu__navigation-item','Make Prediction'));

    this.leverageTab = element(by.cssContainingText('.menu__navigation-item','Leverage'));

    this.mySuitsTab = element(by.cssContainingText('.menu__navigation-item','My suites'));

    this.eventList = $('[href="/event_page"] .nav-text-trade');

    this.eventDateTime = $$(".event-list [class*=' time'] .timer").last();

    this.eventDateDate = $$(".event-list [class*=' time'] .date").last();

    this.whiteTeam = $$("[class*='event-match'] [class*='versus'] .white").last();

    this.blackTeam = $$("[class*=\'event-match\'] [class*=\'versus\'] .black").last();

    this.eventCategoryName = $$("[class*='type-match'] span").last();

    this.eventCategoryIcon = $$('.event-category .event-category__icon').get(0);

    this.moreBtn = $$('.table .more-button').get(0);

    this.idEventId= $$('.event-list-table__details .d-flex.justify-content-between').get(0);

    this.idEventType= $$('.event-list-table__details .d-flex.justify-content-between').get(1);

    this.idChampionship= $$('.event-list-table__details .d-flex.justify-content-between').get(2);

    this.idEventDate= $$('.event-list-table__details .d-flex.justify-content-between').get(3);

    this.idEventTimeUtc= $$('.event-list-table__details .d-flex.justify-content-between').get(4);

    this.idWhiteTeam= $$('.event-list-table__details .d-flex.justify-content-between').get(5);

    this.idBlackTeam= $$('.event-list-table__details .d-flex.justify-content-between').get(6);

    this.idEventVolatility= $$('.event-list-table__details .d-flex.justify-content-between').get(7);

    this.volatility = $$("[class*='volatility'] span").last();

    this.makePredictionBalance = $('.make-prediction-modal .amount-input__balance');

    this.makePredictionInput = $('.make-prediction-modal .amount-input__input');

    this.whiteTeamTab = $$('.make-prediction-modal .team-selector__team').get(0);

    this.blackTeamTab = $$('.make-prediction-modal .team-selector__team').get(1);

    this.myOrders = element(by.cssContainingText('.tabs__item', 'My orders'));

    this.makePredictionBigBtn = $('.button--color.button--block.button--big');

    this.makePredictionBigBtnDisabled = $(".button--color.button--block.button--big[disabled='disabled']");

    this.myBet = $('.table .token-amount');

    this.betTeam = $('.table .bet');

    this.makeOrderBtn = element(by.cssContainingText('.button', 'Make prediction'));

    this.modalOrder = element(by.cssContainingText(".modal-layout .modal-layout__title.txt", "Make Prediction"));

    this.modalLev = element(by.cssContainingText(".modal-layout .modal-layout__title.txt", "Make Leverage"));

    this.balance = $('.modal-layout .amount-input__balance');

    this.balanceInputModal = $('.modal-layout .amount-input__input');

    this.makeOrderBigBtn = $('.modal-layout .button--big');

    this.cancelOrderBtn = element(by.cssContainingText("button", "Cancel order"));

    this.cancelOrderBigBtn = $('.modal-layout .button--big');

    this.slider = $('[role="slider"]');

    this.suitNameInput = $('input[placeholder="Suite Name"]');

    this.collateralTokenAddress = $('input[placeholder="Collateral Token Address"]');

    this.confirmAddSuitBtn = element(by.cssContainingText('.big', 'CONFIRM'));

    this.lastPageSuit = $$('[role="menuitemradio"]').last();

    this.checkStepIsThrd = element(by.cssContainingText('.progress', '3/9'));

    this.checkStepIsFrth = element(by.cssContainingText('.progress', '4/9'));

    this.checkStepIsSixth = element(by.cssContainingText('.progress', '6/9'));

    this.checkStepIsSeventh = element(by.cssContainingText('.progress', '7/9'));

    this.checkStepIsEighth = element(by.cssContainingText('.progress', '8/9'));

    this.checkStepIsNinth = element(by.cssContainingText('.progress', '9/9'));


    this.backBtn = $('.all-cards .back-btn');

    this.switchToSuits = $('[href="/platforms/suitsPlatforms"]');

    this.clickOk = element(by.cssContainingText('.big', 'OK'));

    this.approveBtn = element(by.cssContainingText('.big', 'APPROVE POL'));

    this.approveBwlt = element(by.cssContainingText('.big', 'APPROVE BWLT'));

    this.approvePl = element(by.cssContainingText('.big', 'APPROVE PL'));

    this.suitAdmin = element(by.cssContainingText('.nav-text-trade', 'Suite Admin'));

    this.addEventSuit = element(by.cssContainingText('.big','Add Event To Contract'));

    this.inContractSuit = $('[href="/suit-admin/incontract"]');




    //Functions//

    this.clickInContractSuit = async function () {
        await commonHelper.waitUntilElementVisible(this.inContractSuit);
        await this.inContractSuit.click();
    };

    this.clickSuitAdmin = async function () {
        await commonHelper.waitUntilElementVisible(this.suitAdmin);
        await this.suitAdmin.click();
    };

    this.clickAddEventSuit = async function () {
        await commonHelper.waitUntilElementVisible(this.addEventSuit);
        await this.addEventSuit.click();
    };

    this.clickSwitchToSuits = async function () {
        await commonHelper.waitUntilElementVisible(this.switchToSuits);
        await this.switchToSuits.click();
        await browser.sleep(5000);
    };

    this.clickApproveBwlt = async function () {
        await commonHelper.waitUntilElementVisible(this.approveBwlt);
        await this.approveBwlt.click();
    };

    this.clickApprovePl = async function () {
        await commonHelper.waitUntilElementVisible(this.approvePl);
        await this.approvePl.click();
    };

    this.clickApprovePol = async function () {
        await commonHelper.waitUntilElementVisible(this.approveBtn);
        await this.approveBtn.click();
    };

    this.clickOkBtn = async function () {
        await commonHelper.waitUntilElementVisible(this.clickOk);
        await this.clickOk.click();
    };

    this.clickBackBtn = async function () {
        await commonHelper.waitUntilElementVisible(this.backBtn);
        await this.backBtn.click();
    };

    this.fillCommission = async function (value) {
        let el = $('.card__info .token__input');

        await commonHelper.waitUntilElementVisible(el);
        await el.clear();
        await el.sendKeys(value);
    };

    this.createSuit = async function (name, address) {
        await commonHelper.waitUntilElementVisible(this.suitNameInput);
        await commonHelper.waitUntilElementVisible(this.collateralTokenAddress);
        await this.suitNameInput.clear();
        await this.suitNameInput.sendKeys(name);
        await this.collateralTokenAddress.clear();
        await this.collateralTokenAddress.sendKeys(address);
    };

    this.clickConfirmAddSuit = async function () {
        await commonHelper.waitUntilElementVisible(this.confirmAddSuitBtn);
        await this.confirmAddSuitBtn.click();
    };

    this.selectLastPage = async function () {
        await commonHelper.waitUntilElementVisible(this.lastPageSuit);
        await this.lastPageSuit.click();
    };

    this.continueSetup = async function (name) {
        let el = element(by.xpath(`//td[contains(.,'${name}')]//ancestor::tr//button[contains(.,'Setup suite')]`));
        await commonHelper.waitUntilElementVisible(el);
        await el.click();
    };

    this.fillCreatePredictionSuit = async function (wnameValue, wsymbolValue, bnameValue, bsymbolValue) {
        let whiteName = $('#w-name');
        let whiteSymbol = $('#w-symbol');
        let blackName = $('#b-name');
        let blackSymbol = $('#b-symbol');

        await commonHelper.waitUntilElementVisible(whiteName);
        await whiteName.clear();
        await whiteName.sendKeys(wnameValue);

        await commonHelper.waitUntilElementVisible(whiteSymbol);
        await whiteSymbol.clear();
        await whiteSymbol.sendKeys(wsymbolValue);

        await commonHelper.waitUntilElementVisible(blackName);
        await blackName.clear();
        await blackName.sendKeys(bnameValue);

        await commonHelper.waitUntilElementVisible(blackSymbol);
        await blackSymbol.clear();
        await blackSymbol.sendKeys(bsymbolValue);
    };

    this.fillCreatePredictionSuitPrice = async function (wprice, bprice) {
        let whitePrice = $('#Wprice');
        let blackPrice = $('#Bprice');

        await commonHelper.waitUntilElementVisible(whitePrice);
        await whitePrice.clear();
        await whitePrice.sendKeys(wprice);

        await commonHelper.waitUntilElementVisible(blackPrice);
        await blackPrice.clear();
        await blackPrice.sendKeys(bprice);
    };

    this.clickNextBtn = async function () {
        let nextBtn = $('.card__info .next-btn');
        await commonHelper.waitUntilElementVisible(nextBtn);
        await nextBtn.click();
    };

    this.clickOrdersTab = async function() {
        await commonHelper.waitUntilElementVisible(this.ordersTab);
        await this.ordersTab.click();
    };

    this.clickLevTab = async function () {
        await commonHelper.waitUntilElementVisible(this.leverageTab);
        await this.leverageTab.click();
    };

    this.clickMySuitsTab = async function () {
        await commonHelper.waitUntilElementVisible(this.mySuitsTab);
        await this.mySuitsTab.click();
    };

    this.moveSlider = async function () {
        await commonHelper.waitUntilElementVisible(this.slider);
        browser.actions()
            .mouseDown(this.slider)
            .mouseMove({x: 100, y: 0})
            .mouseUp()
            .perform();
    };

    this.moveSliderSuit = async function () {
        await commonHelper.waitUntilElementVisible(this.slider);
        browser.actions()
            .mouseDown(this.slider)
            .mouseMove({x: 50, y: 0})
            .mouseUp()
            .perform();
    };

    this.clickEventList = async function() {
        await commonHelper.waitUntilElementVisible(this.eventList);
        await this.eventList.click();
    };

    this.getEventTime = async function() {
        await commonHelper.waitUntilElementVisible(this.eventDateTime);
        return this.eventDateTime.getText();
    };

    this.invalidDateInvisible = async function () {
        let el = element(by.cssContainingText(".event-list [class*=' time'] .timer", "Invalid date"));
        await commonHelper.waitUntilElementInvisible(el);
    }

    this.getEventDate = async function() {
        await commonHelper.waitUntilElementVisible(this.eventDateDate);
        return this.eventDateDate.getText();
    };

    this.getNameOfWhiteTeam = async function() {
        await commonHelper.waitUntilElementVisible(this.whiteTeam);
        return this.whiteTeam.getText();
    };

    this.getNameOfBlackTeam = async function() {
        await commonHelper.waitUntilElementVisible(this.blackTeam);
        return this.blackTeam.getText();
    };

    this.getEventCategoryName = async function() {
        await commonHelper.waitUntilElementVisible(this.eventCategoryName);
        return this.eventCategoryName.getText();
    };

    this.getEventCategoryIcon = async function() {
        await commonHelper.waitUntilElementVisible(this.eventCategoryIcon);
        return this.eventCategoryIcon.getAttribute('src');
    };

    this.clickMoreBtn = async function() {
        await commonHelper.waitUntilElementVisible(this.moreBtn);
        await this.moreBtn.click();
    };

    this.getIdEventId = async function() {
        await commonHelper.waitUntilElementVisible(this.idEventId);
        return this.idEventId.getText();
    };

    this.getIdEventType = async function() {
        await commonHelper.waitUntilElementVisible(this.idEventType);
        return this.idEventType.getText();
    };

    this.getIdChampionship = async function() {
        await commonHelper.waitUntilElementVisible(this.idChampionship);
        return this.idChampionship.getText();
    };

    this.getIdEventDate = async function() {
        await commonHelper.waitUntilElementVisible(this.idEventDate);
        return this.idEventDate.getText();
    };

    this.getIdEventTimeUtc = async function() {
        await commonHelper.waitUntilElementVisible(this.idEventTimeUtc);
        return this.idEventTimeUtc.getText();
    };

    this.getIdWhiteTeam = async function() {
        await commonHelper.waitUntilElementVisible(this.idWhiteTeam);
        return this.idWhiteTeam.getText();
    };

    this.getIdBlackTeam = async function() {
        await commonHelper.waitUntilElementVisible(this.idBlackTeam);
        return this.idBlackTeam.getText();
    };

    this.getIdEventVolatility = async function() {
        await commonHelper.waitUntilElementVisible(this.idEventVolatility);
        return this.idEventVolatility.getText();
    };

    this.getVolatility = async function() {
        await commonHelper.waitUntilElementVisible(this.volatility);
        return this.volatility.getText();
    };

    this.clickMakePredictionBtn = async function(el) {
        await commonHelper.waitUntilElementVisible(el);
        await el.click();
    };

    this.getMakePredictionBalance = async function() {
        await commonHelper.waitUntilElementVisible(this.makePredictionBalance);
        return this.makePredictionBalance.getText();
    };

    this.getMyBet = async function() {
        await commonHelper.waitUntilElementVisible(this.myBet);
        return this.myBet.getText();
    };


    this.fillInput = async function(value) {
        await commonHelper.waitUntilElementVisible(this.makePredictionInput);
        await this.makePredictionInput.clear();
        await this.makePredictionInput.sendKeys(value);
    };

    this.chooseWhiteTeam = async function () {
        await commonHelper.waitUntilElementVisible(this.whiteTeamTab);
        await this.whiteTeamTab.click();
    };

    this.clickMakePredictionBigBtn = async function () {
        await commonHelper.waitUntilElementVisible(this.makePredictionBigBtn);
        await this.makePredictionBigBtn.click();
    };

    this.getBetTeam = async function() {
        await commonHelper.waitUntilElementVisible(this.betTeam);
        await this.betTeam.getText();
    };

    this.clickMyOrders = async function() {
        await commonHelper.waitUntilElementVisible(this.myOrders);
        await this.myOrders.click();
    };

    // this.clickMakeOrder = async function () {
    //     await commonHelper.waitUntilElementVisible(this.makeOrderBtn);
    //     await this.makeOrderBtn.click();
    // };

    this.clickMakePrediction = async function(time,date) {
        let makePredictionBtn = element(by.xpath(`//div[contains(.,"${time}") and contains(.,"${date}")]//*[@class = "button button--color"]`));
        await commonHelper.waitUntilElementVisible(makePredictionBtn);
        await makePredictionBtn.click();
    };

    this.clickMakeLeverage = async function(time,date) {
        let makeLeverageBtn = element(by.xpath(`//div[contains(.,"${time}") and contains(.,"${date}")]//*[@class = "button button--color"]`));
        await commonHelper.waitUntilElementVisible(makeLeverageBtn);
        await makeLeverageBtn.click();
    };

    this.clickMakePredictionApi = async function() {
        let makePredictionBtn = element(by.xpath(`(//*[@class = "button button--color"])[1]`));
        await commonHelper.waitUntilElementVisible(makePredictionBtn);
        await makePredictionBtn.click();
    };

    this.clickAddSuit = async function() {
        let makePredictionBtn = element(by.cssContainingText(`.button.button--color`, 'Add suite'));
        await commonHelper.waitUntilElementVisible(makePredictionBtn);
        await makePredictionBtn.click();
    };

    this.clickAddSuitModal = async function() {
        let makePredictionBtn = element(by.cssContainingText(`.btn.big`, 'Add suite'));
        await commonHelper.waitUntilElementVisible(makePredictionBtn);
        await makePredictionBtn.click();
    };

    this.getAmountInputBalance = async function () {
        await commonHelper.waitUntilElementVisible(this.amountInputBalance);
        await browser.sleep(2000);
        return this.amountInputBalance.getText();
    };

    this.getEventDateMakePrediction = async function () {
        await commonHelper.waitUntilElementVisible(this.eventDateMakePrediction);
        return this.eventDateMakePrediction.getText();
    };

    this.getEventTimeMakePrediction = async function () {
        await commonHelper.waitUntilElementVisible(this.eventTimeMakePrediction);
        return this.eventTimeMakePrediction.getText();
    };

    this.fillInputBalanceModal = async function (value) {
        await commonHelper.waitUntilElementVisible(this.balanceInputModal);
        await this.balanceInputModal.clear();
        await this.balanceInputModal.sendKeys(value);
    };

    this.selectTeamModal = async function (value) {
        let team = element(by.cssContainingText('.modal-layout .side-name', value));
        let selectedTeam = element(by.cssContainingText(".modal-layout [class*='team--selected'] .side-name", value));
        await commonHelper.waitUntilElementVisible(team);
        await team.click();
        await commonHelper.waitUntilElementVisible(selectedTeam);
    };

    this.selectTeamModalApi = async function () {
        let team = $$('.modal-layout .side-name').get(1);
        let selectedTeam = $(".modal-layout [class*='team--selected'] .side-name");
        await commonHelper.waitUntilElementVisible(team);
        await team.click();
        await commonHelper.waitUntilElementVisible(selectedTeam);
    };

    this.clickOrderBigBtn = async function () {
        await commonHelper.waitUntilElementVisible(this.makeOrderBigBtn);
        await this.makeOrderBigBtn.click();
    };

    this.switchOtherTab = async function (value) {
        let tab = element(by.cssContainingText(".tabs__header .tabs__item", value));
        await commonHelper.waitUntilElementVisible(tab);
        await tab.click();
    };

    this.checkCancelOrder = async function(time,date) {
        return element(by.xpath(`//div[contains(.,"${time}") and contains(.,"${date}")]//*[@class = "button"][contains(.,'Cancel order')]`));
    };

    this.clickCancelOrder = async function(time,date) {
        let cancelOrder = element(by.xpath(`//div[contains(.,"${time}") and contains(.,"${date}")]//*[@class = "button"][contains(.,'Cancel order')]`));
        await commonHelper.waitUntilElementVisible(cancelOrder);
        await cancelOrder.click();
    };

    this.clickCancelOrderApi = async function() {
        let cancelOrder = element(by.xpath(`(//*[@class = "button"][contains(.,'Cancel order')])[1]`));
        await commonHelper.waitUntilElementVisible(cancelOrder);
        await cancelOrder.click();
    };

    this.clickCancelOrderBigBtn = async function () {
        await commonHelper.waitUntilElementVisible(this.cancelOrderBigBtn);
        await this.cancelOrderBigBtn.click();
    };

    this.getOrderStatus = async function (time,date,status) {
        let cancelOrderBtn = element(by.xpath(`//*[@class="item"][contains(.,"${time}") and contains(.,"${date}")]//*[@class = "badge"][contains(.,'${status}')]`));
        await commonHelper.waitUntilElementVisible(cancelOrderBtn);
    };

    this.getOrderStatusApi = async function (status) {
        let cancelOrderBtn = element(by.xpath(`(//*[@class = "badge"][contains(.,'${status}')])[1]`));
        await commonHelper.waitUntilElementVisible(cancelOrderBtn);
    };

    this.checkEventStatus = async function (status) {
        let el = element(by.cssContainingText(".status-match__text span", status));
        await commonHelper.waitUntilElementVisible(el);
    }

}
module.exports = MakePredictionPage;