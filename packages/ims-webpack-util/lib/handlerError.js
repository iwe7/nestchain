"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = require("chalk");
exports.handlerError = (callback) => (err, stats) => {
    if (err)
        console.error(err);
    if (stats.hasErrors())
        console.log(stats
            .toJson()
            .errors.map(e => chalk_1.default.red(e))
            .join('\n'));
    if (stats.hasWarnings())
        console.log(stats
            .toJson()
            .warnings.map(w => chalk_1.default.yellow(w))
            .join('\n'));
    callback && callback();
};
