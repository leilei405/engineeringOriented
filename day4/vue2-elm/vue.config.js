const path = require('path');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');


const smp = new SpeedMeasurePlugin({
  disable: !(process.env.MEASURE === 'true'), // 是否禁用插件
  outputFormat: 'humanVerbose', // 输出格式 比较详细的输出
});

module.exports = {
  parallel: false,
  configureWebpack: smp.wrap({
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
        // analyzerMode: 'disabled', // 不启动展示打包报告的http服务器
        // analyzerMode: 'server', // 默认展示打开打包报告的http服务器
        // analyzerMode: 'static', // 生成打包报告文件 html
        // generateStatsFile: true, // 是否生成stats.json  文件
      }),
    ],
  })
}
