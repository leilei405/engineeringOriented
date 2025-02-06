import { REACT_ELEMENT_TYPE } from "shared/ReactSymbols";
import hasOwnProperty from "shared/hasOwnProperty";

const RESERVED_PROPS = {
  key: true,
  ref: true,
  __self: true,
  __source: true,
}

export function jsxDEV(type, config, maybeKey) {
  let propName;
  let props = {};
  let key = null;
  let ref = null;

  // 如果maybeKey参数存在，将其赋值给key
  if (typeof maybeKey !== 'undefined') {
    key = maybeKey;
  }

  if (hasValidKey(config)) {
    key = '' + config.key;
  }

  // 如果config对象中有ref属性，将其赋值给ref
  if (hasValidRef(config)) {
    ref = config.ref;
  }

  // 遍历config对象，将非保留属性添加到props对象中
  for (propName in config) {
    if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
      props[propName] = config[propName];
    }
  }

  return ReactElement(type, key, ref, props)
}

export function ReactElement(type, key, ref, props) {
  return {
    $$typeof: REACT_ELEMENT_TYPE,
    type,
    key,
    ref,
    props,
  }
}

const hasValidKey = (config) => {
  return config.key !== undefined;
}

const hasValidRef = (config) => {
  return config.ref!== undefined;
}