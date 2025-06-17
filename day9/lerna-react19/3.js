// 版本号比较
function compareVersions(versionA, versionB) {
  const partsA = versionA.split('.');
  const partsB = versionB.split('.');

  for (let i = 0; i < Math.max(partsA.length, partsB.length); i++) {
    const partA = parseInt(partsA[i] || 0);
    const partB = parseInt(partsB[i] || 0);
    if (partA > partB) {
      return -1;
    } else if (partA < partB) {
      return 1;
    }
  }
  return 0;
}

console.log(compareVersions('0.1.1', '0.1.1'),'===')

// URL查询参数获取
// https://eleduck.com/search?keyword=%E5%89%8D%E7%AB%AF%E5%BC%80%E5%8F%91&sort=new
function queryParams (url) {
  if (!url) {
    console.log('请输入有效的url！！！');
    return
  }
  const afterParams = url.split('?');
  if (!afterParams[1]) {
    console.log('未查询到参数！！！')
    return
  }
  const beforeParams = afterParams[1].split('&');
  let result = {}
  beforeParams.forEach(item => {
    const [key, value] = item.split('=');
    result[key] = decodeURIComponent(value)
  })

  return result;
}

console.log(queryParams('https://eleduck.com/search?keyword=%E5%89%8D%E7%AB%AF%E5%BC%80%E5%8F%91&sort=new'), '=====')