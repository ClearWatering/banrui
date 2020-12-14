/*
 * @Date: 2019-09-04 11:20:28
 * @LastEditors  : ZhengSL
 * @LastEditTime : 2020-02-11 14:07:29
 */
var webpack = require('webpack')
'use strict'
const path = require('path')
const utils = require('./utils')
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf')

// add by liujiang - To solve the ES6 problem in node_modules packages
let babelIncludePatchs = [], ps = [
  'axios',
  'img-vuer',
  // "mint-ui",
  'socket.io/',
  'socket.io-client/',
  'swiper',
  // "vue",
  'vue-amap',
  'vue-i18n',
  // "vue-lazyload",
  'vue-router',
  'vue-router-backward',
  // "vue-touch",
  'vue2-animate',
  'vuex',
  'vuex-persistedstate',
  'dom7']

ps.forEach(it => babelIncludePatchs.push(resolve('node_modules/' + it)))
// console.log('\n\npackage.dependencies:'+JSON.stringify(babelIncludePatchs))

// add by liujiang
const HtmlWebpackPlugin = require('html-webpack-plugin')
const control = require('../.control-version')
const targetPages = control.targetPages
const urlPrefix = control.urlPrefix

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

const createLintingRule = () => ({
  // test: /\.(js|vue)$/,
  // loader: 'eslint-loader',
  // enforce: 'pre',
  // include: [resolve('src'), resolve('test')],
  // options: {
  //   formatter: require('eslint-friendly-formatter'),
  //   emitWarning: !config.dev.showEslintErrorsInOverlay
  // }
})

// 自动生成entry和HtmlWebpackPlugin -- add by liujiang
let entries = utils.getEntry('../src/page/**/main.js', targetPages) // 自动获取entry， modified by liujiang

let plugins = []
for (let key in entries) {
  let filename = key + '.html'
  // 生产环境支持urlPrefix，给url加上前缀
  if (process.env.NODE_ENV === 'production') {
    filename = path.posix.join(urlPrefix, filename)
  }
  let hwpCfg = {
    filename: filename,
    template: 'index.html',
    inject: true,
    chunks: [key]
  }
  if (process.env.NODE_ENV === 'production') {
    hwpCfg.minify = {
      removeComments: true,
      collapseWhitespace: true,
      removeAttributeQuotes: true
      // more options:
      // https://github.com/kangax/html-minifier#options-quick-reference
    }
    // necessary to consistently work with multiple chunks via CommonsChunkPlugin
    hwpCfg.chunksSortMode = 'dependency'
    hwpCfg.chunks = [key, 'vendor', 'manifest']
  }

  plugins.push(new HtmlWebpackPlugin(hwpCfg))
}

let cfg = {
  context: path.resolve(__dirname, '../'),
  entry: entries, // 自动生成 -- add by liujiang
  // {
  //   mirror: './src/page/mirror/main.js',
  //   qrcode: './src/page/qrcode/main.js'
  // },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath : config.dev.assetsPublicPath
  },
  plugins: plugins, // 自动生成 -- add by liujiang
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      vue$: 'vue/dist/vue.esm.js',
      '@': resolve('src'),
      'scss_vars': '@/styles/vars.scss',
      'excel': path.resolve(__dirname, '../src/excel') // 增加订单导出 ---add by yinht
    }
  },
  module: {
    rules: [
      ...(config.dev.useEslint ? [createLintingRule()] : []),
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        query: {compact: false},
        include: [
          resolve('src'),
          resolve('test'),
          resolve('node_modules/webpack-dev-server/client'),
          resolve('.control-version'),
          ...babelIncludePatchs
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
}

module.exports = cfg
