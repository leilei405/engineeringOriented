import {REACT_ELEMENT, REACT_FORWARD_REF, REACT_TEXT_ELEMENT} from "../constant";
import { toVNode } from '../utils';
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
    // if (typeof children[i] === 'string') {
    //   containerDOM.appendChild(document.createTextNode(children[i]));
    // } else {
    //   mount(children[i], containerDOM);
    // }
    children[i].index = i;
    mount(children[i], containerDOM);
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
  // console.log(type.IS_CLASS_COMPONENT, 'type')
  let dom;
  // 处理 forwardRef
  if (typeof type === 'object' && type.$$typeof === REACT_FORWARD_REF) {
    return getDOMFromForwardRefComponent(VNode);
  }

  // 处理类组件逻辑
  if (typeof type === 'function' && VNode.$$typeof === REACT_ELEMENT && type.IS_CLASS_COMPONENT) {
    return getDOMFromClassComponent(VNode);
  }

  // 处理函数组件逻辑
  if (typeof type === 'function' && VNode.$$typeof === REACT_ELEMENT) {
    return getDOMFromFunctionComponent(VNode);
  }

  // 处理文本节点
  if (type === REACT_TEXT_ELEMENT) {
    dom = document.createTextNode(props.text);
  } else if (type && VNode.$$typeof === REACT_ELEMENT) {
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
  VNode.dom = dom; // 将虚拟 DOM 保存到真实 DOM 上
  ref && (ref.current = dom); // 原生 DOM 保存 ref 引用
  return dom;
}

// 获取函数组件的 DOM 判断传入的是不是一个函数组件
function getDOMFromFunctionComponent (VNode) {
  const { type, props } = VNode; // VNode 虚拟 DOM
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

  // 测试更新 Count 数据  测试代码
  setTimeout(() => {
    classComponent.setState({
      count: 'test update'
    })
  }, 1000)

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

export function updateDomTree (oldVNode, newVNode, oldDOM) {
  // 第一版：直接替换
  // let parentNode = oldDOM.parentNode;
  // parentNode.removeChild(oldDOM);
  // parentNode.appendChild(createDOM(newVNode));

  // 第二版：比较新旧虚拟 DOM 差异
  const typeMap = {
    NO_OPERATE: !oldVNode && !newVNode, // 新节点，旧节点 都不存在
    INSERT: !oldVNode && newVNode, // 新节点存在，旧节点不存在
    REMOVE: oldVNode && !newVNode, // 新节点不存在，旧节点存在
    REPLACE: oldVNode && newVNode && oldVNode.type !== newVNode.type, // 新节点和旧节点都存在 但是类型不同
  }
  let UPDATE_TYPE = Object.keys(typeMap).find((key) => typeMap[key])[0]; // 第一个满足条件的
  switch (UPDATE_TYPE) {
    case 'NO_OPERATE':
      break;
    case 'REMOVE':
      removeNode(oldVNode);
      break;
    case 'INSERT':
      oldDOM.parentNode.appendChild(createDOM(newVNode));
      break;
    case 'REPLACE':
      removeNode(oldVNode);
      oldDOM.parentNode.appendChild(createDOM(newVNode));
      break;
      default:
        deepDOMDiff(oldVNode, newVNode); // 新节点和旧节点都存在 类型相同 --->>>> diff 算法 复用相关节点
        break;
  }

}

function removeNode (VNode) {
  const currentDOM = findDomByVNode(VNode);
  currentDOM && currentDOM.remove();
}

function deepDOMDiff (oldVNode, newVNode) {
  const diffTypeMap = {
    ORIGIN_NODE: typeof oldVNode.type === 'string', // 原生节点
    CLASS_COMPONENT: typeof oldVNode.type ==='function' && oldVNode.type.IS_CLASS_COMPONENT, // 类组件
    FUNCTION_COMPONENT: typeof oldVNode.type ==='function', // 函数组件
    TEXT_NODE: oldVNode.type === REACT_TEXT_ELEMENT, // 文本节点
  }
  let DIFF_TYPE = Object.keys(diffTypeMap).find((key) => diffTypeMap[key])[0]; // 第一个满足条件的
  switch (DIFF_TYPE) {
    case 'ORIGIN_NODE':
      let currentDOM = newVNode.dom =  findDomByVNode(oldVNode);
      setPropsForDOM(currentDOM, newVNode.props);
      updateChildren(currentDOM, oldVNode.props.children, newVNode.props.children);
      break;
    case 'CLASS_COMPONENT':
      updateClassComponent(oldVNode, newVNode);
      break;
    case 'FUNCTION_COMPONENT':
      updateFunctionComponent(oldVNode, newVNode);
      break;
    case 'TEXT_NODE':
      updateTextNode(oldVNode, newVNode);
      break;
      default:
        break;
  }
}

// 更新函数组件
function updateFunctionComponent(oldVNode, newVNode) {
  let oldDOM = findDomByVNode(oldVNode);
  if (!oldDOM) return;
  const { type, props } = newVNode;
  let newRenderVNode = type(props);
  updateDomTree(oldVNode.oldRenderVNode, newRenderVNode, oldDOM)
  newVNode.oldRenderVNode = newRenderVNode;
  // const oldFunctionComponent = oldVNode;
  // const newFunctionComponent = newVNode;
  // if (oldFunctionComponent.type === newFunctionComponent.type) {
  //   // 复用老的函数组件
  //   newFunctionComponent.component = oldFunctionComponent.component;
  //   newFunctionComponent.component.oldVNode = newFunctionComponent;
  //   newFunctionComponent.component.updateComponent();
  // } else {
  //   // 直接替换老的函数组件
  //   const newFunctionComponentInstance = new newFunctionComponent.type(newFunctionComponent.props);
  //   newFunctionComponentInstance.oldVNode = newFunctionComponent;
  //   newFunctionComponent.component = newFunctionComponentInstance;
  //   newFunctionComponentInstance.updateComponent();
  // }
}

// 更新类组件
function updateClassComponent(oldVNode, newVNode) {
  const classInstance = newVNode.classInstance = oldVNode.classInstance;
  classInstance.updater.launchUpdate();
  // const oldClassComponent = oldVNode;
  // const newClassComponent = newVNode;
  // if (oldClassComponent.type === newClassComponent.type) {
  //   // 复用老的类组件
  //   newClassComponent.component = oldClassComponent.component;
  //   newClassComponent.component.oldVNode = newClassComponent;
  //   newClassComponent.component.updateComponent();
  // } else {
  //   // 直接替换老的类组件
  //   const newClassComponentInstance = new newClassComponent.type(newClassComponent.props);
  //   newClassComponentInstance.oldVNode = newClassComponent;
  //   newClassComponent.component = newClassComponentInstance;
  //   newClassComponentInstance.updateComponent();
  // }
}

// 更新文本节点
function updateTextNode(oldVNode, newVNode) {
  const currentDOM = newVNode.dom = findDomByVNode(oldVNode);
  currentDOM.textContent = newVNode.props.text;
}

// DOM DIFF算法的核心
function updateChildren() {

}

// 导出 render
const ReactDOM = {
    render,
};

export default ReactDOM;