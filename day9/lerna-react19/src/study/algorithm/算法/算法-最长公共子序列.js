// function longCommonSub (text1, text2) {
//   const m = text1.length;
//   const n = text2.length;
//
//   // 创建一个二维数组 dp 来保存子问题的解
//   const dp = Array.from({  length: m + 1 }, () => {
//     return Array(n + 1).fill(0);
//   })
//
//   for (let i = 1; i <= m; i++) {
//     for (let j = 1; j <= n; j++) {
//       if (text1[i - 1] === text2[j - 1]) {
//         // 如果当前字符相等，则 LCS 长度加 1
//         dp[i][j] = dp[i - 1][j - 1] + 1;
//       } else {
//         // 如果当前字符不相等，则取两种情况的最大值
//         dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
//       }
//     }
//   }
//   return dp[m][n]
// }

// console.log(longCommonSub('abcde', 'ace'));
// console.log(longCommonSub('abc', 'abc'));
// console.log(longCommonSub('abc', 'def'));




// function cc (text1, text2) {
//   const m = text1.length;
//   const n = text2.length;
//
//   const dp = Array.from({length: m + 1 }, () => Array(n + 1).fill(0));
//
//   for (let i = 1; i <= m; i++) {
//     for (let j = 1; j <= n; j++) {
//       if (text1[i - 1] === text2[j - 1]) {
//         dp[i][j] = dp[i - 1][j - 1] + 1
//       } else {
//         dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
//       }
//     }
//   }
//   return dp[m][n]
// }
//
//
// console.log(cc('abcde', 'ace'));
// console.log(cc('abc', 'abc'));
// console.log(cc('abc', 'def'));


function bb (text1, text2) {
  const m = text1.length;
  const n = text2.length;

  // 创建二维数组
  const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (text1[i - 1] === text2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  return dp[m][n]
}

console.log(bb('abcde', 'ace'));
console.log(bb('abc', 'abc'));
console.log(bb('abc', 'def'));















