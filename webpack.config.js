const debug = process.env.NODE_ENV !== 'production'
const Dotenv = require('dotenv-webpack');
const path = require('path')
const webpack = require('webpack')

module.exports = () => {
  return {
    devtool: debug ? 'inline-sourcemap' : null,
    entry: ['whatwg-fetch', './src/js/client.js'],
    module: {
      loaders: [
        {
          test: /\.js?$/,
          exclude: '/(node_modules|bower_components)/',
          loader: 'babel-loader',
          query: {
            presets: ['react', 'env', 'stage-0'],
            plugins: ['react-html-attrs', 'transform-class-properties', 'transform-decorators-legacy']
          }
        }
      ]
    },
    output: {
      path: path.resolve(__dirname, 'build'),
      filename: 'build.js'
    },
    plugins: debug ? [] : [
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.optimize.UglifyJsPlugin({mangle: false, sourcemap: false}),
      new Dotenv()
    ]
  }
};