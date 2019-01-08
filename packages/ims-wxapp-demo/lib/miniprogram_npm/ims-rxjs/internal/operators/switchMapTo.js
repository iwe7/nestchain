"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const switchMap_1 = require("./switchMap");
function switchMapTo(innerObservable, resultSelector) {
    return resultSelector ? switchMap_1.switchMap(() => innerObservable, resultSelector) : switchMap_1.switchMap(() => innerObservable);
}
exports.switchMapTo = switchMapTo;
