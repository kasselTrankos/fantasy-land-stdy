const {expect} = require('chai');
const {concat} = require('fantasy-land');
const laws = require('fantasy-laws');
const jsc = require ('jsverify');
const show = require ('sanctuary-show');
const Z = require ('sanctuary-type-classes');

const Multiply = require('./../Multiply'); 
const MultiplyArb = jsc.number.smap(Multiply, multiply => multiply.value, show);
const {leftIdentity, rightIdentity} = laws.Monoid(Z.equals, Multiply);
const testRightIdentity = rightIdentity (MultiplyArb);
const testLeftIdentity = leftIdentity (MultiplyArb);
describe('Multiply => ',  () => {
  it('testRightIdentity', testRightIdentity);
  it('testLeftIdentity', testLeftIdentity);
});