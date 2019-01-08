"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const isArray_1 = require("../util/isArray");
const combineLatest_1 = require("../observable/combineLatest");
const from_1 = require("../observable/from");
const none = {};
function combineLatest(...observables) {
    let project = null;
    if (typeof observables[observables.length - 1] === 'function') {
        project = observables.pop();
    }
    if (observables.length === 1 && isArray_1.isArray(observables[0])) {
        observables = observables[0].slice();
    }
    return (source) => source.lift.call(from_1.from([source, ...observables]), new combineLatest_1.CombineLatestOperator(project));
}
exports.combineLatest = combineLatest;
