const source = [
  {id: 1, name: "山月", sex: "male"},
  {id: 2, name: "张三", sex: "female"},
  {id: 3, name: "李四", sex: "female"},
]

const target = {
  male: [
    { id: 1, name: "山月", sex: "male" }
  ],
  female: [
    {id: 2, name: "张三", sex: "female"},
    {id: 3, name: "李四", sex: "female"},
  ]
}

/**
 * 将数组按照指定字段进行分组
 * @param {Array} array - 要进行分组的数组
 * @param {string} key - 分组依据的字段名
 * @returns {Object} - 分组后的对象，键为字段值，值为包含对应元素的数组
 */
function groupBy(array, key) {
  return array.reduce((acc, item) => {
    const groupKey = item[key];
    console.log(groupKey, '===')
    if (!acc[groupKey]) {
      acc[groupKey] = [];
    }
    acc[groupKey].push(item);
    return acc;
  }, {});
}

const grouped = groupBy(source, 'sex');
console.log(grouped);