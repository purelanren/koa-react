const defaultConfig = require('./default.config')

module.exports = Object.assign({}, defaultConfig, {
  env: 'develop',
  web: {
    host: 'localhost',
    port: '3000'
  }
})
