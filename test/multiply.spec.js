const {expect} = require('chai');
const _  = require('lodash');
const FL = require('fantasy-land');
const laws = require('fantasy-laws');
const jsc = require ('jsverify');
const show = require ('sanctuary-show');
const Z = require ('sanctuary-type-classes');

const {Multiply} = require('./../Multiply'); 
const MultiplyArb = jsc.number.smap(Multiply, multiply => multiply.value, show);
const {associativity}= laws.Semigroup(Z.equals, Multiply);
// const {leftInverse, rightInverse}= laws.Group(Z.equals, Multiply);
// const {leftIdentity, rightIdentity}= laws.Monoid(Z.equals, Multiply);
// console.log(laws.Monoid(Z.equals, Multiply));
// const testReflexivity = laws.Setoid.reflexivity(Z.equals, Multiply);
// console.log(laws.Setoid.reflexivity(Z.equals, Multiply));
// const testLeftInverse = leftInverse (MultiplyArb);
// const testRightInverse = rightInverse (MultiplyArb);
// const testRightIdentity = rightIdentity (MultiplyArb);
const testAssociativity = associativity (MultiplyArb);
// const testAssociativity = associativity (MultiplyArb);
describe('Multiply => ',  () => {
  // it('testRightInverse', testRightInverse);
  // it('testLeftInverse', testLeftInverse);
  // it('testRightIdentity', testRightIdentity);
  it('testAssociativity', testAssociativity);
});