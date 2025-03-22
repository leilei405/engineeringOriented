setTimeout(() => {
  Promise.resolve().then(() => {
    console.log(2);
  })

  setTimeout(() => {
    console.log(3);
  })

  console.log(1)
})

console.log(4);

setTimeout(() => {
  console.log(5)
})