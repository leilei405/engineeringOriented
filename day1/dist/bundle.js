(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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
},{"./handle":3}],2:[function(require,module,exports){
const { handle, api } = require('./api.js');
const sum = require('./sum.js');

const data  = api();
const a = handle(data, 'a');
const b = handle(data, 'b');
const sum1 = sum(a, b);
console.log(sum1, '===sum===')
},{"./api.js":1,"./sum.js":4}],3:[function(require,module,exports){
// 处理后端接口
function handleData (data, key) {
  if (data.code === 0) {
    return data.data[key]
  }
}

module.exports = handleData;
},{}],4:[function(require,module,exports){
// 数据运算
function sum (a, b) {
  return a + b;
}

module.exports = sum;
},{}]},{},[2]);
