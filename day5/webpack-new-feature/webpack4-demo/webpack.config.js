const path = require("node:path");
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');

module.exports = {
  mode: 'development', // production  development
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js'
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      minSize: 1024,
      name: 'common',
    },
  },
  cache: true,
  plugins: [
    new HardSourceWebpackPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.(jpg|gif|jpeg|png|svg)$/,
        use: {
          loader: 'url-loader',
          options: {
            name: '[name][hash:5].[ext]',
            limit: 1024 * 300, // 300kb 以下的图片转base64
            outputPath: 'images'
          }
        }
      }
    ]
  }
}