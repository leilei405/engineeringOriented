// 实现一个递归解析url 的方法，当传入的url可能经过多次编码 encode 需要通过 decodeCloneDeep 方法解码
function decodeCloneDeep(url) {
  let decodeUrl = decodeURIComponent(url);
  if (decodeUrl !== url) {
    return decodeCloneDeep(decodeUrl);
  }
  return decodeUrl;
}

console.log(
  decodeCloneDeep(
    "https%253A%252F%252Fwww.baidu.com%252Fs%253Fwd%253Dopenai%2526rsv_spt%253D1"
  )
);

// 千分位分割
// 1. 正则进行进行解析
// 2. toStringLocal()
// 3. 循环

// 1. 支持正数、负数、以及小数。
// 2. 不是有效数字返回  invalid input
// 3.

function thousandfy(num) {
  if (isNaN(num)) {
    return "invalid input";
  }
  let str = num.toString();
  let dotIndex = str.indexOf(".");
  if (dotIndex === -1) {
    return str.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  } else {
    let integerPart = str.slice(0, dotIndex);
    let decimalPart = str.slice(dotIndex);
    let formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return formattedInteger + decimalPart;
  }
}

console.log(thousandfy(-987654.321));

// export 'hello'
// var str = "hello world";
// export str
// var str = "hello world";
// export {str};
