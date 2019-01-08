"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BehaviorSubject_1 = require("../BehaviorSubject");
const multicast_1 = require("./multicast");
function publishBehavior(value) {
    return (source) => multicast_1.multicast(new BehaviorSubject_1.BehaviorSubject(value))(source);
}
exports.publishBehavior = publishBehavior;
