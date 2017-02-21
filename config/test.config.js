const defaultConfig = require('./default.config')

module.exports = Object.assign({}, defaultConfig, {
  env: 'test',
  web: {
    host: 'localhost',
    port: '3000'
  }
})
