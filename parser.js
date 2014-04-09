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
symbols_: {"error":2,"program":3,"statement_list":4,"EOF":5,"NEWLINE":6,"statement":7,"definition":8,"type_annotation":9,"typedef":10,"import":11,"IMPORT":12,"string":13,"expr_list":14,"expr":15,"simple_expr_list":16,"simple_expr":17,"application":18,"literal":19,"(":20,")":21,"bin_op":22,"number":23,"symbol":24,"definable":25,"bin_symbol":26,"+":27,"-":28,"/":29,"*":30,"`":31,"TYPEDEF":32,"TYPE_SYMBOL":33,"=":34,"type":35,"DOUBLE_COLON":36,"or_type":37,"simple_type":38,"|":39,"any_type":40,"TYPE_ANY":41,"function_type":42,"type_symbol":43,"SYMBOL":44,"R_ARROW":45,"literal_list":46,"indent":47,"dedent":48,"STRING":49,"fixnum":50,"float":51,"FIXNUM":52,"FLOAT":53,"INDENT":54,"DEDENT":55,"$accept":0,"$end":1},
terminals_: {2:"error",5:"EOF",6:"NEWLINE",12:"IMPORT",20:"(",21:")",27:"+",28:"-",29:"/",30:"*",31:"`",32:"TYPEDEF",33:"TYPE_SYMBOL",34:"=",36:"DOUBLE_COLON",39:"|",41:"TYPE_ANY",44:"SYMBOL",45:"R_ARROW",49:"STRING",52:"FIXNUM",53:"FLOAT",54:"INDENT",55:"DEDENT"},
productions_: [0,[3,2],[3,2],[4,2],[4,1],[7,1],[7,1],[7,1],[7,1],[11,3],[14,2],[14,1],[16,2],[16,1],[15,1],[15,1],[17,1],[17,3],[17,3],[19,1],[19,1],[19,1],[25,1],[25,3],[26,1],[26,1],[26,1],[26,1],[22,1],[22,3],[10,5],[9,4],[9,6],[37,3],[40,1],[35,1],[35,1],[35,1],[38,1],[38,1],[38,1],[38,3],[42,3],[18,2],[18,3],[8,4],[8,5],[8,6],[46,2],[46,1],[24,1],[43,1],[13,1],[23,1],[23,1],[50,1],[51,1],[47,2],[48,2]],
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
case 9: this.$ = yy.Import($$[$0-1]); 
break;
case 10: this.$ = $$[$0-1]; this.$.push($$[$0]); 
break;
case 11: this.$ = [$$[$0]]; 
break;
case 12: this.$ = $$[$0-1]; this.$.push($$[$0]); 
break;
case 13:this.$ = [$$[$0]];
break;
case 17:this.$ = $$[$0-1];
break;
case 18:this.$ = $$[$0-1];
break;
case 23:this.$ = $$[$0-1];
break;
case 24: this.$ = yy.Symbol('$_add_$'); 
break;
case 25: this.$ = yy.Symbol('$_subtract_$'); 
break;
case 26: this.$ = yy.Symbol('$_divide_$'); 
break;
case 27: this.$ = yy.Symbol('$_multiply_$'); 
break;
case 29:this.$ = $$[$0-1];
break;
case 30: this.$ = yy.TypeDef($$[$0-3], $$[$0-1]); 
break;
case 31: this.$ = yy.TypeAnnotation($$[$0-3], $$[$0-1]); 
break;
case 32: this.$ = yy.TypeAnnotation($$[$0-4], $$[$0-1]); 
break;
case 33: this.$ = yy.OrType($$[$0-2], $$[$0]); 
break;
case 34: this.$ = yy.AnyType(); 
break;
case 40: this.$ = yy.makeTypeVariable($$[$0]); 
break;
case 41:this.$ = $$[$0-1];
break;
case 42: this.$ = yy.FunctionType($$[$0-2], $$[$0]); 
break;
case 43: this.$ = yy.makeApplication($$[$0-1], $$[$0]); 
break;
case 44: this.$ = yy.makeApplication($$[$0-1], [$$[$0-2], $$[$0]]); 
break;
case 45: this.$ = yy.VarDef($$[$0-3], $$[$0-1]); 
break;
case 46: this.$ = yy.VarDef($$[$0-4], yy.makeFunction($$[$0-3], $$[$0-1])); 
break;
case 47: this.$ = yy.VarDef($$[$0-5], yy.makeFunction($$[$0-4], $$[$0-1])); 
break;
case 48: this.$ = $$[$0-1]; this.$.push($$[$0]); 
break;
case 49:this.$ = [$$[$0]];
break;
case 50: this.$ = yy.Symbol(yytext); 
break;
case 51: this.$ = yy.TypeSymbol(yytext); 
break;
case 52: this.$ = yy.String(yytext); 
break;
case 55: this.$ = yy.Integer(yytext); 
break;
case 56: this.$ = yy.Float(yytext); 
break;
}
},
table: [{3:1,4:2,6:[1,3],7:4,8:5,9:6,10:7,11:8,12:[1,13],20:[1,11],24:9,25:10,32:[1,12],44:[1,14]},{1:[3]},{5:[1,15],7:16,8:5,9:6,10:7,11:8,12:[1,13],20:[1,11],24:9,25:10,32:[1,12],44:[1,14]},{3:17,4:2,6:[1,3],7:4,8:5,9:6,10:7,11:8,12:[1,13],20:[1,11],24:9,25:10,32:[1,12],44:[1,14]},{5:[2,4],12:[2,4],20:[2,4],32:[2,4],44:[2,4]},{5:[2,5],12:[2,5],20:[2,5],32:[2,5],44:[2,5]},{5:[2,6],12:[2,6],20:[2,6],32:[2,6],44:[2,6]},{5:[2,7],12:[2,7],20:[2,7],32:[2,7],44:[2,7]},{5:[2,8],12:[2,8],20:[2,8],32:[2,8],44:[2,8]},{34:[1,18],36:[1,19],44:[2,22],49:[2,22],52:[2,22],53:[2,22]},{13:24,19:21,23:22,24:23,44:[1,14],46:20,49:[1,27],50:25,51:26,52:[1,28],53:[1,29]},{26:30,27:[1,31],28:[1,32],29:[1,33],30:[1,34]},{33:[1,35]},{13:36,49:[1,27]},{6:[2,50],20:[2,50],21:[2,50],27:[2,50],28:[2,50],29:[2,50],30:[2,50],31:[2,50],34:[2,50],36:[2,50],44:[2,50],49:[2,50],52:[2,50],53:[2,50]},{1:[2,1]},{5:[2,3],12:[2,3],20:[2,3],32:[2,3],44:[2,3]},{1:[2,2]},{13:24,15:37,17:39,18:38,19:40,20:[1,41],23:22,24:23,44:[1,14],49:[1,27],50:25,51:26,52:[1,28],53:[1,29]},{20:[1,49],33:[1,50],35:42,37:45,38:44,40:47,41:[1,51],42:43,43:46,44:[1,48]},{13:24,19:53,23:22,24:23,34:[1,52],44:[1,14],49:[1,27],50:25,51:26,52:[1,28],53:[1,29]},{34:[2,49],44:[2,49],49:[2,49],52:[2,49],53:[2,49]},{6:[2,19],20:[2,19],21:[2,19],27:[2,19],28:[2,19],29:[2,19],30:[2,19],31:[2,19],34:[2,19],44:[2,19],49:[2,19],52:[2,19],53:[2,19]},{6:[2,20],20:[2,20],21:[2,20],27:[2,20],28:[2,20],29:[2,20],30:[2,20],31:[2,20],34:[2,20],44:[2,20],49:[2,20],52:[2,20],53:[2,20]},{6:[2,21],20:[2,21],21:[2,21],27:[2,21],28:[2,21],29:[2,21],30:[2,21],31:[2,21],34:[2,21],44:[2,21],49:[2,21],52:[2,21],53:[2,21]},{6:[2,53],20:[2,53],21:[2,53],27:[2,53],28:[2,53],29:[2,53],30:[2,53],31:[2,53],34:[2,53],44:[2,53],49:[2,53],52:[2,53],53:[2,53]},{6:[2,54],20:[2,54],21:[2,54],27:[2,54],28:[2,54],29:[2,54],30:[2,54],31:[2,54],34:[2,54],44:[2,54],49:[2,54],52:[2,54],53:[2,54]},{6:[2,52],20:[2,52],21:[2,52],27:[2,52],28:[2,52],29:[2,52],30:[2,52],31:[2,52],34:[2,52],44:[2,52],49:[2,52],52:[2,52],53:[2,52]},{6:[2,55],20:[2,55],21:[2,55],27:[2,55],28:[2,55],29:[2,55],30:[2,55],31:[2,55],34:[2,55],44:[2,55],49:[2,55],52:[2,55],53:[2,55]},{6:[2,56],20:[2,56],21:[2,56],27:[2,56],28:[2,56],29:[2,56],30:[2,56],31:[2,56],34:[2,56],44:[2,56],49:[2,56],52:[2,56],53:[2,56]},{21:[1,54]},{20:[2,24],21:[2,24],44:[2,24],49:[2,24],52:[2,24],53:[2,24]},{20:[2,25],21:[2,25],44:[2,25],49:[2,25],52:[2,25],53:[2,25]},{20:[2,26],21:[2,26],44:[2,26],49:[2,26],52:[2,26],53:[2,26]},{20:[2,27],21:[2,27],44:[2,27],49:[2,27],52:[2,27],53:[2,27]},{34:[1,55]},{6:[1,56]},{6:[1,57]},{6:[2,14],21:[2,14]},{6:[2,15],13:24,16:58,17:60,19:40,20:[1,41],21:[2,15],22:59,23:22,24:23,26:61,27:[1,31],28:[1,32],29:[1,33],30:[1,34],31:[1,62],44:[1,14],49:[1,27],50:25,51:26,52:[1,28],53:[1,29]},{6:[2,16],20:[2,16],21:[2,16],27:[2,16],28:[2,16],29:[2,16],30:[2,16],31:[2,16],44:[2,16],49:[2,16],52:[2,16],53:[2,16]},{13:24,15:63,17:39,18:38,19:40,20:[1,41],22:64,23:22,24:23,26:61,27:[1,31],28:[1,32],29:[1,33],30:[1,34],31:[1,62],44:[1,14],49:[1,27],50:25,51:26,52:[1,28],53:[1,29]},{6:[1,65]},{6:[2,35],21:[2,35]},{6:[2,36],21:[2,36],39:[1,67],45:[1,66]},{6:[2,37],21:[2,37]},{6:[2,38],21:[2,38],39:[2,38],45:[2,38]},{6:[2,39],21:[2,39],39:[2,39],45:[2,39]},{6:[2,40],21:[2,40],39:[2,40],45:[2,40]},{20:[1,49],33:[1,50],35:68,37:45,38:44,40:47,41:[1,51],42:43,43:46,44:[1,48]},{6:[2,51],21:[2,51],39:[2,51],45:[2,51]},{6:[2,34],21:[2,34],39:[2,34],45:[2,34]},{6:[1,71],13:24,15:69,17:39,18:38,19:40,20:[1,41],23:22,24:23,44:[1,14],47:70,49:[1,27],50:25,51:26,52:[1,28],53:[1,29]},{34:[2,48],44:[2,48],49:[2,48],52:[2,48],53:[2,48]},{36:[1,72],44:[2,23],49:[2,23],52:[2,23],53:[2,23]},{20:[1,49],33:[1,50],35:73,37:45,38:44,40:47,41:[1,51],42:43,43:46,44:[1,48]},{5:[2,9],12:[2,9],20:[2,9],32:[2,9],44:[2,9]},{5:[2,45],12:[2,45],20:[2,45],32:[2,45],44:[2,45]},{6:[2,43],13:24,17:74,19:40,20:[1,41],21:[2,43],23:22,24:23,44:[1,14],49:[1,27],50:25,51:26,52:[1,28],53:[1,29]},{13:24,15:75,17:39,18:38,19:40,20:[1,41],23:22,24:23,44:[1,14],49:[1,27],50:25,51:26,52:[1,28],53:[1,29]},{6:[2,13],20:[2,13],21:[2,13],44:[2,13],49:[2,13],52:[2,13],53:[2,13]},{20:[2,28],21:[2,28],44:[2,28],49:[2,28],52:[2,28],53:[2,28]},{13:24,17:76,19:40,20:[1,41],23:22,24:23,44:[1,14],49:[1,27],50:25,51:26,52:[1,28],53:[1,29]},{21:[1,77]},{21:[1,78]},{5:[2,31],12:[2,31],20:[2,31],32:[2,31],44:[2,31]},{20:[1,49],33:[1,50],35:79,37:45,38:44,40:47,41:[1,51],42:43,43:46,44:[1,48]},{20:[1,49],33:[1,50],35:80,37:45,38:44,40:47,41:[1,51],42:43,43:46,44:[1,48]},{21:[1,81]},{6:[1,82]},{13:24,15:83,17:39,18:38,19:40,20:[1,41],23:22,24:23,44:[1,14],49:[1,27],50:25,51:26,52:[1,28],53:[1,29]},{54:[1,84]},{20:[1,49],33:[1,50],35:85,37:45,38:44,40:47,41:[1,51],42:43,43:46,44:[1,48]},{6:[1,86]},{6:[2,12],20:[2,12],21:[2,12],44:[2,12],49:[2,12],52:[2,12],53:[2,12]},{6:[2,44],21:[2,44]},{31:[1,87]},{6:[2,17],20:[2,17],21:[2,17],27:[2,17],28:[2,17],29:[2,17],30:[2,17],31:[2,17],44:[2,17],49:[2,17],52:[2,17],53:[2,17]},{6:[2,18],20:[2,18],21:[2,18],27:[2,18],28:[2,18],29:[2,18],30:[2,18],31:[2,18],44:[2,18],49:[2,18],52:[2,18],53:[2,18]},{6:[2,42],21:[2,42]},{6:[2,33],21:[2,33]},{6:[2,41],21:[2,41],39:[2,41],45:[2,41]},{5:[2,46],12:[2,46],20:[2,46],32:[2,46],44:[2,46]},{6:[1,89],48:88},{20:[2,57],44:[2,57],49:[2,57],52:[2,57],53:[2,57]},{6:[1,90]},{5:[2,30],12:[2,30],20:[2,30],32:[2,30],44:[2,30]},{20:[2,29],21:[2,29],44:[2,29],49:[2,29],52:[2,29],53:[2,29]},{5:[2,47],12:[2,47],20:[2,47],32:[2,47],44:[2,47]},{55:[1,91]},{5:[2,32],12:[2,32],20:[2,32],32:[2,32],44:[2,32]},{5:[2,58],12:[2,58],20:[2,58],32:[2,58],44:[2,58]}],
defaultActions: {15:[2,1],17:[2,2]},
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