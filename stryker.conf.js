module.exports = function(config) {
  config.set({
    testRunner: 'jest',
    mutator: 'javascript',
    transpilers: ['babel'],
    reporter: ['html', 'clear-text', 'progress', 'dashboard'],
    coverageAnalysis: 'off',
    mutate: ['src/**/*.js'],
    babelrcFile: '.babelrc'
  })
}
