
var ast = require('./ast');
var helpers = require('./helpers');

exports.TypeSystem = (function () {
    function TypeSystem() {
        this.env = new helpers.Context();
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

    proto.newVariable = function () {
        return ast.makeTypeVariable(this._nextId(), this._nextUniqueName());
    };

    proto.analyse = function (node) {
        switch (node.nodeType) {
            case 'Symbol': {
                return this.getType(node.name);
            }

            case 'Application': {
                var funtype = this.analyse(node.callable);
                var argtype = this.analyse(node.arg);
                var resulttype = this.newVariable();
                this.unify(ast.FunctionType(argtype, resulttype), funtype);
                return resulttype;
            }

            case 'Integer': {
                return TypeSystem.Integer;
            }

            case 'Float': {
                return TypeSystem.Float;
            }

            case 'Function': {
                var argtype = this.newVariable();
                this.env.push();
                this.env.set(node.arg.name, argtype);
                this.nongen.push(argtype);
                var resulttype = this.analyse(node.expr);
                this.env.pop();
                this.nongen.pop();
                return ast.FunctionType(argtype, resulttype);
            }

            case 'VarDef': {
                ast.assertIs(node.left, 'Symbol');
                var result = this.analyse(node.right);
                this.env.set(node.left.name, result);
                return result;
            }

            case 'TypeAnnotation': {
                ast.assertIs(node.symbol, 'Symbol');
                var typeVars = {};
                ast.mapWalk(function (node) {
                    // Resolve user-defined type variables. Give new ones a
                    // new id and save them in typeVars. Any type variable
                    // with the same `name` will be set to the same instance
                    // within a single type annotation.
                    if (node.nodeType === 'TypeVariable' && node.id == null) {
                        if (node.name in typeVars) {
                            return typeVars[node.name];
                        } else {
                            node.id = this._nextId();
                            typeVars[node.name] = node;
                        }
                    }
                    return node;
                }, node.type, this);
                this.env.set(node.symbol.name, node.type);
                return null;
            }

            case 'Module': {
                var result;
                for (var i = 0, len = node.body.length; i < len; i++) {
                    result = this.analyse(node.body[i]);
                }
                return result;
            }

            default: {
                throw new Error('Can\'t analyse "' + node.nodeType +
                                '": Unimplemented');
            }
        }
    };

    proto.getType = function (name) {
        if (this.env.has(name)) {
            return this.fresh(this.env.get(name));
        } else {
            throw new Error('Undefined symbol: ' + name);
        }
    };

    proto.fresh = function (type) {
        var mappings = {};
        var freshrec = helpers.bind(function (t) {
            var t1 = this.prune(t);
            switch (t1.nodeType) {
                case 'TypeVariable': {
                    if (this.isGeneric(t1)) {
                        var result = mappings[t1.name] || this.newVariable();
                        mappings[t1.name] = result;
                        return result;
                    } else {
                        return t1;
                    }
                }

                case 'FunctionType': {
                    return ast.FunctionType(
                        freshrec(t1.arg),
                        freshrec(t1.ret));
                }

                default: {
                    return t1;
                }
            }
        }, this);
        return freshrec(type);
    };

    proto.isGeneric = function (v) {
        ast.assertIs(v, 'TypeVariable');
        return this.nongen.indexOf(v) < 0;
    };

    proto.typeMismatch = function (t1, t2) {
        throw new TypeError(t1.toString() + ' ≠ ' + t2.toString());
    };

    proto.unify = function (t1, t2) {
        var type1 = this.prune(t1);
        var type2 = this.prune(t2);
        if (type1.nodeType === 'TypeVariable') {
            if (this.occurs(type1, type2)) {
                throw new TypeError('Recursive unification');
            }
            type1.type = type2;
        } else if (type2.nodeType === 'TypeVariable') {
            this.unify(type2, type1);
        } else {
            if (type1.nodeType !== type2.nodeType) {
                this.typeMismatch(type1, type2);
            }
            switch (type1.nodeType) {
                case 'TypeSymbol': {
                    if (!(type1 === type2 || type1.name === type2.name)) {
                        this.typeMismatch(type1, type2);
                    }
                    break;
                }

                case 'FunctionType': {
                    this.unify(type1.arg, type2.arg);
                    this.unify(type1.ret, type2.ret);
                    break;
                }

                default: {
                    throw new Error('Can\'t unify "' + type1.nodeType +
                                    '": Unimplemented');
                }
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
        ast.assertIs(v, 'TypeVariable');
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
