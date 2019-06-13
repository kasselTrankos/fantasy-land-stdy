'use strict';
const {empty, of, concat, equals, invert} = require('fantasy-land');
const {tagged} = require('daggy');
const  Multiply = tagged('value');


Multiply[of] = value => Multiply(value);
Multiply[empty] = () => Multiply(0);

Multiply.prototype[equals] = function(y) {
  return this.value === y.value;
};
Multiply.prototype[concat] = function(y) {
  return Multiply(this.value + y.value);
};
Multiply.prototype[invert] = function() {
  return Multiply(-this.value);
};

module.exports = Multiply;