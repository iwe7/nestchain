"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const concat_1 = require("../observable/concat");
function concat(...observables) {
    return (source) => source.lift.call(concat_1.concat(source, ...observables));
}
exports.concat = concat;
