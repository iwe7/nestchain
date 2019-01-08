"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let nextHandle = 1;
const tasksByHandle = {};
function runIfPresent(handle) {
    const cb = tasksByHandle[handle];
    if (cb) {
        cb();
    }
}
exports.Immediate = {
    setImmediate(cb) {
        const handle = nextHandle++;
        tasksByHandle[handle] = cb;
        Promise.resolve().then(() => runIfPresent(handle));
        return handle;
    },
    clearImmediate(handle) {
        delete tasksByHandle[handle];
    },
};
