"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function hostReportError(err) {
    setTimeout(() => { throw err; });
}
exports.hostReportError = hostReportError;
