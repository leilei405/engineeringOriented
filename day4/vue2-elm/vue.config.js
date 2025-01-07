const path = require('path');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');


const smp = new SpeedMeasurePlugin({
  disable: !(process.env.MEASURE === 'true'), // 是否禁用插件
  outputFormat: 'humanVerbose', // 输出格式 比较详细的输出
});

module.exports = {
  configureWebpack: smp.wrap({
    resolve: {
      alias: {
        'src': path.resolve(__dirname, './src'),
        'assets': path.resolve(__dirname, './src/assets'),
        'components': path.resolve(__dirname, './src/components'),
      }
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
