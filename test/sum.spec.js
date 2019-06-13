const {expect} = require('chai');
const {concat, empty} = require('fantasy-land');
const laws = require('fantasy-laws');
const jsc = require ('jsverify');
const show = require ('sanctuary-show');
const Z = require ('sanctuary-type-classes');

const Sum = require('./../Sum'); 

const SumArb = jsc.number.smap(Sum, multiply => multiply.value, show);
const {leftIdentity, rightIdentity} = laws.Monoid(Z.equals, Sum);
const {associativity} = laws.Semigroup(Z.equals, Sum);
const {leftInverse, rightInverse} =laws.Group(Z.equals, Sum);
// console.log(laws.Group(Z.equals, Sum))
const testRightIdentity = rightIdentity (SumArb);
const testLeftIdentity = leftIdentity (SumArb);
const testLeftInverse = leftInverse (SumArb);
const testRightInverse = rightInverse (SumArb);

const testAssociativity = associativity (SumArb, SumArb, SumArb);
describe('Sum => ',  () => {
  it('testRightIdentity', testRightIdentity);
  it('testLeftIdentity', testLeftIdentity);
  it('testAssociativity', testAssociativity);
  it('testLeftInverse', testLeftInverse);
  it('testRightInverse', testRightInverse);
});