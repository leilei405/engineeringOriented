// 导入React中的一些工作标签和标记
import { HostComponent, HostRoot, IndeterminateComponent, HostText } from './ReactWorkTags'
import { NoFlags } from './ReactFiberFlags'


/**
 * 构造函数，用于创建一个新的Fiber节点
 * @param {number} tag - fiber的类型，如函数组件、类组件、原生组件、根元素等
 * @param {*} pendingProps - 新属性，等待处理或者说生效的属性
 * @param {*} key - 唯一标识
 */
function FiberNode (tag, pendingProps, key) {
  // 必须有的
  this.tag = tag // 代表fiber节点的类型
  this.key = key
  this.type = null // 代表fiber节点对应虚拟DOM的类型

  // 主要
  this.stateNode = null // 每个fiber节点都有一个状态节点
  this.return = null // 每个fiber节点都有一个父节点
  this.sibling = null // 每个fiber节点都有一个兄弟节点
  this.pendingProps = pendingProps // 每个fiber节点都有一个待处理的属性
  this.memoizedProps = null // 每个fiber节点都有一个已处理的属性
  this.memoizedState = null // 每个fiber节点都有一个已处理的状态
  this.updateQueue = null // 每个fiber节点都有一个更新队列
  this.flags = NoFlags // 每个fiber节点都有一个标志
  this.subtreeFlags = NoFlags // 每个fiber节点都有一个子树标志
  this.alternate = null // 每个fiber节点都有一个备用节点 双缓存 fiber树
  this.index = 0 // 每个fiber节点都有一个索引

  // 其他扩展
  this.ref = null // 每个fiber节点都有一个引用
  this.child = null // 每个fiber节点都有一个子节点
  this.dependencies = null // 每个fiber节点都有一个依赖
  this.mode = null // 每个fiber节点都有一个模式
  this.effectTag = null // 每个fiber节点都有一个效果标签
  this.nextEffect = null // 每个fiber节点都有一个下一个效果节点
  this.firstEffect = null // 每个fiber节点都有一个第一个效果节点
  this.lastEffect = null // 每个fiber节点都有一个最后一个效果节点
}


/**
 * 用于创建新的Fiber节点
 * @param {number} tag - fiber的类型
 * @param {*} pendingProps - 新属性
 * @param {*} key - 唯一标识
 * @returns {FiberNode} 新的Fiber节点
 */
function createFiber (tag, pendingProps, key) {
  return new FiberNode(tag, pendingProps, key)
}

/**
 * 创建新的HostRoot类型的Fiber节点
 * @returns {FiberNode} 新的HostRoot类型的Fiber节点
 */
function createHostRootFiber () {
  return createFiber(HostRoot, null, null)
}

export {
  createHostRootFiber,
  createFiber,
  FiberNode,
}