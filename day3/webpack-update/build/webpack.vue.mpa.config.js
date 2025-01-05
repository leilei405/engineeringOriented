const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");
const CssMinimizerWebpackPlugin = require("css-minimizer-webpack-plugin");
const VueLoaderPlugin = require('vue-loader/lib/plugin');

const config = {
  mode: 'development',

  entry: {
    home: path.resolve(__dirname, '../src/map/home.js'),
    login: path.resolve(__dirname, '../src/map/login.js'),
  },

  output: {
    filename: 'js/[name].js',
    path: path.resolve(__dirname, '../dist')
  },

  devServer: {
    static: {
      directory: path.resolve(__dirname, '../dist'), // 构建后的结果放在内存中
    },
    port: 8000,
    open: true,
    hot: true
  },

  optimization: {
    minimize: true,
    minimizer: [
      new TerserWebpackPlugin(),
      new CssMinimizerWebpackPlugin()
    ],
    splitChunks: {
      minSize: 500 * 1024,
      chunks: 'all',
      name: 'common'
    }
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/i,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 8 * 1024
          }
        },
        generator: {
          filename: 'images/[name].[hash:4][ext]'
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      }
    ]
  },

  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: 'home.html',
      template: path.resolve(__dirname, '../public/index.html'),
      chunks: ['home']
    }),
    new HtmlWebpackPlugin({
      filename: 'login.html',
      template: path.resolve(__dirname, '../public/index.html'),
      chunks: ['login']
    }),
    new CopyWebpackPlugin({
      patterns: [{
        from: path.resolve(__dirname, '../src/img'),
        to: path.resolve(__dirname, '../dist/img')
      }]
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
      chunkFilename: 'css/[name].chunk.css'
    }),
    new VueLoaderPlugin()
  ],
}

module.exports = config