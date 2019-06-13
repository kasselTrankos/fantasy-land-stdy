'use strict';
const {empty, of, concat, equals, compose} = require('fantasy-land');
const {tagged} = require('daggy');
const  Multiply = tagged('value');


Multiply[of] = value => Multiply(value);
Multiply[empty] = () => Multiply(1);

Multiply.prototype[equals] = function(y) {
  return this.value === y.value;
};
Multiply.prototype[concat] = function(y) {
  return Multiply(this.value * y.value);
};
Multiply.prototype[compose] = function (that) {
  return value => that(this(value))
}




module.exports = Multiply;