"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const find_1 = require("../operators/find");
function findIndex(predicate, thisArg) {
    return (source) => source.lift(new find_1.FindValueOperator(predicate, source, true, thisArg));
}
exports.findIndex = findIndex;
