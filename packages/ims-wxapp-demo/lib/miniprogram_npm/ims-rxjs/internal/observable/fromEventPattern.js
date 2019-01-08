"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Observable_1 = require("../Observable");
const isArray_1 = require("../util/isArray");
const isFunction_1 = require("../util/isFunction");
const map_1 = require("../operators/map");
function fromEventPattern(addHandler, removeHandler, resultSelector) {
    if (resultSelector) {
        return fromEventPattern(addHandler, removeHandler).pipe(map_1.map(args => isArray_1.isArray(args) ? resultSelector(...args) : resultSelector(args)));
    }
    return new Observable_1.Observable(subscriber => {
        const handler = (...e) => subscriber.next(e.length === 1 ? e[0] : e);
        let retValue;
        try {
            retValue = addHandler(handler);
        }
        catch (err) {
            subscriber.error(err);
            return undefined;
        }
        if (!isFunction_1.isFunction(removeHandler)) {
            return undefined;
        }
        return () => removeHandler(handler, retValue);
    });
}
exports.fromEventPattern = fromEventPattern;
