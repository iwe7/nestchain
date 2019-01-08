"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Observable_1 = require("../Observable");
const from_1 = require("./from");
const isArray_1 = require("../util/isArray");
const empty_1 = require("./empty");
function onErrorResumeNext(...sources) {
    if (sources.length === 0) {
        return empty_1.EMPTY;
    }
    const [first, ...remainder] = sources;
    if (sources.length === 1 && isArray_1.isArray(first)) {
        return onErrorResumeNext(...first);
    }
    return new Observable_1.Observable(subscriber => {
        const subNext = () => subscriber.add(onErrorResumeNext(...remainder).subscribe(subscriber));
        return from_1.from(first).subscribe({
            next(value) { subscriber.next(value); },
            error: subNext,
            complete: subNext,
        });
    });
}
exports.onErrorResumeNext = onErrorResumeNext;
