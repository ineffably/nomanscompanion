const config = {
  "collectCoverageFrom": [
    "**/src/**",
    "!**/node_modules/**"
  ],
  "transform": {
    "^.+\\.(ts|tsx)$": "ts-jest"
  }
}

module.exports = config;