
var ast = require('./ast');

var nodeTypeCheck = function (expected, node) {
  if (node.nodeType !== expected) {
    throw new Error('Was expecting ' + expected + ' node but got ' +
                    node.nodeType + ' instead');
  }
};

exports.verify = function (mod) {
  if (mod.nodeType !== 'Module') {
    throw new Error('Can\'t verify non-module');
  }

  var symbols = {};

  for (var i = 0, len = mod.body.length; i < len; i++) {
    var node = mod.body[i];
    switch (node.nodeType) {
      case 'TypeAnnotation':
        annotate(symbols, node);
        break;

      case 'VarDef':
        infer(symbols, node.left, node.right);
        break;

      case 'FunctionDef':
        infer(symbols, node.name, node);
        break;

      default:
        throw new Error('Unimplemented statement node: ' + node.nodeType);
    }
  }
};

var annotate = function (symbols, node) {
  var existing = symbols[node.symbol.name];
  if (existing) {
    switch (existing.nodeType) {
      case 'TypeInference':
        break;

      case 'TypeAnnotation':
        throw new Error('Multiple annotations for ' + node.symbol.name);

      default:
        throw new Error('Tried to annotate ' + node.symbol.name + ', but ' +
                        'there was a strange node ' + existing.nodeType +
                        'already in place.');
    }
  }

  symbols[node.symbol.name] = node;
};

var infer = function (symbols, symbol, node) {
  nodeTypeCheck('Symbol', symbol);
  var existing = symbols[symbol.name];
  if (existing) {
    return;
  }
  symbols[symbol.name] = ast.TypeInference(symbol, function () {
    var data;
    switch (node.nodeType) {
      case 'Integer':
        return ast.TypeSymbol('Integer');

      case 'Float':
        return ast.TypeSymbol('Float');

      case 'Symbol':
        data = symbols[node.name];
        if (data) {
          return data;
        }
        break;

      case 'FunctionDef':
        break;
    }
    throw new Error('Can\'t infer type of ' + node.nodeType);
  }());
};
