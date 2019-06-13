'use strict';
const {empty, of, concat, equals, invert} = require('fantasy-land');
const {tagged} = require('daggy');
const  Multiplicity = tagged('value');


Multiplicity[of] = value => Multiplicity(value);
Multiplicity[empty] = () => Multiplicity(1);

Multiplicity.prototype[equals] = function(y) {
  return this.value === y.value;
};
Multiplicity.prototype[concat] = function(that) {
  return Multiplicity(this.value * that.value);
};
Multiplicity.prototype[invert] = function() {
  return Multiplicity(1/this.value);
};

module.exports = Multiplicity;