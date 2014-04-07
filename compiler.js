
var verifier = require('./verifier');
var ast = require('./ast');
var helpers = require('./helpers');
var jsAst = require('./js_ast');

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
        return helpers.map(arr, this.compileNode, this);
    };

    proto.typedValue = function (type, value) {
        return jsAst.ObjectExpression(
            ['type', this.compileNode(type)],
            ['value', value]
        );
    };

    proto.compilers = {
        Module: function (node) {
            return {
                type: 'Program',
                body: helpers.map(
                    this.compileNodeList(node.body),
                    jsAst.toStatement)
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
            return jsAst.Identifier(node.name);
        },

        Integer: function (node) {
            return this.typedValue(node.type(), jsAst.Literal(node.value));
        },

        Float: function (node) {
            return jsAst.Literal(node.value);
        },

        Function: function (node) {
            return jsAst.CallExpression(
                jsAst.Identifier('$_function_$'),
                this.compileNode(node.type()),
                jsAst.FunctionExpression(
                    [this.compileNode(node.arg)],
                    jsAst.BlockStatement(
                        jsAst.ReturnStatement(this.compileNode(node.expr)))));
        },

        FunctionType: function (node) {
            return jsAst.ObjectExpression(
                ['nodeType', jsAst.Literal(node.nodeType)],
                ['arg', this.compileNode(node.arg)],
                ['ret', this.compileNode(node.ret)]
            );
        },

        TypeVariable: function (node) {
            return jsAst.ObjectExpression(
                ['nodeType', jsAst.Literal(node.nodeType)],
                ['id', jsAst.Literal(node.id)],
                ['name', jsAst.Literal(node.name)]
            );
        },

        TypeSymbol: function (node) {
            return jsAst.Identifier(node.name);
        },

        OrType: function (node) {
            return jsAst.ObjectExpression(
                ['nodeType', jsAst.Literal(node.nodeType)],
                ['type1', this.compileNode(node.type1)],
                ['type2', this.compileNode(node.type2)])
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
