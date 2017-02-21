switch (process.env.NODE_ENV) {
  case 'test':
    module.exports = require('./test.config')
    break

  case 'prod':
  case 'production':
    module.exports = require('./prod.config')
    break

  default:
    module.exports = require('./dev.config')
}
