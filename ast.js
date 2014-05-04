
var helpers = require('./helpers');

exports.typeIs = function (node, type) {
    return node.nodeType === type;
};

exports.assertTypeIs = function (node, type) {
    console.assert(
        exports.typeIs(node, type),
        'Expected type "' + type + '", got "' + node.nodeType + '"');
};

exports.typeEq = function (t1, t2) {
    return t1.nodeType === t2.nodeType;
};

var makeAst = function (nodeType, config) {
    var init, toString, props, propsData;
    init = config.init;
    props = config.props;
    propsData = config.propsData;
    toString = config.hasOwnProperty('toString') ?
        config.toString :
        function () {
            return this.nodeType;
        };

    var base = {
        toString: toString
    };

    var astFn = exports[nodeType] = function () {
        var ast = helpers.clone(base);
        ast.nodeType = nodeType;
        if (init) {
            init.apply(ast, arguments);
        } else {
            for (var i = 0, len = props.length; i < len; i++) {
                ast[props[i]] = arguments[i];
            }
        }
        return ast;
    };

    astFn.props = props;
    astFn.propsData = propsData;

    // This function assumes that both a and b are of the proper type
    astFn.eq = function (a, b) {
        var key, vA, vB, t;
        for (var i = 0, len = props.length; i < len; i++) {
            key = props[i];
            vA = a[key];
            vB = b[key];

            t = helpers.type(vA);
            if (t !== helpers.type(vB)) {
                return false;
            }

            if (t === 'Array') {
                var jlen = vA.length;
                if (jlen !== vB.length) {
                    return false;
                }
                for (var j = 0; j < jlen; j++) {
                    if (!exports.eq(vA[j], vB[j])) {
                        return false;
                    }
                }
            } else if (t === 'Object') {
                if (!exports.eq(vA, vB)) {
                    return false;
                }
            } else {
                if (vA !== vB) {
                    return false;
                }
            }
        }

        return true;
    };
};


exports.eq = function (a, b) {
    var t = helpers.type(a);
    if (t !== 'Object' ||
            t !== helpers.type(b) ||
            !('nodeType' in a) ||
            !('nodeType' in b)) {
        throw new Error('You must pass in two ast objects to compare');
    }
    if (a.nodeType !== b.nodeType) {
        return false;
    }
    if (a === b) {
        return true;
    }
    return exports[a.nodeType].eq(a, b);
};


exports.walk = function walk(action, node, scope, parentNode, prop, index) {
    var _continue = action.call(scope, node, parentNode, prop, index);
    if (_continue === false) {
        return;
    }
    var astInfo = exports[node.nodeType];
    for (var i = 0, len = astInfo.props.length; i < len; i++) {
        var p = astInfo.props[i];
        var pdata = astInfo.propsData ?
            astInfo.propsData[p] || {} :
            {};
        if (pdata.walkable || !('walkable' in pdata)) {
            var newNode = node[p];
            if (helpers.type(newNode) === 'Array') {
                for (var j = 0, jlen = newNode.length; j < jlen; j++) {
                    walk(action, newNode[j], scope, node, p, j);
                }
            } else {
                walk(action, newNode, scope, node, p);
            }
        }
    }
};

exports.walkTop = function walkTop(action, node, scope) {
    exports.walk(function () {
        var result = action.apply(this, arguments);
        if (result == null) {
            result = false;
        }
        return result;
    }, node, scope);
};

exports.mutWalk = function mutWalk(action, node, scope) {
    exports.walk(function (node, parentNode, prop, index) {
        var result = action.call(this, node);
        if (result !== node) {
            if (index == null) {
                parentNode[prop] = result;
            } else {
                if (helpers.type(result) === 'Array') {
                    var args = [index, 1].concat(result);
                    parentNode[prop].splice.apply(parentNode[prop], args);
                } else {
                    parentNode[prop][index] = result;
                }
            }
            return false;
        }
    }, node, scope);
};


/**
 * TYPES
 */

makeAst('OrType', {
    props: ['type1', 'type2'],
    toString: function () {
        return '' + this.type1 + ' | ' + this.type2;
    }
});

makeAst('AnyType', {
    props: [],
    toString: function () {
        return 'Any';
    }
});

makeAst('TypeUndefined', {
    props: [],
    toString: function () {
        return this.nodeType;
    }
});

