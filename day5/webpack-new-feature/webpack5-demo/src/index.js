import data from 'data:text/javascript, export default "hello world"';

console.log(data, '====')
import { createApp } from 'vue'
console.log('hello webpack5')

createApp({})

const icon = require('./assets/img.png');
const img = document.createElement('img');
img.src = icon;
document.body.insertBefore(img, document.body.firstChild);
import './lib.js'
import 'vue'
console.log('1111')