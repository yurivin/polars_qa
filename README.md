##Install
- `npm install`
- `npm install -g protractor`
- `npm install -g webdriver-manager`
- `webdriver-manager update`
- `need to change metamask app-id in protractor capabilities and configs to your local, can be founded only after any spec is running`
`e2e/config_qa.data.json:5 - to change in config, should be changed in every config.data.json file
`
`
e2e/protractor_qa.conf.js:98 - to change in protractor config, only app id, should be changed in every protractor.conf.js file
`

##Run
`
protractor e2e/protractor_internal.conf.js --suite="internal"
`
`
protractor e2e/protractor_polygon_test.conf.js --suite="polygon_test"
`
`
protractor e2e/protractor_qa.conf.js --suite="qa"
`
##Run exact suit on exact env
`
protractor e2e/protractor_envName.conf.js --suite="suiteName"
`