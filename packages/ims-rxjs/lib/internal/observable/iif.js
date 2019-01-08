"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const defer_1 = require("./defer");
const empty_1 = require("./empty");
function iif(condition, trueResult = empty_1.EMPTY, falseResult = empty_1.EMPTY) {
    return defer_1.defer(() => condition() ? trueResult : falseResult);
}
exports.iif = iif;
