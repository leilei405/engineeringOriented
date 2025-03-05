function cc (n) {
  if (n < 2) return 1;

  const dp = [1, 1];
  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }

  return dp[n]
}


// var getSum = function(a, b) {
//   // 当进位 b 不为 0 时，继续进行加法运算
//   while (b!== 0) {
//     // 计算进位
//     let carry = (a & b) << 1;
//     // 计算不考虑进位的和
//     a = a ^ b;
//     // 更新进位
//     b = carry;
//   }
//   // 当进位为 0 时，a 即为最终的和
//   return a;
// };
//
// console.log(getSum(4, 5))
//
// function dum (a, b) {
//   while(b !== 0) {
//     let carry = ( a & b ) >> 1
//     a = a^b;
//     b = carry;
//   }
//   return a;
// }