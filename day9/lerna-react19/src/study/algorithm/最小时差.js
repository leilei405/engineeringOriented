// const findMinDifference = (timePoints) => {
//   const minutes = timePoints.map(time => {
//     const [hours, mins] = time.split(':').map(Number);
//     return hours * 60 + mins;
//   });
//
//   // 对分钟数进行排序
//   minutes.sort((a, b) => a - b);
//
//   // 初始化最小时间差为最大可能值
//   let minDiff = Infinity;
//
//   // 计算相邻时间的差值
//   for (let i = 1; i < minutes.length; i++) {
//     minDiff = Math.min(minDiff, minutes[i] - minutes[i - 1])
//   }
//
//   // 考虑第一个时间和最后一个时间之间的差值
//   minDiff = Math.min(minDiff, 24 * 60 - minutes[minutes.length - 1] + minutes[0]);
//   return minDiff
// }

let timePoints1 = ["23:59","00:00"];
let timePoints2 = ["00:00","02:00","05:00"];

// console.log(findMinDifference(timePoints1), '==11==');
// console.log(findMinDifference(timePoints2), '==22==');

// const minFindDifference = (timeArr) => {
//   const minutes = timeArr.map(time => {
//     const [hours, mins] = time.split(':').map(Number);
//     return hours * 60 + mins;
//   })
//
//   minutes.sort((a, b) => a - b);
//
//   let minDiff = Infinity;
//
//   for (let i = 1; i < minutes.length; i++) {
//     minDiff = Math.min(minDiff, minutes[minutes.length - 1] + minutes[0]);
//   }
//
//   // 考虑第一个时间和 最后一个时间的差值
//   minDiff = Math.min(minDiff, 24 * 60 - minutes[minutes.length - 1] + minutes[0]);
//   return minDiff
// }





const minFindDifference = (times) => {
  const minutes = times.map(time => {
    const [hours, mins] = time.split(':').map(Number)
    return hours * 60 + mins;
  })

  minutes.sort((a, b) => a - b)

  let minDiff = Infinity;

  for (let i = 1; i < minutes.length; i++) {
    minDiff = Math.min(minDiff, minutes[minutes.length - 1] - minutes[0])
  }

  minDiff = Math.min(minDiff, 24 * 60 - minutes[minutes.length - 1] - minutes[0])
  return minDiff;
}


console.log(minFindDifference(timePoints1), '==11==');
console.log(minFindDifference(timePoints2), '==22==');