"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const async_1 = require("../scheduler/async");
const audit_1 = require("./audit");
const timer_1 = require("../observable/timer");
function auditTime(duration, scheduler = async_1.async) {
    return audit_1.audit(() => timer_1.timer(duration, scheduler));
}
exports.auditTime = auditTime;
