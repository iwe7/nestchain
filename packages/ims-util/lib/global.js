"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lang_1 = require("./lang");
const __window = typeof window !== 'undefined' && window;
const __self = typeof self !== 'undefined' &&
    typeof WorkerGlobalScope !== 'undefined' &&
    self instanceof WorkerGlobalScope &&
    self;
const __global = typeof global !== 'undefined' && global;
const _global = __global || __window || __self;
exports.global = _global;
const noop = function () { };
function _get() {
    return _global || noop;
}
function getGlobal(key) {
    if (key) {
        if (_get()[key]) {
            return _get()[key];
        }
        return noop;
    }
    return _get();
}
exports.getGlobal = getGlobal;
function setGlobal(key, value) {
    if (lang_1.isArray(value)) {
        _global[key] = value;
    }
    else if (lang_1.isObject(value)) {
        _global[key] = _global[key] || {};
        _global[key] = { ..._global[key], ...value };
    }
    else {
        _global[key] = value;
    }
}
exports.setGlobal = setGlobal;
