(function () {
  var x =1;

  // 调用后端接口
  function api () {
    return {
      code: 0,
      data: {
        a: 1,
        b: 2,
      }
    }
  }

  // 处理后端接口
  function handleData (data, key) {
    if (data.code === 0) {
      return data.data[key]
    }
  }

  // 数据运算
  function sum (a, b) {
    return a + b;
  }

  // 设置x的值
  function setX (v) {
    x = v;
  }

  // 获取x的值
  function  getX () {
    return x;
  }

  // 暴露接口
  window.__Module = {
    handleData,
    sum,
    setX,
    getX,
    api,
    x
  }
})()

const data = window.__Module;
const api = data.api()
const a = data.handleData(api, 'a')
const b = data.handleData(api, 'b')
const sum = data.sum(a, b)
console.log(sum, '==sum==')

console.log(data.x, '===set data.x===')
data.x = 100;
// 为什么 data.x 可以被赋值？
console.log(data.x, '===get data.x===')

// 函数作用域内变量和对象属性的区别，CommonJS中也有类似问题
// data.x !== data.getX()
// data === window.__Module.x 挂了一个x
console.log(data.getX(), '===get data.getX()===')
data.setX(200)
console.log(data.getX(), '===get data.getX()===')