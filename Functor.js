'use strict';
const {map, of} = require('fantasy-land');
const {tagged} = require('daggy');
const  Functor = tagged('object');
Functor[of] = object => Functor(object);
Functor.prototype[map] = function(f) {
  const mapped = { }
  for (const key of Object.keys(this.object)) {
    mapped[key] = f(this.object[key]);
  }
  return new Functor(mapped)
}
module.exports = Functor;