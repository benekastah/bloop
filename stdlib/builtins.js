
var helpers = require('bloop/helpers');

helpers.defun(exports, '$_add_$', function (a, b) {
    return a + b;
});

helpers.defun(exports, '$_subtract_$', function (a, b) {
    return a - b;
});

helpers.defun(exports, '$_multiply_$', function (a, b) {
    return a * b;
});

helpers.defun(exports, '$_divide_$', function (a, b) {
    return a / b;
});

helpers.defun(exports, 'print', function (x) {
    console.log(x);
});

