function bigNumAdd (num1, num2) {
  let result = ''; // 存储结果的字符串
  let carry = 0; // 存储进位

  // 获取2个数字字符串的长度
  let i = num1.length - 1;
  let j = num2.length - 1;

  // 从右向左逐位相加
  while (i >= 0 || j >= 0 || carry) {
    const currentNum1 = i >= 0 ? parseInt(num1[i]) : 0;
    const currentNum2 = j >= 0 ? parseInt(num2[j]) : 0;

    // 计算当前位的和以及进位
    const sum = currentNum1 + currentNum2 + carry;
    carry = Math.floor(sum / 10);
    const current = sum % 10;

    // 将当前位的结果添加到结果字符串的前面
    result = current + result
    i--;
    j--;
  }

  return result
}

console.log(bigNumAdd('12345678901234567890', '98765432109876543210'))

function bigNumAdd1 (n1, n2) {
  let result = '';
  let carry = 0;

  let i = n1.length - 1;
  let j = n2.length - 1;

  while (i >= 0 || j >= 0 || carry) {
    let currentNum1 = i >= 0 ? parseInt(n1[i]) : 0;
    let currentNum2 = j >= 0 ? parseInt(n2[j]) : 0;

    let sum = currentNum2 + currentNum1 + carry;
    carry = Math.floor(sum / 10);
    result = result + (sum % 10);

    i--;
    j--;
  }

  return result;
}
