// 请实现一个函数 diff(obj1, obj2), 接受两个对象做为参数，并返回一个新对象。
// 表示两个对象之间的差异，差异部分包括以下几种情况；

// 1. 在obj1中存在但在obj2中不存在的属性。
// 2. 在obj2中存在但在obj1中不存在的属性。
// 3. 在obj1和obj2中都存在，但值不同的属性

// 要求
// - 递归地处理嵌套的对象
// - 对象的键值对中的值可以是任意类型（包括对象数组，基本数据类型等）。

const obj1 = {
  name: "Alice",
  age: 30,
  address: {
    city: "New York",
    zip: "10001",
  },
  hobbies: ["reading", "traveling"],
  contact: {
    phone: "1234567890",
    email: "alice@example.com",
  },
};

const obj2 = {
  name: "Alice",
  age: 35,
  address: {
    city: "Los Angeles",
    zip: "90001",
    street: "Main St",
  },
  hobbies: ["reading", "cooking"],
  contact: {
    phone: "0987654321",
  },
};

function diff(obj1, obj2) {
  const result = {};
  // 处理 obj1 中的属性
  for (const key in obj1) {
    if (obj1.hasOwnProperty(key)) {
      if (!obj2.hasOwnProperty(key)) {
        result[key] = { obj1: obj1[key], obj2: undefined };
      } else if (
        typeof obj1[key] === "object" &&
        obj1[key] !== null &&
        typeof obj2[key] === "object" &&
        obj2[key] !== null
      ) {
        const nestedDiff = diff(obj1[key], obj2[key]);
        if (Object.keys(nestedDiff).length > 0) {
          result[key] = nestedDiff;
        }
      } else if (obj1[key] !== obj2[key]) {
        result[key] = { obj1: obj1[key], obj2: obj2[key] };
      }
    }
  }
  // 处理 obj2 中存在但 obj1 中不存在的属性
  for (const key in obj2) {
    if (obj2.hasOwnProperty(key) && !obj1.hasOwnProperty(key)) {
      result[key] = { obj1: undefined, obj2: obj2[key] };
    }
  }
  return result;
}

console.log(diff(obj1, obj2));

// 输出
// const o = {
//   age: { obj1: 30, obj2: 35 },
//   address: {
//     city: { obj1: "New York", obj2: "Los Angeles" },
//     zip: { obj1: "10001", obj2: "90001" },
//     street: { obj1: undefined, obj2: "Main St" }
//   },
//   hobbies: {
//     obj1: ["reading", "traveling"],
//     obj2: ["reading", "cooking"],
//   },
//   contact: {
//     phone: { obj1: "1234567890", obj2: "0987654321" },
//     email: { obj1: "alice@example.com", obj2: undefined }
//   }
// }
