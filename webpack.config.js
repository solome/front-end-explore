const fs = require('fs')
const path = require('path')
const glob = require('glob')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const prod = process.env.NODE_ENV === 'production'
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
  const html = resolve(srcPath, name + '.html')
  htmls.push(new HtmlWebpackPlugin({ filename: name + '.html', chunks: [name], template: accessible(html) ? html : 'src/html/index.html' }))
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

console.log('entries', entries)

module.exports = {
  entry: entries,
  output: {
    filename: '[name]-[hash:8].js',
    publicPath: prod ? '//solome.js.org/front-end-explore/webgl' : '',
    path: outputPath,
  },
  devServer: {
    contentBase: outputPath,
    compress: true,
    inline: true,
    port: '8081',
    allowedHosts: [
      '.tecnet.me',
      '.js.org',
    ]
  },
  resolve: {
    alias: {
      '@images': resolve(__dirname, 'src/resources/images'),
      '@three/controls': resolve(__dirname, 'src/threejs/controls'),
      '@three/libs': resolve(__dirname, 'src/threejs/libs'),
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
            outputPath: '/resources/images',
          },
        }],
      },
    ],
  },
  plugins: htmls,
  mode: process.env.NODE_ENV ||'development',
}

