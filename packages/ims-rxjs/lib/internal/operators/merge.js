"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const merge_1 = require("../observable/merge");
function merge(...observables) {
    return (source) => source.lift.call(merge_1.merge(source, ...observables));
}
exports.merge = merge;
