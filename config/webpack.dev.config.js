/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')
const { merge } = require('webpack-merge');

const webpackConfigBase = require('./webpack.base.config');

const webpackConfigDev = {
  mode: 'development',
  devtool: 'source-map',
  entry: {
    app: [path.join(__dirname, '../src', 'index.tsx')],
  },
  output: {
    filename: 'static/js/bundle.js',
    path: path.resolve(__dirname, '../build'),
    publicPath: '/',
  },
  devServer: {
    contentBase: path.join(__dirname, '../build'),
    compress: true,
    host: '0.0.0.0',
    port: 4000,
    hot: true,
    historyApiFallback: true, // router history 模式下需要
    proxy: {
      '/api/third': 'http://192.168.10.61:9000',
      '/api': 'http://192.168.10.61:39010',
    },
  },
}

const baseConfig = webpackConfigBase('development')

module.exports = merge(baseConfig, webpackConfigDev)
