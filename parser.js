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
symbols_: {"error":2,"program":3,"statement_list":4,"EOF":5,"NEWLINE":6,"statement":7,"definition":8,"type_annotation":9,"typedef":10,"data_type":11,"import":12,"IMPORT":13,"import_path":14,".":15,"symbol":16,"expr_list":17,"expr":18,"simple_expr_list":19,"simple_expr":20,"application":21,"data_application":22,"struct":23,"literal":24,"(":25,")":26,"bin_op":27,"number":28,"string":29,"bin_symbol":30,"+":31,"-":32,"/":33,"*":34,"`":35,"TYPEDEF":36,"TYPE_SYMBOL":37,"=":38,"type":39,"DATA":40,"data_type_constructor_list":41,",":42,"data_type_constructor":43,"DOUBLE_COLON":44,"type_annotation_list":45,"or_type":46,"simple_type":47,"|":48,"any_type":49,"TYPE_ANY":50,"struct_type":51,"{":52,"}":53,"function_type":54,"type_symbol":55,"SYMBOL":56,"R_ARROW":57,"definable":58,"literal_list":59,"indent":60,"dedent":61,"definition_list":62,"STRING":63,"fixnum":64,"float":65,"FIXNUM":66,"FLOAT":67,"INDENT":68,"DEDENT":69,"$accept":0,"$end":1},
terminals_: {2:"error",5:"EOF",6:"NEWLINE",13:"IMPORT",15:".",25:"(",26:")",31:"+",32:"-",33:"/",34:"*",35:"`",36:"TYPEDEF",37:"TYPE_SYMBOL",38:"=",40:"DATA",42:",",44:"DOUBLE_COLON",48:"|",50:"TYPE_ANY",52:"{",53:"}",56:"SYMBOL",57:"R_ARROW",63:"STRING",66:"FIXNUM",67:"FLOAT",68:"INDENT",69:"DEDENT"},
productions_: [0,[3,2],[3,2],[4,2],[4,1],[7,1],[7,1],[7,1],[7,1],[7,1],[12,3],[14,3],[14,1],[17,2],[17,1],[19,2],[19,1],[18,1],[18,1],[18,1],[18,1],[20,1],[20,3],[20,3],[24,1],[24,1],[24,1],[30,1],[30,1],[30,1],[30,1],[27,1],[27,3],[10,5],[11,5],[41,3],[41,1],[43,2],[43,1],[9,4],[9,6],[45,2],[45,1],[46,3],[49,1],[51,3],[39,1],[39,1],[39,1],[39,1],[47,1],[47,1],[47,1],[47,3],[54,3],[21,2],[21,3],[22,2],[22,1],[8,4],[8,5],[8,6],[62,2],[62,1],[58,1],[58,3],[59,2],[59,1],[16,1],[55,1],[29,1],[28,1],[28,1],[23,3],[64,1],[65,1],[60,2],[61,2]],
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
case 10: this.$ = yy.Import($$[$0-1]); 
break;
case 11: this.$ = $$[$0-2]; this.$.push($$[$0]) 
break;
case 12: this.$ = [$$[$0]]; 
break;
case 13: this.$ = $$[$0-1]; this.$.push($$[$0]); 
break;
case 14: this.$ = [$$[$0]]; 
break;
case 15: this.$ = $$[$0-1]; this.$.push($$[$0]); 
break;
case 16:this.$ = [$$[$0]];
break;
case 22:this.$ = $$[$0-1];
break;
case 23:this.$ = $$[$0-1];
break;
case 27: this.$ = yy.Symbol('$_add_$'); 
break;
case 28: this.$ = yy.Symbol('$_subtract_$'); 
break;
case 29: this.$ = yy.Symbol('$_divide_$'); 
break;
case 30: this.$ = yy.Symbol('$_multiply_$'); 
break;
case 32:this.$ = $$[$0-1];
break;
case 33: this.$ = yy.TypeDef($$[$0-3], $$[$0-1]); 
break;
case 34: this.$ = yy.DataType($$[$0-3], $$[$0-1]); 
break;
case 35: this.$ = $$[$0-2]; this.$.push($$[$0]); 
break;
case 36: this.$ = [$$[$0]]; 
break;
case 37: this.$ = yy.DataTypeConstructor($$[$0-1], $$[$0]); 
break;
case 38: this.$ = yy.DataTypeConstructor($$[$0]); 
break;
case 39: this.$ = yy.TypeAnnotation($$[$0-3], $$[$0-1]); 
break;
case 40: this.$ = yy.TypeAnnotation($$[$0-4], $$[$0-1]); 
break;
case 41: this.$ = $$[$0-1]; this.$.push($$[$0]); 
break;
case 42: this.$ = [$$[$0]]; 
break;
case 43: this.$ = yy.OrType($$[$0-2], $$[$0]); 
break;
case 44: this.$ = yy.AnyType(); 
break;
case 45: this.$ = yy.StructType($$[$0-1]); 
break;
case 52: this.$ = yy.makeTypeVariable($$[$0]); 
break;
case 53:this.$ = $$[$0-1];
break;
case 54: this.$ = yy.FunctionType($$[$0-2], $$[$0]); 
break;
case 55: this.$ = yy.makeApplication($$[$0-1], $$[$0]); 
break;
case 56: this.$ = yy.makeApplication($$[$0-1], [$$[$0-2], $$[$0]]); 
break;
case 57: this.$ = yy.Application(yy.Symbol($$[$0-1]), $$[$0], true); 
break;
case 58: this.$ = yy.Symbol($$[$0]); 
break;
case 59: this.$ = yy.VarDef($$[$0-3], $$[$0-1]); 
break;
case 60: this.$ = yy.VarDef($$[$0-4], yy.makeFunction($$[$0-3], $$[$0-1])); 
break;
case 61: this.$ = yy.VarDef($$[$0-5], yy.makeFunction($$[$0-4], $$[$0-1])); 
break;
case 62: this.$ = $$[$0-1]; this.$.push($$[$0]); 
break;
case 63:this.$ = [$$[$0]];
break;
case 65:this.$ = $$[$0-1];
break;
case 66: this.$ = $$[$0-1]; this.$.push($$[$0]); 
break;
case 67:this.$ = [$$[$0]];
break;
case 68: this.$ = yy.Symbol(yytext); 
break;
case 69: this.$ = yy.TypeSymbol(yytext); 
break;
case 70: this.$ = yy.String(yytext); 
break;
case 73:this.$ = yy.Struct($$[$0-1]);
break;
case 74: this.$ = yy.Integer(yytext); 
break;
case 75: this.$ = yy.Float(yytext); 
break;
}
},
table: [{3:1,4:2,6:[1,3],7:4,8:5,9:6,10:7,11:8,12:9,13:[1,15],16:10,25:[1,12],36:[1,13],40:[1,14],56:[1,16],58:11},{1:[3]},{5:[1,17],7:18,8:5,9:6,10:7,11:8,12:9,13:[1,15],16:10,25:[1,12],36:[1,13],40:[1,14],56:[1,16],58:11},{3:19,4:2,6:[1,3],7:4,8:5,9:6,10:7,11:8,12:9,13:[1,15],16:10,25:[1,12],36:[1,13],40:[1,14],56:[1,16],58:11},{5:[2,4],13:[2,4],25:[2,4],36:[2,4],40:[2,4],56:[2,4]},{5:[2,5],13:[2,5],25:[2,5],36:[2,5],40:[2,5],56:[2,5]},{5:[2,6],13:[2,6],25:[2,6],36:[2,6],40:[2,6],56:[2,6]},{5:[2,7],13:[2,7],25:[2,7],36:[2,7],40:[2,7],56:[2,7]},{5:[2,8],13:[2,8],25:[2,8],36:[2,8],40:[2,8],56:[2,8]},{5:[2,9],13:[2,9],25:[2,9],36:[2,9],40:[2,9],56:[2,9]},{38:[1,20],44:[1,21],56:[2,64],63:[2,64],66:[2,64],67:[2,64]},{16:25,24:23,28:24,29:26,56:[1,16],59:22,63:[1,29],64:27,65:28,66:[1,30],67:[1,31]},{30:32,31:[1,33],32:[1,34],33:[1,35],34:[1,36]},{37:[1,37]},{37:[1,38]},{14:39,16:40,56:[1,16]},{6:[2,68],15:[2,68],25:[2,68],26:[2,68],31:[2,68],32:[2,68],33:[2,68],34:[2,68],35:[2,68],38:[2,68],44:[2,68],56:[2,68],63:[2,68],66:[2,68],67:[2,68]},{1:[2,1]},{5:[2,3],13:[2,3],25:[2,3],36:[2,3],40:[2,3],56:[2,3]},{1:[2,2]},{16:25,18:41,20:44,21:42,22:43,23:45,24:47,25:[1,48],28:24,29:26,37:[1,46],52:[1,49],56:[1,16],63:[1,29],64:27,65:28,66:[1,30],67:[1,31]},{25:[1,58],37:[1,60],39:50,46:53,47:52,49:56,50:[1,61],51:54,52:[1,59],54:51,55:55,56:[1,57]},{16:25,24:63,28:24,29:26,38:[1,62],56:[1,16],63:[1,29],64:27,65:28,66:[1,30],67:[1,31]},{38:[2,67],56:[2,67],63:[2,67],66:[2,67],67:[2,67]},{6:[2,24],25:[2,24],26:[2,24],31:[2,24],32:[2,24],33:[2,24],34:[2,24],35:[2,24],38:[2,24],56:[2,24],63:[2,24],66:[2,24],67:[2,24]},{6:[2,25],25:[2,25],26:[2,25],31:[2,25],32:[2,25],33:[2,25],34:[2,25],35:[2,25],38:[2,25],56:[2,25],63:[2,25],66:[2,25],67:[2,25]},{6:[2,26],25:[2,26],26:[2,26],31:[2,26],32:[2,26],33:[2,26],34:[2,26],35:[2,26],38:[2,26],56:[2,26],63:[2,26],66:[2,26],67:[2,26]},{6:[2,71],25:[2,71],26:[2,71],31:[2,71],32:[2,71],33:[2,71],34:[2,71],35:[2,71],38:[2,71],56:[2,71],63:[2,71],66:[2,71],67:[2,71]},{6:[2,72],25:[2,72],26:[2,72],31:[2,72],32:[2,72],33:[2,72],34:[2,72],35:[2,72],38:[2,72],56:[2,72],63:[2,72],66:[2,72],67:[2,72]},{6:[2,70],25:[2,70],26:[2,70],31:[2,70],32:[2,70],33:[2,70],34:[2,70],35:[2,70],38:[2,70],56:[2,70],63:[2,70],66:[2,70],67:[2,70]},{6:[2,74],25:[2,74],26:[2,74],31:[2,74],32:[2,74],33:[2,74],34:[2,74],35:[2,74],38:[2,74],56:[2,74],63:[2,74],66:[2,74],67:[2,74]},{6:[2,75],25:[2,75],26:[2,75],31:[2,75],32:[2,75],33:[2,75],34:[2,75],35:[2,75],38:[2,75],56:[2,75],63:[2,75],66:[2,75],67:[2,75]},{26:[1,64]},{25:[2,27],26:[2,27],37:[2,27],52:[2,27],56:[2,27],63:[2,27],66:[2,27],67:[2,27]},{25:[2,28],26:[2,28],37:[2,28],52:[2,28],56:[2,28],63:[2,28],66:[2,28],67:[2,28]},{25:[2,29],26:[2,29],37:[2,29],52:[2,29],56:[2,29],63:[2,29],66:[2,29],67:[2,29]},{25:[2,30],26:[2,30],37:[2,30],52:[2,30],56:[2,30],63:[2,30],66:[2,30],67:[2,30]},{38:[1,65]},{38:[1,66]},{6:[1,67],15:[1,68]},{6:[2,12],15:[2,12]},{6:[1,69]},{6:[2,17],26:[2,17]},{6:[2,18],26:[2,18]},{6:[2,19],16:25,19:70,20:72,24:47,25:[1,48],26:[2,19],27:71,28:24,29:26,30:73,31:[1,33],32:[1,34],33:[1,35],34:[1,36],35:[1,74],56:[1,16],63:[1,29],64:27,65:28,66:[1,30],67:[1,31]},{6:[2,20],26:[2,20]},{6:[2,58],16:25,18:75,20:44,21:42,22:43,23:45,24:47,25:[1,48],26:[2,58],28:24,29:26,37:[1,46],52:[1,49],56:[1,16],63:[1,29],64:27,65:28,66:[1,30],67:[1,31]},{6:[2,21],25:[2,21],26:[2,21],31:[2,21],32:[2,21],33:[2,21],34:[2,21],35:[2,21],56:[2,21],63:[2,21],66:[2,21],67:[2,21]},{16:25,18:76,20:44,21:42,22:43,23:45,24:47,25:[1,48],27:77,28:24,29:26,30:73,31:[1,33],32:[1,34],33:[1,35],34:[1,36],35:[1,74],37:[1,46],52:[1,49],56:[1,16],63:[1,29],64:27,65:28,66:[1,30],67:[1,31]},{8:79,16:80,25:[1,81],56:[1,16],58:11,62:78},{6:[1,82]},{6:[2,46],26:[2,46],42:[2,46]},{6:[2,47],26:[2,47],42:[2,47],48:[1,84],57:[1,83]},{6:[2,48],26:[2,48],42:[2,48]},{6:[2,49],26:[2,49],42:[2,49]},{6:[2,50],26:[2,50],42:[2,50],48:[2,50],57:[2,50]},{6:[2,51],26:[2,51],42:[2,51],48:[2,51],57:[2,51]},{6:[2,52],26:[2,52],42:[2,52],48:[2,52],57:[2,52]},{25:[1,58],37:[1,60],39:85,46:53,47:52,49:56,50:[1,61],51:54,52:[1,59],54:51,55:55,56:[1,57]},{9:87,16:88,25:[1,89],45:86,56:[1,16]},{6:[2,69],26:[2,69],42:[2,69],48:[2,69],57:[2,69]},{6:[2,44],26:[2,44],42:[2,44],48:[2,44],57:[2,44]},{6:[1,92],16:25,18:90,20:44,21:42,22:43,23:45,24:47,25:[1,48],28:24,29:26,37:[1,46],52:[1,49],56:[1,16],60:91,63:[1,29],64:27,65:28,66:[1,30],67:[1,31]},{38:[2,66],56:[2,66],63:[2,66],66:[2,66],67:[2,66]},{44:[1,93],56:[2,65],63:[2,65],66:[2,65],67:[2,65]},{25:[1,58],37:[1,60],39:94,46:53,47:52,49:56,50:[1,61],51:54,52:[1,59],54:51,55:55,56:[1,57]},{37:[1,97],41:95,43:96},{5:[2,10],13:[2,10],25:[2,10],36:[2,10],40:[2,10],56:[2,10]},{16:98,56:[1,16]},{5:[2,59],13:[2,59],25:[2,59],36:[2,59],40:[2,59],53:[2,59],56:[2,59]},{6:[2,55],16:25,20:99,24:47,25:[1,48],26:[2,55],28:24,29:26,56:[1,16],63:[1,29],64:27,65:28,66:[1,30],67:[1,31]},{16:25,18:100,20:44,21:42,22:43,23:45,24:47,25:[1,48],28:24,29:26,37:[1,46],52:[1,49],56:[1,16],63:[1,29],64:27,65:28,66:[1,30],67:[1,31]},{6:[2,16],25:[2,16],26:[2,16],56:[2,16],63:[2,16],66:[2,16],67:[2,16]},{25:[2,31],26:[2,31],37:[2,31],52:[2,31],56:[2,31],63:[2,31],66:[2,31],67:[2,31]},{16:25,20:101,24:47,25:[1,48],28:24,29:26,56:[1,16],63:[1,29],64:27,65:28,66:[1,30],67:[1,31]},{6:[2,57],26:[2,57]},{26:[1,102]},{26:[1,103]},{8:105,16:80,25:[1,81],53:[1,104],56:[1,16],58:11},{25:[2,63],53:[2,63],56:[2,63]},{38:[1,20],56:[2,64],63:[2,64],66:[2,64],67:[2,64]},{30:106,31:[1,33],32:[1,34],33:[1,35],34:[1,36]},{5:[2,39],13:[2,39],25:[2,39],36:[2,39],40:[2,39],53:[2,39],56:[2,39]},{25:[1,58],37:[1,60],39:107,46:53,47:52,49:56,50:[1,61],51:54,52:[1,59],54:51,55:55,56:[1,57]},{25:[1,58],37:[1,60],39:108,46:53,47:52,49:56,50:[1,61],51:54,52:[1,59],54:51,55:55,56:[1,57]},{26:[1,109]},{9:111,16:88,25:[1,89],53:[1,110],56:[1,16]},{25:[2,42],53:[2,42],56:[2,42]},{44:[1,21]},{30:112,31:[1,33],32:[1,34],33:[1,35],34:[1,36]},{6:[1,113]},{16:25,18:114,20:44,21:42,22:43,23:45,24:47,25:[1,48],28:24,29:26,37:[1,46],52:[1,49],56:[1,16],63:[1,29],64:27,65:28,66:[1,30],67:[1,31]},{68:[1,115]},{25:[1,58],37:[1,60],39:116,46:53,47:52,49:56,50:[1,61],51:54,52:[1,59],54:51,55:55,56:[1,57]},{6:[1,117]},{6:[1,118],42:[1,119]},{6:[2,36],42:[2,36]},{6:[2,38],25:[1,58],37:[1,60],39:120,42:[2,38],46:53,47:52,49:56,50:[1,61],51:54,52:[1,59],54:51,55:55,56:[1,57]},{6:[2,11],15:[2,11]},{6:[2,15],25:[2,15],26:[2,15],56:[2,15],63:[2,15],66:[2,15],67:[2,15]},{6:[2,56],26:[2,56]},{35:[1,121]},{6:[2,22],25:[2,22],26:[2,22],31:[2,22],32:[2,22],33:[2,22],34:[2,22],35:[2,22],56:[2,22],63:[2,22],66:[2,22],67:[2,22]},{6:[2,23],25:[2,23],26:[2,23],31:[2,23],32:[2,23],33:[2,23],34:[2,23],35:[2,23],56:[2,23],63:[2,23],66:[2,23],67:[2,23]},{6:[2,73],26:[2,73]},{25:[2,62],53:[2,62],56:[2,62]},{26:[1,122]},{6:[2,54],26:[2,54],42:[2,54]},{6:[2,43],26:[2,43],42:[2,43]},{6:[2,53],26:[2,53],42:[2,53],48:[2,53],57:[2,53]},{6:[2,45],26:[2,45],42:[2,45]},{25:[2,41],53:[2,41],56:[2,41]},{26:[1,123]},{5:[2,60],13:[2,60],25:[2,60],36:[2,60],40:[2,60],53:[2,60],56:[2,60]},{6:[1,125],61:124},{25:[2,76],37:[2,76],52:[2,76],56:[2,76],63:[2,76],66:[2,76],67:[2,76]},{6:[1,126]},{5:[2,33],13:[2,33],25:[2,33],36:[2,33],40:[2,33],56:[2,33]},{5:[2,34],13:[2,34],25:[2,34],36:[2,34],40:[2,34],56:[2,34]},{37:[1,97],43:127},{6:[2,37],42:[2,37]},{25:[2,32],26:[2,32],37:[2,32],52:[2,32],56:[2,32],63:[2,32],66:[2,32],67:[2,32]},{56:[2,65],63:[2,65],66:[2,65],67:[2,65]},{44:[1,93]},{5:[2,61],13:[2,61],25:[2,61],36:[2,61],40:[2,61],53:[2,61],56:[2,61]},{69:[1,128]},{5:[2,40],13:[2,40],25:[2,40],36:[2,40],40:[2,40],53:[2,40],56:[2,40]},{6:[2,35],42:[2,35]},{5:[2,77],13:[2,77],25:[2,77],36:[2,77],40:[2,77],53:[2,77],56:[2,77]}],
defaultActions: {17:[2,1],19:[2,2]},
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