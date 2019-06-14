const {expect} = require('chai');
const {concat, empty} = require('fantasy-land');
const laws = require('fantasy-laws');
const jsc = require ('jsverify');
const show = require ('sanctuary-show');
const Z = require ('sanctuary-type-classes');

const Functor = require('./../Functor'); 

const FunctorArb = jsc.json.smap(Functor, functor => functor.object, show);
console.log(laws.Functor(Z.equals, Functor));
const {identity, composition} = laws.Functor(Z.equals, Functor)
const testIdentity = identity(FunctorArb);
const testComposition = composition(FunctorArb);
describe('Functor => ',  () => {
  it('testIdentity', testIdentity)
  it('testComposition', testComposition)
});