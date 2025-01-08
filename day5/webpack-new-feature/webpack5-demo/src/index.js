import { createApp } from 'vue'
console.log('hello webpack5')

createApp({})

const icon = require('./assets/img.png');
const img = document.createElement('img');
img.src = icon;
document.body.insertBefore(img, document.body.firstChild);
