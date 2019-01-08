"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const reduce_1 = require("./reduce");
function max(comparer) {
    const max = (typeof comparer === 'function')
        ? (x, y) => comparer(x, y) > 0 ? x : y
        : (x, y) => x > y ? x : y;
    return reduce_1.reduce(max);
}
exports.max = max;
