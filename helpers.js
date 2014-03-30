
var util = require('util');

exports.clone = Object.create || function (o) {
  function _Object() {}
  _Object.prototype = o;
  return new _Object;
};

exports.keys = Object.keys || function (o) {
  var keys = [];
  for (var prop in o) {
    if (o.hasOwnProperty(prop)) {
      keys.push(prop);
    }
  }
  return keys;
};

var _toString = Object.prototype.toString;
exports.type = function (x) {
  var t = _toString.call(x);
  return t.substring(8, t.length - 1);
};

exports.log = function (o) {
  console.log(util.inspect(o, {depth: 100, colors: true}));
};

// vim: ts=2 sts=2 sw=2 et
