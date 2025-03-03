// TODO:第一个 Promise.all
// const requestList = [];
// 模拟 100 个请求进行并发控制
// for (let i = 1; i <= 100; i++) {
//   requestList.push(
//     new Promise((res, ref) => {
//       setTimeout(() => {
//         // console.log("done", i);
//         res(i);
//       }, Math.random() * 1000);
//     })
//   );
// }

// console.log(requestList);
// 使用 Promise.all 进行并发控制
// 如果中间有一个请求失败，那么会直接进入 catch 中
// function request(promises) {
//   Promise.all(promises).then((res) => {
//     console.log(res);
//   });
// }
// request(requestList);

// TODO: 第二种 可以使用 Promise.allSettled 来解决这个问题
// 模拟 100 个请求进行并发控制 && 有失败的请求
// const requestList2 = [];
// for (let i = 1; i <= 100; i++) {
//   requestList2.push(
//     new Promise((resolve, reject) => {
//       setTimeout(() => {
//         console.log("done", i);
//         if (Math.random() * 100 > 90) {
//           reject(new Error("请求失败了~~~"));
//         } else {
//           resolve(i);
//         }
//       }, Math.random() * 1000);
//     })
//   );
// }

// async function parallelRun(max) {
//   // 用于存储分片后的请求列表
//   const requestSliceList = [];
//   // 将请求列表分片，每 max 个为一组
//   for (let i = 0; i < requestList2.length; i += max) {
//     requestSliceList.push(requestList2.slice(i, i + max));
//   }

//   for (let i = 0; i < requestSliceList.length; i++) {
//     const group = requestSliceList[i]; // 存储当前分片的请求列表
//     try {
//       const result = await Promise.allSettled(group.map((fn) => fn()));
//       console.log("result", result);
//     } catch (error) {
//       console.log("error");
//     }
//   }
// }
// parallelRun(5);

// TODO: 第三种 可以 维护一个线程池来解决这个问题
// 测试数据
// const requestList = [];
// for (let i = 1; i <= 100; i++) {
//   requestList.push(
//     () =>
//       new Promise((resolve) => {
//         setTimeout(() => {
//           resolve(i);
//         }, Math.random() * 1000);
//       })
//   );
// }

// const pool = new Set(); // 线程池
// const withQueue = []; // 等待执行的任务队列

// const request = (reqFn, max) => {
//   return new Promise((resolve, reject) => {
//     const isFull = pool.size >= max; // 判断线程池是否已满

//     // 包装请求函数，用于添加到线程池中
//     const newReqFn = () => {
//       reqFn()
//         .then((res) => {
//           resolve(res);
//         })
//         .catch((err) => {
//           reject(err);
//         })
//         .finally(() => {
//           pool.delete(newReqFn);
//           const next = withQueue.shift();
//           if (next) {
//             pool.add(next);
//             next();
//           }
//         });
//     };

//     if (isFull) {
//       withQueue.push(newReqFn);
//     } else {
//       pool.add(newReqFn);
//       newReqFn();
//     }
//   });
// };

// requestList.forEach(async (item) => {
//   const res = await request(item, 10);
//   console.log(res);
// });

// 1. 先模拟100 条数据
const requestList = [];
for (let i = 1; i <= 100; i++) {
  requestList.push(() => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(i);
      }, Math.random() * 1000);
    });
  });
}

const pool = new Set(); // 维护一个线程池
const withQueue = []; // 维护一个等待队列

const request = (reqFn, max) => {
  return new Promise((resolve, reject) => {
    const isFull = pool.size >= max; // 判断线程池是否已满

    // 包装请求函数，用于添加到线程池中
    const newReqFn = () => {
      reqFn()
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        })
        .finally(() => {
          // 无论成功还是失败，都要从线程池中删除
          pool.delete(newReqFn);
          const next = withQueue.shift(); // 从等待队列中取出一个任务
          if (next) {
            pool.add(next);
            next();
          }
        });
    };

    if (isFull) {
      withQueue.push(newReqFn);
    } else {
      pool.add(newReqFn);
      newReqFn();
    }
  });
};

requestList.forEach(async (item) => {
  const res = await request(item, 10);
  console.log(res);
});
