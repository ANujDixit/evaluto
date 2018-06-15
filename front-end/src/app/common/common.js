"use strict";
var rxjs_1 = require('rxjs');
function transformError(error) {
    var errorMessage = 'An	unknown	error	has	occurred';
    if (typeof error === 'string') {
        errorMessage = error;
    }
    else if (error.error instanceof ErrorEvent) {
        errorMessage = "Error!\t" + error.error.message;
    }
    else if (error.status) {
        errorMessage = "Request\tfailed\twith\t" + error.status + "\t" + error.statusText;
    }
    return rxjs_1.throwError(errorMessage);
}
exports.transformError = transformError;
