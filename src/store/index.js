if (global.ENV_PRODUCTION) {
  module.exports = require('./configureStore.dev')
} else {
  module.exports = require('./configureStore.prod')
}
