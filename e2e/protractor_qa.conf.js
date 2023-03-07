var Config = require('./config_qa.data.json');
var Project = Config.projects[Object.keys(Config.projects)[0]];
var Machine = Config.machine[Object.keys(Config.machine)[1]];


var checkingMachine = function () {
    for (var i = 0; i < process.argv.length; i++) {

        let obj = process.argv[i];
        let match = obj.match(/^--machine=(.*)$/);

        if (match !== null) {

            if (match.toString().split(',')[1] === 'mac') {
                if (match && match.length > 0) {
                    Machine = Config.machine['mac'];
                }
            } else {
                if (match && match.length > 0) {
                    Machine = Config.machine['linux'];
                }
            }
        }
    }
};

var getCurrentSuite = function () {
    var suite = '';

    for (var i = 0; i < process.argv.length; i++) {

        let obj = process.argv[i];
        suite = obj.match(/^--suite=(.*)$/);

        if (suite !== null) {
            suite = suite.toString().split(',')[1];
            return suite;
        }
    }
};

current_suite = getCurrentSuite();

checkingMachine();

const HtmlScreenshotReporter = require('protractor-jasmine2-screenshot-reporter');
const SpecReporter = require('jasmine-spec-reporter').SpecReporter;
const DescribeFailureReporter = require('protractor-stop-describe-on-failure');

const specReporter = new SpecReporter({
    displayStacktrace: 'all',       // display stacktrace for each failed assertion, values: (all|specs|summary|none)
    displayFailuresSummary: false,  // display summary of all failures after execution
    displayPendingSummary: false,   // display summary of all pending specs after execution
    displaySuccessfulSpec: false,   // display each successful spec
    displayFailedSpec: true,        // display each failed spec
    displayPendingSpec: false,      // display each pending spec
    displaySpecDuration: true,      // display each spec duration
    displaySuiteNumber: true,       // display each suite number (hierarchical)
    colors: {
        success: 'green',
        failure: 'red',
        pending: 'blue'
    },
    prefixes: {
        success: '✓ ',
        failure: '✗ ',
        pending: '* '
    },
    customProcessors: []
});

var reportPath = './new_reports';

const htmlReporter = new HtmlScreenshotReporter({
    dest: reportPath,
    filename: 'FullReport.html',
    ignoreSkippedSpecs: true,
    reportOnlyFailedSpecs: false,
    captureOnlyFailedSpecs: true,
    showSummary: true,
    showQuickLinks: true,
    inlineImages: true
});

exports.config = {

    directConnect: true,

    baseUrl: Project.baseUrl,

    params: Project.params,

    capabilities: {
        'browserName': 'chrome',
        'chromeOptions': {
            args: ['--disable-touch-touch-drag-drop', '--disable-infobars',
                '--no-sandbox', '--test-type=browser', '--start-maximized', '--window-size=1440,900',
                '--load-extension=/Users/ihor/Documents/polars_qa/nkbihfbeogaeaoehlefnkodbefgpgknn', '--app-id = mpjiecdeagakfpaembbldgmncdegnjin'],
            prefs: {
                'download': {
                    'prompt_for_download': false,
                    'default_directory': '/Users/ihor/Documents/Polars_pro/temp-static'
                }
            },
            w3c: false
        }
    },

    plugins: [{
        package: 'protractor-testability-plugin',
        path: '../node_modules/protractor-testability-plugin'
    }, {
        package: 'protractor-console',
        logLevels: [],
        // severe
        path: '../node_modules/protractor-console'
    }],

    frameworks: [
        'jasmine',
        'jasmine-matchers'
    ],

    suites: {
        smoke: [
            '../e2e/tests/smoke/smoke.spec.js',
        ],

        prediction_pool: [
            '../e2e/tests/prediction_pool/prediction_pool.spec.js'
        ],

        stacking: [
            '../e2e/tests/stacking/stacking.spec.js'
        ],

        make_prediction: [
            '../e2e/tests/make_prediction/make_prediction.spec.js'
        ],

        admin_page: [
            '../e2e/tests/admin/admin.spec.js'
        ],

        leverage: [
            '../e2e/tests/leverage/leverage.spec.js'
        ],

        suits: [
            '../e2e/tests/suits/suits.spec.js'
        ],

        qa: [
            '../e2e/tests/make_prediction/make_prediction.spec.js',
            '../e2e/tests/leverage/leverage.spec.js',
            '../e2e/tests/suits/suits.spec.js'
        ]
    },


    allScriptsTimeout: 45000,

    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: 60000,
        isVerbose: true,
        print: function () {
        },
        grep: '@local',
        invertGrep: true
    },

    // Setup the report before any tests start
    beforeLaunch: function () {
        return new Promise(function (resolve) {
            htmlReporter.beforeLaunch(resolve);
        });
    },

    onPrepare: function () {
        browser.ignoreSynchronization = true;

        global.machine = Machine;
        global.config_data = Config;// TRUE

        jasmine.getEnv().addReporter(htmlReporter);
        jasmine.getEnv().addReporter(specReporter);
        jasmine.getEnv().addReporter(DescribeFailureReporter(jasmine.getEnv()));

        let resultLeaker = {
            suiteStarted: function (result) {
                jasmine.results = {suite: result};
            },
            specStarted: function (result) {
                jasmine.results.spec = result;
            }
        };
        jasmine.getEnv().addReporter(resultLeaker);
    },

    // Close the report after all tests finish
    afterLaunch: function (exitCode) {
        return new Promise(function (resolve) {
            htmlReporter.afterLaunch(resolve.bind(this, exitCode));
        });
    }
};