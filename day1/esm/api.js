import handle from './handle.js';

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

export {
  api,
  handle
}
