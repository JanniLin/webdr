const rimraf = require('rimraf');
const path = require('path');
const { existsSync, mkdirSync } = require('fs');


exports.config = {
    runner: 'local',
    specs: [
        './test/spec/**/*.js'
    ],

    exclude: [],
    maxInstances: 1,
    capabilities: [
        {
            browserName: 'firefox'
        },
        {
            browserName: 'chrome'
        }
    ],

    logLevel: 'error',
    bail: 0,
    baseUrl: 'https://ej2.syncfusion.com/',
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,
    framework: 'mocha',
    reporters: [
        'spec',
        ['junit', {
            outputDir: './reports/junit',
            outputFileFormat: function(options) { // optional
                return `results-${options.cid}.${options.capabilities}.xml`
            }
        }],
        ['allure', {
            outputDir: 'allure-results',
            disableWebdriverStepsReporting: true,
            disableWebdriverScreenshotsReporting: false,
        }]
    ],
    afterTest: async (test, context, result) => {
        // take a screenshot anytime a test fails and throws an error
        if (result.error) {
            console.log(`Screenshot for the failed test ${test.title} is saved`);
            const filename = test.title + '.png';
            const dirPath = './artifacts/screenshots/';

            if (!existsSync(dirPath)) {
                mkdirSync(dirPath, {
                    recursive: true,
                });
            }
            await browser.saveScreenshot(dirPath + filename);
        }
    },
    onComplete: function () {
        const reportError = new Error('Could not generate Allure report');
        const generation = allure(['generate', 'allure-results', '--clean']);

        return new Promise((resolve, reject) => {
            const generationTimeout = setTimeout(() => reject(reportError), 5000);
            generation.on('exit', function (exitCode) {
                clearTimeout(generationTimeout);

                if (exitCode !== 0) {
                    return reject(reportError);
                }
                console.log('Allure report successfully generated');
                resolve();
            });
        });
    },
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    },


};
