"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Observable_1 = require("../Observable");
function throwError(error, scheduler) {
    if (!scheduler) {
        return new Observable_1.Observable(subscriber => subscriber.error(error));
    }
    else {
        return new Observable_1.Observable(subscriber => scheduler.schedule(dispatch, 0, { error, subscriber }));
    }
}
exports.throwError = throwError;
function dispatch({ error, subscriber }) {
    subscriber.error(error);
}
