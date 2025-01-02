const handle = require('./handle');

// 调用后端接口
function api () {
  return {
    code: 0,
    data: {
      a: 4,
      b: 2,
    }
  }
}

module.exports = {
  api,
  handle
};