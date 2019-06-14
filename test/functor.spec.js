const {expect} = require('chai');
const FL = require('fantasy-land');
const {map} = require('ramda');
const Z = require ('sanctuary-type-classes');

const Functor = require('./../Functor'); 
describe('Functor => ',  () => {
  it('testIdentity', () => {
    const f = Functor({a: 12});
    expect(f instanceof Functor).to.be.true;
   });
  it('testComposition', () => {
    const plus2 = x => x + 2;
    const a = Functor({a :12});
    const option1 = map(plus2, a);
    const option2 = a[FL.map](plus2);
    expect(option1.object.a).to.be.equal(option2.object.a);
    expect(Z.Functor.test(Functor)).to.be.true;
    expect(option1 instanceof Functor).to.be.true;
    expect(option2 instanceof Functor).to.be.true;
  })
});