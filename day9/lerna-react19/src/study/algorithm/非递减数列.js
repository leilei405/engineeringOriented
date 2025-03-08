// function checkPossibility (nums) {
//   let count = 0; // 用于记录改变元素的次数
//
//   for (let i = 1; i < nums.length; i++) {
//     if (nums[i] < nums[i - 1]) {
//       // 如果当前元素小于前一个元素 需要改变元素
//       count++;
//
//       if (count > 1) {
//         // 如果需要改变的次数超过1次  直接返回 false
//         return false;
//       }
//
//       if (i === 1 || nums[i] >= nums[i - 2]) {
//         // 如果是第二个元素 或者 当前元素大于等于前2个元素
//         // 将前一个元素修改为 当前元素的值
//         nums[i - 1] = nums[i];
//       } else {
//         nums[i] = nums[i - 1];
//       }
//     }
//   }
//   return true;
// }

// console.log(checkPossibility([4, 2, 3]));
// console.log(checkPossibility([4, 2, 1]));


// function cc (nums) {
//   let count = 0;
//   for (let i = 1; i < nums.length; i++) {
//     if (nums[i] < nums[i - 1]) {
//       count++;
//       if (count > 1) {
//         return false
//       }
//       if (i === 1 || nums[i] >= nums[i - 2]) {
//         nums[i - 1] = nums[i];
//       } else {
//         nums[i] = nums[i - 1];
//       }
//     }
//   }
//   return true;
// }
// console.log(cc([4, 2, 3]));
// console.log(cc([4, 2, 1]));


function bb (nums) {
  let count = 0;

  for (let i = 1; i < nums.length; i++) {
    if (nums[i] < nums[i - 1]) {
      count++;

      if (count > 1) {
        return false
      }

      if (i === 1 || nums[i] >= nums[i - 2]) {
        nums[i - 1] = nums[i];
      } else {
        nums[i] = nums[i - 1];
      }
    }
  }
  return true;
}

console.log(bb([4, 2, 3]));
console.log(bb([4, 2, 1]));





function dd (nums) {
  let count = 0;

  for (let i = 1; i < nums.length; i++) {
    if (nums[i] < nums[i - 1]) {
      count++;

      if (count > 1) {
        return false
      }

      if (i === 1 || nums[i] >= nums[i - 2]) {
        nums[i - 1] = nums[i];
      } else {
        nums[i] = nums[ i - 1];
      }
    }
  }
  return true;
}


