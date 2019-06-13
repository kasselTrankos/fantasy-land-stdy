const {expect} = require('chai');
const {concat, empty} = require('fantasy-land');
const laws = require('fantasy-laws');
const jsc = require ('jsverify');
const show = require ('sanctuary-show');
const Z = require ('sanctuary-type-classes');

const Multiplicity = require('./../Multiplicity'); 

const MultiplyArb = jsc.number.smap(Multiplicity, multiply => multiply.value, show);
const {leftIdentity, rightIdentity} = laws.Monoid(Z.equals, Multiplicity);
const {associativity} = laws.Semigroup(Z.equals, Multiplicity);
const {leftInverse, rightInverse} =laws.Group(Z.equals, Multiplicity);
// console.log(laws.Group(Z.equals, Multiplicity))
const testRightIdentity = rightIdentity (MultiplyArb);
const testLeftIdentity = leftIdentity (MultiplyArb);
const testLeftInverse = leftInverse (MultiplyArb);
const testRightInverse = rightInverse (MultiplyArb);

const testAssociativity = associativity (MultiplyArb, MultiplyArb, MultiplyArb);
describe('Multiplicity => ',  () => {
  it('testRightIdentity', testRightIdentity);
  it('testLeftIdentity', testLeftIdentity);
  it('testAssociativity', testAssociativity);
  it('testLeftInverse', testLeftInverse);
  it('testRightInverse', testRightInverse);
});