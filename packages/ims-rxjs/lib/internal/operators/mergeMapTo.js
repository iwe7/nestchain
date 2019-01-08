"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mergeMap_1 = require("./mergeMap");
function mergeMapTo(innerObservable, resultSelector, concurrent = Number.POSITIVE_INFINITY) {
    if (typeof resultSelector === 'function') {
        return mergeMap_1.mergeMap(() => innerObservable, resultSelector, concurrent);
    }
    if (typeof resultSelector === 'number') {
        concurrent = resultSelector;
    }
    return mergeMap_1.mergeMap(() => innerObservable, concurrent);
}
exports.mergeMapTo = mergeMapTo;
