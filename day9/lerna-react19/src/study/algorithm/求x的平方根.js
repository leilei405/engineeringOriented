function mySqrt (num) {
  if (!num) {
    return 0
  }

  // 初始化左右边界
  let left = 1;
  let right = num;

  let result = 0;

  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    if (mid * mid <= num) {
      result = mid;
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return result;
}

console.log(mySqrt(8), '==')


function mySort1 (num) {
  if (!num) return 0;

  let left = 1;
  let right = num;
  let result = 0;

  while (left <= right) {
    let mid = Math.floor((left + right) / 2);

    if (mid * mid <= num) {
      result = mid;
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return result;
}

console.log(mySort1(8))
console.log(mySort1(9))


// 用友网络（一面）
    // 1. 自我介绍
    // 2. 虚拟列表是如何做的？
    // 2. 你怎么知道性能80%，这个结果怎么来的？
    // 3. 封装全局弹窗组件是如何跨业务被使用的？
    // 4. git 命令除了 add、commit、push  还用过哪些？
    // 5. WebPack 分包怎么分的？还进行哪些优化？
    // 6. JSON Schema 怎么减少了60%开发成本，如何实现的？
    // 7. memo是怎么做性能优化的？useMemo 和 useCallback区别？还知道哪些优化方式？
    // 8. 如何通过Performance看板进行调优的？优化过什么？
    // 编程1. 求x的平方根
    // 编程2. 有效括号
// 用友网络（二面）
    // 1. 自我介绍
    // 2. 开发平台创建的API和方法怎么提供给业务使用的？、问业务
    // 3. React 中的优化你是怎么做的？Fiber实现原理、特性？
    // 4. 编程1-2：写下 createElement()、PureComponent？
    // 5. 生命周期实现原理实现的？
    // 6. 虚拟DOM讲下？
    // 7. 说下你对BFF的理解？你在BFF层做了哪些东西？
    // 8. 讲下你项目中用到的JSON Schema？
    // 9. 为什么没有转正？
    // 10. 为什么学了前端，没去向后端，大数据靠拢？
    // 11. 你平时用AI吗？AI 真的可以提高开发效率吗？

// 零跑科技（一面）
    // 1. 我们这边的工作强度比较高可以接受吗？
    // 2. 箭头函数的this指向哪里？
    // 3. 深拷贝你有几种方式？
    // 4. CSS 常用的布局方式？
    // 5. 浏览器存储数据办法？
    // 6. tab间通信的方式？
    // 7. 虚拟列表具体实现过程？
    // 8. 时区偏差问题如何解决？
    // 9. 项目过程中有没有亮点或难点怎么解决的？
    // 10. 项目需求开发的流程是怎么样的？

// 字节
    // 1. 自我介绍
    // 2.
    // 编程1. 有[a,b,c,d]四个域名地址，结合网络情况选择最快的域名进行建联
    // 编程2. 合并俩个有序数组

// 叮咚买菜 (笔试链接)
    // 选择题--略过....
    // 1. 反转整数
    // 2. 合并区间
    // 3. 螺旋矩阵
// 好未来 (笔试链接)
    // 选择题--略过....
    // 1.加油站
    // 2.非递减数列
    // 3.最小时差
