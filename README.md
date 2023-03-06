##Install
- `npm install`
- `npm install -g protractor`
- `npm install -g webdriver-manager`
- `webdriver-manager update`

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