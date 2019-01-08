"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const noop_1 = require("./noop");
function pipe(...fns) {
    return pipeFromArray(fns);
}
exports.pipe = pipe;
function pipeFromArray(fns) {
    if (!fns) {
        return noop_1.noop;
    }
    if (fns.length === 1) {
        return fns[0];
    }
    return function piped(input) {
        return fns.reduce((prev, fn) => fn(prev), input);
    };
}
exports.pipeFromArray = pipeFromArray;
