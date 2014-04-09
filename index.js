
var escodegen = require('escodegen');
var esmangle = require('esmangle');

var Compiler = require('./compiler').Compiler;
var ast = require('./ast');
var helpers = require('./helpers');
var lex = require('./lexer');

exports.parser = require('./parser').parser;
exports.parser.lexer = lex.makeLexer();
exports.parser.yy = ast;

exports.getCompiler = function (data, ts) {
    var module = exports.parser.parse(data);
    var compiler = new Compiler(module, ts);
    return compiler;
};

exports.compile = function (data, opts) {
    var compiler;
    if (data instanceof Compiler) {
        compiler = data;
    } else {
        compiler = exports.getCompiler(data);
    }
    var jsAst = compiler.compile();

    if (opts.optimize) {
        jsAst = esmangle.optimize(jsAst, opts.optimize);
    }
    if (opts.mangle) {
        jsAst = esmangle.mangle(jsAst);
    }

    if (opts.getAst) {
        return jsAst;
    } else {
        return escodegen.generate(jsAst);
    }
};

