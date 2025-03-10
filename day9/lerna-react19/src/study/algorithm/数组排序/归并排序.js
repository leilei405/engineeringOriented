// 分：把数组分为两半，再递归对子数组进行 “分” 操作，直到分成一个个单独的数。
// 和：把俩个数合并为有序数组，再对有序数组进行合并，直到全部子数组合并为一个完整数组。

// 1. 新建一个 result, 用于存放最终排序后的数组。
// 2. 比较两个有序数组的头部，较小这出队并且推入 栈 中
// 3. 如果两个数组中还有值，那么重复第二步

// TODO: 1. 归并排序
Array.prototype.mergeArr1 = function () {
  let sortArray = this.slice();

  const rec = (arr) => {
    // 如果数组中只有一个元素的时候直接返回
    if (Array.isArray(arr) && arr.length === 1) {
      return arr;
    }

    const mid = Math.floor(arr.length / 2);
    const left = arr.slice(0, mid);
    const right = arr.slice(mid, arr.length);

    const orderLeft = rec(left);
    const orderRight = rec(right);

    const result = [];
    while (orderLeft.length || orderRight.length) {
      if (orderLeft.length && orderRight.length) {
        result.push(orderLeft[0] < orderRight[0] ? orderLeft.shift() : orderRight.shift())
      } else if (orderLeft.length) {
        result.push(orderLeft.shift())
      } else if (orderRight.length) {
        result.push(orderRight.shift())
      }
    }
    return result;
  }

  return rec(sortArray);
}

let caseArr = [2, 543, 754, 31, 213, 123, 111, 2].mergeArr1();

console.log(caseArr, '===')