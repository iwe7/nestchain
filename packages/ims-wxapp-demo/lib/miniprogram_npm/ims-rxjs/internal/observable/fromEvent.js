"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Observable_1 = require("../Observable");
const isArray_1 = require("../util/isArray");
const isFunction_1 = require("../util/isFunction");
const map_1 = require("../operators/map");
const toString = Object.prototype.toString;
function fromEvent(target, eventName, options, resultSelector) {
    if (isFunction_1.isFunction(options)) {
        resultSelector = options;
        options = undefined;
    }
    if (resultSelector) {
        return fromEvent(target, eventName, (options)).pipe(map_1.map(args => isArray_1.isArray(args) ? resultSelector(...args) : resultSelector(args)));
    }
    return new Observable_1.Observable(subscriber => {
        function handler(e) {
            if (arguments.length > 1) {
                subscriber.next(Array.prototype.slice.call(arguments));
            }
            else {
                subscriber.next(e);
            }
        }
        setupSubscription(target, eventName, handler, subscriber, options);
    });
}
exports.fromEvent = fromEvent;
function setupSubscription(sourceObj, eventName, handler, subscriber, options) {
    let unsubscribe;
    if (isEventTarget(sourceObj)) {
        const source = sourceObj;
        sourceObj.addEventListener(eventName, handler, options);
        unsubscribe = () => source.removeEventListener(eventName, handler, options);
    }
    else if (isJQueryStyleEventEmitter(sourceObj)) {
        const source = sourceObj;
        sourceObj.on(eventName, handler);
        unsubscribe = () => source.off(eventName, handler);
    }
    else if (isNodeStyleEventEmitter(sourceObj)) {
        const source = sourceObj;
        sourceObj.addListener(eventName, handler);
        unsubscribe = () => source.removeListener(eventName, handler);
    }
    else if (sourceObj && sourceObj.length) {
        for (let i = 0, len = sourceObj.length; i < len; i++) {
            setupSubscription(sourceObj[i], eventName, handler, subscriber, options);
        }
    }
    else {
        throw new TypeError('Invalid event target');
    }
    subscriber.add(unsubscribe);
}
function isNodeStyleEventEmitter(sourceObj) {
    return (sourceObj &&
        typeof sourceObj.addListener === 'function' &&
        typeof sourceObj.removeListener === 'function');
}
function isJQueryStyleEventEmitter(sourceObj) {
    return (sourceObj &&
        typeof sourceObj.on === 'function' &&
        typeof sourceObj.off === 'function');
}
function isEventTarget(sourceObj) {
    return (sourceObj &&
        typeof sourceObj.addEventListener === 'function' &&
        typeof sourceObj.removeEventListener === 'function');
}
