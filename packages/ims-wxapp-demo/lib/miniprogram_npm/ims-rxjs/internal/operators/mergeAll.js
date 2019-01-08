"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mergeMap_1 = require("./mergeMap");
const identity_1 = require("../util/identity");
function mergeAll(concurrent = Number.POSITIVE_INFINITY) {
    return mergeMap_1.mergeMap(identity_1.identity, concurrent);
}
exports.mergeAll = mergeAll;
