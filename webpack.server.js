const path = require('path')
const fs = require('fs')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const autoprefixer = require('autoprefixer')

const nodeModules = {}
fs.readdirSync('node_modules').filter(x => ['.bin'].indexOf(x) === -1).forEach(mod => {
  nodeModules[mod] = `commonjs ${mod}`
})

module.exports = {

  target: 'node',

  entry: {
    bundle: path.resolve(__dirname, './server/server.js')
  },

  output: {
    path: path.resolve(__dirname, './build'),
    publicPath: '/',
    filename: 'server.js'
  },

  plugins: [
    new webpack.DefinePlugin({
      ENV_PRODUCTION: true,
    }),
    new ExtractTextPlugin('css/[name].css')
  ],

  module: {
    loaders: [
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style', 'css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss!sass')
      },
      {
        test: /\.jsx?$/,
        loader: 'babel',
        exclude: /node_modules/
      },
      {
        test: /\.(jpg|png|gif|svg)$/,
        loader: 'url?limit=8192&name=img/[name].[hash:7].[ext]',
        exclude: /node_modules/
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url?limit=8192&name=font/[name].[hash:7].[ext]',
        exclude: /node_modules/
      }
    ]
  },

  postcss() {
    return [autoprefixer]
  },

  resolve: {
    extensions: ['', '.js', '.jsx'],
    fallback: [path.join(__dirname, '../node_modules')],
    alias: {
      src: path.resolve(__dirname, '../src'),
      common: path.resolve(__dirname, '../src/common'),
      containers: path.resolve(__dirname, '../src/containers'),
      components: path.resolve(__dirname, '../src/components')
    }
  },

  externals: nodeModules,

  node: {
    __dirname: true
  }
}
