// 前端笔试题
// 题目一
// 有字符串 var = 'abc345efgabcab'，请写出 3 条 JS 语句分别实现如下 3 个功能（使用正则）：
// 1）去掉字符串中的a、b、c 字符，形成结果：'345efg'
// 2）将字符串中的数字用中括号括起来，形成结果：'abc[345]efgabcab'
// 3）将字符串中的每个数字的值分别乘以 2，形成结果：'abc6810efgabcab'

// 1）去掉字符串中的a、b、c 字符，形成结果：'345efg'
const str1 = 'abc345efgabcab';
const result1 = str1.replace(/[abc]/g, '');
console.log(result1);

// 2）将字符串中的数字用中括号括起来，形成结果：'abc[345]efgabcab'
const str2 = 'abc345efgabcab';
const result2 = str2.replace(/\d+/g, '[$&]');
console.log(result2);

// 3）将字符串中的每个数字的值分别乘以 2，形成结果：'abc6810efgabcab'
const str3 = 'abc345efgabcab';
const result3 = str3.replace(/\d/g, match => parseInt(match, 10) * 2);
console.log(result3);


// 题目二
// 实现 handler 函数以达到以下输出效果：
//
// ```js
// const proxy = new Proxy({}, handler);
// proxy.a = 10;
// console.log(proxy.a); // 输出 10
// console.log(proxy.b); // 输出 'default'
// proxy.a = 'string';
// console.log(proxy.a); // 输出 10
// ```

// 题目三
// const originalArr = [3, 1, 4, 1, 5, 9];
// const newSortedArr = originalArr.toSorted((a, b) => a - b);
// console.log(newSortedArr);
// console.log(originalArr);

// 题目四
// 实现promise.all 函数
function promiseAll (promises) {
  if (!Array.isArray(promises)) {
    console.error('请输入数组')
  }
  return new Promise((res, rej) => {
    let result = [];
    let count = 0;
    promises.forEach((promise, index) => {
      promise.then(res => {
        count++;
        result[index] = res;
        if (count === promises.length) {
          res(result)
        }
      }).catch(err => {
        rej(err)
      })
    })
  })
}

// 题目五
// js实现大数相加
function maxNumSum (num1, num2) {
  num1 = String(num1);
  num2 = String(num2);
  let res = '';
  let i = num1.length - 1;
  let j = num2.length - 1;

  while (i >= 0 || j >= 0) {
    // let current1 = num1[]
  }
}

// 题目六
// 编写二叉树的后续遍历函数（简写）

