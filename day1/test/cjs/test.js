let a = 1;

exports.a = a;
exports.insert = function() {
  a++;
}
exports.get = function() {
  return a;
}