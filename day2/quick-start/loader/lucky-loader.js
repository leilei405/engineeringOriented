// s 匹配空字符
// S 匹配非空字符
const REG = /<script>([\s\S]+?)<\/script>/

module.exports = function (source) {
  console.log('源文件信息：', source);
  const result = source.match(REG);
  console.log('通过正则解析的结果：', result);
  return result && result[1] ? result[1] : source
}

// 判断当前模块是不是主模块 如果是主模块 就执行代码
// 主模块就是入口文件
// require.main 是一个指向当前模块的引用
// module 是一个指向当前模块的引用
// 用来对 loader 进行测试

// if (require.main === module) {
//   const source = `
//     <script>
//       console.log('hello world')
//     </script>
//   `
//   const result = source.match(REG);
//   console.log('通过正则解析的结果11：', result);
// }