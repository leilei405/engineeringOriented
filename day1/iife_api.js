(function (global) {
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
  // function sum (a, b) {
  //   return a + b;
  // }

  // 设置x的值
  function setX (v) {
    x = v;
  }

  // 获取x的值
  function  getX () {
    return x;
  }

  // 暴露接口
  global.__Module_API = {
    handleData,
    setX,
    getX,
    api,
    x
  }
})(window)
