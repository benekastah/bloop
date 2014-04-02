
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

var _slice = Array.prototype.slice;
exports.bind = function (fn, scope) {
    var args = _slice.call(arguments, 2);
    return function () {
        return fn.apply(scope, args.concat(_slice.call(arguments)));
    };
};

exports.Context = (function () {
    function Context(g) {
        this.stack = [g || exports.clone(null)];
    }

    var proto = Context.prototype;

    proto.last = function () {
        return this.stack[this.stack.length - 1];
    };

    proto.push = function () {
        this.stack.push(exports.clone(this.last()));
    };

    proto.pop = function () {
        this.stack.pop();
    };

    proto.has = function (name) {
        return name in this.last();
    };

    proto.get = function (name) {
        if (!this.has(name)) {
            throw new Error('Undefined variable: ' + name);
        }
        return this.last()[name];
    };

    proto.set = function (name, val) {
        var ctx;
        if (this.has(name)) {
            for (var i = this.stack.length - 1; i >= 0; i--) {
                if (name in this.stack[i]) {
                    ctx = this.stack[i];
                } else {
                    break;
                }
            }
        } else {
            ctx = this.last();
        }
        ctx[name] = val;
    };

    proto.setGlobal = function (name, val) {
        this.stack[0][name] = val;
    };

    return Context;
})();

// vim: ts=4 sts=4 sw=4 et
