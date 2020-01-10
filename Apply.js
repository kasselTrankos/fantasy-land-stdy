'use strict';
const {map, ap, alt, of} = require('fantasy-land');
const {tagged, taggedSum} = require('daggy');
const  Apply = tagged('Apply', ['x']);
Apply.prototype[map] = Apply.prototype.map =  function(f){
    return new Apply(f(this.x));
}
Apply.prototype[ap] = Apply.prototype.ap =  function(functor) {
    return new Apply(functor.x(this.x))
}


const Alt = taggedSum('Alt', {
    Just: this,
    Nothing: ['alt']
  });
Alt.prototype[of] = Alt.prototype.of = function(b) {
    return Alt.Just(b)
}
Alt.prototype[alt] = Alt.prototype.alt = function(alt) {
    return this.cata({
        Just: _ => this,
        Nothing: alt
    });
}
const Maybe = taggedSum('Maybe' ,{ Just: ['x'], Nothing: [] })
Maybe.prototype[alt] = Maybe.prototype.alt = function(alt) {
    console.log('ALTERMN', alt);
    return this.cata({
        Just: _ => this,
        Nothing:() => alt
    });
}
Maybe.prototype[map] = Maybe.prototype.map = function (f) {
    return this.cata({
      Just: x => Maybe.Just(f(x)),
      Nothing: () => Maybe.Nothing,
    })
  }


module.exports = {Apply, Alt, Maybe};