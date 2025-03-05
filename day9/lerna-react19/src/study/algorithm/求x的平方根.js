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
