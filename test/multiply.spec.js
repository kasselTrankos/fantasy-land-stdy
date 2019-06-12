const {expect} = require('chai');
const FL = require('fantasy-land');

const {Multiply} = require('./../Multiply'); 
describe('Multiply', function () {
 it('Expect Fantasy land concat works ....', () => {
    const seven = new Multiply(7);
    const twelve = new Multiply(12);
    expect(seven[FL.concat](twelve).value).to.be.equal(84);
  });

});