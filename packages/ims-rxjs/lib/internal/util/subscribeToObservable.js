"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const observable_1 = require("../symbol/observable");
exports.subscribeToObservable = (obj) => (subscriber) => {
    const obs = obj[observable_1.observable]();
    if (typeof obs.subscribe !== 'function') {
        throw new TypeError('Provided object does not correctly implement Symbol.observable');
    }
    else {
        return obs.subscribe(subscriber);
    }
};
