const path = require('path')
const webpack = require('webpack')

const dllPath = '../dll'

module.exports = {
  mode: 'production',
  entry: {
    vue: ['vue', 'vue-router', 'vuex'], // vue 全家桶进行打包
    scroll: ['better-scroll'] // 第三方库进行打包
  },
  output: {
    path: path.join(__dirname, dllPath),
    filename: '[name].dll.js',
    library: '[name]_[hash]'
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.join(__dirname, dllPath, '[name]-manifest.json'),
      name: '[name]_[hash]',
      context: process.cwd()
    })
  ]
}
