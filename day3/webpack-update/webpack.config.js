const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  // 开发模式
  mode: 'development',

  // 开启source-map
  devtool: 'source-map',

  // 入口文件
  // entry: './src/index.js', // 单入口
  entry: {                    // 多入口
    index: './src/index.js',
    login: './src/login.js'
  },

  // 输出
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'js/[name].js',  // name 默认是main.js  hash 是每次编译生成一个新的文件
  },

  // 模块
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/i,
        type: 'asset',
        parser: {
          // 小于4kb的图片转base64位
          // 优点：减少请求数量  缺点：图片体积会更大
          dataUrlCondition: {
            maxSize: 8 * 1024
          }
        },
        generator: {
          // 输出图片名称
          // [hash:8] hash值取8位  [ext] 文件扩展名
          filename: 'images/[name].[hash:4][ext]'
        }
      }
    ]
  },

  plugins: [
    // 模版配置1
    new HtmlWebpackPlugin({
        filename: 'index.html', // 模版名称
        template: path.resolve(__dirname, './src/index.html'),   // 模版路径
        chunks: ['index'] // 引入的js文件
    }),

    // 模版配置2
    new HtmlWebpackPlugin({
      filename: 'login.html', // 模版名称
      template: path.resolve(__dirname, './src/login.html'),   // 模版路径
      chunks: ['login'] // 引入的js文件
    }),

    // 提供全局的jquery （映射）
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    }),

    // 拷贝文件
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, './src/img'),
          to: path.resolve(__dirname, './dist/img')
        }
      ]
    })
  ],

  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'), // 构建后的结果放在内存中
    },
    compress: true, // 是否启动压缩
    port: 8888, // 端口
    hot: true, // 是否热更新
  }
}