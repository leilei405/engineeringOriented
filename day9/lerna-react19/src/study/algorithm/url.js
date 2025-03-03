const url = "https://www.aliexpress.com?a=1&b=2#p=bottom";

const parseUrl = (url) => {
  // 提取查询字符串
  const params = {};
  const queryString = url.split("?")[1]?.split("#")[0];
  if (queryString) {
    const urlParams = new URLSearchParams(queryString);
    console.log(urlParams.entries());

    for (const [key, value] of urlParams.entries()) {
      params[key] = value;
    }
  }

  return params;
};

console.log(parseUrl(url));
