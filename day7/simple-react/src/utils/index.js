// 文本节点转换为虚拟 DOM 对象
import { REACT_TEXT_ELEMENT } from '../constant'

export const toVNode = (node) => {
  if (typeof node === 'number' || typeof node === 'string') {
    return {
      type: REACT_TEXT_ELEMENT,
      props: {
        text: node,
        children: []
      }
    }
  } else {
    return node;
  }
}

export const deepClone = (data) => {
  let type = getType(data);
  let resultValue;
  if (type !== 'object' && type !== 'array') return data;

  if (type === 'array') {
    resultValue = [];
    data.forEach((item) => {
      resultValue.push(deepClone(item));
    });
    return resultValue;
  }

  if (type === 'object') {
    resultValue = {};
    for (let key in data) {
      if (!data.hasOwnProperty(key)) continue;
      resultValue[key] = deepClone(data[key]);
    }
    return resultValue;
  }
}

export const getType = (obj) => {
  let typeMap = {
    '[object Boolean]': 'boolean',
    '[object Number]': 'number',
    '[object String]': 'string',
    '[object Function]': 'function',
    '[object Array]': 'array',
    '[object Date]': 'date',
    '[object RegExp]': 'regExp',
    '[object Undefined]': 'undefined',
    '[object Null]': 'null',
    '[object Object]': 'object'
  }
  return typeMap[Object.prototype.toString.call(obj)];
}

export const shallowEqual = (obj1, obj2) => {
  if (obj1 === obj2) return true;
  if (getType(obj1) !== 'object' || getType(obj2) !== 'object') return false;
  let keys1 = Object.keys(obj1);
  let keys2 = Object.keys(obj2);
  if (keys1.length !== keys2.length) return false;
  for (let key in obj1) {
    if (!obj2.hasOwnProperty(key)) return false;
    if (obj1[key]!== obj2[key]) return false;
  }
  return true;
}