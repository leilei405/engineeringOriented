import {REACT_ELEMENT} from "../constant";

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
  console.log('✅ VNode', VNodeProps)
  console.log('✅ DOM', dom)
  for (let key in VNodeProps) {
    if (key === 'children') continue;
    // 处理样式
    if (key === 'style') {
      let styleObj = VNodeProps[key];
      Object.keys(styleObj).forEach((item) => {
        console.log(dom, '🌰 🚀🚀🚀', item)
        dom.style[item] = VNodeProps[key][item];
      })
    } else if (/^on[A-Z].*/.test(key)) {
      // TODO:
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
  const { type, props } = VNode;
  let dom;
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
  return dom;
}


// 导出 render
const ReactDOM = {
    render,
};
export default ReactDOM;