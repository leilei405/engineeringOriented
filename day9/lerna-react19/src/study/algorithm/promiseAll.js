
// 是否Promise
function isPromise (value) {
  return value && typeof value.then === 'function'
}

// 转为Promise
function toPromise(value) {
  return isPromise(value) ? value : Promise.resolve(value);
}

function promiseAll(promises) {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(promises)) {
      return reject('请传入有效的数组')
    }

    let resultCount = 0;
    let result = new Array(promises.length);

    promises.forEach((promise, idx) => {
      toPromise(promise)
        .then(data => {
          result[idx] = data;
          resultCount++;
          if (resultCount === promises.length) {
            resolve(result)
          }
        }).catch((err) => {
          reject(err)
      })
    })
  })
}

const p1 = Promise.resolve(1);
const p2 = Promise.resolve(2);
const p3 = new Promise((resolve) => setTimeout(() => resolve(3), 1000));
const p4 = '1';  // 非 Promise 值
//
// promiseAll([p1, p2, p3, p4])
//     .then(results => console.log(results))
//     .catch(error => console.log(error));


function PromiseAll (pros) {
  return new Promise((res, rej) => {
    if (!Array.isArray(pros)) {
      rej('请传入合法数组')
    }

    let result = [];
    let count = 0;

    pros.forEach((item, idx) => {
      const promises = item && typeof item.then === 'function' ? item : Promise.resolve(item)
      promises.then(data => {
        result[idx] = data
        count++;
        if (count === pros.length) {
          res(result)
        }
      }).catch(rej)
    })
  })
}


PromiseAll([p1, p2, p3, p4])
    .then(results => console.log(results))
    .catch(error => console.log(error));













