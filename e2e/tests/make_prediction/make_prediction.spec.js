var moment = require('moment');

var pageObject = require('../../services/pages').container.PageObject;
var homePage = pageObject.getHomePage();
var metaMaskPage = pageObject.getMetaMaskPage();
var predictionPage = pageObject.getPredictionPage();
var adminPage = pageObject.getAdminPage();
var makePredictionPage = pageObject.getMakePredictionPage();
var platformsPage = pageObject.getPlatformsPage();

// var config_data = require("./../../config.data.json")
var commonHelper = require('./../../services/helpers/common.helper');
var Web3 = require('web3');

const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");

var qa = config_data.projects;
var passwords = config_data.projects.params;
var fields = config_data.networkSetupFields;
var networks = config_data.networks;
var adminData = config_data.projects.params;
var platforms = config_data.projects.params;

describe('Make prediction', function () {

    describe('user is able to create custom event', function () {

        let master, modal;
        let amount = 1;
        let white = 'white';
        let black = 'black';

        var newStartTimeDate, newEndTimeDate, newStartTime, newEndTime, startHours, startMinutes, endHours, endMinutes, futureStartTime;
        var newCustomDate, futureAdminStartTime;
        var makePredictionValue;

        ///Time operations
        var add_minutes =  function (dt, minutes) {
            return new Date(dt.getTime() + minutes*60000);
        };
        var date = new Date().toLocaleString('en-us',{day:'numeric', month:'long'});
        newStartTimeDate = add_minutes(new Date, 5);
        newEndTimeDate = add_minutes(new Date, 15);
        futureStartTime = newStartTimeDate.getHours() + ":" + newStartTimeDate.getMinutes();
        newStartTime = newStartTimeDate.getHours() + ":" + newStartTimeDate.getMinutes() + ":" + newStartTimeDate.getSeconds();
        newEndTime = newEndTimeDate.getHours() + ":" + newEndTimeDate.getMinutes() + ":" + newEndTimeDate.getSeconds();
        newCustomDate = date.split(' ')[1] + ' ' + date.split(' ')[0];

        let startAmPm = moment(newStartTime, 'hh:mm A').format('hh:mm A');
        let endAmPm = moment(newEndTime, 'hh:mm A').format('hh:mm A');
        let startAmPmHours = +(startAmPm.split(':')[0]).toString() + ':';

        let endAmPmHours = +(endAmPm.split(':')[0]).toString() + ':';

        let startAmPmMinutes = startAmPm.split(':')[1];

        let endAmPmMinutes = endAmPm.split(':')[1];

        let adminMinutes = startAmPmMinutes.split(' ')[0];

        futureAdminStartTime = newStartTimeDate.getHours() + ":" + adminMinutes;



        var custom_event_data = {
            "date": newCustomDate,
            "time": startAmPmHours + startAmPmMinutes + ' - ' + endAmPmHours + endAmPmMinutes,
            "startTime": startAmPmHours + startAmPmMinutes,
            "eventType": "type",
            "eventSeries": "series",
            "eventName": "name",
            "whiteTeam": "white",
            "blackTeam": "black",
            "priceChange": "5",
            "whiteTeamScore": "1",
            "blackTeamScore": "1"
        };

        beforeAll(function () {
            commonHelper.remainOneTab();
            commonHelper.acceptAlert();
            commonHelper.clearAllDataCommon();
        });

        afterAll(async function () {
            await commonHelper.clearAllData();
        });

        it('should open metamask page', async function () {
            await browser.get(config_data.projects.baseUrl);
            await console.log(":::::" + newStartTime);
            await console.log("::::" + newEndTime);
            await console.log(":::::" + futureAdminStartTime);
            await console.log(":::::" + custom_event_data.date);
            await console.log(":::::" + custom_event_data.time);
            await browser.get(config_data.projects.metamask);
            await commonHelper.switchToPreviousWithoutClose();
        });

        it('should get start hours of event', function () {
            startHours = newStartTime.split(':')[0];
            console.log('START HOURS: ',startHours);
        });

        it('should get start minutes of event',function () {
            startMinutes = newStartTime.split(':')[1];
            console.log('START MINUTES: ',startMinutes);
        });

        it('should get end hours of event',function () {
            endHours = newEndTime.split(':')[0];
            console.log('END HOURS: ',endHours);
        });

        it('should get end minutes of event',function () {
            endMinutes = newEndTime.split(':')[1];
            console.log('END MINUTES: ',endMinutes);
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

        it('should add network', async function () {
            await metaMaskPage.clickAddNetwork();
            await metaMaskPage.fillAddNetworkInput(fields.name, networks.name);
            await metaMaskPage.fillAddNetworkInput(fields.rpc, networks.rpc.first);
            await metaMaskPage.fillAddNetworkInput(fields.id, networks.chainId);
            await metaMaskPage.fillAddNetworkInput(fields.symbol, networks.symbol);
            await metaMaskPage.fillAddNetworkInput(fields.explorer, networks.blockExplorer);
            await metaMaskPage.clickSaveNetwork();
            await browser.sleep(2000);
        });

        it('should open polars', async function () {
            await browser.get(qa.baseUrl);
        });

        it('should connect the wallet', async function () {
            await browser.sleep(3000);
            await homePage.clickAcceptCookies();
            await browser.sleep(3000);
            await homePage.clickConnectWallet();
            await browser.sleep(3000);
            await homePage.selectMetamask();
        });

        it('should switch to modal and click next', async function () {
            await browser.getAllWindowHandles().then(function (result) {
                master = result[0];
                modal = result[1];
                console.log(result);
                browser.sleep(2000);
            });

            await browser.driver.switchTo().window(modal);
            await browser.refresh();
            await homePage.clickNextBtn();
            await browser.driver.switchTo().window(master);
        });


        it('should connect at metamask and see successfully connected message', async function () {
            await browser.getAllWindowHandles().then(function (result) {

                master = result[0];
                modal = result[1];
                console.log(result);
                browser.sleep(2000);
            });

            await browser.driver.switchTo().window(modal);
            // await browser.refresh();
            await homePage.clickConnectMetamask();

            await browser.driver.switchTo().window(master);
            await commonHelper.waitUntilElementVisible(homePage.successWalletConnectMsg);
            await platformsPage.clickCloseRpc();
        });

        it('should open admin page', async function () {
            await browser.get(qa.adminUrl);
            browser.sleep(5000);

        });

        it('should fill login input', async function () {
            await adminPage.loginPasswordInput('Login',config_data.projects.params.adminLogin);
        });

        it('should fill password input', async function () {
            await adminPage.loginPasswordInput('Password',config_data.projects.params.adminPassword);
        });

        it('should click start button', async function () {
            await adminPage.clickBidAcceptBtn();
            browser.sleep(2000);
        });

        it('should click event base tab', async function () {
            await adminPage.clickEventBase();
        });

        it('should click custom event tab', async function () {
            await adminPage.clickEventBaseCustomEvent();
        });

        it('should open coin list', async function () {
            await adminPage.clickCoinMenu();
        });

        it('should choose other', async function () {
            await browser.sleep(2000);
            await adminPage.clickOther();
        });

        it('should fill event type input', async function () {
            await adminPage.customEventInput('Event Type',custom_event_data.eventType);
        });

        it('should fill event series input', async function () {
            await adminPage.customEventInput('Event Series',custom_event_data.eventSeries);
        });

        it('should fill event name input', async function () {
            await adminPage.customEventInput('Event Name',custom_event_data.eventName);
        });

        it('should fill white team name input', async function () {
            await adminPage.customEventInput('White Team',custom_event_data.whiteTeam);
        });

        it('should fill black team name input', async function () {
            await adminPage.customEventInput('Black Team',custom_event_data.blackTeam);
        });

        it('should fill price change input', async function () {
            await adminPage.customEventInput('Price Change',custom_event_data.priceChange);
        });

        it('should click time start input', async function () {
            await adminPage.clickDateInput();
        });

        it('should fill time start input', async function () {
            await browser.sleep(1000);
            await adminPage.fillDateInput(startHours, startMinutes);
        });

        it('should click time end input', async function () {
            await adminPage.clickDateEndInput();
        });

        it('should fill time end input', async function () {
            await browser.sleep(1000);
            await adminPage.endDateInput(endHours, endMinutes);
        });

        it('should fill white team score input', async function () {
            await adminPage.customEventInput('White Team Score',custom_event_data.whiteTeamScore);
        });

        it('should fill black team score input', async function () {
            await adminPage.customEventInput('Black Team Score',custom_event_data.blackTeamScore);
        });

        it('should select both platforms', async function () {
            await adminPage.selectBothPlatforms(platforms.usdt, platforms.pol);
        });

        it('should click add event btn', async function() {
            await adminPage.clickBidAcceptBtn();
            await commonHelper.waitUntilElementVisible(adminPage.successEventAddedMessage);
            // await commonHelper.waitUntilElementVisible(adminPage.successMatchResultAddedMessage);
        });

        it('should open polars', async function () {
            await browser.get(qa.baseUrl);
        });

        it('should click orders tab', async function() {
            await makePredictionPage.clickOrdersTab();
        });

        it('should click event list tab', async function () {
            await makePredictionPage.clickEventList();
        });

        it('should get event time and check',async function() {
            await makePredictionPage.getEventTime().then(function(value) {
                expect(value).toContain(custom_event_data.time);
            });
        });

        it('should get event date and check', async function() {
            await makePredictionPage.getEventDate().then(function(value) {
                console.log(value);
                expect(value).toContain(custom_event_data.date);

            });
        });

        it('should get name of white team and check if it is correct', async function() {
            await makePredictionPage.getNameOfWhiteTeam().then(function(value) {
                console.log(value);
                expect(value).toContain(custom_event_data.whiteTeam);
            });

        });

        it('should grt name of black team and check if it is correct', async function() {
            await makePredictionPage.getNameOfBlackTeam().then(function(value) {
                console.log(value);
                expect(value).toContain(custom_event_data.blackTeam);
            });
        });


        it('should get name of category and check if it is correct', async function() {
            await makePredictionPage.getEventCategoryName().then(function(value) {
                console.log(value);
                expect(value).toContain(custom_event_data.eventType);
            });
        });

        it('should get volatility and check if it is correct', async function() {
            await makePredictionPage.getVolatility().then(function(value) {
                console.log(value);
                expect(value).toContain(custom_event_data.priceChange);
            });
        });

        it('should click on orders tab', async function () {
            await makePredictionPage.clickOrdersTab();
        });

        it('should get event time and check',async function() {
            await makePredictionPage.getEventTime().then(function(value) {
                expect(custom_event_data.time).toContain(value);
            });
        });

        it('should get event date and check', async function() {
            await makePredictionPage.getEventDate().then(function(value) {
                console.log(value);
                expect(value).toContain(custom_event_data.date);

            });
        });

        it('should get name of white team and check if it is correct', async function() {
            await makePredictionPage.getNameOfWhiteTeam().then(function(value) {
                console.log(value);
                expect(value).toContain(custom_event_data.whiteTeam);
            });
        });

        it('should grt name of black team and check if it is correct', async function() {
            await makePredictionPage.getNameOfBlackTeam().then(function(value) {
                console.log(value);
                expect(value).toContain(custom_event_data.blackTeam);
            });
        });


        it('should get name of category and check if it is correct', async function() {
            await makePredictionPage.getEventCategoryName().then(function(value) {
                console.log(value);
                expect(value).toContain(custom_event_data.eventType);
            });
        });

        it('should get volatility and check if it is correct', async function() {
            await makePredictionPage.getVolatility().then(function(value) {
                console.log(value);
                expect(value).toContain(custom_event_data.priceChange);
            });
        });

        it('should click on Make Order btn', async function () {
            await makePredictionPage.clickMakePrediction(custom_event_data.startTime, custom_event_data.date);
            await commonHelper.waitUntilElementVisible(makePredictionPage.modalOrder);
        });

        it('should get make prediction balance', async function () {
            await makePredictionPage.getMakePredictionBalance().then(async function (value){
                let test = value.split(':')[1];
                await console.log(value)
            });
        });

        it('should fill amount', async function () {
            await makePredictionPage.fillInputBalanceModal(amount);
        });

        it('should select a team', async function () {
            await makePredictionPage.selectTeamModal(custom_event_data.whiteTeam);
        });

        it('should click make order btn', async function () {
            await makePredictionPage.clickOrderBigBtn();
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

        it('should switch another tab', async function () {
            await makePredictionPage.switchOtherTab('My orders');
            await commonHelper.waitUntilElementVisible(makePredictionPage.cancelOrderBtn);
        });

        it('should get event time and check',async function () {
            await makePredictionPage.invalidDateInvisible();
        });

        it('should check suit', async function check(done) {
            (await makePredictionPage.checkCancelOrder(custom_event_data.startTime, custom_event_data.date)).isPresent().then(async function (result) {
                await console.log(result);
                if (result) {
                    await done();
                } else {
                    await browser.refresh();
                    await browser.sleep(2000);
                    await makePredictionPage.invalidDateInvisible();
                    await check(done);
                }
            })
        });

        it('should click cancel order btn', async function () {
            await makePredictionPage.clickCancelOrder(custom_event_data.startTime, custom_event_data.date);
            await makePredictionPage.clickCancelOrderBigBtn();
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
            await commonHelper.waitUntilElementVisible(homePage.successTransactionMsg);
        });

        it('should check status', async function () {
            await makePredictionPage.getOrderStatus(custom_event_data.startTime, custom_event_data.date, 'Canceled');
        });

        it('should switch another tab', async function () {
            await makePredictionPage.switchOtherTab('Event list');
        });

        it('should click on Make Order btn', async function () {
            await makePredictionPage.clickMakePrediction(custom_event_data.startTime, custom_event_data.date);
            await commonHelper.waitUntilElementVisible(makePredictionPage.modalOrder);
        });

        it('should get make prediction balance', async function () {
            await makePredictionPage.getMakePredictionBalance().then(async function (value){
                let test = value.split(':')[1];
                await console.log(value);
            });
        });

        it('should fill amount', async function () {
            await makePredictionPage.fillInputBalanceModal(amount);
        });

        it('should select a team', async function () {
            await makePredictionPage.selectTeamModal(custom_event_data.whiteTeam);
        });

        it('should click make order btn', async function () {
            await makePredictionPage.clickOrderBigBtn();
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

        /////SWITCHING another platform

        it('should open platforms', async function () {
            await platformsPage.clickSwitchPlatform();
            await platformsPage.selectPlatform('POL');
        });

        it('should click on orders tab', async function () {
            await makePredictionPage.clickOrdersTab();
        });

        it('should get event time and check',async function() {
            await makePredictionPage.getEventTime().then(function(value) {
                expect(custom_event_data.time).toContain(value);
            });
        });

        it('should get event date and check', async function() {
            await makePredictionPage.getEventDate().then(function(value) {
                console.log(value);
                expect(value).toContain(custom_event_data.date);

            });
        });

        it('should get name of white team and check if it is correct', async function() {
            await makePredictionPage.getNameOfWhiteTeam().then(function(value) {
                console.log(value);
                expect(value).toContain(custom_event_data.whiteTeam);
            });
        });

        it('should grt name of black team and check if it is correct', async function() {
            await makePredictionPage.getNameOfBlackTeam().then(function(value) {
                console.log(value);
                expect(value).toContain(custom_event_data.blackTeam);
            });
        });


        it('should get name of category and check if it is correct', async function() {
            await makePredictionPage.getEventCategoryName().then(function(value) {
                console.log(value);
                expect(value).toContain(custom_event_data.eventType);
            });
        });

        it('should get volatility and check if it is correct', async function() {
            await makePredictionPage.getVolatility().then(function(value) {
                console.log(value);
                expect(value).toContain(custom_event_data.priceChange);
            });
        });

        it('should click on Make Order btn', async function () {
            await makePredictionPage.clickMakePrediction(custom_event_data.startTime, custom_event_data.date);
            await commonHelper.waitUntilElementVisible(makePredictionPage.modalOrder);
        });

        it('should get make prediction balance', async function () {
            await makePredictionPage.getMakePredictionBalance().then(async function (value){
                let test = value.split(':')[1];
                await console.log(value)
            });
        });

        it('should fill amount', async function () {
            await makePredictionPage.fillInputBalanceModal(amount);
        });

        it('should select a team', async function () {
            await makePredictionPage.selectTeamModal(custom_event_data.whiteTeam);
        });

        it('should click make order btn', async function () {
            await makePredictionPage.clickOrderBigBtn();
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

        it('should switch another tab', async function () {
            await makePredictionPage.switchOtherTab('My orders');
            await commonHelper.waitUntilElementVisible(makePredictionPage.cancelOrderBtn);
        });

        it('should get event time and check',async function () {
            await makePredictionPage.invalidDateInvisible();
        });

        it('should check suit', async function check(done) {
            (await makePredictionPage.checkCancelOrder(custom_event_data.startTime, custom_event_data.date)).isPresent().then(async function (result) {
                await console.log(result);
                if (result) {
                    await done();
                } else {
                    await browser.refresh();
                    await browser.sleep(2000);
                    await makePredictionPage.invalidDateInvisible();
                    await check(done);
                }
            })
        });

        it('should click cancel order btn', async function () {
            await makePredictionPage.clickCancelOrder(custom_event_data.startTime, custom_event_data.date);
            await makePredictionPage.clickCancelOrderBigBtn();
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
            await commonHelper.waitUntilElementVisible(homePage.successTransactionMsg);
        });

        it('should check status', async function () {
            await makePredictionPage.getOrderStatus(custom_event_data.startTime, custom_event_data.date, 'Canceled');
        });

        it('should switch another tab', async function () {
            await makePredictionPage.switchOtherTab('Event list');
        });

        it('should click on Make Order btn', async function () {
            await makePredictionPage.clickMakePrediction(custom_event_data.startTime, custom_event_data.date);
            await commonHelper.waitUntilElementVisible(makePredictionPage.modalOrder);
        });

        it('should get make prediction balance', async function () {
            await makePredictionPage.getMakePredictionBalance().then(async function (value){
                let test = value.split(':')[1];
                await console.log(value)
            });
        });

        it('should fill amount', async function () {
            await makePredictionPage.fillInputBalanceModal(amount);
        });

        it('should select a team', async function () {
            await makePredictionPage.selectTeamModal(custom_event_data.whiteTeam);
        });

        it('should click make order btn', async function () {
            await makePredictionPage.clickOrderBigBtn();
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

        /////ADMIN SIDE

        it('should go to admin page', async function () {
            await adminPage.clickAdminTab();
        });

        it('should click future polars events and check event', async function () {
            await adminPage.clickPolarEvents();
            await adminPage.clickPolarEventsFuture();
        });

        it('should click learn details tab', async function () {
            await adminPage.clickDetails(futureAdminStartTime);
        });

        it('should click add to contract tab', async function () {
            await adminPage.clickContract();
            await browser.sleep(2000);
            await browser.driver.switchTo().window(modal);
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
            await commonHelper.waitUntilElementVisible(adminPage.eventUpdate);
            await browser.sleep(2000);
            await browser.driver.switchTo().window(modal);
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
            await commonHelper.waitUntilElementVisible(adminPage.eventUpdate);
        });

        it('should click in contract tab', async function () {
            await adminPage.clickInContract();
        });

        it('should wait loading contract and spinner invisible', async function () {
            await commonHelper.waitUntilElementInvisible(adminPage.loadingCotracts);
            await commonHelper.waitUntilElementInvisible(adminPage.loader);
        }, 60000);

        it('should check start event', async function check(done) {
            let start = element(by.xpath(`//*[@class = "card-admin"][contains(.,"${futureStartTime}")]//*[@class = "small-btn"][contains(.,"START")]`));
            await commonHelper.waitUntilElementInvisible(adminPage.loadingCotracts);
            await commonHelper.waitUntilElementInvisible(adminPage.loader);
            await start.isPresent().then(async function (result) {
                if(result){
                    done();
                } else {
                    await browser.refresh();
                    await commonHelper.waitUntilElementInvisible(adminPage.loadingCotracts);
                    await commonHelper.waitUntilElementInvisible(adminPage.loader);
                    browser.sleep(2000);
                    await check(done);
                };
            });
        });

        it('should start event', async function() {
            await adminPage.clickStart(futureStartTime);
            await browser.driver.switchTo().window(modal);
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
            await commonHelper.waitUntilElementVisible(adminPage.eventStarted);
            await browser.sleep(2000);
            await browser.driver.switchTo().window(modal);
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
            await commonHelper.waitUntilElementVisible(adminPage.eventStarted);
        });

        it('should open polars', async function () {
            await browser.get(qa.baseUrl);
        });

        it('should check that status of event is live', async function () {
            await makePredictionPage.checkEventStatus('LIVE');
        });

        /////SWITCHING another platform

        it('should open platforms', async function () {
            await platformsPage.clickSwitchPlatform();
            await platformsPage.selectPlatform('pUSDT');
        });

        it('should click orders tab', async function() {
            await makePredictionPage.clickOrdersTab();
        });

        it('should check that status of event is live', async function () {
            await makePredictionPage.checkEventStatus('LIVE');
        });

        ////ADMIN SIDE
        it('should go to admin page', async function () {
            await adminPage.clickAdminTab();
        });

        it('should click future polars events and check event', async function () {
            await adminPage.clickPolarEvents();
            await adminPage.clickPolarEventsFuture();
        });

        it('should click in contract tab', async function () {
            await adminPage.clickInContract();
        });

        it('should end event', async function() {
            await commonHelper.waitUntilElementInvisible(adminPage.loader);
            await browser.refresh();
            await commonHelper.waitUntilElementInvisible(adminPage.loader);
            await console.log('1111111!!!!!!!!!!!!!!!!!!!!!!')
            await browser.sleep(10000);
            await adminPage.clickEnd(futureStartTime);
            await browser.sleep(10000);
        });

        it('should select winner', async function () {
            await adminPage.selectResult('WHITE');
            await adminPage.clickConfirmBtn();
            await browser.driver.switchTo().window(modal);
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
        });

        it('should confirm transaction at metamask', async function check(done) {
            await browser.sleep(5000);
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
            await adminPage.checkEndDisabled(futureStartTime);
        });

        ////CLAIM

        it('should click orders tab', async function() {
            await makePredictionPage.clickOrdersTab();
        });

        it('should switch another tab', async function () {
            await makePredictionPage.switchOtherTab('Claim');
        });

        it('should check status', async function () {
            await makePredictionPage.getOrderStatus(custom_event_data.startTime, custom_event_data.date, 'Finished');
        });

        it('should claim order', async function () {
            await adminPage.clickOrdersClaim();
            await browser.driver.switchTo().window(modal);
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

        it('should check transaction is done', async function () {
            await metaMaskPage.clickConfirmTransaction();
            await browser.driver.switchTo().window(master);
            await homePage.clickClosePopUp();
            await commonHelper.waitUntilElementVisible(homePage.successTransactionMsg);
        });

        it('should open platforms', async function () {
            await platformsPage.clickSwitchPlatform();
            await platformsPage.selectPlatform('POL');
        });

        it('should click orders tab', async function() {
            await makePredictionPage.clickOrdersTab();
        });

        it('should switch another tab', async function () {
            await makePredictionPage.switchOtherTab('Claim');
        });

        it('should check status', async function () {
            await makePredictionPage.getOrderStatus(custom_event_data.startTime, custom_event_data.date, 'Finished');
        });

        it('should claim order', async function () {
            await adminPage.clickOrdersClaim();
            await browser.driver.switchTo().window(modal);
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

        it('should check transaction is done', async function () {
            await metaMaskPage.clickConfirmTransaction();
            await browser.driver.switchTo().window(master);
            await homePage.clickClosePopUp();
            await commonHelper.waitUntilElementVisible(homePage.successTransactionMsg);
        });

    });

    describe('user is able to create custom event crypto', function () {

        let master, modal;
        let amount = 1;
        let white = 'white';
        let black = 'black';

        var newStartTimeDate, newEndTimeDate, newStartTime, newEndTime, startHours, startMinutes, endHours, endMinutes, futureStartTime;
        var newCustomDate, futureAdminStartTime;
        var makePredictionValue;

        ///Time operations
        var add_minutes =  function (dt, minutes) {
            return new Date(dt.getTime() + minutes*60000);
        };
        var date = new Date().toLocaleString('en-us',{day:'numeric', month:'long'});
        newStartTimeDate = add_minutes(new Date, 15);
        newEndTimeDate = add_minutes(new Date, 25);
        futureStartTime = newStartTimeDate.getHours() + ":" + newStartTimeDate.getMinutes();
        newStartTime = newStartTimeDate.getHours() + ":" + newStartTimeDate.getMinutes() + ":" + newStartTimeDate.getSeconds();
        newEndTime = newEndTimeDate.getHours() + ":" + newEndTimeDate.getMinutes() + ":" + newEndTimeDate.getSeconds();
        newCustomDate = date.split(' ')[1] + ' ' + date.split(' ')[0];

        let startAmPm = moment(newStartTime, 'hh:mm A').format('hh:mm A');
        let endAmPm = moment(newEndTime, 'hh:mm A').format('hh:mm A');
        let startAmPmHours = +(startAmPm.split(':')[0]).toString() + ':';

        let endAmPmHours = +(endAmPm.split(':')[0]).toString() + ':';

        let startAmPmMinutes = startAmPm.split(':')[1];

        let endAmPmMinutes = endAmPm.split(':')[1];

        let adminMinutes = startAmPmMinutes.split(' ')[0];

        futureAdminStartTime = newStartTimeDate.getHours() + ":" + adminMinutes;



        var custom_event_data = {
            "date": newCustomDate,
            "time": startAmPmHours + startAmPmMinutes + ' - ' + endAmPmHours + endAmPmMinutes,
            "startTime": startAmPmHours + startAmPmMinutes,
            "eventType": "Crypto",
            "eventSeries": "series",
            "eventName": "name",
            "whiteTeam": "SOL UP",
            "blackTeam": "SOL DOWN",
            "priceChange": "5",
            "whiteTeamScore": "1",
            "blackTeamScore": "1"
        };

        beforeAll(function () {
            commonHelper.remainOneTab();
            commonHelper.acceptAlert();
            commonHelper.clearAllDataCommon();
        });

        afterAll(async function () {
            await commonHelper.clearAllData();
        });

        it('should open metamask page', async function () {
            await browser.get(config_data.projects.baseUrl);
            await commonHelper.openNewTab()
            await console.log(":::::" + newStartTime);
            await console.log("::::" + newEndTime);
            await console.log(":::::" + futureAdminStartTime);
            await console.log(":::::" + custom_event_data.date);
            await console.log(":::::" + custom_event_data.time);
            await browser.get(config_data.projects.metamask);
            await commonHelper.switchToPreviousWithoutClose();
        });

        it('should get start hours of event', function () {
            startHours = newStartTime.split(':')[0];
            console.log('START HOURS: ',startHours);
        });

        it('should get start minutes of event',function () {
            startMinutes = newStartTime.split(':')[1];
            console.log('START MINUTES: ',startMinutes);
        });

        it('should get end hours of event',function () {
            endHours = newEndTime.split(':')[0];
            console.log('END HOURS: ',endHours);
        });

        it('should get end minutes of event',function () {
            endMinutes = newEndTime.split(':')[1];
            console.log('END MINUTES: ',endMinutes);
        });

        it('should open polars', async function () {
            await browser.get(qa.baseUrl);
        });

        it('should connect the wallet', async function () {
            await browser.sleep(3000);
            await homePage.clickAcceptCookies();
            await browser.sleep(3000);
            await homePage.clickConnectWallet();
            await browser.sleep(3000);
            await homePage.selectMetamask();
        });

        it('should open admin page', async function () {
            await browser.get(qa.adminUrl);
            browser.sleep(5000);

        });

        it('should fill login input', async function () {
            await adminPage.loginPasswordInput('Login',config_data.projects.params.adminLogin);
        });

        it('should fill password input', async function () {
            await adminPage.loginPasswordInput('Password',config_data.projects.params.adminPassword);
        });

        it('should click start button', async function () {
            await adminPage.clickBidAcceptBtn();
            browser.sleep(2000);
        });

        it('should click event base tab', async function () {
            await adminPage.clickEventBase();
        });

        it('should click custom event tab', async function () {
            await adminPage.clickEventBaseCustomEvent();
        });

        it('should click crypto list', async function () {
            browser.sleep(2000);
            await adminPage.clickCryptoList();
        });

        it('should click sol', async function () {
            await adminPage.selectToken('SOL');
        });

        it('should fill price change input', async function () {
            await adminPage.customEventInput('Price Change',custom_event_data.priceChange);
        });

        it('should click time start input', async function () {
            await adminPage.clickDateInput();
        });

        it('should fill time start input', async function () {
            await browser.sleep(5000);
            await adminPage.fillDateInput(startHours, startMinutes);
        });

        it('should click time end input', async function () {
            await adminPage.clickDateEndInput();
        });

        it('should fill time end input', async function () {
            await browser.sleep(5000);
            await adminPage.endDateInput(endHours, endMinutes);
        });

        it('should select both platforms', async function () {
            await adminPage.selectBothPlatforms(platforms.usdt, platforms.pol);
        });

        it('should click add event btn', async function() {
            await adminPage.clickBidAcceptBtn();
            await commonHelper.waitUntilElementVisible(adminPage.successEventAddedMessage);
            // await commonHelper.waitUntilElementVisible(adminPage.successMatchResultAddedMessage);
        });

        it('should open polars', async function () {
            await browser.get(qa.baseUrl);
            await platformsPage.clickCloseRpc();
        });

        it('should click event list tab', async function () {
            await makePredictionPage.clickEventList();
        });

        it('should get event time and check',async function() {
            await makePredictionPage.getEventTime().then(function(value) {
                expect(value).toContain(custom_event_data.time);
            });
        });

        it('should get event date and check', async function() {
            await makePredictionPage.getEventDate().then(function(value) {
                console.log(value);
                expect(value).toContain(custom_event_data.date);

            });
        });

        it('should get name of white team and check if it is correct', async function() {
            await makePredictionPage.getNameOfWhiteTeam().then(function(value) {
                console.log(value);
                expect(value).toContain(custom_event_data.whiteTeam);
            });

        });

        it('should grt name of black team and check if it is correct', async function() {
            await makePredictionPage.getNameOfBlackTeam().then(function(value) {
                console.log(value);
                expect(value).toContain(custom_event_data.blackTeam);
            });
        });


        it('should get name of category and check if it is correct', async function() {
            await makePredictionPage.getEventCategoryName().then(function(value) {
                console.log(value);
                expect(value).toContain(custom_event_data.eventType);
            });
        });

        it('should get volatility and check if it is correct', async function() {
            await makePredictionPage.getVolatility().then(function(value) {
                console.log(value);
                expect(value).toContain(custom_event_data.priceChange);
            });
        });

        it('should click on orders tab', async function () {
            await makePredictionPage.clickOrdersTab();
        });

        it('should get event time and check',async function() {
            await makePredictionPage.getEventTime().then(function(value) {
                expect(custom_event_data.time).toContain(value);
            });
        });

        it('should get event date and check', async function() {
            await makePredictionPage.getEventDate().then(function(value) {
                console.log(value);
                expect(value).toContain(custom_event_data.date);

            });
        });

        it('should get name of white team and check if it is correct', async function() {
            await makePredictionPage.getNameOfWhiteTeam().then(function(value) {
                console.log(value);
                expect(value).toContain(custom_event_data.whiteTeam);
            });
        });

        it('should grt name of black team and check if it is correct', async function() {
            await makePredictionPage.getNameOfBlackTeam().then(function(value) {
                console.log(value);
                expect(value).toContain(custom_event_data.blackTeam);
            });
        });


        it('should get name of category and check if it is correct', async function() {
            await makePredictionPage.getEventCategoryName().then(function(value) {
                console.log(value);
                expect(value).toContain(custom_event_data.eventType);
            });
        });

        it('should get volatility and check if it is correct', async function() {
            await makePredictionPage.getVolatility().then(function(value) {
                console.log(value);
                expect(value).toContain(custom_event_data.priceChange);
            });
        });

        it('should click on Make Order btn', async function () {
            await makePredictionPage.clickMakePrediction(custom_event_data.startTime, custom_event_data.date);
            await commonHelper.waitUntilElementVisible(makePredictionPage.modalOrder);
        });

        it('should get make prediction balance', async function () {
            await makePredictionPage.getMakePredictionBalance().then(async function (value){
                let test = value.split(':')[1];
                await console.log(value)
            });
        });

        it('should fill amount', async function () {
            await makePredictionPage.fillInputBalanceModal(amount);
        });

        it('should select a team', async function () {
            await makePredictionPage.selectTeamModal(custom_event_data.blackTeam);
        });

        it('should click make order btn', async function () {
            await makePredictionPage.clickOrderBigBtn();
        });

        it('should switch to modal and click next', async function () {
            await browser.getAllWindowHandles().then(function (result) {
                master = result[0];
                modal = result[1];
                console.log(result);
                browser.sleep(2000);
            });

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

        it('should switch another tab', async function () {
            await makePredictionPage.switchOtherTab('My orders');
            await commonHelper.waitUntilElementVisible(makePredictionPage.cancelOrderBtn);
        });

        it('should get event time and check',async function () {
            await makePredictionPage.invalidDateInvisible();
        });

        it('should check suit', async function check(done) {
            (await makePredictionPage.checkCancelOrder(custom_event_data.startTime, custom_event_data.date)).isPresent().then(async function (result) {
                await console.log(result);
                if (result) {
                    await done();
                } else {
                    await browser.refresh();
                    await browser.sleep(2000);
                    await makePredictionPage.invalidDateInvisible();
                    await check(done);
                }
            })
        });


        it('should click cancel order btn', async function () {
            await makePredictionPage.clickCancelOrder(custom_event_data.startTime, custom_event_data.date);
            await makePredictionPage.clickCancelOrderBigBtn();
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
            await commonHelper.waitUntilElementVisible(homePage.successTransactionMsg);
        });

        it('should check status', async function () {
            await makePredictionPage.getOrderStatus(custom_event_data.startTime, custom_event_data.date, 'Canceled');
        });

        it('should switch another tab', async function () {
            await makePredictionPage.switchOtherTab('Event list');
        });

        it('should click on Make Order btn', async function () {
            await makePredictionPage.clickMakePrediction(custom_event_data.startTime, custom_event_data.date);
            await commonHelper.waitUntilElementVisible(makePredictionPage.modalOrder);
        });

        it('should get make prediction balance', async function () {
            await makePredictionPage.getMakePredictionBalance().then(async function (value){
                let test = value.split(':')[1];
                await console.log(value);
            });
        });

        it('should fill amount', async function () {
            await makePredictionPage.fillInputBalanceModal(amount);
        });

        it('should select a team', async function () {
            await makePredictionPage.selectTeamModal(custom_event_data.blackTeam);
        });

        it('should click make order btn', async function () {
            await makePredictionPage.clickOrderBigBtn();
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

        /////SWITCHING another platform

        it('should open platforms', async function () {
            await platformsPage.clickSwitchPlatform();
            await platformsPage.selectPlatform('POL');
        });

        it('should click on orders tab', async function () {
            await makePredictionPage.clickOrdersTab();
        });

        it('should get event time and check',async function() {
            await makePredictionPage.getEventTime().then(function(value) {
                expect(custom_event_data.time).toContain(value);
            });
        });

        it('should get event date and check', async function() {
            await makePredictionPage.getEventDate().then(function(value) {
                console.log(value);
                expect(value).toContain(custom_event_data.date);

            });
        });

        it('should get name of white team and check if it is correct', async function() {
            await makePredictionPage.getNameOfWhiteTeam().then(function(value) {
                console.log(value);
                expect(value).toContain(custom_event_data.whiteTeam);
            });
        });

        it('should grt name of black team and check if it is correct', async function() {
            await makePredictionPage.getNameOfBlackTeam().then(function(value) {
                console.log(value);
                expect(value).toContain(custom_event_data.blackTeam);
            });
        });


        it('should get name of category and check if it is correct', async function() {
            await makePredictionPage.getEventCategoryName().then(function(value) {
                console.log(value);
                expect(value).toContain(custom_event_data.eventType);
            });
        });

        it('should get volatility and check if it is correct', async function() {
            await makePredictionPage.getVolatility().then(function(value) {
                console.log(value);
                expect(value).toContain(custom_event_data.priceChange);
            });
        });

        it('should click on Make Order btn', async function () {
            await makePredictionPage.clickMakePrediction(custom_event_data.startTime, custom_event_data.date);
            await commonHelper.waitUntilElementVisible(makePredictionPage.modalOrder);
        });

        it('should get make prediction balance', async function () {
            await makePredictionPage.getMakePredictionBalance().then(async function (value){
                let test = value.split(':')[1];
                await console.log(value)
            });
        });

        it('should fill amount', async function () {
            await makePredictionPage.fillInputBalanceModal(amount);
        });

        it('should select a team', async function () {
            await makePredictionPage.selectTeamModal(custom_event_data.blackTeam);
        });

        it('should click make order btn', async function () {
            await makePredictionPage.clickOrderBigBtn();
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

        it('should switch another tab', async function () {
            await makePredictionPage.switchOtherTab('My orders');
            await commonHelper.waitUntilElementVisible(makePredictionPage.cancelOrderBtn);
        });

        it('should get event time and check',async function () {
            await makePredictionPage.invalidDateInvisible();
        });

        it('should check suit', async function check(done) {
            (await makePredictionPage.checkCancelOrder(custom_event_data.startTime, custom_event_data.date)).isPresent().then(async function (result) {
                await console.log(result);
                if (result) {
                    await done();
                } else {
                    await browser.refresh();
                    await browser.sleep(2000);
                    await makePredictionPage.invalidDateInvisible();
                    await check(done);
                }
            })
        });

        it('should click cancel order btn', async function () {
            await makePredictionPage.clickCancelOrder(custom_event_data.startTime, custom_event_data.date);
            await makePredictionPage.clickCancelOrderBigBtn();
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
            await commonHelper.waitUntilElementVisible(homePage.successTransactionMsg);
        });

        it('should check status', async function () {
            await makePredictionPage.getOrderStatus(custom_event_data.startTime, custom_event_data.date, 'Canceled');
        });

        it('should switch another tab', async function () {
            await makePredictionPage.switchOtherTab('Event list');
        });

        it('should click on Make Order btn', async function () {
            await makePredictionPage.clickMakePrediction(custom_event_data.startTime, custom_event_data.date);
            await commonHelper.waitUntilElementVisible(makePredictionPage.modalOrder);
        });

        it('should get make prediction balance', async function () {
            await makePredictionPage.getMakePredictionBalance().then(async function (value){
                let test = value.split(':')[1];
                await console.log(value)
            });
        });

        it('should fill amount', async function () {
            await makePredictionPage.fillInputBalanceModal(amount);
        });

        it('should select a team', async function () {
            await makePredictionPage.selectTeamModal(custom_event_data.blackTeam);
        });

        it('should click make order btn', async function () {
            await makePredictionPage.clickOrderBigBtn();
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

        /////ADMIN SIDE

        it('should go to admin page', async function () {
            await adminPage.clickAdminTab();
        });

        it('should click future polars events and check event', async function () {
            await adminPage.clickPolarEvents();
            await adminPage.clickPolarEventsFuture();
        });

        it('should click learn details tab', async function () {
            await adminPage.clickDetails(futureAdminStartTime);
        });

        it('should click add to contract tab', async function () {
            await adminPage.clickContract();
            await browser.sleep(2000);
            await browser.driver.switchTo().window(modal);
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
            await commonHelper.waitUntilElementVisible(adminPage.eventUpdate);
            await browser.sleep(2000);
            await browser.driver.switchTo().window(modal);
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
            await commonHelper.waitUntilElementVisible(adminPage.eventUpdate);
        });

        it('should click in contract tab', async function () {
            await adminPage.clickInContract();
        });

        it('should wait loading contract and spinner invisible', async function () {
            await commonHelper.waitUntilElementInvisible(adminPage.loadingCotracts);
            await commonHelper.waitUntilElementInvisible(adminPage.loader);
        }, 60000);

        it('should check start event', async function check(done) {
            let start = element(by.xpath(`//*[@class = "card-admin"][contains(.,"${futureStartTime}")]//*[@class = "small-btn"][contains(.,"START")]`));
            await commonHelper.waitUntilElementInvisible(adminPage.loadingCotracts);
            await commonHelper.waitUntilElementInvisible(adminPage.loader);
            await start.isPresent().then(async function (result) {
                if(result){
                    done();
                } else {
                    await browser.refresh();
                    await commonHelper.waitUntilElementInvisible(adminPage.loader);
                    browser.sleep(2000);
                    await check(done);
                };
            });
        });

        it('should start event', async function() {
            await adminPage.clickStart(futureStartTime);
            await browser.driver.switchTo().window(modal);
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
            await commonHelper.waitUntilElementVisible(adminPage.eventStarted);
            await browser.sleep(2000);
            await browser.driver.switchTo().window(modal);
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
            await commonHelper.waitUntilElementVisible(adminPage.eventStarted);
        });

        it('should open polars', async function () {
            await browser.get(qa.baseUrl);
        });

        it('should check that status of event is live', async function () {
            await makePredictionPage.checkEventStatus('LIVE');
        });

        /////SWITCHING another platform

        it('should open platforms', async function () {
            await platformsPage.clickSwitchPlatform();
            await platformsPage.selectPlatform('pUSDT');
        });

        it('should click orders tab', async function() {
            await makePredictionPage.clickOrdersTab();
        });

        it('should check that status of event is live', async function () {
            await makePredictionPage.checkEventStatus('LIVE');
        });

        ////ADMIN SIDE
        it('should go to admin page', async function () {
            await adminPage.clickAdminTab();
        });

        it('should click future polars events and check event', async function () {
            await adminPage.clickPolarEvents();
            await adminPage.clickPolarEventsFuture();
        });

        it('should click in contract tab', async function () {
            await adminPage.clickInContract();
        });

        it('should end event', async function() {
            await commonHelper.waitUntilElementInvisible(adminPage.loader);
            await browser.refresh();
            await commonHelper.waitUntilElementInvisible(adminPage.loader);
            await console.log('1111111!!!!!!!!!!!!!!!!!!!!!!')
            await browser.sleep(10000);
            await adminPage.clickEnd(futureStartTime);
            await browser.sleep(10000);
        });

        it('should select winner', async function () {
            await adminPage.selectResult('BLACK');
            await adminPage.clickConfirmBtn();
            await browser.driver.switchTo().window(modal);
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
        });

        it('should confirm transaction at metamask', async function check(done) {
            await browser.sleep(5000);
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
            await adminPage.checkEndDisabled(futureStartTime);
        });

        ////CLAIM

        it('should click orders tab', async function() {
            await makePredictionPage.clickOrdersTab();
        });

        it('should switch another tab', async function () {
            await makePredictionPage.switchOtherTab('Claim');
        });

        it('should check status', async function () {
            await makePredictionPage.getOrderStatus(custom_event_data.startTime, custom_event_data.date, 'Finished');
        });

        it('should claim order', async function () {
            await adminPage.clickOrdersClaim();
            await browser.driver.switchTo().window(modal);
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

        it('should check transaction is done', async function () {
            await metaMaskPage.clickConfirmTransaction();
            await browser.driver.switchTo().window(master);
            await homePage.clickClosePopUp();
            await commonHelper.waitUntilElementVisible(homePage.successTransactionMsg);
        });

        it('should open platforms', async function () {
            await platformsPage.clickSwitchPlatform();
            await platformsPage.selectPlatform('POL');
        });

        it('should click orders tab', async function() {
            await makePredictionPage.clickOrdersTab();
        });

        it('should switch another tab', async function () {
            await makePredictionPage.switchOtherTab('Claim');
        });

        it('should check status', async function () {
            await makePredictionPage.getOrderStatus(custom_event_data.startTime, custom_event_data.date, 'Finished');
        });

        it('should claim order', async function () {
            await adminPage.clickOrdersClaim();
            await browser.driver.switchTo().window(modal);
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

        it('should check transaction is done', async function () {
            await metaMaskPage.clickConfirmTransaction();
            await browser.driver.switchTo().window(master);
            await homePage.clickClosePopUp();
            await commonHelper.waitUntilElementVisible(homePage.successTransactionMsg);
        });

    });

    describe('user is able to create future event', function () {

        let master, modal;
        let amount = 1;
        let white = 'white';
        let black = 'black';

        var newStartTimeDate, newEndTimeDate, newStartTime, newEndTime, startHours, startMinutes, endHours, endMinutes, futureStartTime;
        var newCustomDate, futureAdminStartTime, apiTime, apiDate;
        var makePredictionValue;

        ///Time operations
        var add_minutes =  function (dt, minutes) {
            return new Date(dt.getTime() + minutes*60000);
        };
        var date = new Date().toLocaleString('en-us',{day:'numeric', month:'long'});
        newStartTimeDate = add_minutes(new Date, 15);
        newEndTimeDate = add_minutes(new Date, 30);
        futureStartTime = newStartTimeDate.getHours() + ":" + newStartTimeDate.getMinutes();
        newStartTime = newStartTimeDate.getHours() + ":" + newStartTimeDate.getMinutes() + ":" + newStartTimeDate.getSeconds();
        newEndTime = newEndTimeDate.getHours() + ":" + newEndTimeDate.getMinutes() + ":" + newEndTimeDate.getSeconds();
        newCustomDate = date.split(' ')[1] + ' ' + date.split(' ')[0];

        let startAmPm = moment(newStartTime, 'hh:mm A').format('hh:mm A');
        let endAmPm = moment(newEndTime, 'hh:mm A').format('hh:mm A');
        let startAmPmHours = +(startAmPm.split(':')[0]).toString() + ':';

        let endAmPmHours = +(endAmPm.split(':')[0]).toString() + ':';

        let startAmPmMinutes = startAmPm.split(':')[1];

        let endAmPmMinutes = endAmPm.split(':')[1];

        let adminMinutes = startAmPmMinutes.split(' ')[0];

        futureAdminStartTime = newStartTimeDate.getHours() + ":" + adminMinutes;



        var future_event_data = {
            "date": newCustomDate,
            "time": "2 days",
            "startTime": startAmPmHours + startAmPmMinutes,
            "type": "Tennis",
            "league": "Challenger",
            "eventName": "name",
            "whiteTeam": "SOL UP",
            "blackTeam": "SOL DOWN",
            "priceChange": "5",
            "whiteTeamScore": "1",
            "blackTeamScore": "1"
        };

        beforeAll(function () {
            commonHelper.remainOneTab();
            commonHelper.acceptAlert();
            commonHelper.clearAllDataCommon();
        });

        afterAll(async function () {
            await commonHelper.clearAllData();
        });

        it('should open metamask page', async function () {
            await browser.get(config_data.projects.baseUrl);
            await commonHelper.openNewTab()
            await console.log(":::::" + newStartTime);
            await console.log("::::" + newEndTime);
            await console.log(":::::" + futureAdminStartTime);
            await browser.get(config_data.projects.metamask);
            await commonHelper.switchToPreviousWithoutClose();
        });

        it('should get start hours of event', function () {
            startHours = newStartTime.split(':')[0];
            console.log('START HOURS: ',startHours);
        });

        it('should get start minutes of event',function () {
            startMinutes = newStartTime.split(':')[1];
            console.log('START MINUTES: ',startMinutes);
        });

        it('should get end hours of event',function () {
            endHours = newEndTime.split(':')[0];
            console.log('END HOURS: ',endHours);
        });

        it('should get end minutes of event',function () {
            endMinutes = newEndTime.split(':')[1];
            console.log('END MINUTES: ',endMinutes);
        });

        it('should open polars', async function () {
            await browser.get(qa.baseUrl);
        });

        it('should connect the wallet', async function () {
            await browser.sleep(3000);
            await homePage.clickAcceptCookies();
            await browser.sleep(3000);
            await homePage.clickConnectWallet();
            await browser.sleep(3000);
            await homePage.selectMetamask();
        });

        it('should open admin page', async function () {
            await browser.get(qa.adminUrl);
            browser.sleep(5000);

        });

        it('should fill login input', async function () {
            await adminPage.loginPasswordInput('Login',config_data.projects.params.adminLogin);
        });

        it('should fill password input', async function () {
            await adminPage.loginPasswordInput('Password',config_data.projects.params.adminPassword);
        });

        it('should click start button', async function () {
            await adminPage.clickBidAcceptBtn();
            browser.sleep(2000);
        });

        it('should click event base tab', async function () {
            await adminPage.clickEventBase();
        });

        it('should click event base future tab', async function () {
            await adminPage.clickEventBaseFuture();
        });

        it('should set event base future time', async function () {
            let futureEventTimeTab = $$('.card-admin .mb-3').get(0);
            let futureEventTime = element(by.xpath(`//*[@class = "mb-3"]//*//*//*[contains(.,"${future_event_data.time}")]`));
            await adminPage.setFutureDta(futureEventTimeTab, futureEventTime);
        });

        it('should set event base future type', async function () {
            let futureEventTypeTab = $$('.card-admin .mb-3').get(1);
            let futureEventType = element(by.xpath(`//*[@class = "mb-3"]//*//*//*[contains(.,"${future_event_data.type}")]`));
            await adminPage.setFutureDta(futureEventTypeTab, futureEventType);
        });

        it('should set event base future league', async function () {
            await browser.sleep(2000);
            let futureEventLeagueTab = $$('.card-admin .mb-3').get(2);
            let futureEventLeague = element(by.xpath(`//*[@class = "mb-3"]//*//*//*[contains(.,"${future_event_data.league}")]`));
            await adminPage.setFutureDta(futureEventLeagueTab, futureEventLeague);
        });

        it('should click search btn', async function() {
            await adminPage.clickBidAcceptBtn();
        });

        it('should select platforms', async function () {
            await adminPage.selectPlatformsApiEvent(platforms.usdt);
        });

        it('should click details', async function () {
            await adminPage.clickDetailsApiEvent();
        });

        it('should get time', async function () {
            await adminPage.getTimeApi().then(function (result) {
                console.log(result);
                apiTime = result;
            });
        });

        it('should get time', async function () {
            await adminPage.getDateApi().then(function (result) {
                console.log(result);
                apiDate = result;
            });
        });

        it('should change volatility', async function () {
            await adminPage.priceChangeInput();
        });

        it('should add event to polars', async function () {
            await adminPage.addEventToPolars();
            await commonHelper.waitUntilElementVisible(adminPage.successMatchAddedMessage);
        });

        it('should open polars', async function () {
            await browser.get(qa.baseUrl);
            await platformsPage.clickCloseRpc();
        });

        it('should click orders tab', async function() {
            await makePredictionPage.clickOrdersTab();
        });

        it('should click on Make Order btn', async function () {
            await makePredictionPage.clickMakePredictionApi();
            await commonHelper.waitUntilElementVisible(makePredictionPage.modalOrder);
        }, 60000);

        it('should get make prediction balance', async function () {
            await makePredictionPage.getMakePredictionBalance().then(async function (value){
                let test = value.split(':')[1];
                await console.log(value)
            });
        });

        it('should fill amount', async function () {
            await makePredictionPage.fillInputBalanceModal(amount);
        });

        it('should select a team', async function () {
            await makePredictionPage.selectTeamModalApi();
        });

        it('should click make order btn', async function () {
            await makePredictionPage.clickOrderBigBtn();
        });

        it('should switch to modal and click next', async function () {
            await browser.getAllWindowHandles().then(function (result) {
                master = result[0];
                modal = result[1];
                console.log(result);
                browser.sleep(2000);
            });

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

        it('should switch another tab', async function () {
            await makePredictionPage.switchOtherTab('My orders');
            await commonHelper.waitUntilElementVisible(makePredictionPage.cancelOrderBtn);
        });

        it('should get event time and check',async function () {
            await commonHelper.waitUntilElementInvisible(adminPage.loadingCotracts);
            await makePredictionPage.invalidDateInvisible();
        });

        it('should check suit', async function check(done) {
            await commonHelper.waitUntilElementInvisible(adminPage.loadingCotracts);
            (await makePredictionPage.checkCancelOrder(future_event_data.startTime, future_event_data.date)).isPresent().then(async function (result) {
                await console.log(result);
                if (result) {
                    await done();
                } else {
                    await browser.refresh();
                    await browser.sleep(2000);
                    await makePredictionPage.invalidDateInvisible();
                    await commonHelper.waitUntilElementInvisible(adminPage.loadingCotracts);
                    await check(done);
                }
            })
        });


        it('should click cancel order btn', async function () {
            await makePredictionPage.clickCancelOrderApi();
            await makePredictionPage.clickCancelOrderBigBtn();
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
            await commonHelper.waitUntilElementVisible(homePage.successTransactionMsg);
        });

        it('should check status', async function () {
            await makePredictionPage.getOrderStatusApi('Canceled');
        });

        it('should switch another tab', async function () {
            await makePredictionPage.switchOtherTab('Event list');
        });

        it('should click on Make Order btn', async function () {
            await makePredictionPage.clickMakePredictionApi();
            await commonHelper.waitUntilElementVisible(makePredictionPage.modalOrder);
        }, 60000);

        it('should get make prediction balance', async function () {
            await makePredictionPage.getMakePredictionBalance().then(async function (value){
                let test = value.split(':')[1];
                await console.log(value);
            });
        });

        it('should fill amount', async function () {
            await makePredictionPage.fillInputBalanceModal(amount);
        });

        it('should select a team', async function () {
            await makePredictionPage.selectTeamModalApi();
        });

        it('should click make order btn', async function () {
            await makePredictionPage.clickOrderBigBtn();
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

        /////ADMIN SIDE

        it('should go to admin page', async function () {
            await adminPage.clickAdminTab();
        });

        it('should click future polars events and check event', async function () {
            await adminPage.clickPolarEvents();
            await adminPage.clickPolarEventsFuture();
        });

        it('should click learn details tab', async function () {
            await adminPage.clickDetails(apiTime);
        });

        it('should click add to contract tab', async function () {
            await adminPage.clickContract();
            await browser.sleep(2000);
            await browser.driver.switchTo().window(modal);
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
            await commonHelper.waitUntilElementVisible(adminPage.successEventAddedMessage);
        });

        it('should click in contract tab', async function () {
            await adminPage.clickInContract();
        });

        it('should wait loading contract and spinner invisible', async function () {
            await commonHelper.waitUntilElementInvisible(adminPage.loadingCotracts);
            await commonHelper.waitUntilElementInvisible(adminPage.loader);
        }, 60000);

        it('should check start event', async function check(done) {
            let start = element(by.xpath(`//*[@class = "card-admin"][contains(.,"${apiTime}")]//*[@class = "small-btn"][contains(.,"START")]`));
            await commonHelper.waitUntilElementInvisible(adminPage.loadingCotracts);
            await commonHelper.waitUntilElementInvisible(adminPage.loader);
            await start.isPresent().then(async function (result) {
                if(result){
                    done();
                } else {
                    await browser.refresh();
                    await commonHelper.waitUntilElementInvisible(adminPage.loader);
                    browser.sleep(2000);
                    await check(done);
                };
            });
        });

        it('should start event', async function() {
            await adminPage.clickStart(apiTime);
            await browser.driver.switchTo().window(modal);
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
            await commonHelper.waitUntilElementVisible(adminPage.eventStarted);
        });

        it('should open polars', async function () {
            await browser.get(qa.baseUrl);
        });

        it('should click orders tab', async function() {
            await makePredictionPage.clickOrdersTab();
        });

        it('should check that status of event is live', async function () {
            await makePredictionPage.checkEventStatus('LIVE');
        });

        ////ADMIN SIDE
        it('should go to admin page', async function () {
            await adminPage.clickAdminTab();
        });

        it('should click future polars events and check event', async function () {
            await adminPage.clickPolarEvents();
            await adminPage.clickPolarEventsFuture();
        });

        it('should click in contract tab', async function () {
            await adminPage.clickInContract();
        });

        it('should end event', async function() {
            await commonHelper.waitUntilElementInvisible(adminPage.loader);
            await browser.refresh();
            await commonHelper.waitUntilElementInvisible(adminPage.loader);
            await console.log('1111111!!!!!!!!!!!!!!!!!!!!!!')
            await browser.sleep(10000);
            await adminPage.clickEnd(apiTime);
            await browser.sleep(10000);
        });

        it('should select winner', async function () {
            await adminPage.selectResult('BLACK');
            await adminPage.clickConfirmBtn();
            await browser.driver.switchTo().window(modal);
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
            await adminPage.checkEndDisabled(apiTime);
        });

        ////CLAIM

        it('should click orders tab', async function() {
            await makePredictionPage.clickOrdersTab();
        });

        it('should switch another tab', async function () {
            await makePredictionPage.switchOtherTab('Claim');
        });

        it('should check status', async function () {
            await makePredictionPage.getOrderStatusApi(apiTime, 'Finished');
        });

        it('should claim order', async function () {
            await adminPage.clickOrdersClaim();
            await browser.driver.switchTo().window(modal);
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

        it('should check transaction is done', async function () {
            await metaMaskPage.clickConfirmTransaction();
            await browser.driver.switchTo().window(master);
            await homePage.clickClosePopUp();
            await commonHelper.waitUntilElementVisible(homePage.successTransactionMsg);
        });

    });
});
