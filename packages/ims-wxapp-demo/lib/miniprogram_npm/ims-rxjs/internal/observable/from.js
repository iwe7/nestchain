"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Observable_1 = require("../Observable");
const isPromise_1 = require("../util/isPromise");
const isArrayLike_1 = require("../util/isArrayLike");
const isInteropObservable_1 = require("../util/isInteropObservable");
const isIterable_1 = require("../util/isIterable");
const fromArray_1 = require("./fromArray");
const fromPromise_1 = require("./fromPromise");
const fromIterable_1 = require("./fromIterable");
const fromObservable_1 = require("./fromObservable");
const subscribeTo_1 = require("../util/subscribeTo");
function from(input, scheduler) {
    if (!scheduler) {
        if (input instanceof Observable_1.Observable) {
            return input;
        }
        return new Observable_1.Observable(subscribeTo_1.subscribeTo(input));
    }
    if (input != null) {
        if (isInteropObservable_1.isInteropObservable(input)) {
            return fromObservable_1.fromObservable(input, scheduler);
        }
        else if (isPromise_1.isPromise(input)) {
            return fromPromise_1.fromPromise(input, scheduler);
        }
        else if (isArrayLike_1.isArrayLike(input)) {
            return fromArray_1.fromArray(input, scheduler);
        }
        else if (isIterable_1.isIterable(input) || typeof input === 'string') {
            return fromIterable_1.fromIterable(input, scheduler);
        }
    }
    throw new TypeError((input !== null && typeof input || input) + ' is not observable');
}
exports.from = from;
