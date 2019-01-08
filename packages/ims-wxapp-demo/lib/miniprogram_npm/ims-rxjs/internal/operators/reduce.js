"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const scan_1 = require("./scan");
const takeLast_1 = require("./takeLast");
const defaultIfEmpty_1 = require("./defaultIfEmpty");
const pipe_1 = require("../util/pipe");
function reduce(accumulator, seed) {
    if (arguments.length >= 2) {
        return function reduceOperatorFunctionWithSeed(source) {
            return pipe_1.pipe(scan_1.scan(accumulator, seed), takeLast_1.takeLast(1), defaultIfEmpty_1.defaultIfEmpty(seed))(source);
        };
    }
    return function reduceOperatorFunction(source) {
        return pipe_1.pipe(scan_1.scan((acc, value, index) => accumulator(acc, value, index + 1)), takeLast_1.takeLast(1))(source);
    };
}
exports.reduce = reduce;
