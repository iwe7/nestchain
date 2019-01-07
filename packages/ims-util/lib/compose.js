"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function compose(...args) {
    if (args.length === 0) {
        return dir => dir;
    }
    return args.reduce((acc, curr) => {
        acc = acc || defaultComposeFn;
        curr = curr || defaultComposeFn;
        return (target) => curr(acc(target));
    }, defaultComposeFn);
}
exports.compose = compose;
function defaultComposeFn(dir) {
    return dir;
}
