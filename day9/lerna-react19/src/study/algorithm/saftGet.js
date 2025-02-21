const obj = {
  user: {
    profile: {
      name: 'Sunday',
      age: 30
    }
  }
};

function safeGet (obj, path, defaultValue) {
  const keys = path.split('.');

  return keys.reduce((acc, key) => {
    if (acc && acc.hasOwnProperty(key)) {
      return acc[key]; // 返回存在的属性值
    } else {
      return defaultValue;
    }
  }, obj)
}

// console.log(safeGet(obj, 'user.profile.name'));      // 输出: 'Sunday'
console.log(safeGet(obj, 'user.profile.gender', undefined)); // 输出: 'N/A'
// console.log(safeGet(obj, 'user.address.city', 'Unknown')); // 输出: 'Unknown'

const array = [15, 16, 17, 18, 19];

let sum = array.reduce((acc, cur, idx) => {
  return acc + cur
})

console.log(sum, '====')