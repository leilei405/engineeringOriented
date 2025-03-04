function lodash_get (obj, path, defaultValue) {
  const pathArray = Array.isArray(path) ? path : path.replace(/\[([^\]]+)]/, '.$1').split('.');

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
    c: ['4', '5']
  }
}

console.log(lodash_get(obj, 'a.b.c', 'dede'), '==111==')
console.log(lodash_get(obj, 'b.c[0]', 'dede'), '==222==')
