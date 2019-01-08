"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const multicast_1 = require("./multicast");
const refCount_1 = require("./refCount");
const Subject_1 = require("../Subject");
function shareSubjectFactory() {
    return new Subject_1.Subject();
}
function share() {
    return (source) => refCount_1.refCount()(multicast_1.multicast(shareSubjectFactory)(source));
}
exports.share = share;
