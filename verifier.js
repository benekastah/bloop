
var ast = require('./ast');
var helpers = require('./helpers');

exports.desugar = function (node) {
    var state = {
        typedefs: {}
    };
    ast.mutWalk(function (node) {
        var fn = exports.desugar.actions[node.nodeType];
        if (fn) {
            return fn.apply(this, arguments);
        }
        return node;
    }, node, state);
};

exports.desugar.actions = {
    TypeDef: function (node) {
        if (node.name in this.typedefs) {
            throw new Error('Can\'t redefine type "' +
                            node.name + '"');
        }
        this.typedefs[node.name] = node;

        // Splice out this node
        return [];
    },

    TypeSymbol: function (node) {
        if (node.name in this.typedefs) {
            return this.newVariable(
                node.name, this.typedefs[node.name].type);
        }
        return node;
    },

    DataType: function (node) {
        var results = [];
        var tsym = ast.TypeSymbol(node.name);
        for (var i = 0, len = node.constructors.length; i < len; i++) {
            var ctor = node.constructors[i];

            // Produce type annotation for constructor
            var ctorSym = ast.Symbol(ctor.name);
            var type;
            if (ctor.arg_type) {
                type = ast.FunctionType(ctor.arg_type, tsym);
            } else {
                type = tsym;
            }
            var typeAnn = ast.TypeAnnotation(ctorSym, type);
            results.push(typeAnn);

            // Produce definition for constructor
            var def;
            if (ctor.arg_type) {
                var fn = ast.Function(
                    ast.Symbol('arg'),
                    ast.VarDef(
                        ast.MemberAccess(
                            ast._This(),
                            ast.Symbol('arg')),
                        ast.Symbol('arg')),
                    tsym);
                def = ast.VarDef(ctorSym, fn);
            } else {
                def = ast.VarDef(ctorSym, ast.Struct());
            }
            results.push(def);
        }

        // Splice in all constructor definitions in place of the DataType.
        return results;
    }
};

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

    /**
     * This function runs anything that should only happen once before kicking
     * off the recursive analyse process.
     */
    proto.analyseNode = function (node) {
        exports.desugar(node);
        return this._analyse(node);
    },

    /**
     * This function does all the analysing. Can be called recursively.
     */
    proto._analyse = function (node) {
        if (node.nodeType in this._analyse.actions) {
            return this._analyse.actions[node.nodeType].call(this, node);
        } else {
            throw new Error('Can\'t analyse "' + node.nodeType +
                            '": Unimplemented');
        }
    };

    proto._analyse.actions = {
        Symbol: function (node) {
            return this.getType(node.name);
        },

        Application: function (node) {
            debugger;
            var funtype = this._analyse(node.callable);
            var argtype = this._analyse(node.arg);
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
            node.context = this.context.capture();
            this.context.set(node.arg.name, argtype);
            this.nongen.push(argtype);
            var resulttype;
            if (node.data_constructor) {
                resulttype = node.data_constructor;
            } else {
                resulttype = this._analyse(node.expr);
            }
            this.context.pop();
            this.nongen.pop();
            return ast.FunctionType(argtype, resulttype);
        },

        VarDef: function (node) {
            var result = this._analyse(node.right);
            if (ast.typeIs(node.left, 'Symbol')) {
                if (this.context.has(node.left.name)) {
                    this.unify(result, this.context.get(node.left.name));
                }
                this.context.set(node.left.name, result);
            } else if (ast.typeIs(node.left, 'MemberAccess')) {
                var mem = node.left;
                switch (mem.object.nodeType) {
                    case 'Struct':
                        mem.object.context.set(mem.member.name, result);
                        break;

                    case '_This': break;

                    default: throw new Error(
                        'Can\'t access member of type "' +
                        mem.object.nodeType + '"');
                }
            } else {
                throw new Error('Can\'t define to type "' + node.left.nodeType +
                                '": Unimplemented');
            }
            return result;
        },

        Struct: function (node) {
            this.context.push();
            node.context = this.context.capture();
            var result = ast.StructType();
            for (var i = 0, len = node.defs.length; i < len; i++) {
                var def = node.defs[i];
                var type = this._analyse(def);
                result.annotations.push(
                    ast.TypeAnnotation(def.left, type));
            }
            this.context.pop();
            return result;
        },

        TypeAnnotation: function (node) {
            ast.assertTypeIs(node.symbol, 'Symbol');
            // This stuff could go in the desugar function, but I think it's
            // more topical here.
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
                } else if (ast.typeIs(node, 'TypeAnnotation')) {
                    // Make sure each TypeAnnotation is processed in its own
                    // context.
                    this._analyse(node);
                }
                return node;
            }, node.type, this);
            this.context.set(node.symbol.name, node.type);
            return null;
        },

        Module: function (node) {
            var result;
            for (var i = 0, len = node.body.length; i < len; i++) {
                result = this._analyse(node.body[i]);
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

    proto.typeMismatch = function (t1, t2, cause) {
        throw TypeError(t1.toString() + ' ≠ ' + t2.toString());
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
            if (!(type1 === type2 || type1.name === type2.name)) {
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
        },

        StructType: function (type1, type2) {
            this.checkTypeMismatch(type1, type2);
            var annotations1 = {};
            var annotations2 = {};
            var len = type1.annotations.length;
            if (len !== type2.annotations.length) {
                this.typeMismatch(type1, type2);
            }
            for (var i = 0; i < len; i++) {
                var ann1 = type1.annotations[i];
                annotations1[ann1.symbol.name] = ann1;
                var ann2 = type2.annotations[i];
                annotations2[ann2.symbol.name] = ann2;
            }

            for (var name in annotations1) {
                if (!(name in annotations2)) {
                    this.typeMismatch(type1, type2);
                }
                this.unify(annotations1[name].type, annotations2[name].type);
            }
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
