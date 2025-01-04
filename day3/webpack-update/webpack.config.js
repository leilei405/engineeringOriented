const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  // entry: './src/index.js',
  entry: {
    bundle: './src/index.js'
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    // name 默认是main.js  hash 是每次编译生成一个新的文件
    filename: 'js/[name].js'
  },
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
            maxSize: 4 * 1024
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
    new HtmlWebpackPlugin({
      filename: 'index.html', // 模版名称
      template: path.resolve(__dirname, './src/index.html') // 模版路径
    })
  ]
}