const {expect} = require('chai');
const FL = require('fantasy-land');
const {map} = require('ramda');
const Z = require ('sanctuary-type-classes');
var fs = require('fs')

const Future = require('../Future');
const Task = require('data.task');
const callLeft = (fn, ...args) => (...remainingArgs) =>
      fn(...args, ...remainingArgs); // fn === foldArray((a, b) => a + b, 0, [1,2,3,4...])
const foldArrayWith = (fn, terminalValue, [first, ...rest]) => /// ((a, b) => a + b, 0, [1,2,3,4....])
  first === undefined
    ? terminalValue
    : fn(first, foldArrayWith(fn, terminalValue, rest)); // aquí mismo suma con recursividad fn =  (a, b) => a + b
    // y con el call by value lo hace en profundis como un linked-list
const arraySum = callLeft(foldArrayWith, (a, b) => a + b, 0); 

describe('Future', ()=> {
  it('tortoise and hare -> turltle and rabbit', ()=> {
    const EMPTY = null;
    const isEmpty = (node) => node === EMPTY;
    const pair = (first, rest = EMPTY) => ({first, rest});

    const list = (...elements) => { const [first, ...rest] = elements;
      return elements.length === 0 ? EMPTY
          : pair(first, list(...rest))
      }
      
    const teleportingTurtle = (list) => { 
      let speed = 1,
      rabbit = list,
      turtle = rabbit,
      reinit = 0;

      while (true) {
        for (let i = 0; i <= speed; i += 1) {
          console.log('RABBIT ', rabbit, 'I:', i, 'REINIT:' ,reinit, 'SPEED', speed);
          rabbit = rabbit.rest;
          if (rabbit == null) {
            console.log(' estamos al final', rabbit);
            return false; 
          }
          if (rabbit === turtle) { 
            console.log('encuentro turtle lo circular', speed, reinit, turtle, rabbit);
            return true;
          } 
        }
        turtle = rabbit;
        speed *= 2;
        reinit++;
      }
      return false; 
    };
    const forceAppend = (list1, list2) => { 
      if (isEmpty(list1)) {
        return "FAIL!" }
      if (isEmpty(list1.rest)) { 
        list1.rest = list2;
      } else {
        forceAppend(list1.rest, list2);
      }
    }
    const aList = list(1, 2, 3, 4, 5, 6);
    // console.log(aList, '111111');
    // console.log(aList.rest, '111111');
    // console.log(aList.rest.rest, '111111');
    const K = x => y => x;
    const I = x => x;
    // const V = x => y => fn => console.log(typeof fn);
    const V = x => y => fn => fn(x)(y);
    const T = x => f => f(x);
    // IIEF
    
    const Y = f => (x => f(v => x(x)(v)))(x => f(v => x(x)(v)));
    /// partial aplication
    // 1 argument function f
    // f = function (fac) { 
    //   return function (n) {
    //     return (n == 0 ? 1 : n * fac(n - 1)); 
    //   }
    // }
    // al ser IIEF el segundo argumento es la misma function x =>  f(v => x(x)(v))
    // luego x es f(v => x(x)(v)) y se ejecuta debido al IIFE
    // así pues cuando se llama f con fact es v => x(x)(v)
    // al pasarle como argumento a si misma empieza la recursivadad ella sola
    // if fn then then fn Paradoja de curry. No valida lo da por valido solo semanticamente
    // al pasarse a si misma se eecuta siendo x == si misma
    // luego devuelve la ejecucion de la funcion que lleva la lógica f( )
    // en caso factorial ejecuta f la cual devuelve una nueva funcion
    // f = function (fac) { 
    //   return function (n) {
    //     return (n == 0 ? 1 : n * fac(n - 1)); 
    //   }
    // }
    // al ser arrow seria más bien
    // return function (n) {
    //   return (n == 0 ? 1 : n * fac(n - 1)); }
    // }
    // y entonces el v de Y es el n de factorial
    // pero no se ejecuta parece que es un wrapper, estariamos esperando la entrada de la variable
    // aún seguimos aquí Y(fact)
    // necesita n que en Y es v que seria Y(fact)(3) en mi caso práctico
    // que pasa entonces
    // x = fact
    // f = function (fac) { 
    //   return function (n) {
    //     return (n == 0 ? 1 : n * fac(n - 1)); 
    //   }
    // }
    // x(x)(v)
    // fact(fact)(3)

    // translation
    function Y_ (f) {
      return (function (fn_) {
        return f(function(v) {
          return fn_(fn_)(v);
        })
      })(function (fn_) {
        return f(function(v) {
          return fn_(fn_)(v);
        })
      })
    }
    // (x=fn')(fn')
    // 2 invocacion partial application then is v v => value
    const _Y = (f) => {
      const something = x => f(v => x(x)(v));// claro x es si misma es luego somenthing en la siguiente linea
      // x == something
      // es la ejecucion f (con una function) 
      //value => somethig(something)(value)
      return something(something);  // 
    };
    const fac = _Y( function (fac) { 
      return function (n) {
        return (n == 0 ? 1 : n * fac(n - 1)); 
      }
    });

    const pairs = V('uno')('dos');
    console.log(':',K(8)(9), '00000', K(I)(10)(11), ' V: ', pairs(K(I)), K, I, '1111111');
    console.log('trash', T(1)(x=> x +1));
    console.log('factorial(3)', fac(3));
    console.log('Symbol', Symbol);
    // console.log(teleportingTurtle(aList), '22222');
    // forceAppend(aList, aList.rest.rest.rest.rest);
    // console.log(aList.rest, '444444')
    // console.log(aList.rest.rest, '444444')
    // console.log(aList.rest.rest.rest, '444444')
    // console.log(aList.rest.rest.rest.rest, '444444')
    // console.log(teleportingTurtle(aList), '777777');
  });
  it('arrrgg basic promise thgidb', ()=> {
    const a = arraySum([1, 4, 9, 16, 25, 90000]);
    console.log(a, '00000');
  //   const read =  (path) => {
  //     return new Future(function(reject, resolve) {
  //       fs.readFile(path, function(error, data) {
  //         console.log('99999999')
  //         if (error)  reject(error)
  //         else        resolve(data)
  //       })
  //     })
  //   }
  //   const readF =  (path) => {
  //     return new Task(function(reject, resolve) {
  //       fs.readFile(path, function(error, data) {
  //         console.log('99999999')
  //         if (error)  reject(error)
  //         else        resolve(data)
  //       })
  //     })
  //   }

  //   // decode : Task(Error, Buffer) -> Task(Error, String)
  //   function decode(task) {
  //     return task.map(function (buffer) {
  //       return buffer.toString('utf-8')
  //     });
  //   }


  //   const _read = read('package.json').map(buffer=> buffer.toString('utf-8'));
  //   const _readF = readF('package.json');
  //   console.log(_read, '11111111');
  //   console.log(_readF, 'aaaaa');

  //   const r = _read.fork((err) => console.log(err, '22222'), ok=> console.log(ok, '333333'));
  //   console.log(r, 'oooooo no')
  });
});