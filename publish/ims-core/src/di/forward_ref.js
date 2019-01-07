"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ims_util_1 = require("ims-util");
const __forward_ref__ = ims_util_1.getClosureSafeProperty({
    __forward_ref__: ims_util_1.getClosureSafeProperty,
});
function forwardRef(forwardRefFn) {
    forwardRefFn.__forward_ref__ = forwardRef;
    forwardRefFn.toString = function () {
        return ims_util_1.stringify(this());
    };
    return forwardRefFn;
}
exports.forwardRef = forwardRef;
function resolveForwardRef(type) {
    const fn = type;
    if (typeof fn === 'function' &&
        fn.hasOwnProperty(__forward_ref__) &&
        fn.__forward_ref__ === forwardRef) {
        return fn();
    }
    else {
        return type;
    }
}
exports.resolveForwardRef = resolveForwardRef;
