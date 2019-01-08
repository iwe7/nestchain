"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const isScheduler_1 = require("../util/isScheduler");
const of_1 = require("./of");
const from_1 = require("./from");
const concatAll_1 = require("../operators/concatAll");
function concat(...observables) {
    if (observables.length === 1 ||
        (observables.length === 2 && isScheduler_1.isScheduler(observables[1]))) {
        return from_1.from(observables[0]);
    }
    return concatAll_1.concatAll()(of_1.of(...observables));
}
exports.concat = concat;
