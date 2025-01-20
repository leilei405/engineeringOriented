import { updaterQueue, flushUpdateQueue } from './Component'

export function addEvent (dom, eventName, bindFunction) {
    dom.attach = dom.attach || {};
    dom.attach[eventName] = bindFunction;
    // 事件合成机制核心点一： 给真实 DOM 绑定事件
    // 如果真实 DOM 上已经绑定过事件了，那么就不需要再绑定了
    if (!document[eventName]) {
        document[eventName] = dispatchEvent;
    }
}

function dispatchEvent (nativeEvent) {
    updaterQueue.isBatch = true;
    // 事件合成机制核心点二： 屏蔽浏览器之间的差异
    let syntheticEvent = createSyntheticEvent(nativeEvent);
    let target = nativeEvent.target; // 事件源
    while (target) {
      syntheticEvent.currentTarget = target;
      let eventName = 'on' + nativeEvent.type;
      let bindFunction = target.attach && target.attach[eventName];
      bindFunction && bindFunction(syntheticEvent);
      if (syntheticEvent.isPropagationStopped) {
        break;
      }
      target = target.parentNode;
    }
    flushUpdateQueue()
}

function createSyntheticEvent (nativeEvent) {
    // 事件合成机制核心点三： 封装合成事件
    let nativeEventKeyValues = {} // 获取原生事件的所有属性 进行遍历
    for (let key in nativeEvent) {
      nativeEventKeyValues[key] = typeof nativeEvent[key] === 'function' ? nativeEvent[key].bind(nativeEvent) : nativeEvent[key];
    }
    let syntheticEvent = Object.assign(nativeEventKeyValues,{
      nativeEvent,
      isDefaultPrevented: false, // 阻止默认事件
      isPropagationStopped: false, // 阻止冒泡
      // 浏览器差异处理
      preventDefault: function () {
        this.isDefaultPrevented = true;
        if (this.nativeEvent.preventDefault) {
          this.nativeEvent.preventDefault();
        } else {
          this.nativeEvent.returnValue = false;
        }
      },
      stopPropagation: function () {
        this.isPropagationStopped = true;
        if (this.nativeEvent.stopPropagation) {
          this.nativeEvent.stopPropagation();
        } else {
          this.nativeEvent.cancelBubble = true;
        }
      }
    });

    return syntheticEvent;
}