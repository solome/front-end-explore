const path = require('path')

const parse = require('./webpack/parse')
const rules = require('./webpack/rules')
const devServer = require('./webpack/dev-server')

const prod = process.env.NODE_ENV === 'production'
const resolve = path.resolve

const outputPath = resolve(__dirname, 'webgl')

const { entries, htmlPlugins } = parse(resolve(__dirname, 'src'))

module.exports = {
  entry: entries,
  output: {
    filename: '[name]-[hash:8].js',
    publicPath: prod ? '//solome.js.org/front-end-explore/webgl' : '',
    path: outputPath,
  },
  devServer: devServer(outputPath),
  resolve: {
    alias: {
      '@images': resolve(__dirname, 'src/resources/images'),
      '@three/controls': resolve(__dirname, 'src/threejs/controls'),
      '@three/libs': resolve(__dirname, 'src/threejs/libs'),
    },
    extensions: [ '.ts', '.tsx', '.js', '.jsx', '.png', '.jpg', '.gif' ],
  },
  devtool: 'source-map',
  module: { rules: rules() },
  plugins: [].concat(htmlPlugins),
  optimization: {
    splitChunks: {
      chunks: 'async',
      // chunks: (chunk) => {
      //   return chunk.name.indexOf('three') !== -1
      // },
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
        'react-vendor': {
          test: (module, chunks) => /react/.test(module.context),
          priority: 1,
        },
      },
    },
  },
  mode: process.env.NODE_ENV ||'development',
}

