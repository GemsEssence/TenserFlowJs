module.exports = {
  preset: 'react-native',
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?react-native|@react-native|@react-navigation)',
  ],
  testPathIgnorePatterns: [
    '/node_modules/',
    '/e2e/appium/', // ✅ This prevents Jest from running Appium specs
    '<rootDir>/src/components/Counter.test.js'
  ],
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{js,jsx}',
    '!src/**/*.test.{js,jsx}',
    '!**/node_modules/**',
    '!**/vendor/**'
  ],
  coverageReporters: ['html', 'text-summary']
};


// module.exports = {
//   preset: 'react-native',
//   setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
//   moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
//   transformIgnorePatterns: [
//     'node_modules/(?!(jest-)?react-native|@react-native|@react-navigation)',
//   ],
//   collectCoverage: true,
//   collectCoverageFrom: [
//     'src/**/*.{js,jsx}',
//     '!src/**/*.test.{js,jsx}',
//     '!**/node_modules/**',
//     '!**/vendor/**'
//   ],
//   coverageReporters: ['html', 'text-summary']
// };

