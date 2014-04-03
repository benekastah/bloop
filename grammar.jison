
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
    | typedef
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

definable
    : symbol
    | '(' bin_op ')' -> $bin_op
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

typedef
    : TYPEDEF TYPE_SYMBOL '=' type NEWLINE
        { $$ = yy.TypeDef($2, $type); }
    ;

type_annotation
    : symbol DOUBLE_COLON type NEWLINE
        { $$ = yy.TypeAnnotation($symbol, $type); }
    | '(' bin_op ')' DOUBLE_COLON type NEWLINE
        { $$ = yy.TypeAnnotation($bin_op, $type); }
    ;

or_type
    : simple_type '|' type
        { $$ = yy.OrType($simple_type, $type); }
    ;

any_type
    : TYPE_ANY
        { $$ = yy.AnyType(); }
    ;

type
    : function_type
    | simple_type
    | or_type
    ;

simple_type
    : type_symbol
    | any_type
    | SYMBOL
        { $$ = yy.makeTypeVariable($1); }
    | '(' type ')' -> $type
    ;

function_type
    : simple_type R_ARROW type
        { $$ = yy.FunctionType($simple_type, $type); }
    ;

application
    : simple_expr simple_expr_list
        { $$ = yy.makeApplication($simple_expr, $simple_expr_list); }
    | simple_expr bin_op expr
        { $$ = yy.makeApplication($bin_op, [$simple_expr, $expr]); }
    ;

definition
    : symbol '=' expr NEWLINE
        { $$ = yy.VarDef($symbol, $expr); }
    | definable literal_list '=' expr NEWLINE
        { $$ = yy.VarDef($definable, yy.makeFunction($literal_list, $expr)); }
    | definable literal_list '=' indent expr dedent
        { $$ = yy.VarDef($definable, yy.makeFunction($literal_list, $expr)); }
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

// vim: ts=4 sts=4 sw=4 et
