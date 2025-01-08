const path = require("node:path");
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');

module.exports = {
  mode: 'production', // production  development
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
  ]
}