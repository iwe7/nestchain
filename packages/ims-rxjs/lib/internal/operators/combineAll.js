"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const combineLatest_1 = require("../observable/combineLatest");
function combineAll(project) {
    return (source) => source.lift(new combineLatest_1.CombineLatestOperator(project));
}
exports.combineAll = combineAll;
