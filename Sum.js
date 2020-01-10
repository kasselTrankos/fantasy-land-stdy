'use strict';
const {empty, of, concat, equals, invert} = require('fantasy-land');
const {tagged} = require('daggy');
const  Sum = tagged('Sum', ['value']);


Sum[of] = value => Sum(value);
Sum[empty] = () => Sum(0);

Sum.prototype[equals] = function(y) {
  return this.value === y.value;
};
Sum.prototype[concat] = function(y) {
  return Sum(this.value + y.value);
};
Sum.prototype[invert] = function() {
  return Sum(-this.value);
};

module.exports = Sum;