makeAst('TypeVariable', {
    props: ['id', 'name', 'type'],
    propsData: {
        name: {walkable: false},
        id: {walkable: false}
    },
    toString: function () {
        if (this.type.nodeType !== 'TypeUndefined') {
            return this.name + '(' + this.type + ')';
        } else {
            return this.name;
        }
    }
});

exports.makeTypeVariable = function (id, name, type) {
    switch (arguments.length) {
        case 1: {
            name = id;
            id = null;
            break;
        }

        case 2: case 3: break;

        default: {
            throw new Error('Wrong number of arguments: ' + arguments.length);
        }
    }

    if (!type) {
        type = exports.TypeUndefined();
    }

    return exports.TypeVariable(id, name, type);
};

makeAst('TypeAnnotation', {
    props: ['symbol', 'type'],
    toString: function () {
        return this.symbol + ' :: ' + this.type;
    }
});

makeAst('FunctionType', {
    props: ['arg', 'ret'],
    toString: function () {
        return this.arg + ' → ' + this.ret;
    },
});

makeAst('TypeSymbol', {
    props: ['name'],
    propsData: {
        name: {walkable: false},
    },
    toString: function () {
        return this.name;
    }
});

makeAst('TypeDef', {
    props: ['name', 'type'],
    propsData: {
        name: {walkable: false}
    }
});

makeAst('DataType', {
    props: ['name', 'constructors'],
    propsData: {
        name: {walkable: false}
    }
});

makeAst('DataTypeConstructor', {
    props: ['name', 'arg_type'],
    propsData: {
        name: {walkable: false}
    }
});

makeAst('StructType', {
    props: ['annotations'],
    init: function (ann) {
        this.annotations = ann || [];
    },
    toString: function () {
        return '{' + this.annotations.join(', ') + '}';
    }
});

/**
 * PROGRAM/STATEMENTS
 */

makeAst('Module', {
    props: ['body']
});

makeAst('Import', {
    props: ['importPath']
});

makeAst('VarDef', {
    props: ['left', 'right']
});

/**
 * VALUES
 */

makeAst('Symbol', {
    props: ['name'],
    propsData: {
        name: {walkable: false}
    },
    toString: function () {
        return this.name;
    }
});

makeAst('Struct', {
    props: ['defs'],
    init: function (defs) {
        this.defs = defs || [];
    }
});

// This is not meant to be exposed to end users
makeAst('_This', {
    props: []
});

makeAst('MemberAccess', {
    props: ['object', 'member']
});

var stringEscapedChars = {
    '"': '"',
    '\\': '\\',
    b: '\b',
    f: '\f',
    n: '\n',
    r: '\r',
    t: '\t',
    v: '\v'
};

var re_escape = /\\(.)/g;

makeAst('String', {
    props: ['value'],
    propsData: {
        value: {walkable: false}
    },
    init: function (value) {
        value = value.substring(1, value.length - 1);
        value = value.replace(re_escape, function (match, sub) {
            if (sub in stringEscapedChars) {
                return stringEscapedChars[sub];
            } else {
                throw new Error('Invalid string');
            }
        });
        this.value = value;
    }
});

makeAst('Function', {
    props: ['arg', 'expr', 'data_constructor'],
    propsData: {
        data_constructor: {walkable: false}
    }
});

exports.makeFunction = function makeFunction(args, expr) {
    var arg = args[0];
    var restArgs = args.slice(1);
    if (!restArgs.length) {
        return exports.Function(arg, expr);
    } else {
        return exports.Function(arg, makeFunction(restArgs, expr));
    }
};

makeAst('Application', {
    props: ['callable', 'arg', 'data_constructor'],
    propsData: {
        data_constructor: {walkable: false}
    },
    toString: function () {
        return '' + this.callable + ' ' + this.arg;
    }
});

exports.makeApplication = function makeApplication(fn, args) {
    var arg = args[0];
    var restArgs = args.slice(1);
    if (!restArgs.length) {
        return exports.Application(fn, arg);
    } else {
        return makeApplication(exports.Application(fn, arg), restArgs);
    }
};

var setNumericValue = function (val) {
    this.value = +val;
};

var numberToString = function () {
    return '' + this.value;
};

var numberPropData = {
    value: {walkable: false}
};

makeAst('Integer', {
    init: setNumericValue,
    props: ['value'],
    propsData: numberPropData,
    toString: numberToString
});

makeAst('Float', {
    init: setNumericValue,
    props: ['value'],
    propsData: numberPropData,
    toString: numberToString
});

// vim: ts=4 sts=4 sw=4 et
