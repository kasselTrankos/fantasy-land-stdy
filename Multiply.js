'use strict';
const {empty, of, concat, equals} = require('fantasy-land');
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



// Multiply[of] = value => Multiply(value)
// // modo js prototype
// //  Sum.fantasy-land/empty :: () -> Sum
// Multiply[empty] = () => Multiply (1);

// Multiply.prototype[concat] = function(that) {
//   return Multiply(that.value * this.value);
// } 
// //  Multiply#fantasy-land/invert :: Multiply ~> () -> Multiply
// // Multiply.prototype[FL.invert] = () => Multiply(0);
// Multiply.prototype[equals] = that =>  this.value === that.value;



module.exports = Multiply;