const {expect} = require('chai');
const {concat, empty} = require('fantasy-land');
const laws = require('fantasy-laws');
const jsc = require ('jsverify');
const show = require ('sanctuary-show');
const Z = require ('sanctuary-type-classes');

const Multiplicity = require('./../Multiplicity'); 

const MultiplyArb = jsc.integer.smap(Multiplicity, multiply => multiply.value, show);
const {leftIdentity, rightIdentity} = laws.Monoid(Z.equals, Multiplicity);
const {associativity} = laws.Semigroup(Z.equals, Multiplicity);
const testAssociativity = associativity (MultiplyArb, MultiplyArb, MultiplyArb);
const testRightIdentity = rightIdentity (MultiplyArb);
const testLeftIdentity = leftIdentity (MultiplyArb);
describe('Multiplicity => ',  () => {
  it('testRightIdentity', testRightIdentity);
  it('testLeftIdentity', testLeftIdentity);
  it('testAssociativity', testAssociativity);
});