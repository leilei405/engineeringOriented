const path = require('path');
const webpack = require('webpack');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
// const CopyWebpackPlugin = require('copy-webpack-plugin');
const PurgeCSSPlugin = require('purgecss-webpack-plugin').PurgeCSSPlugin;
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin');
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
const isDisabled = process.env.MEASURE === 'true';

const smp = new SpeedMeasurePlugin({
  disable: !isDisabled, // 是否禁用插件
  outputFormat: 'humanVerbose', // 输出格式 比较详细的输出
});

const PATHS = {
  src: path.join(__dirname, "src"),
};

module.exports = {
  publicPath: './',
  parallel: true,
  configureWebpack: smp.wrap({
    cache: {
      type: 'filesystem', // 使用文件系统进行缓存
      cacheDirectory: path.resolve(__dirname, './node_modules/.cache_temp'), // 缓存目录
    },
    resolve: {
      alias: {
        'src': path.resolve(__dirname, './src'),
        'assets': path.resolve(__dirname, './src/assets'),
        'components': path.resolve(__dirname, './src/components'),
      }
    },
    module: {
      rules: [
        {
          test: /\.(png|gif|jpe?g|sv g|webp)$/i,
          use: [
            {
              loader: 'image-webpack-loader',
              options: {
                mozjpeg: {
                  progressive: true,
                  quality: 65
                },
                optipng: {
                  enabled: false,
                },
                pngquant: {
                  quality: [0.65, 0.90],
                  speed: 4
                },
                gifsicle: {
                  interlaced: false,
                },
                webp: {
                  quality: 75
                }
              }
            }
          ]
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          include: path.resolve(__dirname, './src'),
          use: [
            {
              loader: 'thread-loader',
              options: {
                workers: 3, // 开启3个进程
                workerParallelJobs: 50, // 每个进程并行执行的工作数量
              }
            }
          ]
        }
      ]
    },
    plugins: [
      new BundleAnalyzerPlugin({
       analyzerMode: isDisabled ? 'server' : 'disabled',
      }),
      new webpack.DllReferencePlugin({
        manifest: path.resolve(__dirname, './dll/vue-manifest.json')
      }),
      // new CopyWebpackPlugin({
      //   patterns: [
      //     {
      //       from: path.resolve(__dirname, './dll/vue.dll.js'),
      //       to: path.resolve(__dirname, './dist/js/vue.dll.js'),
      //     }
      //   ]
      // }),
      new AddAssetHtmlWebpackPlugin({
        filepath: path.resolve(__dirname, './dll/vue.dll.js'),
      }),
      new PurgeCSSPlugin({
        paths: require('glob').sync(`${PATHS.src}/**/*}`, { nodir: true }),

      })
    ],
  })
}
