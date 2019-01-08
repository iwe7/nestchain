"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const not_1 = require("../util/not");
const filter_1 = require("./filter");
function partition(predicate, thisArg) {
    return (source) => [
        filter_1.filter(predicate, thisArg)(source),
        filter_1.filter(not_1.not(predicate, thisArg))(source)
    ];
}
exports.partition = partition;
