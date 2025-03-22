const arr = [
  { id: 1, name: '部门A', parentId: 0 },
  { id: 2, name: '部门B', parentId: 1 },
  { id: 3, name: '部门C', parentId: 1 },
  { id: 4, name: '部门D', parentId: 2 },
  { id: 5, name: '部门E', parentId: 2 },
  { id: 6, name: '部门F', parentId: 3 }
];

function treeNode1 (arr) {
  let map = {};
  let result = []
  arr.forEach(item => {
    map[item.id] = { ...item, children: [] }
  })

  arr.forEach(item => {
    if (item.parentId !== 0) {
      map[item.parentId].children.push(map[item.id]);
    } else {
      result.push(map[item.id]);
    }
  })
  return result;
}
// console.log(treeNode1(arr), '==方法1==');

function treeNode2 (arr) {
  let map = new Map();
  let result = [];

  arr.forEach(item => {
    item.children = [];
    map.set(item.id, item);
  })

  arr.forEach(item => {
    let parentNode = map.get(item.parentId);
    if (parentNode) {
      parentNode.children.push(item);
    } else {
      result.push(item);
    }
  })

  return result;
}

// console.log(treeNode2(arr), '====')


function treeNode3 (arr, parentId = 0) {
  let result = [];

  arr.forEach(item => {
    if (item.parentId === parentId) {
      const children = treeNode3(arr, item.id);
      if (children.length > 0) {
        item.children = children;
      }
      result.push(item);
    }
  })

  return result;
}

console.log(treeNode3(arr), '===')