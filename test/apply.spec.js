const {expect} = require('chai');
const FL = require('fantasy-land');
const {map} = require('ramda');
const Z = require ('sanctuary-type-classes');

const {Apply, Alt, Maybe} = require('./../Apply'); 
describe('Maybe', ()=> {
  it('maybeeee', ()=> {
    const {Nothing, Just} = Maybe;
    // const c = Alt.of(10);
    // console.log(Alt(undefined).alt(c))
    console.log(Just(3), Nothing, '11111');
  });
});
// describe('Apply => ',  () => {

//   it('mmmm', () => {
//     // Array.prototype.ap = function (fs) {
//     //     return [].concat(... fs.map(
//     //       f => this.map(f)
//     //     ))
//     //   }
//     // const f = u => u + 12;
//     // const o = o => o + 90;
//     // const a = Apply(8);
//     // const b = Apply(10);
//     // const lift2 = f => as => bs => 
//     //     as[FL.map](a => bs[FL.map](b => f(a)(b)))
//     // // const c = a[FL.ap](b)
//     // const lift2a = f => as => bs => 
//     //     as.map(a => bs.map(b => f(a)(b)))
//     // // const c = a[FL.ap](b)
//     // const m = lift2(x => y => x + y)
//     //  (Apply(2))

//     //  (Apply(3))
//     // const n  = lift2a(x => y => x + y)([1, 2 ,2])([8, 9, 10]);
//     // console.log(Apply(x => x +1).ap())

//   });
//   it('manual container', ()=> {
//       const add = x => y => x + y;
//       Container = function(x) {
//         this.x = x;
//       }
//       Container.of = function(x) { 
//         return new Container(x); 
//         };
//       Container.prototype.map = function(f){
//         return Container.of(f(this.x))
//       }
//       Container.prototype.ap = function(o) {
//         return o.map(this.x)
//       }
//     console.log(Container.of(add).ap(Container.of(1113)).ap(Container.of(1113)));
//   });
// });