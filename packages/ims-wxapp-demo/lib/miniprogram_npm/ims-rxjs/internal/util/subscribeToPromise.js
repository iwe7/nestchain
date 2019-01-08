"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hostReportError_1 = require("./hostReportError");
exports.subscribeToPromise = (promise) => (subscriber) => {
    promise.then((value) => {
        if (!subscriber.closed) {
            subscriber.next(value);
            subscriber.complete();
        }
    }, (err) => subscriber.error(err))
        .then(null, hostReportError_1.hostReportError);
    return subscriber;
};
