Array.prototype.mergeArr1 = function (list2) {
  const list1 = this.slice();

  // 双指针
  let i = 0;
  let j = 0;

  // 存储最终结果
  let result = []

  while (i < list1.length && j < list2.length) {
    if (list1[i] < list2[j]) {
      result.push(list1[i]);
      i++;
    } else {
      result.push(list2[j]);
      j++;
    }
  }

  while (i < list1.length) {
    result.push(list1[i])
    i++;
  }
  while (j < list2.length) {
    result.push(list2[j])
    j++;
  }

  return result;
}

let caseArr = [1, 3, 5].mergeArr1([2, 4, 6]);
console.log(caseArr);

function mergeArr2 (list1, m, list2, n) {
  // 三指针解决
  let p1 = m - 1;
  let p2 = n - 1;
  let p = m + n - 1;

  if (p1 >= 0 && p2 >=0) {
    if (list1[p1] > list2[p2]) {
      list1[p] = list1[p1];
      p1--;
    } else {
      list1[p] = list1[p2];
      p2--
    }
    p--
  }

  while (p2 >= 0) {
    list1 = list2[p2]
    p2--;
    p--;
  }

  return list1
}

console.log(mergeArr2([1, 2, 3, 0, 0, 0], 3, [2, 5, 6], 3))