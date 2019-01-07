"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Type = Function;
function isType(v) {
    return typeof v === 'function';
}
exports.isType = isType;
function iInjectorToArray(injector) {
    return Object.keys(injector).map(it => injector[it]);
}
exports.iInjectorToArray = iInjectorToArray;
