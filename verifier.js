
var ast = require('./ast');
var helpers = require('./helpers');

exports.TypeSystem = (function () {
    function TypeSystem() {
        this.context = new helpers.Context();
        this.nongen = [];
        this._nextVariableName = 'α';
        this._nextVariableId = 0;
    }

    TypeSystem.Integer = ast.TypeSymbol('Integer');
    TypeSystem.Float = ast.TypeSymbol('Float');

    var proto = TypeSystem.prototype;

    proto._nextUniqueName = function () {
        var result = this._nextVariableName;
        this._nextVariableName = String.fromCharCode(
            this._nextVariableName.charCodeAt(0) + 1);
        return result;
    };

    proto._nextId = function () {
        return this._nextVariableId++;
    },

    proto.newVariable = function (name, type) {
        var result = ast.makeTypeVariable(
            this._nextId(), name || this._nextUniqueName());
        if (type) {
            result.type = type;
        }
        return result;
    };

    proto.analyse = function (node) {
        if (node.nodeType in this.analyse.actions) {
            return this.analyse.actions[node.nodeType].call(this, node);
        } else {
            throw new Error('Can\'t analyse "' + node.nodeType +
                            '": Unimplemented');
        }
    };

    proto.analyse.actions = {
        Symbol: function (node) {
            return this.getType(node.name);
        },

        Application: function (node) {
            var funtype = this.analyse(node.callable);
            var argtype = this.analyse(node.arg);
            var resulttype = this.newVariable();
            this.unify(ast.FunctionType(argtype, resulttype), funtype);
            return resulttype;
        },

        Integer: function (node) {
            return TypeSystem.Integer;
        },

        Float: function (node) {
            return TypeSystem.Float;
        },

        Function: function (node) {
            var argtype = this.newVariable();
            this.context.push();
            this.context.set(node.arg.name, argtype);
            this.nongen.push(argtype);
            var resulttype = this.analyse(node.expr);
            this.context.pop();
            this.nongen.pop();
            return ast.FunctionType(argtype, resulttype);
        },

        VarDef: function (node) {
            ast.assertTypeIs(node.left, 'Symbol');
            var result = this.analyse(node.right);
            this.context.set(node.left.name, result);
            return result;
        },

        TypeAnnotation: function (node) {
            ast.assertTypeIs(node.symbol, 'Symbol');
            var typeVars = {};
            ast.mutWalk(function (node) {
                // Resolve user-defined type variables. Give new ones a
                // new id and save them in typeVars. Any type variable
                // with the same `name` will be set to the same instance
                // within a single type annotation.
                if (ast.typeIs(node, 'TypeVariable') && node.id == null) {
                    if (node.name in typeVars) {
                        return typeVars[node.name];
                    } else {
                        node.id = this._nextId();
                        typeVars[node.name] = node;
                    }
                } else if (ast.typeIs(node, 'AnyType')) {
                    return this.newVariable('Any');
                }
                return node;
            }, node.type, this);
            this.context.set(node.symbol.name, node.type);
            return null;
        },

        TypeDef: function (node) {},

        Module: function (node) {
            var result;

            var typedefs = {};
            ast.mutWalk(function (node) {
                if (ast.typeIs(node, 'TypeDef')) {
                    if (node.name in typedefs) {
                        throw new Error('Can\'t redefine type "' +
                                        node.name + '"');
                    }
                    typedefs[node.name] = node;
                } else if (ast.typeIs(node, 'TypeSymbol')) {
                    if (node.name in typedefs) {
                        return this.newVariable(
                            node.name, typedefs[node.name].type);
                    }
                }
                return node;
            }, node, this);

            for (var i = 0, len = node.body.length; i < len; i++) {
                result = this.analyse(node.body[i]);
            }
            return result;
        }
    };

    proto.getType = function (name) {
        if (this.context.has(name)) {
            return this.fresh(this.context.get(name));
        } else {
            throw new Error('Undefined symbol: ' + name);
        }
    };

    proto.fresh = function (type) {
        var mappings = {};
        var freshrec = helpers.bind(function (t) {
            var t1 = this.prune(t);
            if (t1.nodeType in this.fresh.actions) {
                return this.fresh.actions[t1.nodeType].call(
                    this, t1, mappings, freshrec);
            } else {
                return t1;
            }
        }, this);
        return freshrec(type);
    };

    proto.fresh.actions = {
        TypeVariable: function (typeNode, mappings, freshrec) {
            if (this.isGeneric(typeNode)) {
                var result = mappings[typeNode.name] || this.newVariable();
                mappings[typeNode.name] = result;
                return result;
            } else {
                return typeNode;
            }
        },

        FunctionType: function (typeNode, mappings, freshrec) {
            return ast.FunctionType(
                freshrec(typeNode.arg),
                freshrec(typeNode.ret));
        }
    };

    proto.isGeneric = function (v) {
        ast.assertTypeIs(v, 'TypeVariable');
        return this.nongen.indexOf(v) < 0;
    };

    proto.typeMismatch = function (t1, t2) {
        throw new TypeError(t1.toString() + ' ≠ ' + t2.toString());
    };

    proto.checkTypeMismatch = function (t1, t2) {
        ast.typeEq(t1, t2) || this.typeMismatch(t1, t2);
    };

    proto.unify = function (t1, t2) {
        var type1 = this.prune(t1);
        var type2 = this.prune(t2);
        if (type1.nodeType === 'TypeVariable') {
            if (this.occurs(type1, type2)) {
                throw new TypeError('Recursive unification');
            }
            type1.type = type2;
        } else if (['TypeVariable', 'OrType'].indexOf(type2.nodeType) >= 0) {
            this.unify(type2, type1);
        } else {
            if (type1.nodeType in this.unify.actions) {
                this.unify.actions[type1.nodeType].call(this, type1, type2);
            } else {
                throw new Error('Can\'t unify "' + type1.nodeType +
                                '": Unimplemented');
            }
        }
    };

    proto.unify.actions = {
        TypeSymbol: function (type1, type2) {
            this.checkTypeMismatch(type1, type2);
            if (!(type1 === type2 || type1.id === type2.id)) {
                this.typeMismatch(type1, type2);
            }
        },

        FunctionType: function (type1, type2) {
            this.checkTypeMismatch(type1, type2);
            this.unify(type1.arg, type2.arg);
            this.unify(type1.ret, type2.ret);
        },

        OrType: function (type1, type2) {
            for (var i = 1, len = 2; i <= len; i++) {
                try {
                    this.unify(type1['type' + i], type2);
                    return;
                } catch (e) {}
            }
            this.typeMismatch(type1, type2);
        }
    };

    proto.prune = function (t) {
        if (t.nodeType === 'TypeVariable' && t.type.nodeType !== 'TypeUndefined') {
            t.type = this.prune(t.type);
            return t.type;
        } else {
            return t;
        }
    };

    proto.occurs = function (v, t) {
        ast.assertTypeIs(v, 'TypeVariable');
        var t2 = this.prune(t);
        if (v === t2) {
            return true;
        } else if (t2.nodeType === 'FunctionType') {
            return this.occurs(v, t2.arg) ||
                this.occurs(v, t2.ret);
        }
        return false;
    };

    return TypeSystem;
})();

// vim: ts=4 sts=4 sw=4 et
