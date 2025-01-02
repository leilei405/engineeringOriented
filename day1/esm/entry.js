import { handle, api } from './api.js'
import sum from './sum.js'

// 使用ESM 规范 导入时 必须加后缀名 否则404

const data  = api();
const a = handle(data, 'a');
const b = handle(data, 'b');
const sum1 = sum(a, b);
console.log(sum1, '===sum===')