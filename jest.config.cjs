module.exports = {
  transform: {
    '^.+\\.m?jsx?$': 'babel-jest',
  },
  testEnvironment: 'node',
  testMatch: ['**/src/tests/**/*.*[jt]s?(x)', '**/?(*.)+(spec|test).[tj]s?(x)'],
  testPathIgnorePatterns: ['/node_modules/'],
};
