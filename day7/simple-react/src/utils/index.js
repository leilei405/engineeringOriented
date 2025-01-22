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