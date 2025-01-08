import data from 'data:text/javascript, export default "hello world"';

console.log(data, '====')
console.log('hello webpack4');

const icon = require('./assets/img.png');
const img = document.createElement('img');
img.src = icon;
document.body.insertBefore(img, document.body.firstChild);
