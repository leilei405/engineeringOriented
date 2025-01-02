// 处理后端接口
function handleData (data, key) {
  if (data.code === 0) {
    return data.data[key]
  }
}

export default handleData;
