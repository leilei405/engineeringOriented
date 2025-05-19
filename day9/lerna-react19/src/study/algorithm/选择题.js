function LinkedList () {
  this.head = null;
}

LinkedList.prototype.push = function (val) {
  var node = {
    value: val,
    next: null
  }

  if (!this.head) {
    this.head = node;
  } else {
    var current = this.head;
    while (current.next) {
      current = current.next;
    }
    current.next = node
  }
}

var myList = new LinkedList();

myList.push(2);
myList.push(3);
myList.push(4);

// A: null B: 2  C: 3  D: 4