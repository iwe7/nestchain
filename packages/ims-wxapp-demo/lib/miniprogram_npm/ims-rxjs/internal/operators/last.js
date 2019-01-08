"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EmptyError_1 = require("../util/EmptyError");
const filter_1 = require("./filter");
const takeLast_1 = require("./takeLast");
const throwIfEmpty_1 = require("./throwIfEmpty");
const defaultIfEmpty_1 = require("./defaultIfEmpty");
const identity_1 = require("../util/identity");
function last(predicate, defaultValue) {
    const hasDefaultValue = arguments.length >= 2;
    return (source) => source.pipe(predicate ? filter_1.filter((v, i) => predicate(v, i, source)) : identity_1.identity, takeLast_1.takeLast(1), hasDefaultValue ? defaultIfEmpty_1.defaultIfEmpty(defaultValue) : throwIfEmpty_1.throwIfEmpty(() => new EmptyError_1.EmptyError()));
}
exports.last = last;
