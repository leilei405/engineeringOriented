(function (global, api) {

  // 数据运算
  function sum (a, b) {
    return a + b;
  }

  // 暴露接口
  global.__Module = {
    api,
    sum,
  }
})(window, window.__Module_API)

const data = window.__Module;
console.log(data, '===data===')