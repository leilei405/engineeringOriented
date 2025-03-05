function mergeSubArray1 (list1, list2) {
  let result = [];
  let i = 0;
  let j = 0;

  while (i < list1.length && j < list2.length) {
    if (list1[i] < list2[j]) {
      result.push(list1[i])
      i++;
    } else {
      result.push(list2[j])
      j++;
    }
  }

  // 将剩余数组push到 result 中
  while (i < list1.length) {
    result.push(list1[i]);
    i++;
  }
  while (j < list2.length) {
    result.push(list2[j]);
    j++;
  }

  return result;
}

// const list1 = [1, 3, 5];
// const list2 = [2, 4, 6];
// console.log(mergeSubArray1(list1, list2))


// 升级版
// function mergeSubArray2 (nums1, m, nums2, n) {
//   let p1 = m - 1; // 指针指向 nums1 的末尾 2
//   let p2 = n - 1; // 指针指向 nums2 的末尾 2
//   let p = m + n - 1; // 指针指向 nums1 的末尾 5
//
//   // 从后往前比较俩个数组的元素
//   while (p1 >=0 && p2 >= 0) {
//     if (nums1[p1] > nums2[p2]) {
//       nums1[p] = nums1[p1];
//       p1--
//     } else {
//       nums1[p] = nums2[p2];
//       p2--
//     }
//     p--;
//   }
//
//   // 如果nums2 还有剩余元素 将其复制到 nums1 前面的位置
//   while (p2 >= 0) {
//       nums1[p] = nums2[p2];
//       p2--;
//       p--;
//   }
//   return nums1;
// }
//
// let nums1 = [1, 2, 3, 0, 0, 0];
// let m = 3;
// let nums2 = [2, 5, 6];
// let n = 3;
//
// console.log(mergeSubArray2(nums1, m, nums2, n));


const merge = (nums1, m, nums2, n) => {
  let p1 = m - 1;
  let p2 = n - 1;
  let p = m + n - 1;

  while (p1 >= 0 && p2 >= 0) {
    if (nums1[p1] > nums2[p2]) {
      nums1[p] = nums1[p1]
      p1--
    } else {
      nums1[p] = nums2[p2]
      p2--
    }
    p--;
  }

  while (p2 >= 0) {
    nums1 = nums2[p2]
    p2--;
    p--;
  }

  return nums1;

}

const list1 = [1, 2, 3, 0, 0, 0];
const list2 = [2, 5, 6];
const m = 3, n = 3

console.log(merge(list1, m, list2, n))























