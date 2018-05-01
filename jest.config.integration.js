module.exports = {
  moduleFileExtensions: ['js', 'json'],
  transform: {
    '^.+\\.js?$': 'babel-jest'
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  testMatch: ['<rootDir>/test/integration.spec.js'],
  notify: true
}
