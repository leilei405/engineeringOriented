function lodash_get (obj, path, defaultValue) {
  const pathArray = Array.isArray(path) ? path : path.replace(/\[([^\]]+)]/g, '.$1').split('.');

  return pathArray.reduce((acc, key) => {
    console.log(acc, 'acc')
    console.log(key, 'key')
    if (acc == null) {
      return defaultValue;
    }
    return acc[key]
  }, obj)
}

const obj = {
  a: {
    b: {
      c: 2
    }
  },
  b: {
    c: [
      { d: 1, c: ['1', '2'] },
    ]
  }
}

console.log(lodash_get(obj, 'a.b.c', 'dede'), '==111==')
console.log(lodash_get(obj, 'b.c[0].c[1]', 'dede'), '==222==')
let reg = /\[([^\]]+)]/g;
let rep = /\[([^\]]+)]/g;