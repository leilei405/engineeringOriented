(function yasuoString () {
  let caseStr = 'aaabbbcddddd';
  let res = '';
  let count = 1;
  let current = caseStr[0];
  for (let i = 1; i < caseStr.length; i++) {
    console.log(caseStr[i], current, caseStr[i] !== current, '===caseStr[i] !== current===')
    if (caseStr[i] !== current) {
      res += `${current}${count}`;
      current = caseStr[i];
      count = 1;
    } else {
      count++;
    }
  }
  res += `${current}${count}`;
  console.log(res)
})()