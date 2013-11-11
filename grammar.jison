
%left LET + - * /

%start program

%ebnf

%%

program
  : statement_list EOF
    { return yy.Module($statement_list); }
  | NEWLINE program
  ;

statement_list
  : statement_list statement
    { $$ = $statement_list; $$.push($statement); }
  | statement
    { $$ = [$statement]; }
  ;

statement
  : definition
  | type_annotation
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
  : literal
  | '(' expr ')' -> $expr
  | '(' bin_op ')' -> $bin_op
  ;

literal
  : number
  | symbol
  ;

bin_op
  : '+'
    { $$ = yy.Symbol($1); }
  | '-'
    { $$ = yy.Symbol($1); }
  | '/'
    { $$ = yy.Symbol($1); }
  | '*'
    { $$ = yy.Symbol($1); }
  | '`' simple_expr '`' -> $2
  ;

type_annotation
  : symbol DOUBLE_COLON type NEWLINE
    { $$ = yy.TypeAnnotation($symbol, $type); }
  ;

type
  : function_type
  | simple_type
  ;

simple_type
  : type_symbol
  | '(' type ')' -> $type
  ;

function_type
  : simple_type R_ARROW simple_type
    { $$ = yy.FunctionType([$simple_type1, $simple_type2]); }
  | function_type R_ARROW simple_type
    { $$ = $function_type; $$.chain.push($simple_type); }
  ;

application
  : simple_expr simple_expr_list
    { $$ = yy.Application($simple_expr, $simple_expr_list); }
  | simple_expr bin_op expr
    { $$ = yy.Application($bin_op, [$simple_expr, $expr]); }
  ;

definition
  : symbol '=' expr NEWLINE
    { $$ = yy.VarDef($symbol, $expr); }
  | symbol literal_list '=' expr NEWLINE
    { $$ = yy.FunctionDef($symbol, $literal_list, $expr); }
  | symbol literal_list '=' indent expr dedent
    { $$ = yy.FunctionDef($symbol, $literal_list, $expr); }
  ;

literal_list
  : literal_list literal
    { $$ = $literal_list; $$.push($literal); }
  | literal -> [$literal]
  ;

symbol
  : SYMBOL
    { $$ = yy.Symbol(yytext); }
  ;

type_symbol
  : TYPE_SYMBOL
    { $$ = yy.TypeSymbol(yytext); }
  ;

number
  : fixnum
  | float
  ;

fixnum
  : FIXNUM
    { $$ = yy.Integer(yytext); }
  ;

float
  : FLOAT
    { $$ = yy.Float(yytext); }
  ;

indent
  : NEWLINE INDENT
  ;

dedent
  : NEWLINE DEDENT
  ;
