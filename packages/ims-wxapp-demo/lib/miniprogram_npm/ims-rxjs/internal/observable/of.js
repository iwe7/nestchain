"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const isScheduler_1 = require("../util/isScheduler");
const fromArray_1 = require("./fromArray");
const empty_1 = require("./empty");
const scalar_1 = require("./scalar");
function of(...args) {
    let scheduler = args[args.length - 1];
    if (isScheduler_1.isScheduler(scheduler)) {
        args.pop();
    }
    else {
        scheduler = undefined;
    }
    switch (args.length) {
        case 0:
            return empty_1.empty(scheduler);
        case 1:
            return scheduler ? fromArray_1.fromArray(args, scheduler) : scalar_1.scalar(args[0]);
        default:
            return fromArray_1.fromArray(args, scheduler);
    }
}
exports.of = of;
