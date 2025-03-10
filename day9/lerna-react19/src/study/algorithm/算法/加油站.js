const canCompleteCircuit = (gas, cost) => {
  let totalTank = 0; // 总油量-消耗的差值
  let currTank = 0;  // 当前油箱剩余量
  let startStation = 0; // 起始的起点

  for (let i = 0; i < gas.length; i++) {
    const diff = gas[i] - cost[i];

    // 更新总油量和当前油量
    totalTank += diff;
    currTank += diff;

    // 如果当前油量小于 0， 说明从当前起点到这里不可行
    if (currTank < 0) {
      startStation = i + 1;
      currTank = 0;
    }
  }

  return totalTank >=0 ? startStation : -1;
};

// const gas1 = [1,2,3,4,5];
// const gas1 = [2,3,4];
// const cost2 = [3,4,5,1,2];
// const cost2 = [3,4,3];
// console.log(canCompleteCircuit(gas1, cost1))




function ff (gas, cost) {
  let total = 0;
  let current = 0;
  let startStation = 0;

  for (let i = 0; i < gas.length; i++) {
    const diff = gas[i] - cost[i];

    total += diff;
    current += diff;

    if (current < 0) {
      startStation = i + 1;
      current = 0;
    }
  }

  return total >= 0 ? startStation : -1
}

// console.log(ff(gas, cost))








function cc(gas, cost) {
  let total = 0;
  let current = 0;
  let startStation = 0;

  for (let i = 0; i < gas.length; i++) {
    const diff = gas[i] - cost[i];

    total += diff;
    current += diff;

    if (current < 0) {
      startStation = i + 1
      current = 0;
    }
  }

  return total > 0 ? startStation : -1;
}

console.log(cc(gas, cost))



















