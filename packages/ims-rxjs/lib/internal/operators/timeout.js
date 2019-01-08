"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const async_1 = require("../scheduler/async");
const TimeoutError_1 = require("../util/TimeoutError");
const timeoutWith_1 = require("./timeoutWith");
const throwError_1 = require("../observable/throwError");
function timeout(due, scheduler = async_1.async) {
    return timeoutWith_1.timeoutWith(due, throwError_1.throwError(new TimeoutError_1.TimeoutError()), scheduler);
}
exports.timeout = timeout;
