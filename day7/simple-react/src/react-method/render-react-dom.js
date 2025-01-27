import {REACT_ELEMENT, REACT_FORWARD_REF, REACT_TEXT_ELEMENT, MOVE, CREATE } from "../constant";
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
 * 处理 props 属性值
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
      // dom: DOM --> 原生 DOM
      // key.toLowerCase(): onClick --> onclick
      // VNodeProps[key]: --> 事件处理函数
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
  // 处理 函数组件 forwardRef
  if (type && typeof type === 'object' && type.$$typeof === REACT_FORWARD_REF) {
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
  const instance = new type(props);
  ref && (ref.current = instance); // 类组件保存 ref 引用  classComponent 实例
  const renderVNode = instance.render();
  instance.oldVNode = renderVNode;

  // 测试更新 Count 数据  测试代码  方便调试
  // setTimeout(() => {
  //   instance.setState({
  //     count: 'test update'
  //   })
  // }, 1000)
  if (!renderVNode) return null;
  if (instance.componentDidMount) {
    instance.componentDidMount();
  }
  return createDOM(renderVNode);
}

// 获取 forwardRef 组件的 DOM
function getDOMFromForwardRefComponent (VNode) {
  const { type, props, ref } = VNode;
  const renderVNode = type.render(props, ref);
  if (!renderVNode) return null;
  return createDOM(renderVNode);
}

// 根据虚拟 DOM 找到真实 DOM
export function findDomByVNode (VNode) {
  if (!VNode) return;
  if (VNode.dom) return VNode.dom;
}

// 更新 DOM 树
export function updateDomTree (oldVNode, newVNode, oldDOM) {
  // 第一版 1. 旧的节点oldNode从父节点移除掉 2. 然后再根据 新的虚拟dom newNode 创建真实Dom 追加到父节点中
  // 缺点:  比较耗费性能
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

  let UPDATE_TYPE = Object.keys(typeMap).filter((key) => typeMap[key])[0]; // 第一个满足条件的

  switch (UPDATE_TYPE) {
    case 'NO_OPERATE':
      break;
    case 'REMOVE':
      removeNode(oldVNode); // 移除的是虚拟 dom 后面的真实节点
      break;
    case 'INSERT':
      oldDOM.parentNode.appendChild(createDOM(newVNode)); // 根据新的虚拟 dom 创建真实 dom 节点
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

// 删除节点
function removeNode (VNode) {
  const currentDOM = findDomByVNode(VNode);
  currentDOM && currentDOM.remove();
}

// 深度 DOM 差异
function deepDOMDiff (oldVNode, newVNode) {
  let diffTypeMap = {
    ORIGIN_NODE: typeof oldVNode.type === 'string', // 原生节点
    CLASS_COMPONENT: typeof oldVNode.type ==='function' && oldVNode.type.IS_CLASS_COMPONENT, // 类组件
    FUNCTION_COMPONENT: typeof oldVNode.type ==='function', // 函数组件
    TEXT_NODE: oldVNode.type === REACT_TEXT_ELEMENT, // 文本节点
  }

  let DIFF_TYPE = Object.keys(diffTypeMap).filter((key) => diffTypeMap[key])[0]; // 第一个满足条件的

  switch (DIFF_TYPE) {
    case 'ORIGIN_NODE':
      let currentDOM = newVNode.dom = findDomByVNode(oldVNode);
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
      newVNode.dom = findDomByVNode(oldVNode);
      newVNode.dom.textContent = newVNode.props.text;
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
}

// 更新类组件
function updateClassComponent(oldVNode, newVNode) {
  const classInstance = newVNode.classInstance = oldVNode.classInstance;
  classInstance.updater.launchUpdate();
}

// DOM DIFF算法的核心
function updateChildren(parentDOM, oldVNodeChildren, newVNodeChildren) {
  // .filter(Boolean) 过滤掉空值
  oldVNodeChildren = (Array.isArray(oldVNodeChildren) ? oldVNodeChildren : [oldVNodeChildren]).filter(Boolean);
  newVNodeChildren = (Array.isArray(newVNodeChildren)? newVNodeChildren : [newVNodeChildren]).filter(Boolean);

  let lastNotChangedIndex = -1; // 最后一个没有变化的索引
  let oldKeyChildMap = {}; // 旧的 key 对应的子节点

  oldVNodeChildren.forEach((oldVNode, index) => {
    let oldKey = oldVNode && oldVNode.key ? oldVNode.key : index;
    oldKeyChildMap[oldKey] = oldVNode;
  })

  // 遍历新的子虚拟DOM数组, 找到可以复用但需要移动的节点，需要重新创建的节点 需要删除的节点，剩下的就是可以服用且不用移动的节点
  let actions = [];
  newVNodeChildren.forEach((newVNode, index) => {
    newVNode.index = index;
    let newKey = newVNode && newVNode.key? newVNode.key : index;
    let oldVNode = oldKeyChildMap[newKey];
    if (oldVNode) {
      deepDOMDiff(oldVNode, newVNode);
      if (oldVNode.index < lastNotChangedIndex) {
        actions.push({
          type: MOVE,
          oldVNode,
          newVNode,
          index
        })
      }
      delete  oldKeyChildMap[newKey];
      lastNotChangedIndex = Math.max(lastNotChangedIndex, oldVNode.index);
    } else {
      actions.push({
        type: CREATE,
        newVNode,
        index
      })
    }
  })
  // 移动节点
  let VNodeToMove = actions.filter((action) => action.type === MOVE).map((action) => action.oldVNode);

  // 删除节点
  let VNodeToDelete = Object.values(oldKeyChildMap);
  VNodeToMove.concat(VNodeToDelete).forEach((oldVNode) => {
    // 找到对应的真实 DOM 节点 然后删除
    let currentDOM = findDomByVNode(oldVNode);
    currentDOM && currentDOM.remove();
  })

  actions.forEach((action) => {
    const {  type, oldVNode, newVNode, index } = action;
    let childNodes = parentDOM.childNodes;
    let childNode = childNodes[index];
    const getDomForInsert = () => {
      if (type === MOVE) {
        return findDomByVNode(oldVNode);
      }
      if (type === CREATE) {
        return createDOM(newVNode);
      }
    }
    if (childNode) {
      parentDOM.insertBefore(getDomForInsert(), childNode);
    } else {
      parentDOM.appendChild(getDomForInsert());
    }
  })
}

// 导出 render
const ReactDOM = {
    render,
};

export default ReactDOM;