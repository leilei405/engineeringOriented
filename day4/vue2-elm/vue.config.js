const path = require('path');
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
    }
  })
}
