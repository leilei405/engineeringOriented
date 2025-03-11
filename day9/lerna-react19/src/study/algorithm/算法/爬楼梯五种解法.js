// TODO: 第一种 递归
function climbStairs1 (n) {
  if (n <= 2) return n;
  return climbStairs1(n - 1) + climbStairs1(n - 2);
}
console.log(climbStairs1(10), '==递归==')


// TODO: 第二种 递归-（优化） + 记忆化
// TODO: 存储计算过的子问题
function climbStairs2 (n, memo = {}) {
  if (n <= 2) return n;
  if (memo[n]) {
    return memo[n];
  }

  memo[n] = climbStairs2(n - 1, memo) + climbStairs2(n - 2, memo);
  return memo[n];
}
console.log(climbStairs2(10), '==递归-->>记忆化==')


// TODO: 第三种 动态规划
function climbStairs3 (n) {
  if (n < 2) return 1;

  const dp = new Array(n + 1);
  dp[1] = 1;
  dp[2] = 2;

  for (let i = 3; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }

  return dp[n]
}
console.log(climbStairs3(10), '==动态规划==');


// TODO: 第四种 动态规划 优化
// TODO: 使用变量代替 dp[i - 2] dp[i - 1] 减少空间
function climbStairs4 (n) {
  if (n <= 2) return n;

  let prev1 = 1; // dp[i - 2];
  let prev2 = 2; // dp[i - 1];

  for (let i = 3; i <= n; i++) {
    let current = prev1 + prev2;
    prev1 = prev2;
    prev2 = current
  }

  return prev2;
}
console.log(climbStairs4(10), '==动态规划-->>优化==')

// TODO: 第五种 矩阵快速幂 难度系数高
