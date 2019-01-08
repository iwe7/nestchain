"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AsyncSubject_1 = require("../AsyncSubject");
const multicast_1 = require("./multicast");
function publishLast() {
    return (source) => multicast_1.multicast(new AsyncSubject_1.AsyncSubject())(source);
}
exports.publishLast = publishLast;
