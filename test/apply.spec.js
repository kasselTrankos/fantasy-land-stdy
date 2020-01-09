const {expect} = require('chai');
const FL = require('fantasy-land');
const {map} = require('ramda');
const Z = require ('sanctuary-type-classes');

const Apply = require('./../Apply'); 
describe('Apply => ',  () => {

  it('mmmm', () => {
    // Array.prototype.ap = function (fs) {
    //     return [].concat(... fs.map(
    //       f => this.map(f)
    //     ))
    //   }
    // const f = u => u + 12;
    // const o = o => o + 90;
    // const a = Apply(8);
    // const b = Apply(10);
    // const lift2 = f => as => bs => 
    //     as[FL.map](a => bs[FL.map](b => f(a)(b)))
    // // const c = a[FL.ap](b)
    // const lift2a = f => as => bs => 
    //     as.map(a => bs.map(b => f(a)(b)))
    // // const c = a[FL.ap](b)
    // const m = lift2(x => y => x + y)
    //  (Apply(2))

    //  (Apply(3))
    // const n  = lift2a(x => y => x + y)([1, 2 ,2])([8, 9, 10]);
    // console.log(Apply(x => x +1).ap())

  });
  it('manual container', ()=> {
    class Maybe {
        static of(x) {
          return new Maybe(x);
        }
      
        get isNothing() {
          return this.$value === null || this.$value === undefined;
        }
      
        get isJust() {
          return !this.isNothing;
        }
      
        constructor(x) {
          this.$value = x;
        }
      
        ap(f) {
          return this.isNothing ? this : f.map(this.$value);
        }
      
        chain(fn) {
          return this.map(fn).join();
        }
      
        inspect() {
          return this.isNothing ? 'Nothing' : `Just(${inspect(this.$value)})`;
        }
      
        getType() {
          return `(Maybe ${this.isJust ? getType(this.$value) : '?'})`;
        }
      
        join() {
          return this.isNothing ? this : this.$value;
        }
      
        map(fn) {
          return this.isNothing ? this : Maybe.of(fn(this.$value));
        }
      
        sequence(of) {
          return this.traverse(of, x => x);
        }
      
        traverse(of, fn) {
          return this.isNothing ? of(this) : fn(this.$value).map(Maybe.of);
        }
      }
      const add = x => y => x + y;
      Container = function(x) {
        this.x = x;
      }
      Container.of = function(x) { 
        return new Container(x); 
        };
      Container.prototype.map = function(f){
        return Container.of(f(this.x))
      }
      Container.prototype.ap = function(o) {
        return o.map(this.x)
      }
    //   console.log(Container.of(2).map(x => x + 9), '00000000')
    console.log(Container.of(add).ap(Container.of(1113)).ap(Container.of(1113)));
    console.log(Maybe.of(a=>b=>c=> a + b + c).ap(Maybe.of(2)).ap(Maybe.of(2)).ap(Maybe.of(2)))
    //   console.log(Container.of(2).map(add).ap(Container.of(3)));
  });
});