"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tap_1 = require("./tap");
const EmptyError_1 = require("../util/EmptyError");
exports.throwIfEmpty = (errorFactory = defaultErrorFactory) => tap_1.tap({
    hasValue: false,
    next() { this.hasValue = true; },
    complete() {
        if (!this.hasValue) {
            throw errorFactory();
        }
    }
});
function defaultErrorFactory() {
    return new EmptyError_1.EmptyError();
}
