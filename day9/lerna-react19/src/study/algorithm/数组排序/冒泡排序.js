// 比较所有相邻的元素，如果第一个比第二个大，则进行位置交换
// 一轮下来，可以保证最后一个数是最大的

Array.prototype.bubbleSort = function () {
  const sortArray = this.slice();
  for (let i = 0; i < sortArray.length - 1; i++) {
    for (let j = 0; j < sortArray.length - i - 1; j ++) {
      if (sortArray[j] > sortArray[j + 1] ) {
        const temp = sortArray[j];
        sortArray[j] = sortArray[j + 1];
        sortArray[j + 1] = temp;
      }
    }
  }
  return sortArray;
}

let caseArr = [2, 543, 754, 31, 213, 123, 111, 2].bubbleSort();
console.log(caseArr);