
var helpers = require('./helpers');

exports.assertIs = function (node, type) {
    console.assert(node.nodeType === type);
};

var makeAst = function (nodeType, config) {
    var init, toString, props, propsData;
    init = config.init;
    props = config.props;
    propsData = config.propsData;
    toString = config.toString || function () {
        return JSON.stringify(this, null, 2);
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


exports.walk = function walk(action, node, parentNode, prop, index) {
    var _continue = action(node, parentNode, prop, index);
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
                    walk(action, newNode[j], node, p, j);
                }
            } else {
                walk(action, newNode, node, p);
            }
        }
    }
};

exports.twalk = function twalk(action, node) {
    var throwable = {};
    var fn = function (node, parentNode, prop, index) {
        var result = action(node, parentNode, prop, index);
        if (typeof result !== 'undefined') {
            throwable.result = result;
            throw throwable;
        }
    };
    try {
        exports.walk(fn, node);
    } catch (e) {
        if (e === throwable) {
            return e.result;
        } else {
            throw e;
        }
    }
};

exports.mapWalk = function mapWalk(action, node) {
    exports.walk(function (node, parentNode, prop, index) {
        var result = action(node);
        if (result !== node) {
            if (index == null) {
                parentNode[prop] = result;
            } else {
                parentNode[prop][index] = result;
            }
            return false;
        }
    }, node);
};


/**
 * Define ast objects here
 */

makeAst('Module', {
    props: ['body']
});

makeAst('Symbol', {
    props: ['name'],
    propsData: {
        name: {walkable: false}
    },
    propsData: {
        name: {walkable: false}
    }
});

makeAst('TypeConstraint', {
    props: ['left', 'right']
});

makeAst('TypeSubstitution', {
    props: ['left', 'right']
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

makeAst('TypeVariable', {
    props: ['id', 'name', 'type'],
    propsData: {
        name: {walkable: false},
        id: {walkable: false}
    },
    toString: function () {
        return this.name;
    }
});

makeAst('TypeExpr', {
    props: ['expr']
});

makeAst('TypeAnnotation', {
    props: ['symbol', 'type']
});

makeAst('TypeInference', {
    props: ['symbol', 'type']
});

makeAst('FunctionType', {
    props: ['arg', 'ret'],
    toString: function () {
        return 'λ ' + this.arg + ' → ' + this.ret;
    },
});

makeAst('VarDef', {
    props: ['left', 'right']
});

makeAst('Function', {
    props: ['arg', 'expr']
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
    props: ['callable', 'arg'],
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
