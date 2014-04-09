
var helpers = require('./helpers');

var makeIsTest = function (regex, types) {
    return function (x) {
        if (x.type.match(regex)) {
            return true;
        } else if (types && types.indexOf(x.type) >= 0) {
            return true;
        }
        return false;
    }
};

var makeAstMethod = function (name, fn) {
    exports[name] = function () {
        var ast = {type: name};
        return (fn ? fn.apply(ast, arguments) : null) || ast;
    };
};

exports.isStatement = makeIsTest(/(Statement|Declaration)$/);

exports.isExpression = makeIsTest(/Expression$/, ['Identifier', 'Literal']);

exports.toStatement = function (x) {
    if (exports.isStatement(x)) {
        return x;
    } else if (exports.isExpression(x)) {
        return {
            type: 'ExpressionStatement',
            expression: x
        };
    } else {
        throw new Error('Can\'t convert node of type "' + x.type +
                        '" to statement: Unimplemented');
    }
};

makeAstMethod('ObjectExpression', function () {
    this.properties = [];
    for (var i = 0, len = arguments.length; i < len; i++) {
        var prop = arguments[i];
        this.properties.push(exports.Property(
            exports.Identifier(prop[0]),
            prop[1],
            'init'));
    }
});

makeAstMethod('Property', function (key, value, kind) {
    this.key = key;
    this.value = value;
    this.kind = kind;
});

makeAstMethod('Literal', function (val) {
    this.value = val;
});

makeAstMethod('Identifier', function (name) {
    this.name = name;
});

makeAstMethod('BlockStatement', function () {
    this.body = helpers.slice(arguments);
});

makeAstMethod('FunctionExpression', function (params, body) {
    this.params = params;
    this.body = body;
});

makeAstMethod('CallExpression', function (callee) {
    this.callee = callee;
    this.arguments = helpers.slice(arguments, 1);
});

makeAstMethod('ReturnStatement', function (argument) {
    this.argument = argument;
});

makeAstMethod('VariableDeclaration', function () {
    this.kind = 'var';
    this.declarations = helpers.map(arguments, function (a) {
        return exports.VariableDeclarator.apply(null, a);
    });
});

makeAstMethod('VariableDeclarator', function (id, init) {
    this.id = id;
    this.init = init;
});

makeAstMethod('MemberExpression', function (obj, prop) {
    var args = helpers.slice(arguments, 2);
    this.object = obj;
    this.property = prop[0];
    this.computed = prop[1];
    if (args.length) {
        return exports.MemberExpression.apply(null, [this].concat(args));
    }
});

makeAstMethod('Program', function (body) {
    this.body = body;
});

makeAstMethod('EmptyStatement');

