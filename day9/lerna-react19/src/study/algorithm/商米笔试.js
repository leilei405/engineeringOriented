function Test () {
  this.flag = false;
  this.change = () => {
    this.flag = true;
    console.log(button.flag)
  }
}

// this.change 是箭头函数  没有自己的 this 指向
let button = new Test();
document.addEventListener('click', button.change)
