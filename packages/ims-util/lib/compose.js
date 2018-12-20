"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function compose(...args) {
    if (args.length === 0) {
        return dir => dir;
    }
    return args.reduce((acc, curr) => {
        return target => curr(acc(target));
    }, dir => dir);
}
exports.compose = compose;
