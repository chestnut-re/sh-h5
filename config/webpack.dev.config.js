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
  },
}

const proxyMap ={
  'test': {
    proxy: {
      '/api': 'https://testapi.mountainseas.cn',
      '/napi': {
        target: 'https://napi.mountainseas.cn',
        changeOrigin: true,
      },
    },
  },
  'development': {
    proxy: {
      '/api': 'https://devapi.mountainseas.cn',
      '/napi': {
        target: 'https://napi.mountainseas.cn',
        changeOrigin: true,
      },
    },
  },
  'production': {
    proxy: {
      '/api': 'https://prodapi.mountainseas.cn',
      '/napi': {
        target: 'https://napi.mountainseas.cn',
        changeOrigin: true,
      },
    },
  }
}

webpackConfigDev.devServer['proxy'] = proxyMap[process.env.BACKEND_ENV].proxy

const baseConfig = webpackConfigBase('development')

module.exports = merge(baseConfig, webpackConfigDev)
