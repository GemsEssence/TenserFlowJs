const path = require('path');

exports.config = {
  runner: 'local',
  specs: [
    path.resolve(__dirname, './specs/**/*.test.js'),
    path.resolve(__dirname, './specs/**/*.e2e.js')
  ],
  exclude: [
    path.resolve(__dirname, './specs/sample.test.js'),
    path.resolve(__dirname, './specs/counter.e2e.js'),
    // path.resolve(__dirname, '../specs/temp.test.js'),
    // path.resolve(__dirname, '../specs/experimental/'), // Entire folder
    // path.resolve(__dirname, '../specs/legacy/old.test.js'), // Specific file in another folder
  ],
  maxInstances: 1,
  capabilities: [
    {
      platformName: 'Android',
      'appium:platformVersion': '16',
      'appium:deviceName': 'Android Emulator',
      'appium:app': path.resolve(
        __dirname,
        '../../android/app/build/outputs/apk/debug/app-debug.apk',
      ),
      'appium:automationName': 'UiAutomator2',
      'appium:appWaitActivity': 'com.testingdemo.MainActivity',
      'appium:autoGrantPermissions': true,
      'appium:waitForIdleTimeout': 5000,
    },
  ],
  logLevel: 'info',
  framework: 'mocha',
  reporters: ['spec'],
  services: ['appium'],
  mochaOpts: {
    timeout: 60000,
  },
};

