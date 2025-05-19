// 1. 链表反转 ？
class ListNode {
  constructor(val = 0, next = null) {
    this.val = val;
    this.next = next;
  }
}

function reverseList (head) {
  let prev = null;
  let curr = head;

  while (curr) {
    const nextTemp = curr.next; // 暂存当前节点的下一个节点
    curr.next = prev; // 反转当前节点的指针
    prev = curr; // 移动 prev 和 curr 指针
    curr = nextTemp;
  }
  return prev
}

// 2. 数组反转
function fn (arr) {
  let result = [];
  let i = arr.length - 1;

  while (i >=0) {
    result.push(arr[i]);
    i--;
  }

  return result;
}

// 辅助函数：将数组转换为链表
function arrayToList(arr) {
  let dummy = new ListNode();
  let current = dummy;
  for (let val of arr) {
    current.next = new ListNode(val);
    current = current.next;
  }
  return dummy.next;
}

// 辅助函数：将链表转换为数组
function listToArray(head) {
  let result = [];
  let current = head;
  while (current) {
    result.push(current.val);
    current = current.next;
  }
  return result;
}

// 测试代码
const inputArray = [1, 2, 3, 4, 5];
const head = arrayToList(inputArray);
const reversedHead = reverseList(head);
console.log(listToArray(reversedHead));

// 错误重试。
function retry (url, maxRequest) {
  fetch(url).then(res => {
    return res.json();
  }).then(data => {
    return data.data;
  }).catch(err => {
    if (maxRequest) {
      maxRequest--;
      retry(url)
    }
    console.error(err)
  })
}

class ListNode1 {
  constructor(val = 0, next = null) {
    this.val = val;
    this.next = next;
  }
}

function reverseList1 (head) {
  let prev = null;
  let curr = head;

  while (curr) {
    const tempNext = curr;
    curr.next = prev;
    prev = curr;
    curr = tempNext;
  }

  return prev;
}

function reverseList2 (head) {
  let prev = null;
  let curr = head;

  while (curr) {
    const tempNext = curr;
    curr.next = prev;
    prev = curr;
    curr = tempNext;
  }
  return prev;
}

function reverseList3 (head) {
  let prev = null;
  let curr = head;

  while (curr) {
    const temp = curr;
    curr.next = prev;
    prev = curr;
    curr = temp;
  }

  return prev;
}