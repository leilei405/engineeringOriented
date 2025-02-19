const maxSubArray = (nums) => {
  let maxSubSum = nums[0];        // 用来存储最大子数组和
  let currentMaxSubSum = nums[0]; // 用来存储当前子数组的和

  for (let i = 1; i < nums.length; i++) {
    currentMaxSubSum = Math.max(nums[i], currentMaxSubSum + nums[i]);
    maxSubSum = Math.max(maxSubSum, currentMaxSubSum);
  }

  return maxSubSum;
}

const nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4];
console.log(maxSubArray(nums))


function maxSubArray1 (nums) {
  let maxSum = nums[0]
  let maxCurrentSum = nums[0]

  for (let i = 1; i< nums.length; i++) {
    maxCurrentSum = Math.max(nums[i], maxCurrentSum + nums[i]);
    maxSum = Math.max(maxSum, maxCurrentSum)
  }
  return maxSum;
}

const nums1 = [-2, 1, -3, 4, -1, 2, 1, -5, 4];

console.log(maxSubArray1(nums1), '===')
















