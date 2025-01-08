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
  cache: {      
    // type: 'memory',
    type: 'filesystem',
    cacheDirectory: path.join(__dirname, 'node_modules', '.temp_cache'),
  },
  module: {
    rules: [
      {
        test: /\.(jpg|gif|jpeg|png|svg)$/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 1024 * 200,
          }
        },
        generator: {
          filename: 'images/[name][hash:5][ext]'
        }
      }
    ]
  },
  experiments: {
    buildHttp: {
      allowedUris: [], // 允许访问的域名
      allowedPaths: [], // 允许访问的路径
      allowedSchemes: ['https'],// 允许访问的协议
      frozen: false, // 冻结
    }
  }
}