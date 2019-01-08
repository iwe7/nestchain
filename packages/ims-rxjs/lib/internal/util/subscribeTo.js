"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Observable_1 = require("../Observable");
const subscribeToArray_1 = require("./subscribeToArray");
const subscribeToPromise_1 = require("./subscribeToPromise");
const subscribeToIterable_1 = require("./subscribeToIterable");
const subscribeToObservable_1 = require("./subscribeToObservable");
const isArrayLike_1 = require("./isArrayLike");
const isPromise_1 = require("./isPromise");
const isObject_1 = require("./isObject");
const iterator_1 = require("../symbol/iterator");
const observable_1 = require("../symbol/observable");
exports.subscribeTo = (result) => {
    if (result instanceof Observable_1.Observable) {
        return (subscriber) => {
            if (result._isScalar) {
                subscriber.next(result.value);
                subscriber.complete();
                return undefined;
            }
            else {
                return result.subscribe(subscriber);
            }
        };
    }
    else if (!!result && typeof result[observable_1.observable] === 'function') {
        return subscribeToObservable_1.subscribeToObservable(result);
    }
    else if (isArrayLike_1.isArrayLike(result)) {
        return subscribeToArray_1.subscribeToArray(result);
    }
    else if (isPromise_1.isPromise(result)) {
        return subscribeToPromise_1.subscribeToPromise(result);
    }
    else if (!!result && typeof result[iterator_1.iterator] === 'function') {
        return subscribeToIterable_1.subscribeToIterable(result);
    }
    else {
        const value = isObject_1.isObject(result) ? 'an invalid object' : `'${result}'`;
        const msg = `You provided ${value} where a stream was expected.`
            + ' You can provide an Observable, Promise, Array, or Iterable.';
        throw new TypeError(msg);
    }
};
