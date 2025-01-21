import {REACT_ELEMENT, REACT_FORWARD_REF } from "../constant";
import {addEvent} from "./event";

/**
 * 渲染 React 元素
 * @param VNode 虚拟 DOM
 * @param containerDOM 真实 DOM 容器
 */
function render(VNode, containerDOM) {
    // 将虚拟 DOM 渲染成真实 DOM
    // 将得到的真实 containerDOM 插入到容器中
    mount(VNode, containerDOM);
}

/**
 * 挂载虚拟 DOM
 * @param VNode
 * @param containerDOM
 */
function mount(VNode, containerDOM) {
  let newDOM = createDOM(VNode);
  newDOM && containerDOM.appendChild(newDOM);
}

/**
 * 挂载子节点
 * @param children 子节点
 * @param containerDOM 父节点
 */
function mountArray (children, containerDOM) {
  if (!Array.isArray(children) || children.length === 0) return;
  for (let i = 0; i < children.length; i++) {
    if (typeof children[i] === 'string') {
      containerDOM.appendChild(document.createTextNode(children[i]));
    } else {
      mount(children[i], containerDOM);
    }
  }
}

/**
 * 设置属性值
 * @param dom 真实 DOM
 * @param VNodeProps 属性
 */
function setPropsForDOM (dom, VNodeProps) {
  if (!dom) return;
  for (let key in VNodeProps) {
    if (key === 'children') continue;
    // 处理样式
    if (key === 'style') {
      let styleObj = VNodeProps[key];
      Object.keys(styleObj).forEach((item) => {
        dom.style[item] = VNodeProps[key][item];
      })
    } else if (/^on[A-Z].*/.test(key)) {
      addEvent(dom, key.toLowerCase(), VNodeProps[key])
    } else {
      dom[key] = VNodeProps[key];
    }
  }
}

// 创建虚拟 DOM
function createDOM (VNode) {
  // 1. 创建元素
  // 2. 处理子元素
  // 3. 根据虚拟 DOM 的类型创建真实 DOM
  const { type, props, ref } = VNode;
  let dom;
  // 处理 forwardRef
  if (typeof type === 'object' && type.$$typeof === REACT_FORWARD_REF) {
    return getDOMFromForwardRefComponent(VNode);
  }

  // 处理类组件逻辑
  if (typeof type === 'function' && type.IS_CLASS_COMPONENT && VNode.$$typeof === REACT_ELEMENT) {
    return getDOMFromClassComponent(VNode);
  }

  // 处理函数组件逻辑
  if (typeof type === 'function' && VNode.$$typeof === REACT_ELEMENT) {
    return getDOMFromFunctionComponent(VNode);
  }

  // 普通的 DOM 节点
  if (type && VNode.$$typeof === REACT_ELEMENT) {
    dom = document.createElement(type);
  }

  if (props) {
    if (typeof props.children === 'object' && props.children.type) {
      mount(props.children, dom);
    } else if (Array.isArray(props.children)) {
      mountArray(props.children, dom);
    } else if (typeof props.children === 'string') {
      dom.appendChild(document.createTextNode(props.children));
    }
  }

  setPropsForDOM(dom, props);
  // 将虚拟 DOM 保存到真实 DOM 上
  VNode.dom = dom;
  ref && (ref.current = dom); // 原生 DOM 保存 ref 引用
  return dom;
}

// 获取函数组件的 DOM 判断传入的是不是一个函数组件
function getDOMFromFunctionComponent (VNode) {
  const { type, props } = VNode;
  const renderVNode = type(props);
  if (!renderVNode) return null;
  return createDOM(renderVNode);
}

// 获取类组件的 DOM 判断传入的是不是一个类组件
function getDOMFromClassComponent (VNode) {
  const { type, props, ref } = VNode;
  const classComponent = new type(props);
  ref && (ref.current = classComponent); // 类组件保存 ref 引用  classComponent 实例
  const renderVNode = classComponent.render();
  classComponent.oldVNode = renderVNode;
  if (!renderVNode) return null;
  return createDOM(renderVNode);
}

// 获取 forwardRef 组件的 DOM
function getDOMFromForwardRefComponent (VNode) {
  const { type, props, ref } = VNode;
  const renderVNode = type.render(props, ref);
  if (!renderVNode) return null;
  return createDOM(renderVNode);
}

export function findDomByVNode (VNode) {
  if (!VNode) return;
  if (VNode.dom) return VNode.dom;
}

export function updateDomTree (oldDOM, newVNode) {
  // if (!oldDOM || !newVNode) return;
  let parentNode = oldDOM.parentNode;
  parentNode.removeChild(oldDOM);
  parentNode.appendChild(createDOM(newVNode));
}

// 导出 render
const ReactDOM = {
    render,
};

export default ReactDOM;