"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const async_1 = require("../scheduler/async");
const scan_1 = require("./scan");
const defer_1 = require("../observable/defer");
const map_1 = require("./map");
function timeInterval(scheduler = async_1.async) {
    return (source) => defer_1.defer(() => {
        return source.pipe(scan_1.scan(({ current }, value) => ({ value, current: scheduler.now(), last: current }), { current: scheduler.now(), value: undefined, last: undefined }), map_1.map(({ current, last, value }) => new TimeInterval(value, current - last)));
    });
}
exports.timeInterval = timeInterval;
class TimeInterval {
    constructor(value, interval) {
        this.value = value;
        this.interval = interval;
    }
}
exports.TimeInterval = TimeInterval;
