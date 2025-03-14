console.log('start');

const promise1 = new Promise((resolve, reject) => {
  console.log('promise1');
  resolve();
})

promise1.then(() => {
  console.log('Resolved1');
})

const promise2 = new Promise((resolve, reject) => {
  console.log('promise2');
  resolve();
})

promise1.then(() => {
  console.log('Resolved2');
})

console.log('end');

console.log([typeof null, null instanceof Object])
const a = 0xFFFF_FFFF;
const b = a * 0x1_0000_0000 + a;
const c = b + 1;
console.log(c, b, a)
console.log(("foo" && "bar"), ("foo" || "bar"))

function calc (a) {
  return a >= 2 ? calc(a - 1) + a : a;
}

console.log(calc(5))