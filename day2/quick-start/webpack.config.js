const path = require('path');
const webpack = require('webpack');
const FooterPlugin = require('./plugin/FooterPlugin.js')

module.exports = {
  // 模式设置  development 开发模式  production 生产模式
  mode: 'development',
  devtool: 'source-map',
  // 入口文件
  entry: './src/index.js',
  // 输出配置
  output: {
      /* 打包后的文件存放的地方 使用path生成绝对路径 */
      /* 指向 webpack.config.js 当前的路径 */
      path: path.resolve(__dirname, 'dist'),
      /* 打包后输出文件的文件名 */
      filename: 'bundle.js'
  },
  // 模块
  module: {
    // loader 加载器 配置所有的loader
    rules: [
      {
        test: /\.css$/,
        // 匹配到的文件使用哪些loader去处理
        // 执行顺序 从右向左 从下到上
        // 1. css-loader 会将css文件解析成一个模块
        // 2. style-loader 会将css文件插入到页面中 style标签
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.lucky$/,
        use: [
          path.resolve(__dirname, './loader/lucky-loader.js')
        ]
      }
    ]
  },
  // 插件
  plugins: [
    new webpack.BannerPlugin({
      banner: '我学习 webpack 的第二天'
    }),
    new FooterPlugin({
      footer: '我是自定义插件'
    })
  ]
}