
var makeAst = function (type, arg) {
  var argType = ({}).toString.call(arg);
  exports[type] = function () {
    var ast = {
      nodeType: type
    };
    switch (argType) {
      case '[object Function]':
        var fn = arg;
        var val = fn.apply(ast, arguments);
        if (val !== undefined) {
          return val;
        } else {
          break;
        }
      case '[object Array]':
        var props = arg;
        for (var i = 0, len = props.length; i < len; i++) {
          ast[props[i]] = arguments[i];
        }
        break;
      default:
        throw new Error('makeAst: Don\'t know what to do with ' + argType);
    }
    return ast;
  }
};



/**
 * Define ast objects here
 */

makeAst('Module', ['body']);
makeAst('Symbol', ['name']);

makeAst('TypeSymbol', ['name']);
makeAst('TypeAnnotation', ['symbol', 'type']);
makeAst('TypeInference', ['symbol', 'type']);
makeAst('FunctionType', ['chain']);

makeAst('VarDef', ['left', 'right']);
makeAst('FunctionDef', ['name', 'args', 'body']);
makeAst('Application', ['callable', 'args']);

var setNumericValue = function (val) {
  this.value = +val;
};
makeAst('Integer', setNumericValue);
makeAst('Float', setNumericValue);
