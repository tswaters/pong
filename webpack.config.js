/* eslint-env node */

const path = require('path')
const webpack = require('webpack')
const I18nPlugin = require('i18n-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const OfflinePlugin = require('offline-plugin')
const packageJson = require('./package.json')

const strings = require('./lang/strings')

module.exports = (env, argv) => {

  const isProd = argv.mode === 'production'

  const chunkhash = isProd ? '.[chunkhash]' : ''

  return {
    name: 'pong',
    devtool: isProd ? 'source-map' : 'eval-source-map',
    entry: {
      pong: './js/index.js'
    },
    target: 'web',
    output: {
      path: path.resolve('dist'),
      filename: `[name]${chunkhash}.js`
    },
    optimization: {
      minimizer: [
        new TerserPlugin({sourceMap: true}),
        new OptimizeCSSAssetsPlugin({})
      ]
    },
    resolve: {
      extensions: [
        '.webpack.js',
        '.web.js',
        '.js',
        '.scss'
      ]
    },
    module: {
      rules: [
        {
          test: /\.ejs$/,
          loader: 'ejs-loader'
        },
        {
          test: /\.scss$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader
            }, {
              loader: 'css-loader',
              options: {
                sourceMap: true,
                importLoaders: 1
              }
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true
              }
            }
          ]
        }
      ]
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        'process.env.VERSION': JSON.stringify(packageJson.version)
      }),
      new I18nPlugin(strings),
      new HtmlWebpackPlugin({
        template: './html/index.ejs',
        filename: './index.html',
        templateParameters: {
          version: packageJson.version
        },
        minify: {
          collapseWhitespace: isProd
        }
      }),
      new MiniCssExtractPlugin({
        filename: `[name]${chunkhash}.css`,
        chunkFilename: `[id]${chunkhash}.css`
      }),
      new OfflinePlugin({
        ServiceWorker: {
          minify: isProd,
          events: true
        }
      })
    ]
  }
}
