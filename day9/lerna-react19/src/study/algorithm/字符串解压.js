// 输入 50a6we8y20x
// 输出 50个a 6个we 8个y 20个x

function zip (str) {
  let num = 0;
  let cur = "";
  let res = "";
  for (let i = 0; i < str.length; i++) {
    if (!isNaN(Number(str[i]))) {
      if (cur) {
        res += cur.repeat(num);
        cur = "";
        num = 0;
      }
      num = num * 10 + Number(str[i]);
    } else {
      cur += str[i]
    }
  }
  res += cur.repeat(num);
  return res;
}

console.log(zip('50a6we8y20x'))