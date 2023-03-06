var bottlejs = require('bottlejs').pop('test');

bottlejs.factory('PageObject', function () {
    return {
        getHomePage: function () {
            var homePage = require('./home_page.po');
            return new homePage();
        },

        getMetaMaskPage: function () {
            var metaMaskPage = require('./metamask_page.po');
            return new metaMaskPage();
        },

        getPredictionPage: function () {
            var predictionPage = require('./prediction_page.po');
            return new predictionPage();
        },

        getStackingPage: function () {
            var stackingPage = require('./stacking_page.po');
            return new stackingPage();
        },

        getMakePredictionPage: function () {
            var makePredictionPage = require('./make_prediction_page.po');
            return new makePredictionPage();
        },

        getAdminPage: function () {
            var adminPage = require('./admin_page.po');
            return new adminPage();
        },

        getPlatformsPage: function () {
            var platformsPage = require('./platforms_page.po');
            return new platformsPage();
        },

        getLiquidityPage: function () {
            var liquidityPage = require('./liquidity_page.po');
            return new liquidityPage();
        }


    }
});

module.exports = bottlejs;
