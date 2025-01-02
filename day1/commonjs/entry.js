const { handle, api } = require('./api.js');
const sum = require('./sum.js');

const data  = api();
const a = handle(data, 'a');
const b = handle(data, 'b');
const sum1 = sum(a, b);
console.log(sum1, '===sum===')