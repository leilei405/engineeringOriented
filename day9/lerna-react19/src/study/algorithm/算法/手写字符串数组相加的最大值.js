let input = ['123', 'hello', '99', 'abc', '42'];

function fn (numStr) {
  let sum = 0;

  numStr.forEach(item => {
    sum += isNaN(item) ? item.length : Number(item);
  })

  return sum;
}

console.log(fn(input))

//output = 123 + 5 + 99 + 3 + 42 = 272