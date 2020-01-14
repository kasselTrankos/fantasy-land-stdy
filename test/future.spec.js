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
      turtle = rabbit;
      while (true) {
        for (let i = 0; i <= speed; i += 1) {
          rabbit = rabbit.rest;
          if (rabbit == null) {
            console.log(' estamos al final', rabbit);
            return false; 
          }
          if (rabbit === turtle) { 
            return true;
          } 
        }
        turtle = rabbit;
        speed *= 2; 
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
    const aList = list(1, 2, 3, 4);
    console.log(aList, '111111');
    console.log(aList.rest, '111111');
    console.log(aList.rest.rest, '111111');

    console.log(teleportingTurtle(aList), '22222');
    forceAppend(aList, aList.rest.rest);
    console.log(aList.rest, '444444')
    console.log(aList.rest.rest, '444444')
    console.log(aList.rest.rest.rest, '444444')
    console.log(aList.rest.rest.rest.rest, '444444')
    console.log(teleportingTurtle(aList), '777777');
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