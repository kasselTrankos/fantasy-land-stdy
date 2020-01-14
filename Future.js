const Future = function(computation, cleanup) {
  this.fork = computation;
  this._return = cleanup || function(){};
}

// Task f ~>(a -> b) -> fb
Future.prototype.of = function _of(b) {
  return new Future(function(_, resolve) {
    return resolve(b);
  });
}

Future.of = Future.prototype.of;


Future.prototype.map = function _map(f) {
  const fork = this.fork;
  const _return = this._return
  return new Future(function(reject, resolve) {
    return fork((a)=> reject(a), (b)=> resolve(f(b)));
  }, _return);
}


module.exports = Future;