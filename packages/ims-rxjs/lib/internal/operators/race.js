"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const isArray_1 = require("../util/isArray");
const race_1 = require("../observable/race");
function race(...observables) {
    return function raceOperatorFunction(source) {
        if (observables.length === 1 && isArray_1.isArray(observables[0])) {
            observables = observables[0];
        }
        return source.lift.call(race_1.race(source, ...observables));
    };
}
exports.race = race;
