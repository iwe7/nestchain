"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getType(val) {
    if (Array.isArray(val)) {
        return 'array';
    }
    if (val === null) {
        return 'null';
    }
    if (val === undefined || typeof val === 'undefined') {
        return 'undefined';
    }
    if (val === true || val === false || val instanceof Boolean) {
        return 'boolean';
    }
    if (typeof val === 'string' || val instanceof String) {
        return 'string';
    }
    if (typeof val === 'number' || val instanceof Number) {
        return 'number';
    }
    if (typeof val === 'function' || val instanceof Function) {
        return 'function';
    }
    if (val instanceof RegExp) {
        return 'regexp';
    }
    if (val instanceof Date) {
        return 'date';
    }
    const type = toString.call(val);
    if (type === '[object RegExp]') {
        return 'regexp';
    }
    if (type === '[object Date]') {
        return 'date';
    }
    if (type === '[object Arguments]') {
        return 'arguments';
    }
    if (type === '[object Error]') {
        return 'error';
    }
    if (type === '[object Set]') {
        return 'set';
    }
    if (type === '[object WeakSet]') {
        return 'weakset';
    }
    if (type === '[object Map]') {
        return 'map';
    }
    if (type === '[object WeakMap]') {
        return 'weakmap';
    }
    if (type === '[object Symbol]') {
        return 'symbol';
    }
    return typeof val;
}
exports.getType = getType;
function isNumber(v) {
    if (getType(v) !== 'number')
        return false;
    return v - v + 1 >= 0;
}
exports.isNumber = isNumber;
function isUndefined(v) {
    return getType(v) === 'undefined';
}
exports.isUndefined = isUndefined;
function isNull(v) {
    return getType(v) === 'null';
}
exports.isNull = isNull;
function isNullOrUndefined(v) {
    return isUndefined(v) || isNull(v);
}
exports.isNullOrUndefined = isNullOrUndefined;
exports.isArray = Array.isArray;
function isObject(v) {
    return getType(v) === 'object';
}
exports.isObject = isObject;
function isFunction(v) {
    return getType(v) === 'function';
}
exports.isFunction = isFunction;
function isEmpty(v) {
    if (isNullOrUndefined(v))
        return true;
    if (isString(v))
        return v.length === 0;
    if (exports.isArray(v))
        return v.length === 0;
    if (isNumber(v))
        return exports.isNaN(v);
    if (isObject(v))
        return Object.keys(v).length === 0;
    return false;
}
exports.isEmpty = isEmpty;
function hasProperty(v, key) {
    return Reflect.has(v, key);
}
exports.hasProperty = hasProperty;
function getProperty(v, key) {
    return Reflect.get(v, key);
}
exports.getProperty = getProperty;
function strictGetProperty(v, key, _default) {
    if (!isNullOrUndefined(v)) {
        if (!hasProperty(v, key)) {
            return getProperty(v, key);
        }
    }
    return _default;
}
exports.strictGetProperty = strictGetProperty;
function setProperty(v, key, value) {
    return Reflect.set(v, key, value);
}
exports.setProperty = setProperty;
function strictsetProperty(v, key, value) {
    if (!isNullOrUndefined(v)) {
        if (!hasProperty(v, key)) {
            setProperty(v, key, value);
        }
    }
}
exports.strictsetProperty = strictsetProperty;
function strictIsFunction(v, key) {
    if (isNullOrUndefined(v)) {
        return false;
    }
    else if (hasProperty(v, key)) {
        return isFunction(getProperty(v, key));
    }
    else {
        return false;
    }
}
exports.strictIsFunction = strictIsFunction;
function strictIsArray(v, key) {
    if (isNullOrUndefined(v)) {
        return false;
    }
    else if (hasProperty(v, key)) {
        return exports.isArray(getProperty(v, key));
    }
    else {
        return false;
    }
}
exports.strictIsArray = strictIsArray;
function isObjectLike(v) {
    return getType(v) === 'object';
}
exports.isObjectLike = isObjectLike;
function isBoolean(v) {
    return getType(v) === 'boolean';
}
exports.isBoolean = isBoolean;
function isString(v) {
    return getType(v) === 'string';
}
exports.isString = isString;
function isOrigin(val = '') {
    if (val instanceof Function) {
        const { name } = val || {};
        return ['String', 'Number', 'Array', 'Object', 'Date'].indexOf(name) > -1;
    }
    return false;
}
exports.isOrigin = isOrigin;
function getExtends(type) {
    if (!type) {
        return false;
    }
    const prototypeOf = Reflect.getPrototypeOf(type) || {};
    const { name } = prototypeOf;
    if (isString(name)) {
        if (isOrigin(prototypeOf)) {
            return false;
        }
        if (name.length > 0) {
            return prototypeOf;
        }
    }
    return false;
}
exports.getExtends = getExtends;
function isTrue(v) {
    if (isNullOrUndefined(v))
        return true;
    else if (isString(v))
        return v === 'true' || v === '';
    else if (isBoolean(v))
        return v;
    else if (isNumber(v))
        return v !== 0;
    else
        return false;
}
exports.isTrue = isTrue;
function isFalse(v) {
    if (isNullOrUndefined(v))
        return true;
    else if (isString(v))
        return v === 'false' || v === '';
    else if (isBoolean(v))
        return !v;
    else if (isNumber(v))
        return v === 0;
    else
        return false;
}
exports.isFalse = isFalse;
exports.keys = Object.keys;
function uuid4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
        const r = (Math.random() * 16) | 0, v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}
exports.uuid4 = uuid4;
function isPromise(v) {
    return isFunction(v.then);
}
exports.isPromise = isPromise;
function isObservable(v) {
    return isFunction(v.subscribe);
}
exports.isObservable = isObservable;
exports.isNaN = Number.isNaN;
exports.isNan = Number.isNaN;
function isMap(v) {
    return getType(v) === 'map';
}
exports.isMap = isMap;
function isSet(v) {
    return getType(v) === 'set';
}
exports.isSet = isSet;
