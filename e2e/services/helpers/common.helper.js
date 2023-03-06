'use strict';
var faker = require('faker');
var strftime = require('strftime');
var config = require('../../protractor.conf.js');
var fs = require('fs');
/**
 * Common helper object.
 * @constructor
 */
var CommonHelper = function () {

    /**
     * Switch to given iframe
     * @param iframeElement
     * @returns {ExtendedWebDriver}
     */
    this.switchToIframe = function (iframeElement) {
        this.waitUntilElementVisible($(iframeElement));
        var driver = browser.driver;
        var iframe = by.css(iframeElement);
        var el = driver.findElement(iframe);
        browser.switchTo().frame(el);
        return driver
    };

    this.switchToIframeAsync = async function (iframeElement) {
        await this.waitUntilElementVisible($(iframeElement));
        var driver = await browser.driver;
        var iframe = await by.css(iframeElement);
        var el = await driver.findElement(iframe);
        await browser.switchTo().frame(el);
        return driver;
    };

    /**
     * Switch to given iframe
     * @param iframeElement
     * @returns {ExtendedWebDriver}
     */
    this.switchToIframeByXpath = function (iframeElement) {
        this.waitUntilElementVisible(element(by.xpath(iframeElement)));
        var driver = browser.driver;
        var iframe = by.xpath(iframeElement);
        var el = driver.findElement(iframe);
        browser.switchTo().frame(el);
        return driver
    };

    /**
     *
     * @param locator string
     * @param cssAttribute string
     * @param css_value string
     */
    this.waitUntilSpinnerInvisible = function (locator, cssAttribute, css_value) {
        //.chq-loader-image
        browser.sleep(1000);
        browser.wait(function () {
            return browser.executeScript('return $("' + locator + '").css("' + cssAttribute + '")').then(function (value) {
                if (value === css_value) {
                    return false
                } else {
                    return true;
                }

            })
        }, 10000).catch(function (err) {
            console.log(err)
        })
    };

    /**
     * Clear browser session storage
     *
     */
    this.clearSessionStorage = async function () {
        await browser.executeScript('window.sessionStorage.clear();');
    };

    /**
     * Clear browser local storage
     *
     */
    this.clearLocalStorage = async function () {
        await browser.executeScript('window.localStorage.clear();');
    };

    /**
     * Clear cookies
     *
     */
    this.clearCookies = async function () {
        await browser.manage().deleteAllCookies();
    };

    /**
     * Clear all browser data
     *
     */
    this.clearAllData = async function () {
        await this.clearSessionStorage();
        await this.clearLocalStorage();
        await this.clearCookies();
    };

    this.clearAllDataCommon = function () {
        this.clearSessionStorage();
        this.clearLocalStorage();
        this.clearCookies();
    };

    /**
     * Clear all browser data with open static page to delete all data
     * Due to upd cookies logic
     *
     */
    this.clearAllDataWithLink = async function (store) {
        await console.log(store + '/robots.txt');
        await browser.get(store + '/robots.txt');
        await this.clearSessionStorage();
        await this.clearLocalStorage();
        await this.clearCookies();
    };

    /**
     * Wait until selected element will be present in DOM
     *
     * @param element
     * @param message
     * @param timeout
     */
    this.waitUntilElementPresent = async function (element, message, timeout) {
        var mess = message ? message : element.locator().toString() + ' is not presented.';
        var to = timeout ? timeout : config.config.allScriptsTimeout;
        var EC = protractor.ExpectedConditions;
        await browser.driver.wait(EC.presenceOf(element), to, mess);
    };

    this.appendTextToFile = function (text, fileName) {
        fs.appendFile(fileName, text, function (err) {
            if (err) {
                console.log(err);
            }
        });
    };

    this.writeTextToFile = function (text, filePath) {
        var path = require('path');
        var absolutePath = path.resolve(__dirname, filePath);
        fs.writeFile(absolutePath, text, 'utf8', function (err) {
            if (err) return console.log(err);
        });
    };
    /**
     * Wait until selected element will be absent in DOM
     *
     * @param element
     * @param message
     * @param timeout
     */
    this.waitUntilElementIsNotPresent = async function (element, message, timeout) {
        var mess = message ? message : element.locator().toString() + ' is presented.';
        var to = timeout ? timeout : config.config.allScriptsTimeout;
        var EC = protractor.ExpectedConditions;
        await browser.driver.wait(EC.stalenessOf(element), to, mess);
    };

    /**
     * Wait until selected element will be visible
     *
     * @param element
     * @param message
     * @param timeout
     */
    this.waitUntilElementVisible = async function (element, message, timeout) {
        var mess = message ? message : element.locator().toString() + ' is not visible.';
        var to = timeout ? timeout : config.config.allScriptsTimeout;
        var EC = protractor.ExpectedConditions;
        await browser.driver.wait(EC.visibilityOf(element), to, mess);
    };

    /**
     * Wait until selected element will be invisible
     *
     * @param element
     * @param message
     * @param timeout
     */
    this.waitUntilElementInvisible = async function (element, message, timeout) {
        var mess = message ? message : element.locator().toString() + ' is not invisible.';
        var to = timeout ? timeout : config.config.allScriptsTimeout;
        var EC = protractor.ExpectedConditions;
        await browser.driver.wait(EC.invisibilityOf(element), to, mess);
    };

    /**
     * Wait until selected element will be clickable
     *
     * @param element
     * @param message
     * @param timeout
     */
    this.waitUntilElementClickable = async function (element, message, timeout) {
        var mess = message ? message : element.locator().toString() + ' is not clickable.';
        var to = timeout ? timeout : config.config.allScriptsTimeout;
        var EC = protractor.ExpectedConditions;
        await browser.driver.wait(EC.elementToBeClickable(element), to, mess);
    };

    /**
     * Wait until element will change it's text
     *
     * @param element
     * @param text
     * @param message
     * @param timeout
     */
    this.waitUntilTextInElement = async function (element, text, message, timeout) {
        var mess = message ? message : '"' + text + '" in ' + element.locator().toString() + ' is not presented.';
        var to = timeout ? timeout : config.config.allScriptsTimeout;
        var EC = protractor.ExpectedConditions;
        await browser.driver.wait(EC.textToBePresentInElement(element, text), to, mess);
    };

    /**
     * Wait until url
     *
     * @param url
     * @param message
     * @param timeout
     */
    this.waitForUrl = async function (url, message, timeout) {
        var mess = message ? message : url + ' is not available.';
        var to = timeout ? timeout : config.config.allScriptsTimeout;
        let EC = browser.ExpectedConditions;
        await browser.driver.wait(EC.urlContains(url), to, mess);
    };

    /**
     * Mouse over element
     *
     * @param element
     */
    this.moveMouseOver = async function (element) {
        await this.waitUntilElementPresent(element);
        await browser.actions().mouseMove(element).perform();
    };

    /**
     * Unique value
     *
     */
    this.uniqueValue = function () {
        var val = faker.random.uuid();
        return val.split('-')[0];
    };

    /**
     * Unique product name
     *
     */
    this.randomAlphaNumeric = function () {
        return faker.random.alphaNumeric();
    };

    /**
     * Unique product name
     *
     * @param name
     */
    this.uniqueProductName = function (name) {
        return faker.commerce.product() + name;
    };

    /**
     * Unique first name
     *
     */
    this.uniqueFirstName = function () {
        var name = faker.name.firstName().toLowerCase();
        var firstChar = name.charAt(0);
        return name.replace(firstChar, firstChar.toUpperCase());
    };

    /**
     * Unique phone
     *
     */
    this.uniquePhone = function () {
        return faker.phone.phoneNumber('+12124######');
    };

    /**
     * Unique last name
     *
     */
    this.uniqueLastName = function () {
        var name = faker.name.lastName().toLowerCase();
        var firstChar = name.charAt(0);
        return name.replace(firstChar, firstChar.toUpperCase());
    };

    /**
     * Unique street address
     *
     */
    this.uniqueStreetAddress = function () {
        return faker.address.streetAddress();
    };

    /**
     * Select option in dropdown
     *
     * @param element
     * @param option
     */
    this.selectFromDropdown = function (element, option) {
        element.element(by.cssContainingText('option', option)).click();
    };

    /**
     * Switch to previous tab without closing tab that you left
     *
     */
    this.switchToPreviousWithoutClose = function () {
        browser.sleep(500);
        browser.getAllWindowHandles().then(function (handles) {
            if (handles.length > 1) {
                browser.switchTo().window(handles[handles.length - 2]);
            }
        });
        browser.sleep(500);
    };

    /**
     * Switch to previous tab without closing tab that you left
     *
     */
    this.asyncSwitchToPreviousWithoutClose = async function () {
        await browser.sleep(500);
        await browser.getAllWindowHandles().then(async function (handles) {
            if (handles.length > 1) {
                await browser.switchTo().window(handles[handles.length - 2]);
            }
        });
        await browser.sleep(500);
    };

    /**
     * Open a new tab and switch to it
     *
     */
    this.openNewTab = async function () {
        await browser.executeScript('window.open()');
        await this.asyncSwitchToNextTab();
    };

    /**
     * Switch to next browser tab
     *
     */
    this.switchToNextTab = function () {
        browser.sleep(500);
        browser.getAllWindowHandles().then(function (handles) {
            if (handles.length > 1) {
                browser.switchTo().window(handles[handles.length - 1]);
            }
        });
        browser.sleep(500);
    };

    /**
     * Async switch to next browser tab
     *
     */
    this.asyncSwitchToNextTab = async function () {
        await browser.sleep(500);
        await browser.getAllWindowHandles().then(async function (handles) {
            if (handles.length > 1) {
                await browser.switchTo().window(handles[handles.length - 1]);
            }
        });
        await browser.sleep(500);
    };

    /**
     * Switch to previous browser tab
     *
     */
    this.switchToPreviousTab = function () {
        browser.sleep(500);
        browser.getAllWindowHandles().then(function (handles) {
            if (handles.length > 1) {
                browser.close();
                browser.switchTo().window(handles[handles.length - 2]);
            }
        });
        browser.sleep(500);
    };

    /**
     * Async switch to previous browser tab
     *
     */
    this.asyncSwitchToPreviousTab = async function () {
        await browser.sleep(500);
        await browser.getAllWindowHandles().then(async function (handles) {
            if (handles.length > 1) {
                await browser.close();
                await browser.switchTo().window(handles[handles.length - 2]);
            }
        });
        await browser.sleep(500);
    };

    /**
     * Close all tabs except one
     *
     */
    this.remainOneTab = function () {
        browser.sleep(500);
        browser.getAllWindowHandles().then(function (handles) {
            if (handles.length > 1) {
                for (var i = handles.length - 1; i >= 1; i--) {
                    browser.switchTo().window(handles[i]);
                    browser.close();
                }
            }
            browser.switchTo().window(handles[0]);
        });
        browser.sleep(500);
    };

    /**
     * Scroll to given element using jquerry
     * @param element
     */
    this.scrollToElement = async function (element) {
        await this.waitUntilElementPresent(element);
        await browser.executeScript('arguments[0].scrollIntoView();', element.getWebElement());
        await browser.sleep(500);
    };

    /**
     * Switch to specific browser tab
     *
     * @param index
     */
    this.switchToSpecificTab = async function (index) {
        await browser.sleep(500);
        await browser.getAllWindowHandles().then(async function (handles) {
            if (handles.length > 1) {
                await browser.switchTo().window(handles[index - 1]);
            }
        });
        await browser.sleep(500);
    };

    /**
     * Accept browser alert without navigation
     *
     */
    this.acceptAlert = function () {
        browser.switchTo().alert().then(function (alert) {
            alert.accept();
        }, function () {
        });
    };

    /**
     * Accept browser alert without navigation async/await
     *
     */
    this.acceptAlertAsync = async function () {
        await browser.switchTo().alert().then(async function (alert) {
            await alert.accept();
        }, function () {
        });
    };

    /**
     * Move mouse
     *
     */
    this.moveMouse = function () {
        browser.actions().mouseMove({x: 0, y: 200}).perform();
    };

    /**
     * Get today's date
     *
     */
    this.getCurrentDate = function () {
        var todayDate = new Date();
        return strftime('%m/%d/%Y', todayDate);
    };

    /**
     * Get specific date from today
     *
     */
    this.getSpecificDate = function (days) {
        var specificDate = new Date();
        specificDate.setDate(specificDate.getDate() + days);
        return strftime('%m/%d/%Y', specificDate);
    };

    /**
     * Get config data from file
     *
     * @returns string
     */
    this.getDataFromFile = function (file) {
        var path = require('path');
        var fileToUpload = '../../' + file,
            absolutePath = path.resolve(__dirname, fileToUpload);
        return fs.readFileSync(absolutePath, 'utf-8', function (err, data) {
            return data;
        });
    };

    /**
     * Get config data from file
     *
     * @returns string
     */
    this.getDataFromCustomFile = function (filPath) {
        var path = require('path');
        var fileToUpload = filPath,
            absolutePath = path.resolve(__dirname, fileToUpload);
        return fs.readFileSync(absolutePath, 'utf-8', function (err, data) {
            return data;
        });
    };

    /**
     * Move DnD element
     * @param dragElement
     * @param dropElement
     * @param x
     * @param y
     */
    this.moveElement = function (dragElement, dropElement, x, y) {
        this.moveMouseOver(dragElement);
        browser.actions().mouseDown(dragElement).perform();
        browser.sleep(1000); // wait for move element
        this.scrollToElement(dropElement);
        browser.sleep(1000); // wait for move element
        this.moveMouseOver(dropElement);
        browser.sleep(2000); // wait for move element
        browser.actions().mouseMove({x: x, y: y}).perform();
        browser.sleep(2000); // wait for move element
        browser.actions().mouseUp().perform();
        browser.sleep(2000); // wait for move element
    };

    this.moveElementAsync = async function (dragElement, dropElement, x, y) {
        await this.moveMouseOver(dragElement);
        await browser.actions().mouseDown(dragElement).perform();
        await browser.sleep(1000); // wait for move element
        await this.scrollToElement(dropElement);
        await browser.sleep(1000); // wait for move element
        await this.moveMouseOver(dropElement);
        await browser.sleep(2000); // wait for move element
        await browser.actions().mouseMove({x: x, y: y}).perform();
        await browser.sleep(2000); // wait for move element
        await browser.actions().mouseUp().perform();
        await browser.sleep(2000); // wait for move element
    };

    /**
     * Wait for spinner to be displayed on the page
     */
    this.waitForSpinnerDisplayed = function () {
        this.waitUntilElementPresent($('[class="chq-loader-image"]', 'no spinner displayed', 15000));
    };

    /**
     * Wait for spinner not to be displayed on the page
     */
    this.waitForSpinnerNotDisplayed = async function () {
        await this.waitUntilElementInvisible($('[class="chq-loader-image"]'), 'spinner is displayed');
    };

    /**
     * Usage: clear(element(by.model('my.model')));
     */
    this.clear = function (elem, length) {
        length = length || 100;
        var backspaceSeries = '';
        for (var i = 0; i < length; i++) {
            backspaceSeries += protractor.Key.ARROW_RIGHT;
            backspaceSeries += protractor.Key.BACK_SPACE;
        }
        elem.sendKeys(backspaceSeries);
    };

    /**
     * Get attribute of element
     *
     * @param element
     * @param attribute
     */
    this.getElementAttribute = function (element, attribute) {
        this.waitUntilElementPresent(element);
        return element.getAttribute(attribute).then(function (value) {
            return value;
        });
    };

    /**
     * Usage: clear(element(by.model('my.model'))) with moving cursor to the right;
     */
    this.clearWithArrow = function (elem, length) {
        length = length || 100;
        var backspaceSeries = '';
        for (var i = 0; i < length; i++) {
            backspaceSeries += protractor.Key.ARROW_RIGHT;
            backspaceSeries += protractor.Key.BACK_SPACE;
        }
        elem.sendKeys(backspaceSeries);
    };

    /**
     * Get a random string of the specified length
     * @length
     * @charSet
     *
     * @return string
     */
    this.getRandomString = function (length) {
        var charSet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        var randomString = '';

        for (var i = 0; i < length; i++) {
            var randomPosition = Math.floor(Math.random() * charSet.length);
            randomString += charSet.substring(randomPosition, randomPosition + 1);
        }
        return randomString;
    };

    /**
     * Decodes a quoted-printable encoded string.
     * Returns null if there was an error.
     *
     * @param {string} data The quoted - printable encoded data.
     * @returns {string} The decoded string or null if there was an error.
     */
    this.decodeQuotedPrintable = function (data) {
        // ensure that data is a string
        if (!(typeof data === 'string' || data instanceof String)) {
            return null;
        }
        var replacer = function (match, p1) {
            // handle escape sequence
            if (p1.trim().length === 2) {
                // decode byte (for example: "=20" ends up as " ")
                var code = parseInt(p1.trim(), 16);
                return String.fromCharCode(code);
            }
            // handle soft line breaks
            return '';
        };
        // remove soft line breaks and convert escape sequences
        data = data.replace(/=([0-9A-F]{2}|\r\n|\n)/gi, replacer);
        // decode escape sequences
        try {
            return decodeURIComponent(escape(data));
        } catch (dummy) {
            return null;
        }
    };

    this.waitUntilLoaderDisappear = async function () {
        var loader = $('lib-loader');
        try {
            await this.waitUntilElementVisible(loader, 'Loader doesn`t appear', 3000);
            await this.waitUntilElementInvisible(loader);
        } catch (exception) {
        }
    };

    this.getElementStyle = async function (element, separator) {
        let values = {};
        element.getAttribute('innerHTML').then(async function (text) {
            // console.log("result>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>:", text);
            await text.split(separator)[1].split('\n}')[0].split(';\n').forEach(async function (text) {
                let key = await text.split(':')[0];
                values[key] = await text.replace(';', '').split(':')[1];
            });
        });
        return values;
    };

    this.compareArrays = async function (actualArray, expectedArray) {
        for (var i = 0; i < Object.keys(expectedArray).length; i++) {
            var key = Object.keys(expectedArray)[i];
            var expectedValue = expectedArray[key];
            var actualValue = actualArray[key];
            await expect(expectedValue).toEqual(actualValue);
        }
    };

    this.getElementStyleOnDevice = async function (element, device, separator) {
        let values = {};
        let splitter;
        switch (device){
            case 'tablet':
                splitter = '@media (max-width:840px) {';
                break;
            case 'mobile':
                splitter = '@media (max-width:600px) {';
                break;
        }
        element.getAttribute('innerHTML').then(async function (text) {
            // console.log("result>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>:", text);
            await text.split(splitter)[1].split(separator)[1].split('\n}')[0].split(';\n').forEach(async function (text) {
                let key = await text.split(':')[0];
                values[key] = await text.replace(';', '').split(':')[1];
            });
        });
        return values;
    };
};

module.exports = new CommonHelper();