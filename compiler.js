
var verifier = require('./verifier');
var ast = require('./ast');
var helpers = require('./helpers');
var jsAst = require('./js_ast');

exports.Compiler = (function () {
    function Compiler(module, typeSystem) {
        this.requires = {};
        this.uses = {};

        ast.assertTypeIs(module, 'Module');
        this.module = module;

        if (typeSystem) {
            this.typeSystem = typeSystem;
        } else {
            this.typeSystem = new verifier.TypeSystem();
        }
        this.analysed = false;
    }

    var proto = Compiler.prototype;

    proto.analyseTypes = function () {
        if (!this.analyse) {
            this.typeSystem.analyse(this.module);
            this.analysed = true;
        }
    };

    proto.require = function (require_) {
        if (!(require_ in this.requires)) {
            this.requires[require_] =
                jsAst.Identifier(this.uniqueName(require_));
        }
    };

    proto.use = function (require_) {
        var path = helpers.slice(arguments, 1),
            name = path[path.length - 1];
        this.require(require_);
        this.uses[name] = [require_, path];
    };

    var uniq = 0;
    var re_nonWord = /\W/g;
    proto.uniqueName = function (name) {
        name = name ?
            name.replace(re_nonWord, '_') :
            Math.floor(Math.random() * 1e10).toString(32);
        return '$_' + name + '_' + (uniq++) + '_$';
    };

    proto.compileRequires = function () {
        var decls = [];
        for (var require_ in this.requires) {
            var id = this.requires[require_];
            decls.push([
                id,
                jsAst.CallExpression(
                    jsAst.Identifier('require'),
                    jsAst.Literal(require_))
            ]);
        }
        if (decls.length) {
            return jsAst.VariableDeclaration.apply(jsAst, decls);
        } else {
            return jsAst.EmptyStatement();
        }
    };

    proto.compileUses = function () {
        var decls = [];
        for (var name in this.uses) {
            var args = this.uses[name],
                require_ = args[0],
                props = args[1],
                propArgs = helpers.map(props, function (p) {
                    return [jsAst.Identifier(p), false];
                });
            decls.push([
                jsAst.Identifier(name),
                jsAst.MemberExpression.apply(
                    jsAst, [this.requires[require_]].concat(propArgs))
            ]);
        }
        if (decls.length) {
            return jsAst.VariableDeclaration.apply(jsAst, decls);
        } else {
            return jsAst.EmptyStatement();
        }
    };

    proto.compile = function () {
        this.analyseTypes();
        this.context = new helpers.Context();
        return this.compileNode(this.module);
    };

    proto.compileNode = function (node) {
        if (node.nodeType in this.compilers) {
            return this.compilers[node.nodeType].call(this, node) ||
                jsAst.EmptyStatement();
        } else {
            throw new Error('Can\'t compile "' + node.nodeType +
                            '": Unimplemented');
        }
    };

    proto.compileNodeList = function (arr) {
        return helpers.map(arr, this.compileNode, this);
    };

    proto.compilers = {
        Module: function (node) {
            var result = jsAst.Program(
                helpers.map(
                    this.compileNodeList(node.body),
                    jsAst.toStatement));
            result.body = [
                this.compileRequires(), this.compileUses()
            ].concat(result.body);
            return result;
        },

        TypeDef: function (node) {},

        TypeAnnotation: function (node) {},

        VarDef: function (node) {
            ast.assertTypeIs(node.left, 'Symbol');
            return jsAst.VariableDeclaration([
                this.compileNode(node.left),
                this.compileNode(node.right)
            ]);
        },

        Symbol: function (node) {
            var builtins = require('bloop/stdlib/builtins');
            if (node.name in builtins) {
                this.use('bloop/stdlib/builtins', node.name);
            }
            return jsAst.Identifier(node.name);
        },

        Integer: function (node) {
            return jsAst.Literal(node.value);
        },

        Float: function (node) {
            return jsAst.Literal(node.value);
        },

        Function: function (node) {
            return jsAst.FunctionExpression(
                [this.compileNode(node.arg)],
                jsAst.BlockStatement(
                    jsAst.ReturnStatement(this.compileNode(node.expr))));
        },

//         FunctionType: function (node) {
//             return jsAst.ObjectExpression(
//                 ['nodeType', jsAst.Literal(node.nodeType)],
//                 ['arg', this.compileNode(node.arg)],
//                 ['ret', this.compileNode(node.ret)]
//             );
//         },
//
//         TypeVariable: function (node) {
//             return jsAst.ObjectExpression(
//                 ['nodeType', jsAst.Literal(node.nodeType)],
//                 ['id', jsAst.Literal(node.id)],
//                 ['name', jsAst.Literal(node.name)]
//             );
//         },

        TypeSymbol: function (node) {
            return jsAst.Identifier(node.name);
        },

//         OrType: function (node) {
//             return jsAst.ObjectExpression(
//                 ['nodeType', jsAst.Literal(node.nodeType)],
//                 ['type1', this.compileNode(node.type1)],
//                 ['type2', this.compileNode(node.type2)])
//         },

        Application: function (node) {
            return jsAst.CallExpression(
                this.compileNode(node.callable),
                this.compileNode(node.arg));
        }
    };

    return Compiler;
})();
