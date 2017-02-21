const path = require('path')
const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const open = require('open')
const webpackConfig = require('./dev.config')

// live
const server = new WebpackDevServer(webpack(webpackConfig), {
  contentBase: path.resolve(__dirname, '../dist'),
  hot: true,
  historyApiFallback: true,
  stats: {
    colors: true,
    chunks: false
  }
})

server.listen(3000, 'localhost', err => {
  if (err) {
    console.log(err)
    return
  }
  var url = `http://localhost:3000`
  console.log(`Listening at ${url}`)
  open(url)
})