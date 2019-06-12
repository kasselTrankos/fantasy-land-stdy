const FL = require('fantasy-land');

function Multiply(value) {
  if(!(this instanceof Multiply)) return new Multiply(value);
  this._value = value;
}
//  Sum.fantasy-land/empty :: () -> Sum
Multiply[FL.empty] = function() { return Multiply (1); };

Multiply.prototype[FL.concat] = function (a) {
  return new Multiply(a._value * this._value);
}