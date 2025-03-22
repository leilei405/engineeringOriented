// 合并两个有序数组并去重
// 给定两个有序的整数数组 nums1 和 nums2，请编写一个算法来合并这两个数组，并返回一个新的有序数组，其中不包含重复元素。
// 要求：
// 1. 合并后的数组要保持升序。
// 2. 去除重复元素。
// 示例：
// 输入：
// javascript
// nums1 = [1, 2, 2, 3, 5]
// nums2 = [2, 3, 4, 5, 6]
// 输出：
// javascript
//     [1, 2, 3, 4, 5, 6]
// 提示：
// - 输入数组 nums1 和 nums2 都是已经升序排列的。
// - 可以假设合并后的数组大小不会超过 nums1.length + nums2.length。

function mergeArray (num1, num2) {
  let result = [];
  let i = 0;
  let j = 0;

  while (i <= num1.length && j <= num2.length ) {
    if (num1[i] < num2[j]) {
      result.push(num1[i])
      i++;
    } else {
      result.push(num2[j])
      j++
    }
  }

  while (i < num1.length) {
    result.push(num1[i])
    i++;
  }

  while (j < num2.length) {
    result.push(num2[j])
    j++;
  }

  return new Set([...result]);
}
const num1  = [1, 2, 2, 3, 5];
const num2 = [2, 3, 4, 5, 6];
console.log(mergeArray(num1, num2));