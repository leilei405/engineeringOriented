const path = require("node:path");

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
  cache: true
}