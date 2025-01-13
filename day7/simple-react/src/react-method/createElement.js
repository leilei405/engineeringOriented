import { REACT_ELEMENT } from '../constant';
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
    $$typeof: REACT_ELEMENT,
    type,
    key,
    props,
  };
}

const React = {
  createElement,
}
export default React;