"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function assign(target, ...sources) {
    for (const source of sources) {
        for (const prop of Object.getOwnPropertyNames(source)) {
            target[prop] = target[prop] || source[prop];
        }
    }
}
exports.assign = assign;
