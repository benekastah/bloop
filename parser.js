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
var parser = (function(){
var parser = {trace: function trace() { },
yy: {},
symbols_: {"error":2,"program":3,"statement_list":4,"EOF":5,"NEWLINE":6,"statement":7,"definition":8,"type_annotation":9,"typedef":10,"expr_list":11,"expr":12,"simple_expr_list":13,"simple_expr":14,"application":15,"literal":16,"(":17,")":18,"bin_op":19,"number":20,"symbol":21,"definable":22,"bin_symbol":23,"+":24,"-":25,"/":26,"*":27,"`":28,"TYPEDEF":29,"TYPE_SYMBOL":30,"=":31,"type":32,"DOUBLE_COLON":33,"or_type":34,"simple_type":35,"|":36,"any_type":37,"TYPE_ANY":38,"function_type":39,"type_symbol":40,"SYMBOL":41,"R_ARROW":42,"literal_list":43,"indent":44,"dedent":45,"fixnum":46,"float":47,"FIXNUM":48,"FLOAT":49,"INDENT":50,"DEDENT":51,"$accept":0,"$end":1},
terminals_: {2:"error",5:"EOF",6:"NEWLINE",17:"(",18:")",24:"+",25:"-",26:"/",27:"*",28:"`",29:"TYPEDEF",30:"TYPE_SYMBOL",31:"=",33:"DOUBLE_COLON",36:"|",38:"TYPE_ANY",41:"SYMBOL",42:"R_ARROW",48:"FIXNUM",49:"FLOAT",50:"INDENT",51:"DEDENT"},
productions_: [0,[3,2],[3,2],[4,2],[4,1],[7,1],[7,1],[7,1],[11,2],[11,1],[13,2],[13,1],[12,1],[12,1],[14,1],[14,3],[14,3],[16,1],[16,1],[22,1],[22,3],[23,1],[23,1],[23,1],[23,1],[19,1],[19,3],[10,5],[9,4],[9,6],[34,3],[37,1],[32,1],[32,1],[32,1],[35,1],[35,1],[35,1],[35,3],[39,3],[15,2],[15,3],[8,4],[8,5],[8,6],[43,2],[43,1],[21,1],[40,1],[20,1],[20,1],[46,1],[47,1],[44,2],[45,2]],
performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate /* action[1] */, $$ /* vstack */, _$ /* lstack */) {
/* this == yyval */

var $0 = $$.length - 1;
switch (yystate) {
case 1: return yy.Module($$[$0-1]); 
break;
case 3: this.$ = $$[$0-1]; this.$.push($$[$0]); 
break;
case 4: this.$ = [$$[$0]]; 
break;
case 8: this.$ = $$[$0-1]; this.$.push($$[$0]); 
break;
case 9: this.$ = [$$[$0]]; 
break;
case 10: this.$ = $$[$0-1]; this.$.push($$[$0]); 
break;
case 11:this.$ = [$$[$0]];
break;
case 15:this.$ = $$[$0-1];
break;
case 16:this.$ = $$[$0-1];
break;
case 20:this.$ = $$[$0-1];
break;
case 21: this.$ = yy.Symbol($$[$0]); 
break;
case 22: this.$ = yy.Symbol($$[$0]); 
break;
case 23: this.$ = yy.Symbol($$[$0]); 
break;
case 24: this.$ = yy.Symbol($$[$0]); 
break;
case 26:this.$ = $$[$0-1];
break;
case 27: this.$ = yy.TypeDef($$[$0-3], $$[$0-1]); 
break;
case 28: this.$ = yy.TypeAnnotation($$[$0-3], $$[$0-1]); 
break;
case 29: this.$ = yy.TypeAnnotation($$[$0-4], $$[$0-1]); 
break;
case 30: this.$ = yy.OrType($$[$0-2], $$[$0]); 
break;
case 31: this.$ = yy.AnyType(); 
break;
case 37: this.$ = yy.makeTypeVariable($$[$0]); 
break;
case 38:this.$ = $$[$0-1];
break;
case 39: this.$ = yy.FunctionType($$[$0-2], $$[$0]); 
break;
case 40: this.$ = yy.makeApplication($$[$0-1], $$[$0]); 
break;
case 41: this.$ = yy.makeApplication($$[$0-1], [$$[$0-2], $$[$0]]); 
break;
case 42: this.$ = yy.VarDef($$[$0-3], $$[$0-1]); 
break;
case 43: this.$ = yy.VarDef($$[$0-4], yy.makeFunction($$[$0-3], $$[$0-1])); 
break;
case 44: this.$ = yy.VarDef($$[$0-5], yy.makeFunction($$[$0-4], $$[$0-1])); 
break;
case 45: this.$ = $$[$0-1]; this.$.push($$[$0]); 
break;
case 46:this.$ = [$$[$0]];
break;
case 47: this.$ = yy.Symbol(yytext); 
break;
case 48: this.$ = yy.TypeSymbol(yytext); 
break;
case 51: this.$ = yy.Integer(yytext); 
break;
case 52: this.$ = yy.Float(yytext); 
break;
}
},
table: [{3:1,4:2,6:[1,3],7:4,8:5,9:6,10:7,17:[1,10],21:8,22:9,29:[1,11],41:[1,12]},{1:[3]},{5:[1,13],7:14,8:5,9:6,10:7,17:[1,10],21:8,22:9,29:[1,11],41:[1,12]},{3:15,4:2,6:[1,3],7:4,8:5,9:6,10:7,17:[1,10],21:8,22:9,29:[1,11],41:[1,12]},{5:[2,4],17:[2,4],29:[2,4],41:[2,4]},{5:[2,5],17:[2,5],29:[2,5],41:[2,5]},{5:[2,6],17:[2,6],29:[2,6],41:[2,6]},{5:[2,7],17:[2,7],29:[2,7],41:[2,7]},{31:[1,16],33:[1,17],41:[2,19],48:[2,19],49:[2,19]},{16:19,20:20,21:21,41:[1,12],43:18,46:22,47:23,48:[1,24],49:[1,25]},{23:26,24:[1,27],25:[1,28],26:[1,29],27:[1,30]},{30:[1,31]},{6:[2,47],17:[2,47],18:[2,47],24:[2,47],25:[2,47],26:[2,47],27:[2,47],28:[2,47],31:[2,47],33:[2,47],41:[2,47],48:[2,47],49:[2,47]},{1:[2,1]},{5:[2,3],17:[2,3],29:[2,3],41:[2,3]},{1:[2,2]},{12:32,14:34,15:33,16:35,17:[1,36],20:20,21:21,41:[1,12],46:22,47:23,48:[1,24],49:[1,25]},{17:[1,44],30:[1,45],32:37,34:40,35:39,37:42,38:[1,46],39:38,40:41,41:[1,43]},{16:48,20:20,21:21,31:[1,47],41:[1,12],46:22,47:23,48:[1,24],49:[1,25]},{31:[2,46],41:[2,46],48:[2,46],49:[2,46]},{6:[2,17],17:[2,17],18:[2,17],24:[2,17],25:[2,17],26:[2,17],27:[2,17],28:[2,17],31:[2,17],41:[2,17],48:[2,17],49:[2,17]},{6:[2,18],17:[2,18],18:[2,18],24:[2,18],25:[2,18],26:[2,18],27:[2,18],28:[2,18],31:[2,18],41:[2,18],48:[2,18],49:[2,18]},{6:[2,49],17:[2,49],18:[2,49],24:[2,49],25:[2,49],26:[2,49],27:[2,49],28:[2,49],31:[2,49],41:[2,49],48:[2,49],49:[2,49]},{6:[2,50],17:[2,50],18:[2,50],24:[2,50],25:[2,50],26:[2,50],27:[2,50],28:[2,50],31:[2,50],41:[2,50],48:[2,50],49:[2,50]},{6:[2,51],17:[2,51],18:[2,51],24:[2,51],25:[2,51],26:[2,51],27:[2,51],28:[2,51],31:[2,51],41:[2,51],48:[2,51],49:[2,51]},{6:[2,52],17:[2,52],18:[2,52],24:[2,52],25:[2,52],26:[2,52],27:[2,52],28:[2,52],31:[2,52],41:[2,52],48:[2,52],49:[2,52]},{18:[1,49]},{17:[2,21],18:[2,21],41:[2,21],48:[2,21],49:[2,21]},{17:[2,22],18:[2,22],41:[2,22],48:[2,22],49:[2,22]},{17:[2,23],18:[2,23],41:[2,23],48:[2,23],49:[2,23]},{17:[2,24],18:[2,24],41:[2,24],48:[2,24],49:[2,24]},{31:[1,50]},{6:[1,51]},{6:[2,12],18:[2,12]},{6:[2,13],13:52,14:54,16:35,17:[1,36],18:[2,13],19:53,20:20,21:21,23:55,24:[1,27],25:[1,28],26:[1,29],27:[1,30],28:[1,56],41:[1,12],46:22,47:23,48:[1,24],49:[1,25]},{6:[2,14],17:[2,14],18:[2,14],24:[2,14],25:[2,14],26:[2,14],27:[2,14],28:[2,14],41:[2,14],48:[2,14],49:[2,14]},{12:57,14:34,15:33,16:35,17:[1,36],19:58,20:20,21:21,23:55,24:[1,27],25:[1,28],26:[1,29],27:[1,30],28:[1,56],41:[1,12],46:22,47:23,48:[1,24],49:[1,25]},{6:[1,59]},{6:[2,32],18:[2,32]},{6:[2,33],18:[2,33],36:[1,61],42:[1,60]},{6:[2,34],18:[2,34]},{6:[2,35],18:[2,35],36:[2,35],42:[2,35]},{6:[2,36],18:[2,36],36:[2,36],42:[2,36]},{6:[2,37],18:[2,37],36:[2,37],42:[2,37]},{17:[1,44],30:[1,45],32:62,34:40,35:39,37:42,38:[1,46],39:38,40:41,41:[1,43]},{6:[2,48],18:[2,48],36:[2,48],42:[2,48]},{6:[2,31],18:[2,31],36:[2,31],42:[2,31]},{6:[1,65],12:63,14:34,15:33,16:35,17:[1,36],20:20,21:21,41:[1,12],44:64,46:22,47:23,48:[1,24],49:[1,25]},{31:[2,45],41:[2,45],48:[2,45],49:[2,45]},{33:[1,66],41:[2,20],48:[2,20],49:[2,20]},{17:[1,44],30:[1,45],32:67,34:40,35:39,37:42,38:[1,46],39:38,40:41,41:[1,43]},{5:[2,42],17:[2,42],29:[2,42],41:[2,42]},{6:[2,40],14:68,16:35,17:[1,36],18:[2,40],20:20,21:21,41:[1,12],46:22,47:23,48:[1,24],49:[1,25]},{12:69,14:34,15:33,16:35,17:[1,36],20:20,21:21,41:[1,12],46:22,47:23,48:[1,24],49:[1,25]},{6:[2,11],17:[2,11],18:[2,11],41:[2,11],48:[2,11],49:[2,11]},{17:[2,25],18:[2,25],41:[2,25],48:[2,25],49:[2,25]},{14:70,16:35,17:[1,36],20:20,21:21,41:[1,12],46:22,47:23,48:[1,24],49:[1,25]},{18:[1,71]},{18:[1,72]},{5:[2,28],17:[2,28],29:[2,28],41:[2,28]},{17:[1,44],30:[1,45],32:73,34:40,35:39,37:42,38:[1,46],39:38,40:41,41:[1,43]},{17:[1,44],30:[1,45],32:74,34:40,35:39,37:42,38:[1,46],39:38,40:41,41:[1,43]},{18:[1,75]},{6:[1,76]},{12:77,14:34,15:33,16:35,17:[1,36],20:20,21:21,41:[1,12],46:22,47:23,48:[1,24],49:[1,25]},{50:[1,78]},{17:[1,44],30:[1,45],32:79,34:40,35:39,37:42,38:[1,46],39:38,40:41,41:[1,43]},{6:[1,80]},{6:[2,10],17:[2,10],18:[2,10],41:[2,10],48:[2,10],49:[2,10]},{6:[2,41],18:[2,41]},{28:[1,81]},{6:[2,15],17:[2,15],18:[2,15],24:[2,15],25:[2,15],26:[2,15],27:[2,15],28:[2,15],41:[2,15],48:[2,15],49:[2,15]},{6:[2,16],17:[2,16],18:[2,16],24:[2,16],25:[2,16],26:[2,16],27:[2,16],28:[2,16],41:[2,16],48:[2,16],49:[2,16]},{6:[2,39],18:[2,39]},{6:[2,30],18:[2,30]},{6:[2,38],18:[2,38],36:[2,38],42:[2,38]},{5:[2,43],17:[2,43],29:[2,43],41:[2,43]},{6:[1,83],45:82},{17:[2,53],41:[2,53],48:[2,53],49:[2,53]},{6:[1,84]},{5:[2,27],17:[2,27],29:[2,27],41:[2,27]},{17:[2,26],18:[2,26],41:[2,26],48:[2,26],49:[2,26]},{5:[2,44],17:[2,44],29:[2,44],41:[2,44]},{51:[1,85]},{5:[2,29],17:[2,29],29:[2,29],41:[2,29]},{5:[2,54],17:[2,54],29:[2,54],41:[2,54]}],
defaultActions: {13:[2,1],15:[2,2]},
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
exports.parser = parser;
exports.Parser = parser.Parser;
exports.parse = function () { return parser.parse.apply(parser, arguments); };
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