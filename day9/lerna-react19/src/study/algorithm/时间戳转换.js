function unixTimestampToStr(timestamp) {
  // 先将毫秒转换为秒
  timestamp = Math.floor(timestamp / 1000);
  // 定义判断闰年的函数
  function isLeapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
  }

  // 每月的天数
  const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  // 计算秒、分、时、天
  const seconds = timestamp % 60;
  const minutes = Math.floor((timestamp / 60)) % 60;
  const hours = Math.floor((timestamp / 3600)) % 24;
  let days = Math.floor(timestamp / 86400);

  // 从1970年开始计算年份
  let year = 1970;
  while (true) {
    const daysInYear = isLeapYear(year) ? 366 : 365;
    if (days < daysInYear) {
      break;
    }
    days -= daysInYear;
    year++;
  }

  // 计算月份
  let month = 1;
  while (true) {
    const currentDays = month === 2 && isLeapYear(year) ? 29 : daysInMonth[month - 1];
    if (days < currentDays) {
      break;
    }
    days -= currentDays;
    month++;
  }

  // 计算日期
  const day = days + 1;

  // 格式化时间字符串
  return `${year.toString().padStart(4, '0')}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')} ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

console.log(unixTimestampToStr('1741929912734'))