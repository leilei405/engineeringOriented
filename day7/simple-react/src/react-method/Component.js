import { findDomByVNode, updateDomTree } from './render-react-dom'
/**
 * 模拟 React 基类
 */
export class Component {
  static IS_CLASS_COMPONENT = true
  constructor(props) {
    this.props = props;
    this.updater = new Updater(this); // 状态更新器
    this.state = {};
  }

  // 更新组件状态
  setState(partialState) {
    // 1. 合并状态属性
    // this.state = { ...this.state, ...partialState }; // 后面的会覆盖前面的
    // 2. 重新渲染进行更新
    // this.updateComponent();

    // 3. 状态更新器
    this.updater.addState(partialState);
  }

  // 重新渲染组件
  updateComponent() {
    // 1. 获取重新执行 render 函数后的虚拟dom 新的虚拟dom
    // 2. 根据新虚拟 dom 生成新的真实dom
    // 3. 将真实的 dom 替换掉老的真实 dom，然后挂载到页面上
    let oldVNode = this.oldVNode; // 让类组件拥有一个oldVNode属性, 保存类组件实例对应的虚拟dom
    let oldDOM = findDomByVNode(oldVNode); // 将真实DOM保存到对应的虚拟 DOM 上
    let newVNode = this.render(); // 重新执行render函数 得到新的虚拟dom

    // 比较老的虚拟dom和新的虚拟dom，进行对 oldDOM 的更新操作
    updateDomTree(oldVNode, newVNode, oldDOM);

    this.oldVNode = newVNode; // 4. 保存新的虚拟dom
  }
}

// 实现 React 状态更新器 Updater
class Updater {
  constructor(ClassComponentInstance) {
    this.ClassComponentInstance = ClassComponentInstance;
    this.pendingStates = []; // 状态队列
  }

  // 添加需要更新的状态
  addState(partialState) {
    this.pendingStates.push(partialState);
    this.preHandleForUpdate(); // 是否需要预处理
  }

  // 预处理
  preHandleForUpdate() {
    if (updaterQueue.isBatch) {
      updaterQueue.updaters.add(this);
    } else {
      this.launchUpdate();
    }
  }

  // 不是预处理的时候直接 --->>> 启动更新
  launchUpdate() {
     const { ClassComponentInstance, pendingStates } = this;
     if (pendingStates.length === 0) return;

     // 1. 合并状态属性 合并方式 1
     // pendingStates.forEach((item) => {
     //   ClassComponentInstance.state = {...ClassComponentInstance.state,...item };
     // });

      // 1. 合并状态属性  合并方式 2
      ClassComponentInstance.state = this.pendingStates?.reduce((preState, newState) => {
        return {...preState,...newState };
      }, ClassComponentInstance.state)

      this.pendingStates.length = 0; // 2. 清空状态队列
      ClassComponentInstance.updateComponent(); // 3. 重新渲染进行更新
  }
}

export let updaterQueue = {
  isBatch: false,
  updaters: new Set(),
}

export function flushUpdateQueue() {
  updaterQueue.isBatch = false;
  for (let updater of updaterQueue.updaters) {
    updater.launchUpdate();
  }
  updaterQueue.updaters.clear();
}