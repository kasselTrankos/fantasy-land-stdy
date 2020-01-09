'use strict';
const {map, ap} = require('fantasy-land');
const {tagged} = require('daggy');
const  Apply = tagged('x');
Apply.prototype[map] = Apply.prototype.map =  function(f){
    return new Apply(f(this.x));
}
Apply.prototype[ap] = Apply.prototype.ap =  function(functor) {
    return new Apply(functor.x(this.x))
}
module.exports = Apply;
