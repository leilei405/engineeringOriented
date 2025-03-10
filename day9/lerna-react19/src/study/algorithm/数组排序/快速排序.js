// 分区：从数据中任意选择一个基准值  所有比基准值小的元素放在基准值前面，比基准值大的元素放在后面
// 递归： 递归对基准前后的子数组进行分区。

function quicklySort (arr) {
  if (arr.length <= 1) return arr;

  const left = [];
  const right = [];
  const mid = arr[0];

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < mid) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }
  return [...quicklySort(left), mid, ...quicklySort(right)];
}
let caseArr = [21, 4, 68, 32, 12];
console.log(quicklySort(caseArr))