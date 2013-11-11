
var Lexer = require('lex');

var getIndentLevel = function (yytext) {
  var idt = 0;
  for (var i = 0, len = yytext.length; i < len; i++) {
    var chr = yytext.charAt(i);
    if (chr === ' ') {
      idt += 1;
    } else if (chr === '\t') {
      idt += 8 - (idt % 8);
    }
  }
  return idt;
};

var lexerError = function (chr) {
  throw new Error(
    "Unexpected character at row " +
    JSON.stringify(this.yylloc) + ": " + chr);
};

var re_newline = /\r?\n/;
var addRule = function (lexer, re, cb) {
  lexer.addRule(re, function (lexeme) {
    this.yytext = lexeme;
    var parts = lexeme.split(re_newline);
    var partsLen = parts.length;
    if (partsLen > 1) {
      this.yylineno = (this.yylloc.line += partsLen - 1);
      this.yylloc.col = parts[partsLen - 1].length + 1;
    } else {
      this.yylloc.col += parts[0].length;
    }

    if (Object.prototype.toString.call(cb) === '[object Function]') {
      return cb.apply(this, arguments);
    } else {
      return cb;
    }
  });
};

exports.makeLexer = function () {
  var lexer = new Lexer(lexerError);
  lexer.yylloc = {
    line: 1,
    col: 1
  };

  var indent = [0];

  addRule(lexer, /(\r?\n)+/, 'NEWLINE');

  addRule(lexer, /^\s*/gm, function (lexeme) {
    var indentation = getIndentLevel(lexeme);

    if (indentation > indent[0]) {
      indent.unshift(indentation);
      return 'INDENT';
    }

    var tokens = [];
    while (indentation < indent[0]) {
      tokens.push('DEDENT');
      indent.shift();
    }

    if (tokens.length) return tokens;
  });

  addRule(lexer, /\s+/);

  addRule(lexer, /[a-z_]\w*/, 'SYMBOL');

  addRule(lexer, /[A-Z]\w*/, 'TYPE_SYMBOL');

  addRule(lexer, /let/, 'LET');

  addRule(lexer, /=/, '=');

  addRule(lexer, /`/, '`');

  addRule(lexer, /\(/, '(');

  addRule(lexer, /\)/, ')');

  addRule(lexer, /\+/, '+');

  addRule(lexer, /\-/, '-');

  addRule(lexer, /\//, '/');

  addRule(lexer, /\*/, '*');

  addRule(lexer, /[0-9]+\.[0-9]+/, 'FLOAT');

  addRule(lexer, /[0-9]+/, 'FIXNUM');

  addRule(lexer, /::/, 'DOUBLE_COLON');

  addRule(lexer, /\->/, 'R_ARROW');

  addRule(lexer, /$/, 'EOF');

  return lexer;
};
