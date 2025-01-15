import { REACT_ELEMENT } from '../constant';
import { Component } from './Component'
/**
 * 1. 处理key
 * 2. 处理props
 * 3. 处理children
 * @param {*} type
 * @param {*} config
 * @param {*} children
 */
function createElement(type, config, children) {
  let key = config.key || null;
  let ref = config.ref || null;
  ['key', 'ref', '__self', '__source'].forEach((item) => {
    if (item in config) {
      delete config[item];
    }
  })
  const props = { ...config };

  // 处理key和props
  for (const prop in config) {
    if (prop === 'key') {
      key = config[prop];
    } else {
      props[prop] = config[prop];
    }
  }

  // 处理children
  const len = arguments.length;
  if (len > 3) {
    props.children = Array.prototype.slice.call(arguments, 2);
  } else if (len === 3) {
    props.children =  children;
  }

  // 返回虚拟dom
  return {
    // 代表着这是React元素，也就是React框架中的虚拟DOM
    $$typeof: REACT_ELEMENT,
    // 虚拟DOM的元素类型，比如div、span、p等等
    type,
    key,
    ref,
    props,
  };
}

const React = {
  createElement,
  Component,
}
export default React;