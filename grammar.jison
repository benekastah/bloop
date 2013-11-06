%{
  var INDENT_STACK = [0];
  var last = function (ls) {
    return ls[ls.length - 1];
  };
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
%}
%lex
%%

\\\n                        {/* ignore */}
\n+\s*                      %{
                              var cl = getIndentLevel(yytext);
                              var pl = last(INDENT_STACK);
                              if (cl > pl) {
                                INDENT_STACK.push(cl);
                                return 'INDENT';
                              } else if (cl < pl) {
                                var tokens = [];
                                while (INDENT_STACK.length) {
                                  tokens.push('DEDENT');
                                  if (INDENT_STACK.pop() === cl) {
                                    break;
                                  }
                                }
                                if (tokens.length < 1) {
                                  throw new Error('DEDENT does not match previous level');
                                }
                                return tokens;
                              } else {
                                return 'SAMEDENT';
                              }
                            %}
\s                          {/* ignore */}
[a-zA-Z]+                   { return 'SYMBOL'; }
"let"                       { return 'LET'; }
"="                         { return '='; }
"`"                         { return '`'; }
"("                         { return '('; }
")"                         { return ')'; }
"+"                         { return '+'; }
"-"                         { return '-'; }
"/"                         { return '/'; }
"*"                         { return '*'; }
[0-9]+"."[0-9]+\b           { return 'FLOAT'; }
[0-9]+                      { return 'FIXNUM'; }
<<EOF>>                     { return 'EOF'; }
/lex

%left LET + - * /

%start program

%%

program
  : statement_list EOF
    %{
      var program = {type: 'Module', body: $statement_list};
      console.log(JSON.stringify(program, null, 2));
      return program;
    %}
  ;

statement_list
  : statement_list SAMEDENT statement
    { $$ = $statement_list; $$.push($statement); }
  | statement
    { $$ = [$statement]; }
  | statement_list SAMEDENT
  ;

statement
  : definition
  ;

expr_list
  : expr_list expr
    { $$ = $expr_list; $$.push($expr); }
  | expr
    { $$ = [$expr]; }
  ;

simple_expr_list
  : simple_expr_list simple_expr
    { $$ = $simple_expr_list; $$.push($simple_expr); }
  | simple_expr -> [$simple_expr]
  ;

expr
  : application
  | simple_expr
  ;

simple_expr
  : number
  | symbol
  | '(' expr ')' -> $expr
  | '(' bin_op ')' -> $bin_op
  ;

bin_op
  : '+'
    { $$ = {type: 'Symbol', name: $1}; }
  | '-'
    { $$ = {type: 'Symbol', name: $1}; }
  | '/'
    { $$ = {type: 'Symbol', name: $1}; }
  | '*'
    { $$ = {type: 'Symbol', name: $1}; }
  | '`' simple_expr '`' -> $2
  ;

application
  : simple_expr simple_expr_list
    { $$ = {
      type: 'Application',
      callable: $simple_expr,
      args: $simple_expr_list
    }; }
  | simple_expr bin_op expr
    { $$ = {
      type: 'Application',
      callable: $bin_op,
      args: [$simple_expr, $expr]
    }; }
  ;

definition
  : symbol '=' expr
    { $$ = {
      type: 'VarDef',
      left: $symbol,
      right: $expr
    }; }
  | symbol symbol_list '=' expr
    { $$ = {
      type: 'FunctionDef',
      args: $symbol_list,
      body: $expr
    }; }
  ;

symbol_list
  : symbol_list symbol
    { $$ = $symbol_list; $$.push($symbol); }
  | symbol
    { $$ = [$symbol]; }
  ;

symbol
  : SYMBOL
    { $$ = {type: 'Symbol', name: yytext}; }
  ;

number
  : fixnum
  | float
  ;

fixnum
  : FIXNUM
    { $$ = {type: 'Fixnum', value: +yytext}; }
  ;

float
  : FLOAT
    { $$ = {type: 'Float', value: +yytext}; }
  ;
