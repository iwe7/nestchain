"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const concatMap_1 = require("./concatMap");
function concatMapTo(innerObservable, resultSelector) {
    return concatMap_1.concatMap(() => innerObservable, resultSelector);
}
exports.concatMapTo = concatMapTo;
