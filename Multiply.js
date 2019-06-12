const FL = require('fantasy-land');
// modo js prototype
// function Multiply(value) {
//   if(!(this instanceof Multiply)) return new Multiply(value);
//   this._value = value;
// }
// //  Sum.fantasy-land/empty :: () -> Sum
// Multiply[FL.empty] = function() { return Multiply (1); };

// Multiply.prototype[FL.concat] = function (a) {
//   return new Multiply(a._value * this._value);
// }

class Multiply {
  constructor(value){
    this.value = value;
  }
  // ***  Monoid ADT : debe cumplir empty, y concat
  // antasy-land/empty
  static [FL.empty]() { return new Multiply(1); };
  // fantasy-land/concat
  [FL.concat](a) {
    return new Multiply(a.value * this.value);
  }
  
  inspect() {
    return this.value;
  }
}


module.exports = {Multiply};