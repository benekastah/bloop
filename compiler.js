
var verifier = require('./verifier');
var ast = require('./ast');
var helpers = require('./helpers');

exports.Compiler = (function () {
    function Compiler(module) {
        ast.assertTypeIs(module, 'Module');
        this.module = module;
        this.typeSystem = new verifier.TypeSystem();
        this.typeSystem.analyse(this.module);
    }

    var proto = Compiler.prototype;

    proto.compile = function () {
        this.context = new helpers.Context();
        return this.compileNode(this.module);
    };

    proto.compileNode = function (node) {
        if (node.nodeType in this.compilers) {
            return this.compilers[node.nodeType].call(this, node) ||
                {type: 'EmptyStatement'};
        } else {
            throw new Error('Can\'t compile "' + node.nodeType +
                            '": Unimplemented');
        }
    };

    proto.compileNodeList = function (arr) {
        var result = [];
        for (var i = 0, len = arr.length; i < len; i++) {
            result.push(this.compileNode(arr[i]));
        }
        return result;
    };

    var object = function () {
        var obj = {
            type: 'ObjectExpression',
            properties: []
        };
        for (var i = 0, len = arguments.length; i < len; i++) {
            var prop = arguments[i];
            obj.properties.push({
                type: 'Property',
                key: {
                    type: 'Identifier',
                    name: prop[0]
                },
                value: prop[1],
                kind: 'init'
            });
        }
        return obj;
    };

    proto.typedValue = function (type, value) {
        return object(
            ['type', this.compileNode(type)],
            ['value', value]
        );
    };

    proto.compilers = {
        Module: function (node) {
            return {
                type: 'Program',
                body: this.compileNodeList(node.body)
            };
        },

        TypeDef: function (node) {},

        TypeAnnotation: function (node) {},

        VarDef: function (node) {
            ast.assertTypeIs(node.left, 'Symbol');
            return {
                type: 'VariableDeclaration',
                declarations: [{
                    type: 'VariableDeclarator',
                    id: this.compileNode(node.left),
                    init: this.compileNode(node.right)
                }],
                kind: 'var'
            };
        },

        Symbol: function (node) {
            return {
                type: 'Identifier',
                name: node.name
            };
        },

        Integer: function (node) {
            return this.typedValue(node.type(), node.value);
        },

        Float: function (node) {
            return this.typedValue(node.type(), node.value);
        },

        Function: function (node) {
            return this.typedValue(node.type(), {
                type: 'FunctionExpression',
                params: [this.compileNode(node.arg)],
                body: {
                    type: 'BlockStatement',
                    body: [this.compileNode(node.expr)]
                }
            });
        },

        FunctionType: function (node) {
            return object(
                ['type', {type: 'Literal', value: node.nodeType}],
                ['arg', this.compileNode(node.arg)],
                ['ret', this.compileNode(node.ret)]
            );
        },

        TypeVariable: function (node) {
            return object(
                ['type', {type: 'Literal', value: node.nodeType}],
                ['id', {type: 'Literal', value: node.id}],
                ['name', {type: 'Literal', value: node.name}]
            );
        },

        TypeSymbol: function (node) {
            return object(
                ['type', {type: 'Literal', value: node.nodeType}],
                ['name', {type: 'Literal', value: node.name}]
            );
        },

        Application: function (node) {
            return {
                type: 'CallExpression',
                callee: this.compileNode(node.callable),
                arguments: [this.compileNode(node.arg)]
            };
        }
    };

    return Compiler;
})();
