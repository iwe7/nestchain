"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zip_1 = require("../observable/zip");
function zip(...observables) {
    return function zipOperatorFunction(source) {
        return source.lift.call(zip_1.zip(source, ...observables));
    };
}
exports.zip = zip;
