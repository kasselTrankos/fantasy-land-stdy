const {expect} = require('chai');
const {concat, empty} = require('fantasy-land');
const laws = require('fantasy-laws');
const jsc = require ('jsverify');
const show = require ('sanctuary-show');
const Z = require ('sanctuary-type-classes');

const Multiply = require('./../Multiply'); 

const Arb = arb =>
  jsc.oneof (jsc.constant(Multiply[empty]),
             arb.smap (Multiply, multiply => multiply.value, show));
const MultiplyArb = jsc.number.smap(Multiply, multiply => multiply.value, show);
const {leftIdentity, rightIdentity} = laws.Monoid(Z.equals, Multiply);
const {associativity} = laws.Semigroup(Z.equals, Multiply);
const {leftInverse, rightInverse} =laws.Group(Z.equals, Multiply);
// console.log(laws.Group(Z.equals, Multiply))
const testRightIdentity = rightIdentity (MultiplyArb);
const testLeftIdentity = leftIdentity (MultiplyArb);
const testLeftInverse = leftInverse (MultiplyArb);
const testRightInverse = rightInverse (MultiplyArb);

const testAssociativity = associativity (MultiplyArb, MultiplyArb, MultiplyArb);
describe('Multiply => ',  () => {
  it('testRightIdentity', testRightIdentity);
  it('testLeftIdentity', testLeftIdentity);
  it('testAssociativity', testAssociativity);
  it('testLeftInverse', testLeftInverse);
  it('testRightInverse', testRightInverse);
});