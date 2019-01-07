"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const type_1 = require("../type");
function isTypeProvider(val) {
    return type_1.isType(val);
}
exports.isTypeProvider = isTypeProvider;
function isValueProvider(val) {
    return Reflect.has(val, 'useValue') && Reflect.has(val, 'provide');
}
exports.isValueProvider = isValueProvider;
function isClassProvider(val) {
    return Reflect.has(val, 'useClass') && Reflect.has(val, 'provide');
}
exports.isClassProvider = isClassProvider;
function isConstructorProvider(val) {
    return Reflect.has(val, 'provide');
}
exports.isConstructorProvider = isConstructorProvider;
function isExistingProvider(val) {
    return Reflect.has(val, 'provide') && Reflect.has(val, 'useExisting');
}
exports.isExistingProvider = isExistingProvider;
function isFactoryProvider(val) {
    return Reflect.has(val, 'provide') && Reflect.has(val, 'useFactory');
}
exports.isFactoryProvider = isFactoryProvider;
