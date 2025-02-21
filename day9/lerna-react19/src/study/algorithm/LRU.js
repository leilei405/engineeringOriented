// 表示链表中的节点，包含键、值以及指向前后节点的指针
class Node {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.prev = null;
    this.next = null;
  }
}

// LRU缓存
class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = new Map(); // 哈希表
    this.head = new Node(); // 虚拟头节点
    this.tail = new Node(); // 虚拟尾节点
    this.head.next = this.tail; // 头尾相连
    this.tail.prev = this.head;
  }

  // 将节点移动到链表头部
  moveToHead (node) {
    // 检查节点是否已经在链表中
    // if (node.prev && node.next) {
      node.prev.next = node.next;
      node.next.prev = node.prev;
    // }

    node.prev = this.head;
    node.next = this.head.next;
    this.head.next.prev = node;
    this.head.next = node;
  }

  // 移除链表尾部节点
  removeTail () {
    const tailNode = this.tail.prev;
    this.tail.prev = tailNode.prev;
    tailNode.prev.next = this.tail;
    this.cache.delete(tailNode.key) // 从哈希表中删除
  }

  // 获取元素
  get (key) {
    if (!this.cache.has(key)) {
      return -1; // 不存在
    }
    const node = this.cache.get(key);
    this.moveToHead(node); // 移动到头部
    return node.value;
  }

  // 插入元素
  put (key, value) {
    if (this.cache.has(key)) {
      const node = this.cache.get(key);
      node.value = value; // 更新值
      this.moveToHead(node); // 移动到头部
    } else {
      const newNode = new Node(key, value);
      this.cache.set(key, newNode); // 添加到哈希表
      this.moveToHead(newNode); // 插入到链表头部

      if (this.cache.size > this.capacity) {
        this.removeTail(); // 移除尾部节点
      }
    }
  }
}

const lru = new LRUCache(2);
lru.put(1, 1);
lru.put(2, 2);
console.log(lru.get(1)); // 1