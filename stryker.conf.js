module.exports = function(config) {
  config.set({
    testRunner: "jest",
    mutator: "javascript",
    transpilers: ["babel"],
    reporter: ["html", "clear-text", "progress"],
    coverageAnalysis: "off",
    mutate: ["src/**/*.js"],
    babelrcFile: ".babelrc"
  });
};
