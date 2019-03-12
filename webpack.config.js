const path = require('path')
const glob = require('glob')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const resolve = path.resolve

const srcPath = resolve(__dirname, 'src')
const outputPath = resolve(__dirname, 'dist')

const delSuffix = c => c.replace('.page.ts', '')
const entries = glob.sync('**/*.page.ts', { cwd: srcPath })
  .reduce((a, c) => {
      const res = {}
      if (typeof a === 'string') {
        res[delSuffix(a)] = resolve(srcPath, a)
      } else {
        Object.assign(res, a)
      }
      res[delSuffix(c)] = resolve(srcPath, c)
      return res
  })

console.log('entries', entries)

module.exports = {
  entry: entries,
  output: {
filename: '[name]-[hash:8].js',
    path: outputPath,
  },
  devServer: {
    contentBase: outputPath,
  },
  resolve: {
    extensions: [ '.ts', '.tsx', '.js', '.jsx' ],
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader',
      },
    ] ,
  },
  plugins: [
    new HtmlWebpackPlugin({
      chunks: ['openrtc', 'webgl'],
      template: 'src/html/index.html',
    }),
  ],
}

