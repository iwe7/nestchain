"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zip_1 = require("../observable/zip");
function zipAll(project) {
    return (source) => source.lift(new zip_1.ZipOperator(project));
}
exports.zipAll = zipAll;
