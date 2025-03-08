function Test () {
  this.flag = false;
  this.change = () => {
    this.flag = true;
    console.log(button.flag)
  }
}

let button = new Test();
document.addEventListener('click', button.change)
