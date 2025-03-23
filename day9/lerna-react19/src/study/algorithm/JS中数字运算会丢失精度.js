function multiply (a, b) {
  const strA = a.toString();
  const strB = b.toString();

  const decimalA = strA.includes('.') ? strA.split('.')[1].length : 0;
  const decimalB = strB.includes('.') ? strB.split('.')[1].length : 0;

  // 计算总的小数位数
  const totalLength = decimalA + decimalB;

  // 将浮点数转换为整数
  const intA = Number(strA.replace('.', ''));
  const intB = Number(strB.replace('.', ''));

  // 整数相乘
  const resultInt = intA * intB;

  return resultInt / Math.pow(10, totalLength);
}

console.log(multiply(0.1, 0.2)); // 输出 0.02