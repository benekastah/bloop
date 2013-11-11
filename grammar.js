/* parser generated by jison 0.4.13 */
/*
  Returns a Parser object of the following structure:

  Parser: {
    yy: {}
  }

  Parser.prototype: {
    yy: {},
    trace: function(),
    symbols_: {associative list: name ==> number},
    terminals_: {associative list: number ==> name},
    productions_: [...],
    performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate, $$, _$),
    table: [...],
    defaultActions: {...},
    parseError: function(str, hash),
    parse: function(input),

    lexer: {
        EOF: 1,
        parseError: function(str, hash),
        setInput: function(input),
        input: function(),
        unput: function(str),
        more: function(),
        less: function(n),
        pastInput: function(),
        upcomingInput: function(),
        showPosition: function(),
        test_match: function(regex_match_array, rule_index),
        next: function(),
        lex: function(),
        begin: function(condition),
        popState: function(),
        _currentRules: function(),
        topState: function(),
        pushState: function(condition),

        options: {
            ranges: boolean           (optional: true ==> token location info will include a .range[] member)
            flex: boolean             (optional: true ==> flex-like lexing behaviour where the rules are tested exhaustively to find the longest match)
            backtrack_lexer: boolean  (optional: true ==> lexer regexes are tested in order and for each matching regex the action code is invoked; the lexer terminates the scan when a token is returned by the action code)
        },

        performAction: function(yy, yy_, $avoiding_name_collisions, YY_START),
        rules: [...],
        conditions: {associative list: name ==> set},
    }
  }


  token location info (@$, _$, etc.): {
    first_line: n,
    last_line: n,
    first_column: n,
    last_column: n,
    range: [start_number, end_number]       (where the numbers are indexes into the input string, regular zero-based)
  }


  the parseError function receives a 'hash' object with these members for lexer and parser errors: {
    text:        (matched text)
    token:       (the produced terminal token, if any)
    line:        (yylineno)
  }
  while parser (grammar) errors will also provide these members, i.e. parser errors deliver a superset of attributes: {
    loc:         (yylloc)
    expected:    (string describing the set of expected tokens)
    recoverable: (boolean: TRUE when the parser has a error recovery rule available for this particular error)
  }
*/
var grammar = (function(){
var parser = {trace: function trace() { },
yy: {},
symbols_: {"error":2,"program":3,"statement_list":4,"EOF":5,"NEWLINE":6,"statement":7,"definition":8,"expr_list":9,"expr":10,"simple_expr_list":11,"simple_expr":12,"application":13,"number":14,"symbol":15,"(":16,")":17,"bin_op":18,"+":19,"-":20,"/":21,"*":22,"`":23,"=":24,"symbol_list":25,"indent":26,"dedent":27,"SYMBOL":28,"fixnum":29,"float":30,"FIXNUM":31,"FLOAT":32,"INDENT":33,"DEDENT":34,"$accept":0,"$end":1},
terminals_: {2:"error",5:"EOF",6:"NEWLINE",16:"(",17:")",19:"+",20:"-",21:"/",22:"*",23:"`",24:"=",28:"SYMBOL",31:"FIXNUM",32:"FLOAT",33:"INDENT",34:"DEDENT"},
productions_: [0,[3,2],[3,2],[4,2],[4,1],[7,1],[9,2],[9,1],[11,2],[11,1],[10,1],[10,1],[12,1],[12,1],[12,3],[12,3],[18,1],[18,1],[18,1],[18,1],[18,3],[13,2],[13,3],[8,4],[8,5],[8,6],[25,2],[25,1],[15,1],[14,1],[14,1],[29,1],[30,1],[26,2],[27,2]],
performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate /* action[1] */, $$ /* vstack */, _$ /* lstack */
/**/) {
/* this == yyval */

var $0 = $$.length - 1;
switch (yystate) {
case 1:
      var program = {type: 'Module', body: $$[$0-1]};
      console.log(JSON.stringify(program, null, 2));
      return program;

break;
case 3: this.$ = $$[$0-1]; this.$.push($$[$0]);
break;
case 4: this.$ = [$$[$0]];
break;
case 6: this.$ = $$[$0-1]; this.$.push($$[$0]);
break;
case 7: this.$ = [$$[$0]];
break;
case 8: this.$ = $$[$0-1]; this.$.push($$[$0]);
break;
case 9:this.$ = [$$[$0]];
break;
case 14:this.$ = $$[$0-1];
break;
case 15:this.$ = $$[$0-1];
break;
case 16: this.$ = {type: 'Symbol', name: $$[$0]};
break;
case 17: this.$ = {type: 'Symbol', name: $$[$0]};
break;
case 18: this.$ = {type: 'Symbol', name: $$[$0]};
break;
case 19: this.$ = {type: 'Symbol', name: $$[$0]};
break;
case 20:this.$ = $$[$0-1];
break;
case 21: this.$ = {
      type: 'Application',
      callable: $$[$0-1],
      args: $$[$0]
    };
break;
case 22: this.$ = {
      type: 'Application',
      callable: $$[$0-1],
      args: [$$[$0-2], $$[$0]]
    };
break;
case 23: this.$ = {
      type: 'VarDef',
      left: $$[$0-3],
      right: $$[$0-1]
    };
break;
case 24: this.$ = {
      type: 'FunctionDef',
      args: $$[$0-3],
      body: $$[$0-1]
    };
break;
case 25: this.$ = {
      type: 'FunctionDef',
      args: $$[$0-4],
      body: $$[$0-1]
    };
break;
case 26: this.$ = $$[$0-1]; this.$.push($$[$0]);
break;
case 27: this.$ = [$$[$0]];
break;
case 28: this.$ = {type: 'Symbol', name: yytext};
break;
case 31: this.$ = {type: 'Integer', value: +yytext};
break;
case 32: this.$ = {type: 'Float', value: +yytext};
break;
}
},
table: [{3:1,4:2,6:[1,3],7:4,8:5,15:6,28:[1,7]},{1:[3]},{5:[1,8],7:9,8:5,15:6,28:[1,7]},{3:10,4:2,6:[1,3],7:4,8:5,15:6,28:[1,7]},{5:[2,4],28:[2,4]},{5:[2,5],28:[2,5]},{15:13,24:[1,11],25:12,28:[1,7]},{6:[2,28],16:[2,28],17:[2,28],19:[2,28],20:[2,28],21:[2,28],22:[2,28],23:[2,28],24:[2,28],28:[2,28],31:[2,28],32:[2,28]},{1:[2,1]},{5:[2,3],28:[2,3]},{1:[2,2]},{10:14,12:16,13:15,14:17,15:18,16:[1,19],28:[1,7],29:20,30:21,31:[1,22],32:[1,23]},{15:25,24:[1,24],28:[1,7]},{24:[2,27],28:[2,27]},{6:[1,26]},{6:[2,10],17:[2,10]},{6:[2,11],11:27,12:29,14:17,15:18,16:[1,19],17:[2,11],18:28,19:[1,30],20:[1,31],21:[1,32],22:[1,33],23:[1,34],28:[1,7],29:20,30:21,31:[1,22],32:[1,23]},{6:[2,12],16:[2,12],17:[2,12],19:[2,12],20:[2,12],21:[2,12],22:[2,12],23:[2,12],28:[2,12],31:[2,12],32:[2,12]},{6:[2,13],16:[2,13],17:[2,13],19:[2,13],20:[2,13],21:[2,13],22:[2,13],23:[2,13],28:[2,13],31:[2,13],32:[2,13]},{10:35,12:16,13:15,14:17,15:18,16:[1,19],18:36,19:[1,30],20:[1,31],21:[1,32],22:[1,33],23:[1,34],28:[1,7],29:20,30:21,31:[1,22],32:[1,23]},{6:[2,29],16:[2,29],17:[2,29],19:[2,29],20:[2,29],21:[2,29],22:[2,29],23:[2,29],28:[2,29],31:[2,29],32:[2,29]},{6:[2,30],16:[2,30],17:[2,30],19:[2,30],20:[2,30],21:[2,30],22:[2,30],23:[2,30],28:[2,30],31:[2,30],32:[2,30]},{6:[2,31],16:[2,31],17:[2,31],19:[2,31],20:[2,31],21:[2,31],22:[2,31],23:[2,31],28:[2,31],31:[2,31],32:[2,31]},{6:[2,32],16:[2,32],17:[2,32],19:[2,32],20:[2,32],21:[2,32],22:[2,32],23:[2,32],28:[2,32],31:[2,32],32:[2,32]},{6:[1,39],10:37,12:16,13:15,14:17,15:18,16:[1,19],26:38,28:[1,7],29:20,30:21,31:[1,22],32:[1,23]},{24:[2,26],28:[2,26]},{5:[2,23],28:[2,23]},{6:[2,21],12:40,14:17,15:18,16:[1,19],17:[2,21],28:[1,7],29:20,30:21,31:[1,22],32:[1,23]},{10:41,12:16,13:15,14:17,15:18,16:[1,19],28:[1,7],29:20,30:21,31:[1,22],32:[1,23]},{6:[2,9],16:[2,9],17:[2,9],28:[2,9],31:[2,9],32:[2,9]},{16:[2,16],17:[2,16],28:[2,16],31:[2,16],32:[2,16]},{16:[2,17],17:[2,17],28:[2,17],31:[2,17],32:[2,17]},{16:[2,18],17:[2,18],28:[2,18],31:[2,18],32:[2,18]},{16:[2,19],17:[2,19],28:[2,19],31:[2,19],32:[2,19]},{12:42,14:17,15:18,16:[1,19],28:[1,7],29:20,30:21,31:[1,22],32:[1,23]},{17:[1,43]},{17:[1,44]},{6:[1,45]},{10:46,12:16,13:15,14:17,15:18,16:[1,19],28:[1,7],29:20,30:21,31:[1,22],32:[1,23]},{33:[1,47]},{6:[2,8],16:[2,8],17:[2,8],28:[2,8],31:[2,8],32:[2,8]},{6:[2,22],17:[2,22]},{23:[1,48]},{6:[2,14],16:[2,14],17:[2,14],19:[2,14],20:[2,14],21:[2,14],22:[2,14],23:[2,14],28:[2,14],31:[2,14],32:[2,14]},{6:[2,15],16:[2,15],17:[2,15],19:[2,15],20:[2,15],21:[2,15],22:[2,15],23:[2,15],28:[2,15],31:[2,15],32:[2,15]},{5:[2,24],28:[2,24]},{6:[1,50],27:49},{16:[2,33],28:[2,33],31:[2,33],32:[2,33]},{16:[2,20],17:[2,20],28:[2,20],31:[2,20],32:[2,20]},{5:[2,25],28:[2,25]},{34:[1,51]},{5:[2,34],28:[2,34]}],
defaultActions: {8:[2,1],10:[2,2]},
parseError: function parseError(str, hash) {
    if (hash.recoverable) {
        this.trace(str);
    } else {
        throw new Error(str);
    }
},
parse: function parse(input) {
    var self = this, stack = [0], vstack = [null], lstack = [], table = this.table, yytext = '', yylineno = 0, yyleng = 0, recovering = 0, TERROR = 2, EOF = 1;
    var args = lstack.slice.call(arguments, 1);
    this.lexer.setInput(input);
    this.lexer.yy = this.yy;
    this.yy.lexer = this.lexer;
    this.yy.parser = this;
    if (typeof this.lexer.yylloc == 'undefined') {
        this.lexer.yylloc = {};
    }
    var yyloc = this.lexer.yylloc;
    lstack.push(yyloc);
    var ranges = this.lexer.options && this.lexer.options.ranges;
    if (typeof this.yy.parseError === 'function') {
        this.parseError = this.yy.parseError;
    } else {
        this.parseError = Object.getPrototypeOf(this).parseError;
    }
    function popStack(n) {
        stack.length = stack.length - 2 * n;
        vstack.length = vstack.length - n;
        lstack.length = lstack.length - n;
    }
    function lex() {
        var token;
        token = self.lexer.lex() || EOF;
        if (typeof token !== 'number') {
            token = self.symbols_[token] || token;
        }
        return token;
    }
    var symbol, preErrorSymbol, state, action, a, r, yyval = {}, p, len, newState, expected;
    while (true) {
        state = stack[stack.length - 1];
        if (this.defaultActions[state]) {
            action = this.defaultActions[state];
        } else {
            if (symbol === null || typeof symbol == 'undefined') {
                symbol = lex();
            }
            action = table[state] && table[state][symbol];
        }
                    if (typeof action === 'undefined' || !action.length || !action[0]) {
                var errStr = '';
                expected = [];
                for (p in table[state]) {
                    if (this.terminals_[p] && p > TERROR) {
                        expected.push('\'' + this.terminals_[p] + '\'');
                    }
                }
                if (this.lexer.showPosition) {
                    errStr = 'Parse error on line ' + (yylineno + 1) + ':\n' + this.lexer.showPosition() + '\nExpecting ' + expected.join(', ') + ', got \'' + (this.terminals_[symbol] || symbol) + '\'';
                } else {
                    errStr = 'Parse error on line ' + (yylineno + 1) + ': Unexpected ' + (symbol == EOF ? 'end of input' : '\'' + (this.terminals_[symbol] || symbol) + '\'');
                }
                this.parseError(errStr, {
                    text: this.lexer.match,
                    token: this.terminals_[symbol] || symbol,
                    line: this.lexer.yylineno,
                    loc: yyloc,
                    expected: expected
                });
            }
        if (action[0] instanceof Array && action.length > 1) {
            throw new Error('Parse Error: multiple actions possible at state: ' + state + ', token: ' + symbol);
        }
        switch (action[0]) {
        case 1:
            stack.push(symbol);
            vstack.push(this.lexer.yytext);
            lstack.push(this.lexer.yylloc);
            stack.push(action[1]);
            symbol = null;
            if (!preErrorSymbol) {
                yyleng = this.lexer.yyleng;
                yytext = this.lexer.yytext;
                yylineno = this.lexer.yylineno;
                yyloc = this.lexer.yylloc;
                if (recovering > 0) {
                    recovering--;
                }
            } else {
                symbol = preErrorSymbol;
                preErrorSymbol = null;
            }
            break;
        case 2:
            len = this.productions_[action[1]][1];
            yyval.$ = vstack[vstack.length - len];
            yyval._$ = {
                first_line: lstack[lstack.length - (len || 1)].first_line,
                last_line: lstack[lstack.length - 1].last_line,
                first_column: lstack[lstack.length - (len || 1)].first_column,
                last_column: lstack[lstack.length - 1].last_column
            };
            if (ranges) {
                yyval._$.range = [
                    lstack[lstack.length - (len || 1)].range[0],
                    lstack[lstack.length - 1].range[1]
                ];
            }
            r = this.performAction.apply(yyval, [
                yytext,
                yyleng,
                yylineno,
                this.yy,
                action[1],
                vstack,
                lstack
            ].concat(args));
            if (typeof r !== 'undefined') {
                return r;
            }
            if (len) {
                stack = stack.slice(0, -1 * len * 2);
                vstack = vstack.slice(0, -1 * len);
                lstack = lstack.slice(0, -1 * len);
            }
            stack.push(this.productions_[action[1]][0]);
            vstack.push(yyval.$);
            lstack.push(yyval._$);
            newState = table[stack[stack.length - 2]][stack[stack.length - 1]];
            stack.push(newState);
            break;
        case 3:
            return true;
        }
    }
    return true;
}};

function Parser () {
  this.yy = {};
}
Parser.prototype = parser;parser.Parser = Parser;
return new Parser;
})();


if (typeof require !== 'undefined' && typeof exports !== 'undefined') {
exports.parser = grammar;
exports.Parser = grammar.Parser;
exports.parse = function () { return grammar.parse.apply(grammar, arguments); };
exports.main = function commonjsMain(args) {
    if (!args[1]) {
        console.log('Usage: '+args[0]+' FILE');
        process.exit(1);
    }
    var source = require('fs').readFileSync(require('path').normalize(args[1]), "utf8");
    return exports.parser.parse(source);
};
if (typeof module !== 'undefined' && require.main === module) {
  exports.main(process.argv.slice(1));
}
}