const FL = require('fantasy-land');
const Z = require ('sanctuary-type-classes');
// modo js prototype
function Multiply(value) {
  if(!(this instanceof Multiply)) return new Multiply(value);
  this.value = value;
}
//  Sum.fantasy-land/empty :: () -> Sum
Multiply[FL.empty] = function() { return Multiply (0); };

Multiply.prototype[FL.concat] = function (a) {
  return Multiply(a.value * this.value);
};
//  Multiply#fantasy-land/invert :: Multiply ~> () -> Multiply
Multiply.prototype[FL.invert] = function () {
  return Multiply(0);
};
Multiply.prototype[FL.equals] = function (a) {
  return Z.equals (this.value, a.value);
};
// Multiply.prototype[FL.compose] = function (a) {
//   const Multiply = this;
//   return function(b) {return a(Multiply(b));};
// };
// function Function$prototype$compose(other) {
//   var semigroupoid = this;
//   return function(x) { return other (semigroupoid (x)); };
// }

// class Multiply {
//   constructor(value){
//     this.value = value;
//   }
//   // ***  Monoid ADT : debe cumplir empty, y concat
//   // antasy-land/empty
//   [FL.empty]() { return new Multiply(1); };
//   // fantasy-land/concat
//   [FL.concat](a) {
//     return new Multiply(a.value * this.value);
//   }
//   [FL.equals](a) {
//     return Z.equals (this.value, a.value);
//   }
//   [FL.invert]() {
//     return new Multiply(1/this.value);
//   }
  
//   inspect() {
//     return this.value;
//   }
// }


module.exports = {Multiply};