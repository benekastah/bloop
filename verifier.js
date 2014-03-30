
var ast = require('./ast');
var helpers = require('./helpers');

var constraintFns = {
  Module: function () {},

  TypeAnnotation: function (node) {
    return generateConstraint(node.symbol).concat([
      ast.TypeConstraint(
        ast.TypeExpr(node.symbol),
        node.type)
    ]);
  },

  VarDef: function (node) {
    return generateConstraint(node.left)
      .concat(generateConstraint(node.right));
  },

  Integer: function (node) {
    return [
      ast.TypeConstraint(
        ast.TypeExpr(node), ast.TypeSymbol('Integer'))
    ];
  },

  Float: function (node) {
    return [
      ast.TypeConstraint(
        ast.TypeExpr(node), ast.TypeSymbol('Float'))
    ];
  },

  Symbol: function (node) {
    return [
      ast.TypeConstraint(
        ast.TypeExpr(node), ast.TypeVariable(node.name))
    ];
  },

  Function: function (node) {
    var bodyC = generateConstraint(node.expr);
    var argC = generateConstraint(node.arg)[0];
    var fnT = ast.FunctionType(
      argC.right, ast.TypeExpr(node.expr));
    var fnC = ast.TypeConstraint(
      ast.TypeExpr(node), fnT);
    return bodyC.concat(fnC);
  },

  Application: function (node) {
    var fnC = generateConstraint(node.callable);
    var argC = generateConstraint(node.arg);
    var fnT = ast.FunctionType(
      ast.TypeExpr(node.arg), ast.TypeExpr(node));
    var expC = ast.TypeConstraint(
      ast.TypeExpr(node.callable), fnT);
    return fnC.concat(argC, expC);
  }
};

var generateConstraint = function (node) {
  if (node.nodeType in constraintFns) {
    var result = constraintFns[node.nodeType](node);
    return result;
  } else {
    throw new Error('Unimplemented node type ' + node.nodeType);
  }
}

exports.generateConstraints = function (node) {
  var constraints = [];
  console.assert(node.nodeType === 'Module');
  for (var i = 0, len = node.body.length; i < len; i++) {
    var result = generateConstraint(node.body[i]);
    if (result) {
      constraints = constraints.concat(result);
    }
  }
  return constraints;
};

var occurs = function (left, right) {
  return ast.twalk(function (node) {
    if (ast.eq(left, node)) {
      return true;
    }
  }, right) || false;
};

var lookup = function (term, subs) {
  if (subs.length) debugger;
  for (var i = 0, len = subs.length; i < len; i++) {
    var s = subs[i];
    if (ast.eq(term, s.left)) {
      return s.right;
    }
  }
  return null;
};

var extendReplace = function (left, right, subst) {
  if (!occurs(left, right)) {
    for (var i = 0, len = subst.length; i < len; i++) {
      var s = subst[i];
      console.log('Checking for:');
      helpers.log(left);
      ast.mapWalk(function (node) {
        console.log('Got:');
        helpers.log(node);
        console.log('');
        if (ast.eq(left, node)) {
          debugger;
          return right;
        } else {
          return node;
        }
      }, s);
    }
    subst.push(ast.TypeSubstitution(left, right));
  }
  return subst;
};

var TypeVariableExpression = function (c, cs, s) {
  var bound = lookup(c.left, s);
  if (bound) {
    return unify([
      ast.TypeConstraint(bound, c.right)
    ].concat(cs.slice(1)), s);
  } else {
    return unify(cs.slice(1), extendReplace(c.left, c.right, s));
  }
};

var unifyFns = {
  TypeVariable: TypeVariableExpression,

  TypeExpr: TypeVariableExpression,

  TypeSymbol: function (c, cs, s) {
    if (c.right.nodeType === 'TypeSymbol') {
      if (c.left.name === c.right.name) {
        return unify(cs.slice(1), s);
      } else {
        throw new Error('Expecting ' + c.left.name + ' and got ' +
                        c.right.name + ' instead');
      }
    } else {
      throw new Error('Expecting ' + c.left.name + ' and got ' +
                      c.right + ' instead');
    }
  },

  FunctionType: function (c, cs, s) {
    if (c.right.nodeType === 'FunctionType') {
      return unify([
        ast.TypeExpression(c.left.arg, c.right.arg),
        ast.TypeExpression(c.left.ret, c.right.ret)
      ].concat(cs), s);
    } else {
      throw new Error('Expecting (' + c.left + ') and got (' +
                      c.right + ')');
    }
  }
};

var unify = exports.unify = function (constraints, subst) {
  // helpers.log(subst);
  // debugger;
  if (!constraints.length) {
    return subst;
  }
  var c = constraints[0];
  if (c.left.nodeType in unifyFns) {
    return unifyFns[c.left.nodeType](c, constraints, subst || []);
  } else {
    throw new Error('Can\'t unify ' + c.left.nodeType + ': Not implemented');
  }
};

// vim: ts=2 sts=2 sw=2 et
