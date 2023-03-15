var moment = require('moment');

var pageObject = require('../../services/pages').container.PageObject;
var homePage = pageObject.getHomePage();
var metaMaskPage = pageObject.getMetaMaskPage();
var predictionPage = pageObject.getPredictionPage();
var adminPage = pageObject.getAdminPage();
var makePredictionPage = pageObject.getMakePredictionPage();
var platformsPage = pageObject.getPlatformsPage();
var liquidityPage = pageObject.getLiquidityPage();

var commonHelper = require('./../../services/helpers/common.helper');
var Web3 = require('web3');

const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");

var qa = config_data.projects;
var passwords = config_data.projects.params;
var fields = config_data.networkSetupFields;
var networks = config_data.networks;
var adminData = config_data.projects.params;
var platforms = config_data.projects.params.platforms;
//
describe('Suits', function () {

    var unique_value = commonHelper.uniqueValue();
    var orderSuitName = 'orders' + unique_value;
    // var orderSuitName = 'ordersed5d53cc';

    // console.log('qa::::', networks.name);

    describe('user is able to create order suit add event make order', function () {

        let master, modal;
        let amount = 1;
        let white = 'white';
        let black = 'black';
        var tokenAddress = '0x45D50e3A65FBbdC2C9b3011B76B5e77313eAa172';

        var newStartTimeDate, newEndTimeDate, newStartTime, newEndTime, startHours, startMinutes, endHours, endMinutes, futureStartTime;
        var newCustomDate, futureAdminStartTime;
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

        it('should open polars', async function () {
            await browser.get(qa.baseUrl);
        });

        it('should click leverage tab', async function() {
            await makePredictionPage.clickMySuitsTab();
        });

        it('should click add suit', async function () {
            await makePredictionPage.clickAddSuit();
        });

        it('should create a suit', async function () {
            await console.log(orderSuitName);
            await makePredictionPage.createSuit(orderSuitName, tokenAddress);
            await makePredictionPage.clickAddSuitModal();
            await makePredictionPage.clickConfirmAddSuit();
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

        it('should select last page', async function () {
            await makePredictionPage.selectLastPage();
            await makePredictionPage.continueSetup(orderSuitName);
        });

        it('should fill create prediction contract', async function () {
            await makePredictionPage.fillCreatePredictionSuit('white', 'WHITE', 'black', 'BLACK');
            await makePredictionPage.clickNextBtn();
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

        it('should fill price', async function () {
            await makePredictionPage.fillCreatePredictionSuitPrice('0.55', '0.45');
            await makePredictionPage.clickNextBtn();
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


        it('should check step is thrd and click next', async function () {
            await commonHelper.waitUntilElementVisible(makePredictionPage.checkStepIsThrd);
            await makePredictionPage.clickNextBtn();
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

        it('should check step is thrd and click next', async function () {
            await commonHelper.waitUntilElementVisible(makePredictionPage.checkStepIsFrth);
            await makePredictionPage.clickNextBtn();
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

        it('should fill commission', async function () {
            await makePredictionPage.fillCommission('0.3');
            await makePredictionPage.clickNextBtn();
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

        it('should create Pending Orders', async function () {
            await commonHelper.waitUntilElementVisible(makePredictionPage.checkStepIsSixth);
            await makePredictionPage.clickNextBtn();
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


        it('should create Pending Orders', async function () {
            await commonHelper.waitUntilElementVisible(makePredictionPage.checkStepIsSeventh);
            await makePredictionPage.clickNextBtn();
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
        }, 120000);

        it('should check transaction is done', async function () {
            await metaMaskPage.clickConfirmTransaction();
            await browser.driver.switchTo().window(master);
            await homePage.clickClosePopUp();
            await commonHelper.waitUntilElementVisible(homePage.successTransactionMsg);
            await makePredictionPage.clickBackBtn();
        });

        it('should open platforms', async function () {
            await platformsPage.clickSwitchPlatform();
            await makePredictionPage.clickSwitchToSuits();
            await browser.sleep(5000);
            await makePredictionPage.selectLastPage();
        });

        it('should check suit', async function check(done) {
            (await platformsPage.checkSuit(orderSuitName)).isPresent().then(async function (result) {
                await console.log(result);
                if (result) {
                    await done();
                } else {
                    await console.log('1111111111111111');
                    await browser.refresh();
                    await browser.sleep(5000);
                    await makePredictionPage.selectLastPage();
                    await check(done);
                }
            })
        });

        it('should activate suit', async function () {
            await platformsPage.activateSuit(orderSuitName);
            await commonHelper.waitUntilElementInvisible(adminPage.loadingCotracts);
            await commonHelper.waitUntilElementInvisible(adminPage.loader);
        });

        it('should click arrow and liquidity', async function () {
            await liquidityPage.clickArrow();
            await liquidityPage.clickLiquidity();
            await browser.sleep(1000);
            await makePredictionPage.clickOkBtn();
        });

        it('should click approve', async function () {
            await makePredictionPage.clickApprovePol();
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

        it('should fill amount', async function () {
            await liquidityPage.inputAdd(10);
        });

        it('should click add btn', async function () {
            await liquidityPage.clickAdd();
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

        it('should open admin tab', async function () {
            await makePredictionPage.clickSuitAdmin();
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
            await adminPage.clickDateInputSuit();
        });

        it('should fill time start input', async function () {
            await browser.sleep(1000);
            await adminPage.fillDateInput(startHours, startMinutes);
        });

        it('should click time end input', async function () {
            await adminPage.clickDateEndInputSuit();
        });

        it('should fill time end input', async function () {
            await browser.sleep(1000);
            await adminPage.endDateInput(endHours, endMinutes);
        });

        it('should add event to contract', async function () {
            await makePredictionPage.clickAddEventSuit();
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
            await commonHelper.waitUntilElementVisible(adminPage.successMatchAddedMessage);
        });

        it('should click orders tab', async function() {
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
                expect(custom_event_data.whiteTeam).toContain(value);
            });

        });

        it('should grt name of black team and check if it is correct', async function() {
            await makePredictionPage.getNameOfBlackTeam().then(function(value) {
                console.log(value);
                expect(custom_event_data.blackTeam).toContain(value);
            });
        });


        it('should get name of category and check if it is correct', async function() {
            await makePredictionPage.getEventCategoryName().then(function(value) {
                console.log(value);
                expect(custom_event_data.eventType).toContain(value);
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

        it('should click orders tab', async function() {
            await makePredictionPage.clickOrdersTab();
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

        it('should open admin tab', async function () {
            await makePredictionPage.clickSuitAdmin();
            await makePredictionPage.clickInContractSuit();
        });

        it('should start event', async function() {
            await adminPage.clickStartSuit();
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

        it('should click on orders tab', async function () {
            await makePredictionPage.clickOrdersTab();
        });

        it('should check that status of event is live', async function () {
            await makePredictionPage.checkEventStatus('LIVE');
        });

        it('should open admin tab', async function () {
            await makePredictionPage.clickSuitAdmin();
            await makePredictionPage.clickInContractSuit();
        });

        it('should select winner', async function () {
            await adminPage.clickEnd(futureStartTime);
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
            await browser.driver.switchTo().window(master);
            await adminPage.checkEndDisabled(futureStartTime);
        });

        it('should click on orders tab', async function () {
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


        ////////CRYPTO

        it('should open admin tab', async function () {
            await makePredictionPage.clickSuitAdmin();
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
            await adminPage.clickDateInputSuit();
        });

        it('should fill time start input', async function () {
            await browser.sleep(5000);
            await adminPage.fillDateInput(startHours, startMinutes);
        });

        it('should click time end input', async function () {
            await adminPage.clickDateEndInputSuit();
        });

        it('should fill time end input', async function () {
            await browser.sleep(5000);
            await adminPage.endDateInput(endHours, endMinutes);
        });

        it('should add event to contract', async function () {
            await makePredictionPage.clickAddEventSuit();
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
            await commonHelper.waitUntilElementVisible(adminPage.successMatchAddedMessage);
        });

        it('should click orders tab', async function() {
            await makePredictionPage.clickOrdersTab();
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

        it('should open admin tab', async function () {
            await makePredictionPage.clickSuitAdmin();
            await makePredictionPage.clickInContractSuit();
        });

        it('should start event', async function() {
            await adminPage.clickStartSuit();
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

        it('should click on orders tab', async function () {
            await makePredictionPage.clickOrdersTab();
        });

        it('should check that status of event is live', async function () {
            await makePredictionPage.checkEventStatus('LIVE');
        });

        it('should open admin tab', async function () {
            await makePredictionPage.clickSuitAdmin();
            await makePredictionPage.clickInContractSuit();
        });

        it('should select winner', async function () {
            await adminPage.clickEnd(futureStartTime);
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
            await browser.driver.switchTo().window(master);
            await adminPage.checkEndDisabled(futureStartTime);
        });

        it('should click on orders tab', async function () {
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

    describe('user is able to create leverage suit after orders', function () {

        let master, modal;
        let amount = 1;
        let white = 'white';
        let black = 'black';
        var tokenAddress = '0x45D50e3A65FBbdC2C9b3011B76B5e77313eAa172';

        var newStartTimeDate, newEndTimeDate, newStartTime, newEndTime, startHours, startMinutes, endHours, endMinutes, futureStartTime;
        var newCustomDate, futureAdminStartTime;
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

        it('should open polars', async function () {
            await browser.get(qa.baseUrl);
        });

        it('should open platforms', async function () {
            await platformsPage.clickSwitchPlatform();
            await platformsPage.selectPlatformSuits('POL');
        });

        it('should click leverage tab', async function() {
            await makePredictionPage.clickMySuitsTab();
        });

        it('should select last page', async function () {
            await makePredictionPage.selectLastPage();
            await makePredictionPage.continueSetup(orderSuitName);
            await browser.sleep(2000);
        });

        it('should create leverage contract', async function () {
            await commonHelper.waitUntilElementVisible(makePredictionPage.checkStepIsEighth);
            await makePredictionPage.clickNextBtn();
            await browser.sleep(1000);
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

        it('should create leverage contract', async function () {
            await commonHelper.waitUntilElementVisible(makePredictionPage.checkStepIsNinth);
            await makePredictionPage.clickNextBtn();
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

        it('should click arrow and liquidity', async function () {
            await liquidityPage.clickArrowLev();
            await liquidityPage.clickLevLiquidity();
            await browser.sleep(1000);
        });

        it('should click approve', async function () {
            await makePredictionPage.clickApprovePol();
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
            await makePredictionPage.clickBackBtn();
        });

        it('should fill amount', async function () {
            await liquidityPage.inputAdd(10);
        });

        it('should click add btn', async function () {
            await liquidityPage.clickAdd();
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

        it('should open admin tab', async function () {
            await makePredictionPage.clickSuitAdmin();
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
            await adminPage.clickDateInputSuit();
        });

        it('should fill time start input', async function () {
            await browser.sleep(1000);
            await adminPage.fillDateInput(startHours, startMinutes);
        });

        it('should click time end input', async function () {
            await adminPage.clickDateEndInputSuit();
        });

        it('should fill time end input', async function () {
            await browser.sleep(1000);
            await adminPage.endDateInput(endHours, endMinutes);
        });

        it('should add event to contract', async function () {
            await makePredictionPage.clickAddEventSuit();
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
            await commonHelper.waitUntilElementVisible(adminPage.successMatchAddedMessage);
        });

        it('should click orders tab', async function() {
            await makePredictionPage.clickLevTab();
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

        it('should click on Make Lev btn', async function () {
            await makePredictionPage.clickMakeLeverage(custom_event_data.startTime, custom_event_data.date);
            await commonHelper.waitUntilElementVisible(makePredictionPage.modalLev);
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

        it('should slide amount', async function () {
            await makePredictionPage.moveSliderSuit()
            await browser.sleep(2000);
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

        it('should click on Make Lev btn', async function () {
            await makePredictionPage.clickMakeLeverage(custom_event_data.startTime, custom_event_data.date);
            await commonHelper.waitUntilElementVisible(makePredictionPage.modalLev);
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

        it('should slide amount', async function () {
            await makePredictionPage.moveSliderSuit()
            await browser.sleep(2000);
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

        it('should open admin tab', async function () {
            await makePredictionPage.clickSuitAdmin();
            await makePredictionPage.clickInContractSuit();
        });

        it('should start event', async function() {
            await adminPage.clickStartSuit();
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

        it('should click on orders tab', async function () {
            await makePredictionPage.clickOrdersTab();
        });

        it('should check that status of event is live', async function () {
            await makePredictionPage.checkEventStatus('LIVE');
        });

        it('should open admin tab', async function () {
            await makePredictionPage.clickSuitAdmin();
            await makePredictionPage.clickInContractSuit();
        });

        it('should select winner', async function () {
            await adminPage.clickEnd(futureStartTime);
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
            await browser.driver.switchTo().window(master);
            await adminPage.checkEndDisabled(futureStartTime);
        });

        it('should click on orders tab', async function () {
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

        it('should click arrow and liquidity', async function () {
            await liquidityPage.clickLiquidity();
        });

        it('should switch to remove', async function () {
            await liquidityPage.clickRemoveTab();
        });

        it('should click approve', async function () {
            await makePredictionPage.clickApproveBwlt();
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

        it('should fill amount', async function () {
            await liquidityPage.clickMaxBtn();
        });

        it('should click add btn', async function () {
            await liquidityPage.clickRemove();
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

        it('should click arrow and liquidity', async function () {
            await liquidityPage.clickLevLiquidity();
        });

        it('should switch to remove', async function () {
            await liquidityPage.clickRemoveTab();
        });

        it('should click approve', async function () {
            await makePredictionPage.clickApprovePl();
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

        it('should fill amount', async function () {
            await liquidityPage.clickMaxBtn();
        });

        it('should click add btn', async function () {
            await liquidityPage.clickRemove();
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

    });

});
