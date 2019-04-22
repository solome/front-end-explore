const fs = require('fs')
const path = require('path')
const glob = require('glob')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const prod = process.NODE_ENV === 'production'
const resolve = path.resolve

const srcPath = resolve(__dirname, 'src')
const outputPath = resolve(__dirname, 'webgl')

const accessible = (f) => {
  try {
    fs.accessSync.apply(fs, f)
    return true
  } catch (e) {
    return false
  }
}

const htmls = []

const parse = c => {
  const name = c.replace('.page.ts', '')
  const h = resolve(srcPath, name + '.html')
  htmls.push(new HtmlWebpackPlugin({ filename: name + '.html', chunks: [name], template: accessible(h) ? h : 'src/html/index.html' }))
  const res = {}
  res[name] = resolve(srcPath, c)
  return res
}

const entries = glob.sync('**/*.page.ts', { cwd: srcPath })
  .reduce((a, c) => {
    const res = parse(c)
    Object.assign(res, typeof a === 'string' ? parse(a) : a)
    return res
  })


module.exports = {
  entry: entries,
  output: {
    filename: '[name]-[hash:8].js',
    publicPath: '',
    path: outputPath,
  },
  devServer: { contentBase: outputPath },
  resolve: {
    // root: path.resolve(__dirname),
    alias: {
      '@images': path.resolve(__dirname, 'src/resources/images'),
    },
    extensions: [ '.ts', '.tsx', '.js', '.jsx', '.png', '.jpg', '.gif' ],
  },
  devtool: 'source-map',
  module: {
    rules: [
      { test: /\.tsx?$/, loader: 'ts-loader' },
      {
        test: /\.(png|jpg|gif)$/,
        use: [{
          loader: 'url-loader',
          options: {
            fallback: 'file-loader', limit: 2048,
            name: '[name]-[hash:8].[ext]',
            outputPath: prod ? '//solome.js.org/front-end-explore/webgl' : '/resources/images',
          },
        }],
      },
    ],
  },
  plugins: htmls,
  mode: process.env.NODE_ENV ||'development',
}

