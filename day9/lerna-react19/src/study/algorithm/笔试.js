let num = 2233445689;

function fn(num) {
  let str = num.toString();
  let arr = str.split("");
  const s = arr.reverse();
  let t = new Set(s);
  return Array.from(t).join("");
}

let arr = [21, 88, 19, 45, 13, 25, 66, 33, 18];

console.log(fn(arr));

function showMoney() {}

let personA = new Object();
let personB = new Object();

personA.money = 100;
personB.money = 200;

personA.showMoney = showMoney;
personB.showMoney = showMoney;

console.log(personA.showMoney()); // 100
console.log(personB.showMoney()); // 200
