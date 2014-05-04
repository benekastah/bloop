
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

exports.map = function (a, fn, scope) {
    if (a.map) {
        return a.map(fn, scope);
    } else {
        var result = [];
        for (var i = 0, len = a.length; i < len; i++) {
            result.push(fn.call(scope, a[i], i, a));
        }
        return result;
    }
};

exports.first = function (a) {
    return a[0];
};

exports.last = function (a) {
    return a[a.length - 1];
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
exports.slice = function (a) {
    switch (arguments.length) {
        case 1: return _slice.call(a);
        default: return _slice.apply(a, _slice.call(arguments, 1));
    }
};

exports.bind = function (fn, scope) {
    var args = _slice.call(arguments, 2);
    return function () {
        return fn.apply(scope, args.concat(_slice.call(arguments)));
    };
};

exports.curried = function (fn) {
    return function () {
        if (arguments.length < fn.length) {
            var args = [this].concat(_slice.call(arguments));
            return exports.curried(
                exports.bind.apply(exports.bind, [fn, args]));
        } else {
            return fn.apply(this, arguments);
        }
    };
};

exports.defun = function (obj, name, fn) {
    obj[name] = exports.curried(fn);
};

exports.Context = (function () {
    function Context(g, mutable) {
        if (mutable == null) {
            mutable = true;
        }
        this.mutable = mutable;
        this.stack = [g || exports.clone(null)];
    }

    var proto = Context.prototype;

    proto.first = function () {
        return exports.first(this.stack);
    };

    proto.last = function () {
        return exports.last(this.stack);
    };

    proto.capture = function () {
        return new exports.Context(this.last(), false);
    };

    proto.assertMutable = function () {
        if (!this.mutable) {
            throw new Error('Can\'t modify immutable context');
        }
    };

    proto.push = function () {
        this.assertMutable();
        this.stack.push(exports.clone(this.last()));
    };

    proto.pop = function () {
        this.assertMutable();
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
        this.assertMutable();
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
        this.assertMutable();
        this.stack[0][name] = val;
    };

    return Context;
})();

exports.Argv = (function () {
    var displayArg = function (a) {
        if (a.length > 1) {
            return '--' + a;
        } else {
            return '-' + a;
        }
    };

    function Option(config) {
        this.names = config.names;
        if (!this.names) {
            throw 'The names config property is required';
        }
        this.property = config.property || this.names[0];
        this.helpText = config.helpText || '';
        this.required = config.required;
    }

    Option.prototype.toString = function () {
        var names = this.names.map(displayArg);
        return names.join(', ') + ': ' + this.helpText;
    };

    function ArgumentError(msg) {
        this.message = msg;
    }

    function Argv(config) {
        this.__config = config;
        this.__takenNames = {};
        this.__options = config.options.map(function (config) {
            var opt = new Option(config);
            opt.names.forEach(function (name) {
                if (name in this.__takenNames) {
                    throw 'Option name already taken: ' + name;
                } else {
                    this.__takenNames[name] = true;
                }
            }.bind(this));
            return opt;
        }.bind(this));
    }

    Argv.prototype.catchErr = function (fn) {
        try {
            fn.call(this);
        } catch (e) {
            if (e instanceof ArgumentError) {
                this.showHelp(e.message);
            } else {
                throw e;
            }
        }
    };

    Argv.prototype.showHelp = function (err) {
        if (err) {
            console.log(err + '\n');
        }
        console.log('' + this);
        process.exit(err ? 1 : 0);
    };

    Argv.prototype.parse = function (argv) {
        this.__program = argv[1];
        this.__argv = require('minimist')(argv.slice(2));
        if ((!('h' in this.__takenNames) && this.__argv.h) ||
                (!('help' in this.__takenNames) && this.__argv.help)) {
                    this.showHelp();
                }
        this.catchErr(function () {
            this.__options.forEach(function (opt) {
                var names = opt.names.slice();
                while (!(opt.property in this)) {
                    if (!names.length) {
                        if (opt.required) {
                            throw new ArgumentError(
                                displayArg(opt.names[0]) +
                                ' is a required argument');
                        }
                        break;
                    }
                    this[opt.property] = this.__argv[names.shift()];
                }
            }.bind(this));
        });
    };

    Argv.prototype.toString = function () {
        return this.__config.usage + '\n\n' + this.__options.join('\n');
    };

    return Argv;
})();

// vim: ts=4 sts=4 sw=4 et
