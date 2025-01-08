// import data from 'data:text/javascript, export default "hello world"';
// console.log(data, '====')
import './lib'
console.log('hello webpack4');
console.log('1111');

const icon = require('./assets/img.png');
const img = document.createElement('img');
img.src = icon;
document.body.insertBefore(img, document.body.firstChild);
