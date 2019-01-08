"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const distinctUntilChanged_1 = require("./distinctUntilChanged");
function distinctUntilKeyChanged(key, compare) {
    return distinctUntilChanged_1.distinctUntilChanged((x, y) => compare ? compare(x[key], y[key]) : x[key] === y[key]);
}
exports.distinctUntilKeyChanged = distinctUntilKeyChanged;
