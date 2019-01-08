"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("./config");
const hostReportError_1 = require("./util/hostReportError");
exports.empty = {
    closed: true,
    next(value) { },
    error(err) {
        if (config_1.config.useDeprecatedSynchronousErrorHandling) {
            throw err;
        }
        else {
            hostReportError_1.hostReportError(err);
        }
    },
    complete() { }
};
