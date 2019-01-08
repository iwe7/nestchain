"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const async_1 = require("../scheduler/async");
const map_1 = require("./map");
function timestamp(scheduler = async_1.async) {
    return map_1.map((value) => new Timestamp(value, scheduler.now()));
}
exports.timestamp = timestamp;
class Timestamp {
    constructor(value, timestamp) {
        this.value = value;
        this.timestamp = timestamp;
    }
}
exports.Timestamp = Timestamp;
