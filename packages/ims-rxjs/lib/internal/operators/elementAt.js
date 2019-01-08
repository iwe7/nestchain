"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ArgumentOutOfRangeError_1 = require("../util/ArgumentOutOfRangeError");
const filter_1 = require("./filter");
const throwIfEmpty_1 = require("./throwIfEmpty");
const defaultIfEmpty_1 = require("./defaultIfEmpty");
const take_1 = require("./take");
function elementAt(index, defaultValue) {
    if (index < 0) {
        throw new ArgumentOutOfRangeError_1.ArgumentOutOfRangeError();
    }
    const hasDefaultValue = arguments.length >= 2;
    return (source) => source.pipe(filter_1.filter((v, i) => i === index), take_1.take(1), hasDefaultValue
        ? defaultIfEmpty_1.defaultIfEmpty(defaultValue)
        : throwIfEmpty_1.throwIfEmpty(() => new ArgumentOutOfRangeError_1.ArgumentOutOfRangeError()));
}
exports.elementAt = elementAt;
