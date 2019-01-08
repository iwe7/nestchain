"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fromArray_1 = require("../observable/fromArray");
const scalar_1 = require("../observable/scalar");
const empty_1 = require("../observable/empty");
const concat_1 = require("../observable/concat");
const isScheduler_1 = require("../util/isScheduler");
function startWith(...array) {
    return (source) => {
        let scheduler = array[array.length - 1];
        if (isScheduler_1.isScheduler(scheduler)) {
            array.pop();
        }
        else {
            scheduler = null;
        }
        const len = array.length;
        if (len === 1 && !scheduler) {
            return concat_1.concat(scalar_1.scalar(array[0]), source);
        }
        else if (len > 0) {
            return concat_1.concat(fromArray_1.fromArray(array, scheduler), source);
        }
        else {
            return concat_1.concat(empty_1.empty(scheduler), source);
        }
    };
}
exports.startWith = startWith;
